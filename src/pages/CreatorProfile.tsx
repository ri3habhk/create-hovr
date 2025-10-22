import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Upload } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import ChatDialog from '@/components/ChatDialog';
import CreatorRating from '@/components/CreatorRating';
import logError from '@/lib/errorLogger';

const CreatorProfile = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCreatorProfile();
  }, [id]);

  const loadCreatorProfile = async () => {
    try {
      const { data: portfolio, error: portfolioError } = await supabase
        .from('creator_portfolios')
        .select('*')
        .eq('user_id', id)
        .eq('is_published', true)
        .single();

      if (portfolioError) throw portfolioError;

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (profileError) throw profileError;

      setCreator({
        ...portfolio,
        profile,
      });
    } catch (error) {
      logError('CreatorProfile', error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatBudgetRange = (min: number | null, max: number | null) => {
    if (!min || !max) return 'Budget not specified';
    return `₹${min.toLocaleString('en-IN')} - ₹${max.toLocaleString('en-IN')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-12">
            <p className="text-center text-muted-foreground">Loading creator profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-12">
            <p className="text-center text-muted-foreground">Creator not found</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const displayName = creator.alias_name || `${creator.first_name} ${creator.last_name}`;
  const fullName = `${creator.first_name} ${creator.last_name}`;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Creator Info Section */}
          <div className="flex flex-col md:flex-row items-start justify-between mb-12 gap-6">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {creator.profile?.avatar_url ? (
                  <img 
                    src={creator.profile.avatar_url} 
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-primary">
                    {getInitials(fullName)}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{displayName}</h1>
                {creator.alias_name && (
                  <p className="text-sm text-muted-foreground mb-1">({fullName})</p>
                )}
                <p className="text-xl text-primary font-semibold mb-2">
                  {creator.major_occupation}
                  {creator.minor_occupation && ` • ${creator.minor_occupation}`}
                </p>
                <div className="flex items-center text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{creator.location}</span>
                </div>
                <p className="text-xl font-bold text-primary mt-2">
                  {formatBudgetRange(creator.budget_min, creator.budget_max)}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <ChatDialog creatorName={displayName} />
              <Link to="/upload">
                <Button size="lg" variant="outline">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload File
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <Card className="gradient-card border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">About</h3>
                  <p className="text-muted-foreground mb-4 whitespace-pre-wrap">
                    {creator.bio}
                  </p>
                  {creator.skills && creator.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {creator.skills.map((skill: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Portfolio Section */}
              {creator.portfolio_files && creator.portfolio_files.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Portfolio</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {creator.portfolio_files.map((fileUrl: string, index: number) => {
                      const isVideo = fileUrl.match(/\.(mp4|webm|ogg|mov)$/i);
                      const isPdf = fileUrl.match(/\.pdf$/i);
                      
                      return (
                        <Card 
                          key={index} 
                          className="gradient-card border-border/50 hover-lift group overflow-hidden cursor-pointer"
                          onClick={() => window.open(fileUrl, '_blank')}
                        >
                          <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden">
                            {isVideo ? (
                              <video 
                                src={fileUrl} 
                                className="w-full h-full object-cover"
                                muted
                              />
                            ) : isPdf ? (
                              <span className="text-4xl">📄</span>
                            ) : (
                              <img 
                                src={fileUrl} 
                                alt={`Portfolio ${index + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            )}
                          </div>
                          <CardContent className="p-3">
                            <h3 className="font-semibold text-sm truncate">
                              Work Sample {index + 1}
                            </h3>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Rating Section */}
            <div className="lg:col-span-1">
              <CreatorRating creatorId={id!} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreatorProfile;
