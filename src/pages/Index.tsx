
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import PaymentTerms from '@/components/PaymentTerms';
import HowItWorks from '@/components/HowItWorks';
import CreatorShowcase from '@/components/CreatorShowcase';
import CreateSection from '@/components/CreateSection';
import PricingSection from '@/components/PricingSection';
import HelpSection from '@/components/HelpSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <PaymentTerms />
        <CreatorShowcase />
        <CreateSection />
        <HowItWorks />
        <PricingSection />
        <HelpSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
