
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import CreatorShowcase from '@/components/CreatorShowcase';
import PaymentSection from '@/components/PaymentSection';
import CreatePortfolioSection from '@/components/CreatePortfolioSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <CreatorShowcase />
        <PaymentSection />
        <CreatePortfolioSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
