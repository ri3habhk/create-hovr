
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Users, Shield, FileText, AlertTriangle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Pricing = () => {
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
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="py-20 bg-gradient-to-br from-background to-background/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Transparent
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Pricing</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose the perfect plan for your needs. No hidden fees, no surprises.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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

            {/* Platform Fee Section */}
            <div className="mb-16">
              <Card className="bg-gradient-to-r from-card to-card/80 border-border/50 max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-center text-2xl">Platform Fee Structure</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
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

            {/* Terms and Conditions */}
            <div className="max-w-6xl mx-auto">
              <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <FileText className="h-6 w-6 mr-2" />
                    Terms and Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6 text-sm">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                      Payment Terms
                    </h3>
                    <ul className="list-disc list-inside space-y-1 ml-6 text-muted-foreground">
                      <li>All creators receive 30% payment upfront upon project acceptance and contract signing</li>
                      <li>Remaining 70% is released upon successful project delivery and client approval</li>
                      <li>Platform fee of 10% applies to all completed transactions</li>
                      <li>Refunds are processed according to our refund policy</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Creator Obligations</h3>
                    <ul className="list-disc list-inside space-y-1 ml-6 text-muted-foreground">
                      <li>Mandatory project completion regardless of circumstances</li>
                      <li>Strict adherence to agreed deadlines with no delays permitted</li>
                      <li>Quality standards as specified in the project brief must be met</li>
                      <li>Professional conduct throughout the project duration</li>
                      <li>Regular communication and progress updates required</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Client Responsibilities</h3>
                    <ul className="list-disc list-inside space-y-1 ml-6 text-muted-foreground">
                      <li>Provide clear project requirements and specifications</li>
                      <li>Respond to creator communications within 48 hours</li>
                      <li>Release payments according to agreed milestones</li>
                      <li>Provide constructive feedback for revisions</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Legal Requirements</h3>
                    <ul className="list-disc list-inside space-y-1 ml-6 text-muted-foreground">
                      <li>All users must be 18 years or older to use the platform</li>
                      <li>Valid identification required for payment processing</li>
                      <li>Tax compliance is the responsibility of individual users</li>
                      <li>Intellectual property rights must be respected</li>
                      <li>Platform disputes are subject to Indian jurisdiction</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Consequences of Non-Compliance</h3>
                    <ul className="list-disc list-inside space-y-1 ml-6 text-muted-foreground">
                      <li>Failure to meet contractual obligations may result in forfeiture of payments</li>
                      <li>Account suspension or termination for repeated violations</li>
                      <li>Potential legal action for breach of contract</li>
                      <li>Negative impact on platform ratings and future opportunities</li>
                    </ul>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground">
                      By using Hovr, you agree to these terms and conditions. These terms are subject to change with notice. 
                      Last updated: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
