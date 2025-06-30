
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown, Users, Folder, Search } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-primary">
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-purple-900/20" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Connect with Elite
            <span className="gradient-accent bg-clip-text text-transparent block">
              Marketing Creators
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover world-class creators — filmmakers, designers, editors, and more — all in one powerful platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="gradient-accent text-lg px-8 py-4 hover-lift">
              <Search className="h-5 w-5 mr-2" />
              Find Creators
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 hover-lift">
              <Folder className="h-5 w-5 mr-2" />
              Create
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="gradient-card border-border/50 hover-lift">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
                <p className="text-muted-foreground">Verified Creators</p>
              </CardContent>
            </Card>
            
            <Card className="gradient-card border-border/50 hover-lift">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                <p className="text-muted-foreground">Projects Completed</p>
              </CardContent>
            </Card>
            
            <Card className="gradient-card border-border/50 hover-lift">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">99%</div>
                <p className="text-muted-foreground">Client Satisfaction</p>
              </CardContent>
            </Card>
          </div>

          {/* Trust Banner */}
          <div className="mt-12">
            <Card className="gradient-card border-border/50 max-w-2xl mx-auto">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">
                  🔒 <strong>Your data is secure with us.</strong> We use bank-level encryption and never share your personal information. 
                  All payments are processed through secure, industry-standard payment gateways with full fraud protection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;
