
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MessageCircle, Mail, Phone, Clock, Send } from 'lucide-react';

const HelpSection = () => {
  const faqs = [
    {
      question: "How does the payment system work?",
      answer: "We use a secure escrow system. Clients pay upfront, 30% is released to creators when they accept the project, and the remaining 70% is released upon project completion and client approval. Our 10% platform fee covers payment processing, dispute resolution, and platform maintenance."
    },
    {
      question: "How are creators verified?",
      answer: "All creators go through a thorough verification process including portfolio review, skill assessment, and identity verification. We validate their previous work and ensure they meet our quality standards before they can start accepting projects."
    },
    {
      question: "What if I'm not satisfied with the work?",
      answer: "We have a comprehensive dispute resolution system. If you're not satisfied, you can request revisions or escalate to our mediation team. We'll work with both parties to find a fair solution. In extreme cases, we offer partial or full refunds."
    },
    {
      question: "How long does it take to find a creator?",
      answer: "Our AI matching system typically finds suitable creators within 24-48 hours of posting your project. You'll receive 3-5 curated profiles that match your specific requirements, budget, and timeline."
    },
    {
      question: "Can I communicate directly with creators?",
      answer: "Yes! Once you select a creator, you can communicate directly through our secure messaging system. You can share files, provide feedback, and track project progress all within the platform."
    },
    {
      question: "What types of projects can I post?",
      answer: "We support all types of marketing creative projects including video production, graphic design, social media content, brand identity, web design, photography, copywriting, and more. If it's creative marketing work, we can help!"
    }
  ];

  return (
    <section id="help" className="py-20 bg-gradient-to-br from-background to-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Get Help &
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Support</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're here to help you succeed. Find answers to common questions or reach out to our support team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* FAQ Section */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl">Contact Support</CardTitle>
                <p className="text-muted-foreground">Can't find what you're looking for? Send us a message.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="support-email">Email Address</Label>
                  <Input id="support-email" type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <Label htmlFor="support-subject">Subject</Label>
                  <Input id="support-subject" placeholder="How can we help?" />
                </div>
                <div>
                  <Label htmlFor="support-message">Message</Label>
                  <Textarea id="support-message" placeholder="Describe your issue or question..." rows={4} />
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 text-center hover-lift">
            <CardContent className="p-6">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Live Chat</h3>
              <p className="text-muted-foreground text-sm mb-4">Get instant help from our support team</p>
              <Button variant="outline" size="sm">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 text-center hover-lift">
            <CardContent className="p-6">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Email Support</h3>
              <p className="text-muted-foreground text-sm mb-4">support@hovr.com</p>
              <Button variant="outline" size="sm">Send Email</Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 text-center hover-lift">
            <CardContent className="p-6">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Response Time</h3>
              <p className="text-muted-foreground text-sm mb-4">Usually within 2-4 hours</p>
              <Button variant="outline" size="sm">View Status</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HelpSection;
