import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Subscription = () => {
  const plans = {
    creators: [
      {
        name: "Starter",
        price: "Free",
        period: "",
        description: "Perfect for new creators",
        features: [
          "Basic portfolio",
          "Up to 3 projects/month",
          "Standard support",
          "Basic analytics"
        ],
        popular: false
      },
      {
        name: "Professional",
        price: "₹999",
        period: "/month",
        description: "For established creators",
        features: [
          "Premium portfolio",
          "Unlimited projects",
          "Priority support",
          "Advanced analytics",
          "Featured listing",
          "Custom branding"
        ],
        popular: true
      },
      {
        name: "Enterprise",
        price: "₹2,999",
        period: "/month",
        description: "For creative agencies",
        features: [
          "Team management",
          "Multiple portfolios",
          "White-label solutions",
          "Dedicated account manager",
          "Custom integrations",
          "Advanced reporting"
        ],
        popular: false
      }
    ],
    clients: [
      {
        name: "Basic",
        price: "Free",
        period: "",
        description: "For small projects",
        features: [
          "Post up to 2 projects/month",
          "Basic creator search",
          "Standard support",
          "Escrow protection"
        ],
        popular: false
      },
      {
        name: "Business",
        price: "₹1,499",
        period: "/month",
        description: "For growing businesses",
        features: [
          "Unlimited projects",
          "AI-powered matching",
          "Priority support",
          "Advanced search filters",
          "Project templates",
          "Team collaboration"
        ],
        popular: true
      },
      {
        name: "Enterprise",
        price: "₹4,999",
        period: "/month",
        description: "For large organizations",
        features: [
          "Custom workflows",
          "Dedicated account manager",
          "White-label platform",
          "Advanced analytics",
          "Custom integrations",
          "SLA guarantee"
        ],
        popular: false
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">
              Choose Your
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"> Plan</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Flexible pricing for creators and clients
            </p>
          </div>

          {/* Creator Plans */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">For Creators</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.creators.map((plan, index) => (
                <Card key={index} className={`bg-card/50 border-border/50 relative ${plan.popular ? 'ring-2 ring-primary/50' : ''}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {plan.price === "Free" ? "Get Started" : "Subscribe"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Client Plans */}
          <div>
            <h2 className="text-2xl font-bold text-center mb-8">For Clients</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.clients.map((plan, index) => (
                <Card key={index} className={`bg-card/50 border-border/50 relative ${plan.popular ? 'ring-2 ring-primary/50' : ''}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                      <Zap className="h-3 w-3 mr-1" />
                      Recommended
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {plan.price === "Free" ? "Get Started" : "Subscribe"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Subscription;