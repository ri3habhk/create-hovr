import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, MapPin, Folder, Search, Filter } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import logError from '@/lib/errorLogger';

const CreatorsBrowse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [creators, setCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCreators();
  }, []);

  // Realtime: refresh list when ratings change
  useEffect(() => {
    const channel = supabase
      .channel('creator_ratings_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'creator_ratings' },
        () => {
          loadCreators();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  const loadCreators = async () => {
    try {
      const { data: portfolios, error: portfolioError } = await supabase
        .from('creator_portfolios')
        .select('*')
        .eq('is_published', true);

      if (portfolioError) throw portfolioError;

      if (!portfolios || portfolios.length === 0) {
        setCreators([]);
        return;
      }

      const userIds = portfolios.map((p: any) => p.user_id);
      
      // Fetch profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', userIds);

      if (profilesError) throw profilesError;

      // Fetch ratings
      const { data: ratings, error: ratingsError } = await supabase
        .from('creator_ratings')
        .select('creator_id, rating')
        .in('creator_id', userIds);

      if (ratingsError) throw ratingsError;

      // Calculate average ratings
      const ratingsMap = new Map();
      ratings?.forEach((r: any) => {
        if (!ratingsMap.has(r.creator_id)) {
          ratingsMap.set(r.creator_id, { sum: 0, count: 0 });
        }
        const current = ratingsMap.get(r.creator_id);
        ratingsMap.set(r.creator_id, {
          sum: current.sum + r.rating,
          count: current.count + 1
        });
      });

      const profileMap = new Map(profiles?.map((p: any) => [p.id, p]));
      const enriched = portfolios.map((p: any) => {
        const ratingData = ratingsMap.get(p.user_id);
        const avgRating = ratingData ? ratingData.sum / ratingData.count : 0;
        
        return {
          ...p,
          profiles: profileMap.get(p.user_id) || null,
          averageRating: avgRating,
          totalRatings: ratingData?.count || 0
        };
      });

      setCreators(enriched);
    } catch (error) {
      logError('CreatorsBrowse', error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .filter(Boolean)
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatBudgetRange = (min: any, max: any) => {
    const minNum = typeof min === 'number' ? min : Number(min);
    const maxNum = typeof max === 'number' ? max : Number(max);
    if (!isFinite(minNum) || !isFinite(maxNum)) return 'Budget not specified';
    return `₹${minNum.toLocaleString('en-IN')} - ₹${maxNum.toLocaleString('en-IN')}`;
  };
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="py-20 bg-gradient-to-br from-background to-background/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Browse All
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"> Creators</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover talented professionals ready to bring your marketing vision to life
              </p>
            </div>

            {/* Search and Filter Section */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search creators by name, skill, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="photography">Photography</SelectItem>
                    <SelectItem value="content">Content</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Creators Grid */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading creators...</p>
              </div>
            ) : creators.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No creators found. Be the first to create your portfolio!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {creators.map((creator) => {
                  const displayName = (creator.alias_name?.trim() || `${(creator.first_name || '').trim()} ${(creator.last_name || '').trim()}`.trim() || creator.title?.trim() || 'Creator');
                  const initials = getInitials(displayName);
                  
                  return (
                    <Link key={creator.id} to={`/creator/${creator.user_id}`} className="block">
                      <Card className="bg-card/50 border-border/50 hover-lift group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg">
                        <CardHeader className="pb-4">
                          <div className="relative">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mx-auto mb-4 flex items-center justify-center overflow-hidden">
                              {creator.profiles?.avatar_url ? (
                                <img src={creator.profiles.avatar_url} alt={displayName} className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-2xl font-bold text-primary">
                                  {initials}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-center">
                            <h3 className="font-bold text-lg">{displayName}</h3>
                            <p className="text-primary font-medium">
                              {creator.major_occupation}
                              {creator.minor_occupation && ` • ${creator.minor_occupation}`}
                            </p>
                            {creator.location && (
                              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                                <MapPin className="h-3 w-3" />
                                <span>{creator.location}</span>
                              </div>
                            )}
                              <div className="flex items-center justify-center gap-1 mt-2">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-semibold">{(creator.averageRating?.toFixed ? creator.averageRating.toFixed(1) : Number(creator.averageRating || 0).toFixed(1))}</span>
                                <span className="text-xs text-muted-foreground">({creator.totalRatings || 0})</span>
                              </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          {creator.skills && creator.skills.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4 justify-center">
                              {creator.skills.slice(0, 3).map((skill: string, index: number) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {creator.skills.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{creator.skills.length - 3}
                                </Badge>
                              )}
                            </div>
                          )}

                            <div className="text-center">
                              <p className="text-sm font-medium text-primary">
                                {formatBudgetRange(creator.budget_min, creator.budget_max)}
                              </p>
                            </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CreatorsBrowse;
