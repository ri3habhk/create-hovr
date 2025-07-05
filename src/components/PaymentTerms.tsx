
import { Card, CardContent } from '@/components/ui/card';
import { Shield, CheckCircle, FileText } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const PaymentTerms = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: cardRef, isVisible: cardVisible } = useScrollAnimation();
  const { ref: termsRef, isVisible: termsVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-gradient-to-br from-background to-background/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={titleRef as any}
          className={`text-center mb-16 scroll-animate ${titleVisible ? 'animate' : ''}`}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Secure Payment
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Structure</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We ensure fair and secure payments for all creators on our platform
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card 
            ref={cardRef as any}
            className={`bg-gradient-to-br from-card to-card/80 border-border/50 hover-lift mb-8 scroll-animate-scale ${cardVisible ? 'animate' : ''}`}
          >
            <CardContent className="p-12 text-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                  <Shield className="h-16 w-16 text-green-500 mx-auto" />
                  <div className="text-6xl md:text-7xl font-black text-green-500">30%</div>
                  <h3 className="text-2xl font-bold">GUARANTEED UPFRONT</h3>
                  <p className="text-muted-foreground">
                    Receive 30% of your payment immediately upon project acceptance and contract signing
                  </p>
                </div>
                
                <div className="space-y-4">
                  <CheckCircle className="h-16 w-16 text-blue-500 mx-auto" />
                  <div className="text-6xl md:text-7xl font-black text-blue-500">70%</div>
                  <h3 className="text-2xl font-bold">ON COMPLETION</h3>
                  <p className="text-muted-foreground">
                    Receive the remaining 70% upon successful project delivery and client approval
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          <Card 
            ref={termsRef as any}
            className={`bg-gradient-to-br from-card to-card/80 border-border/50 scroll-animate ${termsVisible ? 'animate' : ''}`}
          >
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <FileText className="h-6 w-6 text-muted-foreground flex-shrink-0 mt-1" />
                <div className="text-sm text-muted-foreground leading-relaxed">
                  <p className="mb-3">
                    <strong>Terms and conditions apply.</strong> All creators must sign a comprehensive contract template provided by Hovr and agreed upon by the client before project commencement. This contract ensures:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Mandatory project completion regardless of circumstances</li>
                    <li>Strict adherence to agreed deadlines with no delays permitted</li>
                    <li>Quality standards as specified in the project brief</li>
                    <li>Professional conduct throughout the project duration</li>
                    <li>Proper communication and progress updates</li>
                  </ul>
                  <p className="mt-3">
                    Failure to meet contractual obligations may result in forfeiture of payments, account suspension, and potential legal action. By accepting a project, creators agree to these binding terms.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PaymentTerms;
