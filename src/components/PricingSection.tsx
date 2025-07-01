
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Users, Shield } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: "Creator Basic",
      price: "Free",
      description: "Perfect for new creators getting started",
      features: [
        "Create portfolio profile",
        "Apply to 5 projects per month",
        "Basic messaging with clients",
        "Standard payment processing",
        "Community support"
      ],
      popular: false,
      cta: "Start Creating"
    },
    {
      name: "Creator Pro",
      price: "₹299/month",
      description: "For established creators who want more opportunities",
      features: [
        "Everything in Basic",
        "Unlimited project applications",
        "Priority project matching",
        "Advanced portfolio features",
        "Priority customer support",
        "Analytics dashboard",
        "Featured profile listing",
        "Custom portfolio themes",
        "Direct client contact info",
        "Revenue tracking tools",
        "Exclusive high-paying projects",
        "Personal brand verification badge"
      ],
      popular: true,
      cta: "Go Pro"
    },
    {
      name: "Client Starter",
      price: "Free",
      description: "For clients posting their first projects",
      features: [
        "Post up to 3 projects",
        "Browse creator profiles",
        "Basic project management",
        "Standard support",
        "Secure payments"
      ],
      popular: false,
      cta: "Post Project"
    },
    {
      name: "Client Business",
      price: "₹999/month",
      description: "For businesses with ongoing creative needs",
      features: [
        "Unlimited projects",
        "Premium creator matching",
        "Dedicated account manager",
        "Team collaboration tools",
        "Priority support",
        "Custom contracts",
        "Bulk project discounts",
        "Advanced project templates",
        "Multi-user team access",
        "White-label solutions",
        "API access for integrations",
        "Custom workflow automation",
        "Priority creator recommendations"
      ],
      popular: false,
      cta: "Start Business"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Choose Your
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're a creator or client, we have the perfect plan for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative bg-gradient-to-br from-card to-card/80 border-border/50 hover-lift ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-primary mb-2">{plan.price}</div>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className={`w-full ${plan.popular ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white' : ''}`}>
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Platform Fee Transparency */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-card to-card/80 border-border/50 max-w-3xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Transparent Platform Fee</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary mr-3" />
                  <div>
                    <p className="font-semibold">10% Platform Fee</p>
                    <p className="text-sm text-muted-foreground">On completed projects only</p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary mr-3" />
                  <div>
                    <p className="font-semibold">No Hidden Costs</p>
                    <p className="text-sm text-muted-foreground">What you see is what you pay</p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Star className="h-8 w-8 text-primary mr-3" />
                  <div>
                    <p className="font-semibold">Premium Features</p>
                    <p className="text-sm text-muted-foreground">AI matching & secure payments</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
