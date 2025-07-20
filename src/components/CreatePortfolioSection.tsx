import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Camera, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreatePortfolioSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/30 border-border/50">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">Start Creating Today</h3>
                  <p className="text-muted-foreground mb-4">
                    Join thousands of creators earning with their skills
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <Camera className="h-4 w-4" />
                      Upload work
                    </div>
                    <div className="flex items-center gap-1">
                      <Palette className="h-4 w-4" />
                      Showcase skills
                    </div>
                    <div className="flex items-center gap-1">
                      <Plus className="h-4 w-4" />
                      Get hired
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Link to="/auth">
                    <Button variant="outline" className="border-border/50 hover:bg-card/50">
                      Create Portfolio
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CreatePortfolioSection;