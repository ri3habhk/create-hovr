import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles, MessageSquare, CheckCircle, CreditCard, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const steps = [
  { icon: FileText, title: '1. Post a Brief', desc: 'Describe your project — goals, deliverables, budget in INR, and timeline. Takes under 2 minutes.' },
  { icon: Sparkles, title: '2. AI Matches Creators', desc: 'Our matching engine ranks creators by skills, past work, ratings, and availability — surfacing the top 5 for your brief.' },
  { icon: MessageSquare, title: '3. Chat Directly', desc: 'Message shortlisted creators in-app. Share references, ask questions, agree on scope.' },
  { icon: CreditCard, title: '4. Fund Escrow (30%)', desc: 'Once you pick a creator, 30% of the budget moves into Hovr escrow. Work officially begins.' },
  { icon: CheckCircle, title: '5. Review & Approve', desc: 'Creator delivers in milestones. You review, request revisions, and approve when satisfied.' },
  { icon: Star, title: '6. Release Final 70% & Rate', desc: 'Approval releases the remaining 70% to the creator within 24 hours. Both sides leave a star rating.' },
];

const Step = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref as any}
      className={`scroll-animate ${isVisible ? 'animate' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <Card className="bg-card/50 border-border/50 hover:border-foreground/30 transition-all">
        <CardContent className="p-6 flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <step.icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const HowItWorksPage = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How Hovr Works</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Six steps from brief to delivery — designed to be fast, fair, and fully protected.
          </p>
        </div>

        <div className="space-y-4 mb-16">
          {steps.map((s, i) => (
            <Step key={s.title} step={s} index={i} />
          ))}
        </div>

        <div className="text-center flex flex-wrap gap-3 justify-center">
          <Link to="/post-project"><Button size="lg">Post a Project</Button></Link>
          <Link to="/creators"><Button size="lg" variant="outline">Browse Creators</Button></Link>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default HowItWorksPage;
