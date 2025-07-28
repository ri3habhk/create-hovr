import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const SubscriptionPlans = () => {
  const navigate = useNavigate();

  const handlePlanClick = (plan: any) => {
    navigate('/payment', { state: { plan } });
  };

  const plans = [
    {
      name: "Free Plan",
      price: "₹0",
      period: "Forever",
      type: "free",
      features: [
        "Basic portfolio (3 projects)",
        "Limited profile visibility",
        "Basic messaging",
        "Community support only"
      ],
      limitations: [
        "No priority in search results",
        "No analytics dashboard",
        "Limited project applications (5/month)",
        "No direct client contact info"
      ],
      description: "Get started with basic features"
    },
    {
      name: "Creator Pro",
      price: "₹299",
      period: "/month",
      type: "creator",
      popular: true,
      features: [
        "Unlimited portfolio projects",
        "Priority in search results",
        "Advanced analytics dashboard",
        "Unlimited project applications",
        "Direct client messaging",
        "Profile verification badge",
        "24/7 priority support"
      ],
      limitations: [],
      description: "Perfect for serious creators"
    },
    {
      name: "Business Plan",
      price: "₹499",
      period: "/month",
      type: "client",
      features: [
        "Unlimited project postings",
        "Advanced creator search & filters",
        "Direct contact with creators",
        "Project management tools",
        "Team collaboration features",
        "24/7 priority support",
        "Custom branding options"
      ],
      limitations: [],
      description: "For businesses and agencies"
    }
  ];

  const comparisonFeatures = [
    { feature: "Portfolio Projects", free: "3", creator: "Unlimited", business: "N/A" },
    { feature: "Search Priority", free: "Low", creator: "High", business: "High" },
    { feature: "Analytics", free: "No", creator: "Yes", business: "Yes" },
    { feature: "Support", free: "Community", creator: "Priority", business: "Priority" },
    { feature: "Direct Messaging", free: "Basic", creator: "Advanced", business: "Advanced" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-6 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Choose Your Perfect Plan
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Compare all available plans and find the one that fits your needs
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative cursor-pointer transition-all duration-300 hover:scale-105 ${
                  plan.popular 
                    ? 'border-foreground shadow-lg' 
                    : plan.type === 'free'
                      ? 'bg-card/30 border-border/30 cursor-not-allowed'
                      : 'bg-card/50 border-border/50 hover:border-border'
                }`}
                onClick={() => plan.type !== 'free' && handlePlanClick(plan)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-foreground text-background">Most Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl text-foreground">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Features Included:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center text-sm">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.limitations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, lIndex) => (
                          <li key={lIndex} className="flex items-center text-sm">
                            <X className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Minimal Comparison Table */}
          <div className="bg-card/50 border border-border/50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 text-center">
              Quick Comparison
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-4 text-foreground font-semibold">Feature</th>
                    <th className="text-center py-3 px-4 text-foreground font-semibold">Free</th>
                    <th className="text-center py-3 px-4 text-foreground font-semibold">Creator Pro</th>
                    <th className="text-center py-3 px-4 text-foreground font-semibold">Business</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, index) => (
                    <tr key={index} className="border-b border-border/20">
                      <td className="py-3 px-4 text-muted-foreground">{row.feature}</td>
                      <td className="py-3 px-4 text-center text-muted-foreground">{row.free}</td>
                      <td className="py-3 px-4 text-center text-muted-foreground">{row.creator}</td>
                      <td className="py-3 px-4 text-center text-muted-foreground">{row.business}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SubscriptionPlans;