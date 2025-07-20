import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
              <p className="text-muted-foreground">Last updated: December 2024</p>
            </div>

            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-8 space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using Hovr ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">2. Platform Services</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Hovr provides a marketplace platform that connects clients with creative professionals ("Creators"). Our services include:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Project posting and creator discovery tools</li>
                    <li>Secure escrow payment system</li>
                    <li>AI-powered matching algorithms</li>
                    <li>Communication and collaboration tools</li>
                    <li>Dispute resolution services</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">3. Payment Terms</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    All transactions are processed through our secure escrow system:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>30% of project payment is held in escrow upon project acceptance</li>
                    <li>70% is released upon successful project completion</li>
                    <li>Platform fee of 10% applies to all transactions</li>
                    <li>Refunds are processed according to our refund policy</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">4. User Responsibilities</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">For Creators:</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                        <li>Provide accurate portfolio information</li>
                        <li>Deliver work as agreed upon</li>
                        <li>Maintain professional communication</li>
                        <li>Respect intellectual property rights</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">For Clients:</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                        <li>Provide clear project requirements</li>
                        <li>Make timely payments</li>
                        <li>Provide constructive feedback</li>
                        <li>Respect creator's intellectual property</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">5. Prohibited Activities</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Users are prohibited from:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Circumventing the platform's payment system</li>
                    <li>Posting false or misleading information</li>
                    <li>Harassment or inappropriate behavior</li>
                    <li>Violating intellectual property rights</li>
                    <li>Creating multiple accounts to manipulate the system</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Hovr acts as an intermediary platform and is not responsible for the quality of work delivered by creators or the behavior of users. Our liability is limited to the extent permitted by law.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    For questions about these Terms of Service, please contact us at legal@hovr.com or through our support system.
                  </p>
                </section>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;