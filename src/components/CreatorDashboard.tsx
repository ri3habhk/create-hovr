import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  Settings, 
  Upload, 
  Eye, 
  MessageSquare, 
  DollarSign, 
  Edit, 
  Trash2,
  ExternalLink 
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import logError from '@/lib/errorLogger';

const CreatorDashboard = () => {
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [portfolioToDelete, setPortfolioToDelete] = useState<string | null>(null);
  const [claimedProjects, setClaimedProjects] = useState<any[]>([]);
  const [loadingClaims, setLoadingClaims] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadPortfolios();
    loadClaimedProjects();
  }, []);

  const loadPortfolios = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('creator_portfolios')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      if (data) {
        setPortfolios(data);
      }
    } catch (error) {
      logError('CreatorDashboard', error);
    } finally {
      setLoading(false);
    }
  };

  const loadClaimedProjects = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('project_claims')
        .select(`
          *,
          projects:project_id (
            id,
            project_name,
            company_name,
            budget,
            timeline,
            freelancer_type,
            location,
            location_type,
            description
          )
        `)
        .eq('creator_id', user.id)
        .order('claimed_at', { ascending: false });

      if (error) throw error;
      setClaimedProjects(data || []);
    } catch (error) {
      logError('CreatorDashboard.loadClaimedProjects', error);
    } finally {
      setLoadingClaims(false);
    }
  };

  const handleDeleteClick = (portfolioId: string) => {
    setPortfolioToDelete(portfolioId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!portfolioToDelete) return;

    try {
      const portfolio = portfolios.find(p => p.id === portfolioToDelete);
      
      // Delete files from storage if they exist
      if (portfolio?.portfolio_files && portfolio.portfolio_files.length > 0) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Extract file paths from URLs
          const filePaths = portfolio.portfolio_files.map((url: string) => {
            const match = url.match(/portfolios\/(.+)$/);
            return match ? match[1] : null;
          }).filter(Boolean);

          if (filePaths.length > 0) {
            await supabase.storage
              .from('portfolios')
              .remove(filePaths);
          }
        }
      }

      // Delete portfolio record
      const { error } = await supabase
        .from('creator_portfolios')
        .delete()
        .eq('id', portfolioToDelete);

      if (error) throw error;

      toast({
        title: 'Portfolio deleted',
        description: 'Your portfolio has been successfully deleted.',
      });

      // Reload portfolios
      await loadPortfolios();
    } catch (error) {
      logError('CreatorDashboard', error);
      toast({
        title: 'Error',
        description: 'Failed to delete portfolio. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setDeleteDialogOpen(false);
      setPortfolioToDelete(null);
    }
  };

  const handleEdit = (portfolioId: string) => {
    navigate(`/portfolio-edit/${portfolioId}`);
  };

  const handleViewProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      navigate(`/creator/${user.id}`);
    }
  };

  const stats = {
    profileViews: 0,
    pendingProjects: claimedProjects.filter(c => c.status === 'pending').length,
    totalEarnings: 0
  };

  return (
    <main className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Creator Dashboard</h1>
            <p className="text-muted-foreground">Manage your creative business</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button 
              onClick={() => navigate('/settings')}
              variant="ghost" 
              size="sm"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center text-foreground">
                <Eye className="h-5 w-5 mr-2" />
                Profile Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{stats.profileViews}</p>
              <p className="text-sm text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center text-foreground">
                <MessageSquare className="h-5 w-5 mr-2" />
                Pending Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{stats.pendingProjects}</p>
              <p className="text-sm text-muted-foreground">Awaiting response</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center text-foreground">
                <DollarSign className="h-5 w-5 mr-2" />
                Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-foreground">₹{stats.totalEarnings.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total earned</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Portfolio Status */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-foreground">Your Portfolio</CardTitle>
                  {portfolios.length > 0 && (
                    <Button
                      onClick={handleViewProfile}
                      variant="outline"
                      size="sm"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Public Profile
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-muted-foreground text-center py-4">Loading portfolio...</p>
                ) : portfolios.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No portfolio created yet</p>
                    <Button 
                      onClick={() => navigate('/portfolio-setup')}
                      variant="outline"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Create Your Portfolio
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {portfolios.map((portfolio) => (
                      <div key={portfolio.id} className="p-4 bg-background/50 rounded-lg border border-border/50">
...
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Claimed Projects */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Claimed Projects</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingClaims ? (
                  <p className="text-muted-foreground text-center py-4">Loading...</p>
                ) : claimedProjects.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No claimed projects yet</p>
                    <Button 
                      onClick={() => navigate('/projects')}
                      variant="outline"
                    >
                      Browse Projects
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {claimedProjects.map((claim) => (
                      <div key={claim.id} className="p-4 bg-background/50 rounded-lg border border-border/50">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-foreground">{claim.projects?.project_name}</h4>
                          <span className={`text-xs px-2 py-1 rounded ${
                            claim.status === 'accepted' ? 'bg-green-500/20 text-green-500' :
                            claim.status === 'rejected' ? 'bg-red-500/20 text-red-500' :
                            'bg-orange-500/20 text-orange-500'
                          }`}>
                            {claim.status}
                          </span>
                        </div>
                        {claim.projects?.company_name && (
                          <p className="text-sm text-muted-foreground mb-2">{claim.projects.company_name}</p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          {claim.projects?.budget} • {claim.projects?.timeline}
                        </p>
                        {claim.client_notes && (
                          <p className="text-sm text-muted-foreground mt-2 p-2 bg-background rounded border border-border/50">
                            Note: {claim.client_notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Upload */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {portfolios.length === 0 ? (
                  <Button 
                    onClick={() => navigate('/portfolio-setup')}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Create Portfolio
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={handleViewProfile}
                      className="w-full"
                      variant="outline"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Public Profile
                    </Button>
                    <Button 
                      onClick={() => handleEdit(portfolios[0].id)}
                      className="w-full"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Portfolio
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {portfolios.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Create your portfolio to start getting noticed by clients
                  </p>
                ) : (
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground p-3 bg-background/50 rounded-lg">
                      Portfolio created: <span className="text-foreground font-medium">{portfolios[0]?.title || portfolios[0]?.alias_name}</span>
                      <p className="text-xs mt-1">{new Date(portfolios[0]?.created_at).toLocaleDateString()}</p>
                    </div>
                    {portfolios[0]?.is_published && (
                      <div className="text-sm text-muted-foreground p-3 bg-background/50 rounded-lg">
                        ✓ Portfolio is live and visible to clients
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your portfolio
              and all associated files.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Portfolio
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default CreatorDashboard;
