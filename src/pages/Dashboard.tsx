import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import DashboardSelector from '@/components/DashboardSelector';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setIsAuthenticated(!!user);
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <LogIn className="h-16 w-16 mx-auto text-muted-foreground" />
          <div>
            <h2 className="text-2xl font-bold mb-2">Sign In Required</h2>
            <p className="text-muted-foreground mb-6">
              You need to be signed in to access your dashboard
            </p>
          </div>
          <Button 
            onClick={() => navigate('/auth')}
            size="lg"
            className="bg-primary hover:bg-primary/90"
          >
            <LogIn className="h-5 w-5 mr-2" />
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSelector />
      <Footer />
    </div>
  );
};

export default Dashboard;
