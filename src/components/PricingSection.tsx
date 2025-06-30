
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Users } from 'lucide-react';

const PricingSection = () => {
  const creatorPlans = [
    {
      name: "Free Creator",
      price: "₹0",
      period: "/month",
      description: "Get started with basic access",
      features: [
        "Basic profile creation",
        "Apply to public projects",
        "Standard project visibility",
        "Basic messaging",
        "5% platform fee applies"
      ],
      icon: Users,
      popular: false
    },
    {
      name: "Premium Creator",
      price: "₹299",
      period: "/month",
      description: "Enhanced visibility and priority access",
      features: [
        "Priority project matching",
        "Featured profile placement",
        "Advanced analytics dashboard",
        "Unlimited portfolio uploads",
        "Premium creator badge",
        "5% platform fee applies"
      ],
      icon: Star,
      popular: true
    }
  ];

  const clientPlans = [
    {
      name: "Basic Client",
      price: "₹0",
      period: "/month",
      description: "Perfect for occasional projects",
      features: [
        "Post unlimited projects",
        "Access to all creators",
        "Basic matching algorithm",
        "Standard messaging",
        "5% platform fee applies"
      ],
      icon: Users,
      popular: false
    },
    {
      name: "Premium Client",
      price: "₹1,999",
      period: "/month",
      description: "Access to elite creators and premium features",
      features: [
        "Access to premium creators only",
        "Advanced AI matching",
        "Priority project placement",
        "Dedicated account manager",
        "Premium support",
        "5% platform fee applies"
      ],
      icon: Crown,
      popular: true
    }
  ];

  const PlanCard = ({ plan, type }: { plan: any, type: 'creator' | 'client' }) => (
    <Card className={`gradient-card border-border/50 hover-lift relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
      {plan.popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 gradient-accent">
          Most Popular
        </Badge>
      )}
      <CardHeader className="text-center pb-4">
        <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4 mx-auto">
          <plan.icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <div className="text-3xl font-bold">
          {plan.price}
          <span className="text-sm font-normal text-muted-foreground">{plan.period}</span>
        </div>
        <p className="text-muted-foreground">{plan.description}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <Button 
          className={`w-full mb-6 ${plan.popular ? 'gradient-accent' : ''}`}
          variant={plan.popular ? 'default' : 'outline'}
        >
          {plan.price === "₹0" ? 'Get Started Free' : 'Start Premium'}
        </Button>
        <ul className="space-y-3">
          {plan.features.map((feature: string, index: number) => (
            <li key={index} className="flex items-start">
              <Check className="h-4 w-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  return (
    <section id="pricing" className="py-20 gradient-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Choose Your
            <span className="gradient-accent bg-clip-text text-transparent"> Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing for creators and clients with no hidden fees
          </p>
        </div>

        {/* Creator Plans */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-primary">For Creators</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {creatorPlans.map((plan, index) => (
              <PlanCard key={index} plan={plan} type="creator" />
            ))}
          </div>
        </div>

        {/* Client Plans */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-primary">For Clients</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {clientPlans.map((plan, index) => (
              <PlanCard key={index} plan={plan} type="client" />
            ))}
          </div>
        </div>

        {/* Payment Terms */}
        <Card className="gradient-card border-border/50 max-w-4xl mx-auto">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center mb-6">Payment Terms & Transparency</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-primary mb-4">Creator Payment Structure</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-400 mr-2" />
                    30% payment upon project acceptance
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-400 mr-2" />
                    70% payment upon client approval
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-400 mr-2" />
                    Guaranteed payment protection
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-4">Platform Terms</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-400 mr-2" />
                    5% platform fee on all transactions
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-400 mr-2" />
                    Non-negotiable service fee
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-400 mr-2" />
                    Secure escrow payment system
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-background/20 rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                * All fees are clearly disclosed upfront. The 5% platform fee covers secure payment processing, 
                dispute resolution, and platform maintenance. No hidden charges ever.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PricingSection;
