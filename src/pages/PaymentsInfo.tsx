import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, DollarSign, Clock, Lock, Scale, RefreshCw, CreditCard, Banknote } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  { icon: DollarSign, title: '30% Upfront Guarantee', desc: 'Clients deposit 30% into escrow before work begins. Creators start with confidence — the money is already secured by Hovr.' },
  { icon: Clock, title: '70% on Completion', desc: 'The remaining 70% is released the moment the client approves the final delivery. No chasing invoices, no waiting weeks.' },
  { icon: Shield, title: 'Escrow Protection', desc: 'All funds sit in a regulated escrow account. Neither side can touch the money mid-project — it can only move based on agreed milestones.' },
  { icon: Scale, title: 'Fair Dispute Resolution', desc: 'If something goes wrong, a Hovr mediator reviews the brief, deliverables, and communication, then makes a binding decision within 72 hours.' },
  { icon: RefreshCw, title: 'Refund Policy', desc: 'If a creator fails to deliver, the client receives a full refund of the escrowed amount. Partial refunds are available for partial completion.' },
  { icon: CreditCard, title: 'Multiple Payment Methods', desc: 'Pay with UPI, net banking, debit/credit cards, or wallets. All transactions are processed through PCI-DSS compliant gateways.' },
  { icon: Banknote, title: 'Fast Creator Payouts', desc: 'Once released, funds reach the creator\'s bank account or UPI within 24 hours — no holdbacks, no surprise fees.' },
  { icon: Lock, title: 'Bank-Level Security', desc: '256-bit TLS encryption, tokenized card storage, and continuous fraud monitoring keep every transaction private and protected.' },
];

const PaymentsInfo = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Secure Payment System</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hovr's escrow-backed payment flow protects clients and creators on every project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {features.map((f) => (
            <Card key={f.title} className="bg-card/50 border-border/50 hover:border-foreground/30 transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/post-project">
            <Button size="lg">Post a Project</Button>
          </Link>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default PaymentsInfo;
