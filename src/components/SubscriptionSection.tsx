import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SubscriptionSection = () => {
  const navigate = useNavigate();

  const plans = {
    creators: [
      {
        name: "Creator Plan",
        price: "₹299",
        period: "/month",
        description: "Perfect for individual creators",
        features: [
          "Portfolio showcase",
          "Direct client messages",
          "Project bidding",
          "Analytics dashboard"
        ],
        popular: true,
        type: "creator"
      }
    ],
    clients: [
      {
        name: "Business Plan",
        price: "₹499",
        period: "/month",
        description: "For businesses and agencies",
        features: [
          "Unlimited project postings",
          "Advanced creator search",
          "Direct contact access",
          "Team collaboration"
        ],
        popular: true,
        type: "client"
      }
    ]
  };

  const handlePlanClick = (plan: any) => {
    // Navigate to payment gateway with plan details
    navigate('/payment', { 
      state: { 
        plan: plan.name,
        price: plan.price,
        type: plan.type,
        period: plan.period
      }
    });
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Choose Your 
            <span className="text-foreground"> Plan</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Unlock premium features for creators and clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Creator Plan */}
          {plans.creators.map((plan, index) => (
            <Card 
              key={index} 
              className="bg-card/50 border-border/50 relative cursor-pointer transition-all hover:shadow-lg hover:scale-105"
              onClick={() => handlePlanClick(plan)}
            >
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-foreground text-background">
                <Star className="h-3 w-3 mr-1" />
                For Creators
              </Badge>
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-xl text-foreground">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-foreground mr-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}

          {/* Client Plan */}
          {plans.clients.map((plan, index) => (
            <Card 
              key={index} 
              className="bg-card/50 border-border/50 relative cursor-pointer transition-all hover:shadow-lg hover:scale-105"
              onClick={() => handlePlanClick(plan)}
            >
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-foreground text-background">
                <Zap className="h-3 w-3 mr-1" />
                For Clients
              </Badge>
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-xl text-foreground">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-foreground mr-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* View More Plans Button */}
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            onClick={() => navigate('/subscription-plans')}
            className="border-border/50 text-foreground hover:bg-card"
          >
            View More Plans & Compare Features
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;