
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Users, Chat, Wallet } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Post Your Project",
      description: "Describe your project needs and our AI will automatically match you with the perfect creators for your requirements.",
      color: "text-blue-400"
    },
    {
      icon: Users,
      title: "Review Matched Creators",
      description: "Browse curated profiles, portfolios, and reviews from creators that perfectly match your project specifications.",
      color: "text-green-400"
    },
    {
      icon: Chat,
      title: "Collaborate & Create",
      description: "Chat directly with creators, share files securely, and collaborate in real-time to bring your vision to life.",
      color: "text-purple-400"
    },
    {
      icon: Wallet,
      title: "Secure Payment",
      description: "Pay securely through our escrow system. Creators receive 30% upfront, 70% upon project completion and your approval.",
      color: "text-orange-400"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 gradient-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            How CreativeHub
            <span className="gradient-accent bg-clip-text text-transparent"> Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From project posting to final delivery, we've streamlined the entire process 
            to ensure quality results and complete transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="gradient-card border-border/50 hover-lift group">
              <CardHeader className="text-center pb-4">
                <div className={`inline-flex p-4 rounded-full bg-background/10 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className={`h-8 w-8 ${step.color}`} />
                </div>
                <div className="text-sm font-medium text-primary mb-2">Step {index + 1}</div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust & Security */}
        <div className="mt-16 text-center">
          <Card className="gradient-card border-border/50 max-w-3xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Complete Transparency & Security</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Payment Protection</h4>
                  <p className="text-muted-foreground text-sm">
                    • 30% released upon project acceptance<br/>
                    • 70% released upon client approval<br/>
                    • 5% platform fee (non-negotiable)
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Quality Assurance</h4>
                  <p className="text-muted-foreground text-sm">
                    • Verified creator profiles<br/>
                    • Portfolio validation<br/>
                    • Client review system
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
