import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Settings, Plus, FileText, Users, Search, Bookmark, Eye, DollarSign } from 'lucide-react';

interface Project {
  id: string;
  project_name: string;
  budget: string;
  timeline: string;
  freelancer_type: string;
  created_at: string;
}

const ClientDashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProjects(data);
    }
    setLoading(false);
  };

  const stats = {
    profileViews: 0,
    pendingProjects: projects.length,
    savedCreators: 0,
    moneySpent: 0
  };

  return (
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
                        <div key={project.id} className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-foreground">{project.project_name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {project.freelancer_type} • {project.budget} • {project.timeline}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Posted {new Date(project.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge className="bg-foreground text-background">Active</Badge>
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
  );
};

export default ClientDashboard;