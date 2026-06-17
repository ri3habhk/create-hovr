import { Card, CardContent } from '@/components/ui/card';
import { Plus, Camera, Palette, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreatePortfolioSection = () => {
  return (
    <Link to="/start-creating" className="block group">
      <section className="py-16 bg-background transition-colors group-hover:bg-card/20 cursor-pointer">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card/30 border-border/50 transition-all group-hover:border-foreground/30 group-hover:shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3">Start Creating Today →</h3>
                    <p className="text-muted-foreground mb-4">
                      Join thousands of creators earning with their skills
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                  <ArrowRight className="h-8 w-8 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Link>
  );
};

export default CreatePortfolioSection;
