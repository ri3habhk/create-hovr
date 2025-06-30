
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Users, Folder, Search } from 'lucide-react';

const CreatorShowcase = () => {
  const creators = [
    {
      name: "Sarah Chen",
      specialty: "Brand Designer",
      rating: 4.9,
      projects: 127,
      location: "Mumbai, India",
      tags: ["Logo Design", "Brand Identity", "UI/UX"],
      priceRange: "₹5,000 - ₹25,000",
      premium: true,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Arjun Patel",
      specialty: "Video Editor",
      rating: 4.8,
      projects: 89,
      location: "Delhi, India",
      tags: ["Motion Graphics", "Color Grading", "Social Media"],
      priceRange: "₹3,000 - ₹15,000",
      premium: false,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Priya Sharma",
      specialty: "Filmmaker",
      rating: 5.0,
      projects: 45,
      location: "Bangalore, India",
      tags: ["Cinematography", "Documentary", "Commercial"],
      priceRange: "₹10,000 - ₹50,000",
      premium: true,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    }
  ];

  return (
    <section id="creators" className="py-20 bg-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Meet Our Top
            <span className="gradient-accent bg-clip-text text-transparent"> Creators</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover talented professionals ready to bring your marketing vision to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {creators.map((creator, index) => (
            <Card key={index} className="gradient-card border-border/50 hover-lift group overflow-hidden">
              <CardHeader className="pb-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mx-auto mb-4 overflow-hidden">
                    <img 
                      src={creator.image} 
                      alt={creator.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {creator.premium && (
                    <Badge className="absolute -top-2 -right-2 gradient-accent">
                      Premium
                    </Badge>
                  )}
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-lg">{creator.name}</h3>
                  <p className="text-primary font-medium">{creator.specialty}</p>
                  <p className="text-sm text-muted-foreground">{creator.location}</p>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium">{creator.rating}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Folder className="h-4 w-4 mr-1" />
                    {creator.projects} projects
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {creator.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="text-center mb-4">
                  <p className="text-sm font-medium text-primary">{creator.priceRange}</p>
                  <p className="text-xs text-muted-foreground">per project</p>
                </div>

                <Button className="w-full group-hover:gradient-accent transition-all duration-300">
                  <Users className="h-4 w-4 mr-2" />
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="hover-lift">
            <Search className="h-5 w-5 mr-2" />
            Browse All Creators
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CreatorShowcase;
