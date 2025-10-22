
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Upload, Calendar, DollarSign, Mail, Phone } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import ChatDialog from '@/components/ChatDialog';

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
          {/* Creator Info Section - Horizontal Layout */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                <span className="text-3xl font-bold text-primary">{creator.initials}</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{creator.name}</h1>
                <p className="text-xl text-muted-foreground mb-2">{creator.specialty}</p>
                <p className="text-muted-foreground/60 mb-2">{creator.location}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium">{creator.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{creator.projects} projects</span>
                </div>
                <p className="text-xl font-bold mt-2">{creator.priceRange}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <ChatDialog creatorName={creator.name} />
              <Link to="/upload">
                <Button size="lg" variant="outline">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload File
                </Button>
              </Link>
            </div>
          </div>

          {/* About Section */}
          <Card className="gradient-card border-border/50 mb-12">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">About</h3>
              <p className="text-muted-foreground mb-4">
                I'm passionate about creating visual stories that connect with audiences on an emotional level. 
                My approach combines technical excellence with creative intuition, always pushing boundaries to deliver 
                work that stands out in today's competitive landscape.
              </p>
              <div className="flex flex-wrap gap-2">
                {creator.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Portfolio</h2>
            <div className="grid grid-cols-3 gap-4">
              {creator.portfolio.map((item, index) => (
                <Card key={index} className="gradient-card border-border/50 hover-lift group overflow-hidden cursor-pointer">
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    {item.type === 'video' ? (
                      <span className="text-3xl">▶</span>
                    ) : (
                      <span className="text-3xl">🖼</span>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-semibold text-sm truncate">{item.title}</h3>
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
