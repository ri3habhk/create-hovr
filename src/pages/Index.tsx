import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import CreatorShowcase from '@/components/CreatorShowcase';
import PaymentSection from '@/components/PaymentSection';
import CreatePortfolioSection from '@/components/CreatePortfolioSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import SubscriptionSection from '@/components/SubscriptionSection';
import Footer from '@/components/Footer';
import InteractiveBackground from '@/components/InteractiveBackground';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <InteractiveBackground />
      <div className="relative z-10">
        <Navigation />
        <main>
          <HeroSection />
          <CreatorShowcase />
          <PaymentSection />
          <CreatePortfolioSection />
          <HowItWorksSection />
          <SubscriptionSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
