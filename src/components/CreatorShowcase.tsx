
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Users, Folder, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const CreatorShowcase = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();
  const { ref: buttonRef, isVisible: buttonVisible } = useScrollAnimation();

  const creators = [
    {
      id: 1,
      name: "Sarah Chen",
      initials: "SC",
      specialty: "Brand Designer",
      rating: 4.9,
      projects: 127,
      location: "Mumbai, India",
      tags: ["Logo Design", "Brand Identity", "UI/UX"],
      priceRange: "₹5,000 - ₹25,000",
      premium: true
    },
    {
      id: 2,
      name: "Arjun Patel",
      initials: "AP",
      specialty: "Video Editor",
      rating: 4.8,
      projects: 89,
      location: "Delhi, India",
      tags: ["Motion Graphics", "Color Grading", "Social Media"],
      priceRange: "₹3,000 - ₹15,000",
      premium: false
    },
    {
      id: 3,
      name: "Priya Sharma",
      initials: "PS",
      specialty: "Filmmaker",
      rating: 5.0,
      projects: 45,
      location: "Bangalore, India",
      tags: ["Cinematography", "Documentary", "Commercial"],
      priceRange: "₹10,000 - ₹50,000",
      premium: true
    }
  ];

  return (
    <section id="creators" className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={titleRef as any}
          className={`text-center mb-16 scroll-animate ${titleVisible ? 'animate' : ''}`}
        >
          <h2 className="text-2xl font-bold mb-8">
            Top Creators
          </h2>
        </div>

        <div 
          ref={cardsRef as any}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8`}
        >
          {creators.map((creator, index) => (
            <Link to={`/creator/${creator.id}`} key={index}>
              <Card 
                className={`gradient-card border-border/50 hover-lift group overflow-hidden scroll-animate cursor-pointer transition-all duration-300 hover:border-primary/50 p-4 ${cardsVisible ? 'animate' : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-primary">{creator.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg truncate">{creator.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{creator.specialty}</p>
                  </div>
                  {creator.premium && (
                    <Badge className="gradient-accent text-xs">Pro</Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                    <span>{creator.rating}</span>
                  </div>
                  <span>{creator.projects} projects</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {creator.tags.slice(0, 2).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs px-2 py-0">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{creator.priceRange}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/creators">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              View All →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CreatorShowcase;
