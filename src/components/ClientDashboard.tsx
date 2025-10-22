import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Settings, Plus, FileText, Users, Search, Bookmark, Eye, DollarSign, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import logError from '@/lib/errorLogger';
import EditProjectDialog from '@/components/EditProjectDialog';
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

interface Project {
  id: string;
  project_name: string;
  budget: string;
  timeline: string;
  freelancer_type: string[];
  created_at: string;
  company_name?: string;
  location_type: 'onsite' | 'remote';
  location: string;
  description: string;
  tags: string[];
  contact_email?: string;
  contact_linkedin?: string;
  contact_instagram?: string;
}

const ClientDashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectClaims, setProjectClaims] = useState<any[]>([]);
  const [loadingClaims, setLoadingClaims] = useState(true);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadProjects();
    loadProjectClaims();
  }, []);

  const loadProjects = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setProjects(data);
      }
    } catch (error) {
      logError('ClientDashboard', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProjectClaims = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: projectsData } = await supabase
        .from('projects')
        .select('id')
        .eq('user_id', user.id);

      if (!projectsData || projectsData.length === 0) {
        setLoadingClaims(false);
        return;
      }

      const projectIds = projectsData.map(p => p.id);

      const { data, error } = await supabase
        .from('project_claims')
        .select(`
          *,
          projects:project_id (
            id,
            project_name,
            company_name
          ),
          profiles:creator_id (
            id,
            first_name,
            last_name,
            avatar_url
          )
        `)
        .in('project_id', projectIds)
        .order('claimed_at', { ascending: false });

      if (error) throw error;
      setProjectClaims(data || []);
    } catch (error) {
      logError('ClientDashboard.loadProjectClaims', error);
    } finally {
      setLoadingClaims(false);
    }
  };

  const handleClaimStatusUpdate = async (claimId: string, status: 'accepted' | 'rejected', notes?: string) => {
    try {
      const { error } = await supabase
        .from('project_claims')
        .update({ status, client_notes: notes })
        .eq('id', claimId);

      if (error) throw error;

      // Reload claims
      await loadProjectClaims();
    } catch (error) {
      logError('ClientDashboard.handleClaimStatusUpdate', error);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditProject(project);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (projectId: string) => {
    setProjectToDelete(projectId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectToDelete);

      if (error) throw error;

      toast({
        title: 'Project Deleted',
        description: 'Your project has been successfully deleted.',
      });

      // Reload projects
      await loadProjects();
    } catch (error) {
      logError('ClientDashboard.handleDeleteConfirm', error);
      toast({
        title: 'Error',
        description: 'Failed to delete project. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  const stats = {
    profileViews: 0,
    pendingProjects: projects.length,
    savedCreators: 0,
    moneySpent: 0
  };

  return (
    <>
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Client Dashboard</h1>
              <p className="text-muted-foreground">Find and manage creative talent</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => navigate('/post-project')}
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Post Brief
              </Button>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                  <FileText className="h-5 w-5 mr-2" />
                  Pending Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{stats.pendingProjects}</p>
                <p className="text-sm text-muted-foreground">Awaiting creators</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-foreground">
                  <Bookmark className="h-5 w-5 mr-2" />
                  Saved Creators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{stats.savedCreators}</p>
                <p className="text-sm text-muted-foreground">In favorites</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-foreground">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Total Spent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-foreground">₹{stats.moneySpent.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">All time</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Active Projects */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Your Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <p className="text-muted-foreground text-center py-4">Loading projects...</p>
                  ) : projects.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">No projects posted yet</p>
                      <Button 
                        onClick={() => navigate('/post-project')}
                        variant="outline"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Post Your First Project
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {projects.map((project) => (
                        <div key={project.id} className="p-4 bg-background/50 rounded-lg border border-border/50">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground mb-1">{project.project_name}</h4>
                              {project.company_name && (
                                <p className="text-xs text-muted-foreground mb-2">{project.company_name}</p>
                              )}
                              <p className="text-sm text-muted-foreground">
                                {Array.isArray(project.freelancer_type) ? project.freelancer_type.join(', ') : project.freelancer_type} • {project.budget} • {project.timeline}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Posted {new Date(project.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge className="bg-foreground text-background">Active</Badge>
                          </div>
                          <div className="flex gap-2 mt-3 pt-3 border-t border-border/50">
                            <Button
                              onClick={() => handleEditProject(project)}
                              variant="outline"
                              size="sm"
                              className="flex-1"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDeleteClick(project.id)}
                              variant="outline"
                              size="sm"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Project Claims */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Creators Who Claimed Your Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingClaims ? (
                    <p className="text-muted-foreground text-center py-4">Loading...</p>
                  ) : projectClaims.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No claims yet. Post a project to get started!
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {projectClaims.map((claim) => (
                        <div key={claim.id} className="p-4 bg-background/50 rounded-lg border border-border/50">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium text-foreground">
                                {claim.profiles?.first_name} {claim.profiles?.last_name || 'Unknown Creator'}
                              </h4>
                              <p className="text-sm text-muted-foreground">{claim.projects?.project_name}</p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded ${
                              claim.status === 'accepted' ? 'bg-green-500/20 text-green-500' :
                              claim.status === 'rejected' ? 'bg-red-500/20 text-red-500' :
                              'bg-orange-500/20 text-orange-500'
                            }`}>
                              {claim.status}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3">
                            Claimed {new Date(claim.claimed_at).toLocaleDateString()}
                          </p>
                          {claim.status === 'pending' && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => {
                                  navigate(`/creator/${claim.creator_id}`);
                                }}
                                variant="outline"
                              >
                                View Profile
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleClaimStatusUpdate(claim.id, 'accepted')}
                              >
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleClaimStatusUpdate(claim.id, 'rejected')}
                              >
                                Decline
                              </Button>
                            </div>
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
              {/* Quick Actions */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => navigate('/creators')}
                    className="w-full bg-foreground text-background hover:bg-foreground/90"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Find Creators
                  </Button>
                  <Button 
                    onClick={() => navigate('/post-project')}
                    variant="outline" 
                    className="w-full border-border/50 text-foreground hover:bg-card"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Brief
                  </Button>
                </CardContent>
              </Card>

              {/* Account Activity */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projects.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No activity yet. Post your first project to get started!
                      </p>
                    ) : (
                      projects.slice(0, 3).map((project) => (
                        <div key={project.id} className="text-sm text-muted-foreground p-3 bg-background/50 rounded-lg">
                          Posted project: <span className="text-foreground font-medium">{project.project_name}</span>
                          <p className="text-xs mt-1">{new Date(project.created_at).toLocaleDateString()}</p>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Project Dialog */}
      <EditProjectDialog
        project={editProject}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSaved={loadProjects}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your project
              and all associated claims from creators.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ClientDashboard;