import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import logError from '@/lib/errorLogger';

interface CreatorRatingProps {
  creatorId: string;
}

const CreatorRating = ({ creatorId }: CreatorRatingProps) => {
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [existingRating, setExistingRating] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkUserRole();
    loadRatings();
  }, [creatorId]);

  const checkUserRole = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setCurrentUser(user);

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'client')
      .maybeSingle();

    setIsClient(!!roleData);

    if (roleData) {
      const { data: existingRatingData } = await supabase
        .from('creator_ratings')
        .select('*')
        .eq('creator_id', creatorId)
        .eq('client_id', user.id)
        .maybeSingle();

      if (existingRatingData) {
        setExistingRating(existingRatingData);
        setUserRating(existingRatingData.rating);
        setReviewText(existingRatingData.review_text || '');
      }
    }
  };

  const loadRatings = async () => {
    const { data, error } = await supabase
      .from('creator_ratings')
      .select('rating')
      .eq('creator_id', creatorId);

    if (error) {
      logError('CreatorRating', error);
      return;
    }

    if (data && data.length > 0) {
      const avg = data.reduce((sum, r) => sum + r.rating, 0) / data.length;
      setAverageRating(Math.round(avg * 10) / 10);
      setTotalRatings(data.length);
    }
  };

  const handleSubmitRating = async () => {
    if (!currentUser || !isClient) {
      toast({
        title: 'Access Denied',
        description: 'Only clients can rate creators.',
        variant: 'destructive',
      });
      return;
    }

    if (!userRating) {
      toast({
        title: 'Rating Required',
        description: 'Please select a rating before submitting.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      if (existingRating) {
        const { error } = await supabase
          .from('creator_ratings')
          .update({
            rating: userRating,
            review_text: reviewText || null,
          })
          .eq('id', existingRating.id);

        if (error) throw error;

        toast({
          title: 'Rating Updated',
          description: 'Your rating has been updated successfully.',
        });
      } else {
        const { error } = await supabase
          .from('creator_ratings')
          .insert({
            creator_id: creatorId,
            client_id: currentUser.id,
            rating: userRating,
            review_text: reviewText || null,
          });

        if (error) throw error;

        toast({
          title: 'Rating Submitted',
          description: 'Thank you for rating this creator!',
        });
      }

      await loadRatings();
    } catch (error: any) {
      logError('CreatorRating', error);
      toast({
        title: 'Error',
        description: 'Failed to submit rating. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addClientRole = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: currentUser.id, role: 'client' });
      if (error) throw error;
      setIsClient(true);
      toast({ title: 'Client role added', description: 'You can now rate creators.' });
    } catch (error) {
      logError('CreatorRating.addClientRole', error);
      toast({ title: 'Error', description: 'Could not enable rating. Try again.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Average Rating Display */}
      <Card className="gradient-card border-border/50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
              <div className="flex items-center justify-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(averageRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rating Form (Only for Clients) */}
      {isClient && (
        <Card className="gradient-card border-border/50">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">
              {existingRating ? 'Update Your Rating' : 'Rate This Creator'}
            </h3>
            
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setUserRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= (hoverRating || userRating || 0)
                        ? 'text-yellow-400 fill-current'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              ))}
            </div>

            <Textarea
              placeholder="Share your experience working with this creator (optional)"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
              className="mb-4"
            />

            <Button
              onClick={handleSubmitRating}
              disabled={loading || !userRating}
              className="w-full"
            >
              {loading ? 'Submitting...' : existingRating ? 'Update Rating' : 'Submit Rating'}
            </Button>
          </CardContent>
        </Card>
      )}

      {currentUser && !isClient && (
        <Card className="gradient-card border-border/50">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Want to rate this creator?</h3>
            <p className="text-sm text-muted-foreground">Add the Client role to your account to submit ratings.</p>
            <Button onClick={addClientRole} disabled={loading} className="w-full">
              {loading ? 'Enabling…' : 'Enable rating (add Client role)'}
            </Button>
          </CardContent>
        </Card>
      )}

      {!currentUser && (
        <p className="text-sm text-muted-foreground text-center">
          Sign in as a client to rate this creator
        </p>
      )}
    </div>
  );
};

export default CreatorRating;