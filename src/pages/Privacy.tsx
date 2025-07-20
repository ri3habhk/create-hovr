import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-muted-foreground">Last updated: December 2024</p>
            </div>

            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-8 space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Personal Information:</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                        <li>Name, email address, and contact information</li>
                        <li>Profile information and portfolio content</li>
                        <li>Payment and billing information</li>
                        <li>Communication records and messages</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Usage Information:</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                        <li>Device information and IP address</li>
                        <li>Browser type and version</li>
                        <li>Pages visited and time spent on platform</li>
                        <li>Search queries and interactions</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We use collected information to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Provide and improve our platform services</li>
                    <li>Process payments and transactions</li>
                    <li>Match clients with suitable creators using AI algorithms</li>
                    <li>Communicate important updates and notifications</li>
                    <li>Prevent fraud and ensure platform security</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We do not sell your personal information. We may share information in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>With other users as necessary for project collaboration</li>
                    <li>With payment processors for transaction processing</li>
                    <li>With service providers who assist in platform operations</li>
                    <li>When required by law or to protect our rights</li>
                    <li>In case of business transfer or merger</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We implement industry-standard security measures to protect your information:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security audits and assessments</li>
                    <li>Access controls and authentication measures</li>
                    <li>Secure payment processing through certified providers</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Access and update your personal information</li>
                    <li>Delete your account and associated data</li>
                    <li>Object to certain data processing activities</li>
                    <li>Request data portability</li>
                    <li>Withdraw consent where applicable</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can manage cookie preferences through your browser settings.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">7. International Data Transfers</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your privacy rights.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">8. Changes to This Policy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any material changes through the platform or via email.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    For questions about this Privacy Policy or to exercise your rights, contact us at privacy@hovr.com or through our support system.
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

export default Privacy;