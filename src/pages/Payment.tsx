import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Smartphone, Building, ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('card');
  
  const planData = location.state || {};

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, RuPay'
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: Smartphone,
      description: 'Google Pay, PhonePe, Paytm'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: Building,
      description: 'All major banks supported'
    }
  ];

  const handlePayment = () => {
    // Simulate payment processing
    alert(`Processing payment of ${planData.price} via ${paymentMethods.find(m => m.id === selectedMethod)?.name}`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="mb-6 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4 text-foreground">Complete Payment</h1>
              <p className="text-muted-foreground">Choose your preferred payment method</p>
            </div>

            {/* Plan Summary */}
            <Card className="bg-card/50 border-border/50 mb-8">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Plan Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-foreground">{planData.plan}</h3>
                    <p className="text-sm text-muted-foreground">
                      {planData.type === 'creator' ? 'Creator Plan' : 'Client Plan'}
                    </p>
                  </div>
                  <Badge className="bg-foreground text-background">
                    {planData.price}{planData.period}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="bg-card/50 border-border/50 mb-8">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedMethod === method.id
                        ? 'border-foreground bg-card'
                        : 'border-border/50 hover:border-border'
                    }`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <method.icon className="h-5 w-5 text-foreground" />
                      <div>
                        <h4 className="font-medium text-foreground">{method.name}</h4>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Payment Button */}
            <Card className="bg-card/50 border-border/50">
              <CardContent className="pt-6">
                <Button 
                  onClick={handlePayment}
                  className="w-full bg-foreground text-background hover:bg-foreground/90"
                  size="lg"
                >
                  Pay {planData.price} Now
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Your payment is secure and encrypted. You can cancel anytime.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;