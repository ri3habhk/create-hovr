import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Users, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import CreatorDashboard from '@/components/CreatorDashboard';
import ClientDashboard from '@/components/ClientDashboard';

const DashboardSelector = () => {
  const [selectedDashboard, setSelectedDashboard] = useState<'creator' | 'client' | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [showSelectionDialog, setShowSelectionDialog] = useState(false);

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

    // If user has both roles, show selection dialog
    if (rolesList.includes('client') && rolesList.includes('creator')) {
      setShowSelectionDialog(true);
    } else if (rolesList.includes('client')) {
      setSelectedDashboard('client');
    } else if (rolesList.includes('creator')) {
      setSelectedDashboard('creator');
    }
  };

  const handleDashboardSelection = (type: 'creator' | 'client') => {
    setSelectedDashboard(type);
    setShowSelectionDialog(false);
  };

  const hasRole = (role: string) => userRoles.includes(role);

  if (selectedDashboard === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
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
              You have access to both client and creator features. Which dashboard would you like to view?
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-6">
            <Button
              onClick={() => handleDashboardSelection('creator')}
              className="h-32 flex flex-col items-center justify-center space-y-3 bg-card border-2 border-border hover:border-foreground hover:bg-card/80"
              variant="outline"
            >
              <User className="h-10 w-10 text-foreground" />
              <div className="text-center">
                <div className="font-semibold text-foreground">Creator</div>
                <div className="text-xs text-muted-foreground">Manage portfolio</div>
              </div>
            </Button>
            <Button
              onClick={() => handleDashboardSelection('client')}
              className="h-32 flex flex-col items-center justify-center space-y-3 bg-card border-2 border-border hover:border-foreground hover:bg-card/80"
              variant="outline"
            >
              <Users className="h-10 w-10 text-foreground" />
              <div className="text-center">
                <div className="font-semibold text-foreground">Client</div>
                <div className="text-xs text-muted-foreground">Post projects</div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Dashboard Type Selector - Only show if user has both roles */}
      {hasRole('creator') && hasRole('client') && (
        <div className="border-b border-border/40 bg-background sticky top-0 z-50 mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center py-6">
              <Card className="bg-card/50 border-border/50 p-1">
                <CardContent className="p-0">
                  <div className="flex space-x-1">
                    <Button
                      variant={selectedDashboard === 'creator' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setSelectedDashboard('creator')}
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
                      onClick={() => setSelectedDashboard('client')}
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
      {!(hasRole('creator') && hasRole('client')) && <div className="mt-20" />}

      {/* Dashboard Content */}
      <div className="relative z-10">
        {selectedDashboard === 'creator' ? <CreatorDashboard /> : <ClientDashboard />}
      </div>
    </div>
  );
};

export default DashboardSelector;