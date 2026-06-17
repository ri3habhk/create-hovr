import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Palette, Upload, Star, MessageSquare, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  { icon: Upload, title: 'Upload Your Best Work', desc: 'Share 6–12 pieces that show your range. High-resolution images, video reels, and case studies all work.' },
  { icon: Palette, title: 'Define Your Niche', desc: 'Pick a primary and secondary occupation so clients can find you for the work you actually want to do.' },
  { icon: Star, title: 'Set Honest Pricing', desc: 'Give a budget range in INR. Clients filter by budget, so realistic numbers mean better-fit briefs.' },
  { icon: MessageSquare, title: 'Reply Fast to Briefs', desc: 'Most projects on Hovr close within 48 hours. Quick, specific responses double your hire rate.' },
  { icon: Camera, title: 'Keep Your Portfolio Fresh', desc: 'Add new work monthly. Active portfolios get priority placement in client searches.' },
  { icon: TrendingUp, title: 'Earn Reviews & Grow', desc: 'Every completed project earns a star rating. Five-star creators unlock the Verified badge and lower platform fees.' },
];

const StartCreating = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Start Creating Today</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Build a portfolio that earns. Here's everything you need to launch on Hovr.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {steps.map((s, i) => (
            <Card key={s.title} className="bg-card/50 border-border/50 hover:border-foreground/30 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Step {i + 1}</div>
                    <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/auth">
            <Button size="lg">Create Your Portfolio</Button>
          </Link>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default StartCreating;
