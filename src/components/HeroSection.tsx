import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown, Users, Folder, Search, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/95">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
          <p className="text-muted-foreground/80 mb-8 text-lg">
            Connect with world-class creators
          </p>
          
          <Link to="/creators">
            <Button 
              size="lg" 
              className="bg-foreground text-background hover:bg-foreground/90 text-2xl px-16 py-8 font-bold tracking-tight transition-all duration-300 hover:scale-105"
            >
              Find Creators
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
