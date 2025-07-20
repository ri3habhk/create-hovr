import { Shield, DollarSign, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const PaymentSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Secure Payment System</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your payments are protected with our escrow system
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="bg-card/50 border-border/50 text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">30% Guaranteed</h3>
              <p className="text-sm text-muted-foreground">
                Upfront payment secured in escrow
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-border/50 text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">70% on Completion</h3>
              <p className="text-sm text-muted-foreground">
                Final payment released upon delivery
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-border/50 text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Escrow Protected</h3>
              <p className="text-sm text-muted-foreground">
                Bank-level security for all transactions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;