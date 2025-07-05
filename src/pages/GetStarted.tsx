
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Zap, Shield, Star, ArrowRight, Play } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const GetStarted = () => {
  const steps = [
    {
      number: 1,
      title: "Sign Up & Create Profile",
      description: "Join our community of creators and clients. Set up your profile in under 2 minutes.",
      icon: <Users className="h-8 w-8" />
    },
    {
      number: 2,
      title: "Post Project or Browse Creators",
      description: "Clients post projects with AI-powered matching. Creators showcase their best work.",
      icon: <Zap className="h-8 w-8" />
    },
    {
      number: 3,
      title: "Connect & Collaborate",
      description: "Get matched instantly. Secure payments. Track progress. Deliver amazing results.",
      icon: <CheckCircle className="h-8 w-8" />
    }
  ];

  const benefits = [
    "AI-powered creator matching",
    "Secure payment protection",
    "24/7 customer support",
    "Portfolio showcase tools",
    "Project management dashboard",
    "Performance analytics"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background to-background/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <Badge className="gradient-accent mb-4">Get Started Today</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Your Journey to
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
                  Creative Success
                </span>
                Starts Here
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of creators and clients who've found their perfect match on Hovr. 
                Start creating, connecting, and earning in just 3 simple steps.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth">
                  <Button size="lg" className="gradient-accent text-lg px-8 py-4">
                    <Play className="h-5 w-5 mr-2" />
                    Join Free Now
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                  <Users className="h-5 w-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-20">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
                <p className="text-muted-foreground">Active Creators</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                <p className="text-muted-foreground">Projects Completed</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">4.9★</div>
                <p className="text-muted-foreground">Average Rating</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">99%</div>
                <p className="text-muted-foreground">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-background/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                How Hovr
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Works</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Getting started is simple. Here's how you can begin your creative journey today.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {steps.map((step, index) => (
                <Card key={index} className="gradient-card border-border/50 hover-lift text-center">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mx-auto mb-4 flex items-center justify-center text-primary">
                      {step.icon}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                      {step.number}
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Choose
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Hovr?</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We've built the most advanced platform for creative collaboration. 
                  Here's what makes us different from the rest.
                </p>
                <div className="grid grid-cols-1 gap-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                <Link to="/auth">
                  <Button size="lg" className="gradient-accent">
                    Start Your Journey
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <Card className="gradient-card border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Shield className="h-6 w-6 text-primary mr-2" />
                      <h3 className="font-semibold">Secure & Protected</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your payments are secured with bank-level encryption. We hold funds in escrow until project completion.
                    </p>
                  </CardContent>
                </Card>
                <Card className="gradient-card border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Star className="h-6 w-6 text-primary mr-2" />
                      <h3 className="font-semibold">Quality Guaranteed</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      All creators are verified and rated. Get unlimited revisions until you're 100% satisfied.
                    </p>
                  </CardContent>
                </Card>
                <Card className="gradient-card border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Zap className="h-6 w-6 text-primary mr-2" />
                      <h3 className="font-semibold">Lightning Fast</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      AI-powered matching connects you with the perfect creator in seconds, not days.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Creative Projects?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our community today and experience the future of creative collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="gradient-accent text-lg px-8 py-4">
                  Sign Up Free - No Credit Card Required
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              🎉 Special Launch Offer: Get 30 days premium features free for early users!
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GetStarted;
