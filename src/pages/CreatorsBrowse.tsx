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

  const loadCreators = async () => {
    try {
      const { data, error } = await supabase
        .from('creator_portfolios')
        .select(`
          *,
          profiles:user_id (
            full_name,
            avatar_url
          )
        `)
        .eq('is_published', true);

      if (error) throw error;

      setCreators(data || []);
    } catch (error) {
      logError('CreatorsBrowse', error);
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
                {creators.map((creator) => (
                  <Link key={creator.id} to={`/creator/${creator.user_id}`} className="block">
                    <Card className="bg-card/50 border-border/50 hover-lift group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg">
                      <CardHeader className="pb-4">
                        <div className="relative">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mx-auto mb-4 flex items-center justify-center overflow-hidden">
                            {creator.profiles?.avatar_url ? (
                              <img src={creator.profiles.avatar_url} alt={creator.profiles.full_name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-2xl font-bold text-primary">
                                {getInitials(creator.profiles?.full_name || 'U')}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-center">
                          <h3 className="font-bold text-lg">{creator.profiles?.full_name}</h3>
                          <p className="text-primary font-medium">{creator.title}</p>
                          {creator.location && (
                            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                              <MapPin className="h-3 w-3" />
                              <span>{creator.location}</span>
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {creator.experience_years && (
                          <div className="text-center mb-4">
                            <p className="text-sm text-muted-foreground">
                              {creator.experience_years} years experience
                            </p>
                          </div>
                        )}

                        {creator.skills && creator.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {creator.skills.slice(0, 3).map((skill: string, index: number) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {creator.hourly_rate && (
                          <div className="text-center">
                            <p className="text-sm font-medium text-primary">
                              ${creator.hourly_rate}/hour
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
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
