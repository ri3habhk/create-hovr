import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Users, User, Briefcase } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import CreatorDashboard from '@/components/CreatorDashboard';
import ClientDashboard from '@/components/ClientDashboard';
import { useToast } from '@/hooks/use-toast';

const DashboardSelector = () => {
  const [selectedDashboard, setSelectedDashboard] = useState<'creator' | 'client' | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [showSelectionDialog, setShowSelectionDialog] = useState(false);
  const [showRoleSetup, setShowRoleSetup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadUserRoles();
  }, []);

  const loadUserRoles = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id);

    const rolesList = roles?.map(r => r.role) || [];
    setUserRoles(rolesList);

    // If user has no roles, show role setup
    if (rolesList.length === 0) {
      setShowRoleSetup(true);
      setIsLoading(false);
    } else {
      // Always show selection dialog for users with roles
      setShowSelectionDialog(true);
      setIsLoading(false);
    }
  };

  const handleRoleSetup = async (role: 'creator' | 'client') => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('user_roles')
      .insert({ user_id: user.id, role });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to set up your role. Please try again.",
        variant: "destructive",
      });
      return;
    }

    const updatedRoles = [...userRoles, role];
    setUserRoles(updatedRoles);
    setSelectedDashboard(role);
    setShowRoleSetup(false);
    setShowSelectionDialog(false);
    setIsLoading(false);
    
    toast({
      title: "Success",
      description: `Your ${role} dashboard is ready!`,
    });
  };

  const handleDashboardSelection = (type: 'creator' | 'client') => {
    setSelectedDashboard(type);
    setShowSelectionDialog(false);
  };

  const hasRole = (role: string) => userRoles.includes(role);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (showRoleSetup) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard</h1>
              <p className="text-muted-foreground text-lg">
                First, let's set up your account. Are you a client or creator?
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card 
                className="cursor-pointer transition-all hover:shadow-lg hover:ring-2 hover:ring-primary"
                onClick={() => handleRoleSetup('client')}
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
                className="cursor-pointer transition-all hover:shadow-lg hover:ring-2 hover:ring-primary"
                onClick={() => handleRoleSetup('creator')}
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
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Dashboard Selection Dialog */}
      <Dialog open={showSelectionDialog} onOpenChange={setShowSelectionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">Choose Your Dashboard</DialogTitle>
            <DialogDescription className="text-center pt-2">
              Which dashboard would you like to view?
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-6">
            {(userRoles.includes('creator') || userRoles.length === 0) && (
              <Button
                onClick={() => userRoles.includes('creator') ? handleDashboardSelection('creator') : handleRoleSetup('creator')}
                className="h-32 flex flex-col items-center justify-center space-y-3 bg-card border-2 border-border hover:border-foreground hover:bg-card/80"
                variant="outline"
              >
                <User className="h-10 w-10 text-foreground" />
                <div className="text-center">
                  <div className="font-semibold text-foreground">Creator</div>
                  <div className="text-xs text-muted-foreground">Manage portfolio</div>
                </div>
              </Button>
            )}
            {(userRoles.includes('client') || userRoles.length === 0) && (
              <Button
                onClick={() => userRoles.includes('client') ? handleDashboardSelection('client') : handleRoleSetup('client')}
                className="h-32 flex flex-col items-center justify-center space-y-3 bg-card border-2 border-border hover:border-foreground hover:bg-card/80"
                variant="outline"
              >
                <Users className="h-10 w-10 text-foreground" />
                <div className="text-center">
                  <div className="font-semibold text-foreground">Client</div>
                  <div className="text-xs text-muted-foreground">Post projects</div>
                </div>
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Dashboard Type Selector */}
      {selectedDashboard && (
        <div className="border-b border-border/40 bg-background sticky top-0 z-50 mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center py-6">
              <Card className="bg-card/50 border-border/50 p-1">
                <CardContent className="p-0">
                  <div className="flex space-x-1">
                    <Button
                      variant={selectedDashboard === 'creator' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => hasRole('creator') ? setSelectedDashboard('creator') : handleRoleSetup('creator')}
                      className={`${
                        selectedDashboard === 'creator'
                          ? 'bg-foreground text-background hover:bg-foreground/90'
                          : 'text-muted-foreground hover:text-foreground hover:bg-card'
                      }`}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Creator Dashboard
                    </Button>
                    <Button
                      variant={selectedDashboard === 'client' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => hasRole('client') ? setSelectedDashboard('client') : handleRoleSetup('client')}
                      className={`${
                        selectedDashboard === 'client'
                          ? 'bg-foreground text-background hover:bg-foreground/90'
                          : 'text-muted-foreground hover:text-foreground hover:bg-card'
                      }`}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Client Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
      
      {/* Add spacing when selector is hidden */}
      {!selectedDashboard && <div className="mt-20" />}

      {/* Dashboard Content */}
      <div className="relative z-10">
        {selectedDashboard === 'creator' ? <CreatorDashboard /> : <ClientDashboard />}
      </div>
    </div>
  );
};

export default DashboardSelector;