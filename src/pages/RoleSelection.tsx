import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Briefcase } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const RoleSelection = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<'client' | 'creator' | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      navigate('/auth', { state: { role: selectedRole } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Join as a Client or Creator</h1>
            <p className="text-muted-foreground text-lg">
              Choose how you want to use Hovr
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            <Card 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedRole === 'client' ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedRole('client')}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">I'm a Client</h3>
                <p className="text-muted-foreground mb-4">
                  Looking to hire talented creators for my projects
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li>• Post projects and requirements</li>
                  <li>• Browse creator portfolios</li>
                  <li>• Hire the best talent</li>
                  <li>• Manage project timelines</li>
                </ul>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedRole === 'creator' ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedRole('creator')}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">I'm a Creator</h3>
                <p className="text-muted-foreground mb-4">
                  Ready to showcase my work and get hired
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li>• Create professional portfolio</li>
                  <li>• Showcase your best work</li>
                  <li>• Get discovered by clients</li>
                  <li>• Earn from your skills</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              onClick={handleContinue}
              disabled={!selectedRole}
              className="px-8"
            >
              Continue as {selectedRole === 'client' ? 'Client' : selectedRole === 'creator' ? 'Creator' : '...'}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RoleSelection;
