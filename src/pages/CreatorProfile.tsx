
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Upload, Calendar, DollarSign, Mail, Phone } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const CreatorProfile = () => {
  const { id } = useParams();

  // Mock creator data - in real app, this would be fetched based on ID
  const creator = {
    name: "Sarah Chen",
    initials: "SC",
    specialty: "Brand Designer",
    rating: 4.9,
    projects: 127,
    location: "Mumbai, India",
    tags: ["Logo Design", "Brand Identity", "UI/UX"],
    priceRange: "₹5,000 - ₹25,000",
    availability: "Available for new projects",
    interests: "Tech startups, Healthcare brands, Sustainable businesses",
    portfolio: [
      { type: 'image', title: 'Tech Startup Branding', category: 'Logo Design' },
      { type: 'image', title: 'Healthcare App UI', category: 'UI/UX' },
      { type: 'video', title: 'Brand Animation', category: 'Motion Graphics' },
      { type: 'image', title: 'Restaurant Identity', category: 'Brand Identity' },
      { type: 'image', title: 'E-commerce Platform', category: 'UI/UX' },
      { type: 'video', title: 'Product Demo', category: 'Video Editing' }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Creator Info Section */}
          <Card className="gradient-card border-border/50 mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                {/* Profile Picture */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary">{creator.initials}</span>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="flex-grow text-center lg:text-left">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{creator.name}</h1>
                      <p className="text-xl text-primary font-medium mb-2">{creator.specialty}</p>
                      <div className="flex items-center justify-center lg:justify-start text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        {creator.location}
                      </div>
                      <div className="flex items-center justify-center lg:justify-start mb-4">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium mr-4">{creator.rating}</span>
                        <span className="text-sm text-muted-foreground">{creator.projects} projects</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center justify-center lg:justify-start">
                          <DollarSign className="h-4 w-4 mr-1" />
                          Rate
                        </h4>
                        <p className="text-primary font-medium">{creator.priceRange}</p>
                        <p className="text-xs text-muted-foreground">per project</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 flex items-center justify-center lg:justify-start">
                          <Calendar className="h-4 w-4 mr-1" />
                          Availability
                        </h4>
                        <p className="text-sm text-green-600">{creator.availability}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                        {creator.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Interests</h4>
                      <p className="text-sm text-muted-foreground">{creator.interests}</p>
                    </div>
                  </div>
                </div>

                {/* Upload Button */}
                <div className="flex-shrink-0">
                  <Link to="/upload">
                    <Button className="gradient-accent">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload File
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creator.portfolio.map((item, index) => (
                <Card key={index} className="gradient-card border-border/50 hover-lift group overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    {item.type === 'video' ? (
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                          <span className="text-2xl">▶</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Video Content</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                          <span className="text-2xl">🖼</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Image Content</p>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreatorProfile;
