import { Card, CardContent } from '@/components/ui/card';
import { Search, Users, CheckCircle } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Search,
      title: "Post Project",
      description: "Describe your project needs"
    },
    {
      icon: Users,
      title: "Get Matched",
      description: "AI finds perfect creators"
    },
    {
      icon: CheckCircle,
      title: "Deliver Results",
      description: "Secure payment on completion"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">How Hovr Works</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Simple, secure, and efficient project collaboration
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <Card className="bg-card/30 border-border/50 mb-4">
                <CardContent className="pt-6 pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm">{step.title}</h3>
                </CardContent>
              </Card>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;