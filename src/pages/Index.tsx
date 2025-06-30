
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import CreatorShowcase from '@/components/CreatorShowcase';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <CreatorShowcase />
        <HowItWorks />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
