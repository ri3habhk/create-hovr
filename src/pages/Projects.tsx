import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, DollarSign, Calendar, Briefcase, Building } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ProjectDetailsDialog from '@/components/ProjectDetailsDialog';

interface Project {
  id: string;
  project_name: string;
  location: string;
  budget: string;
  timeline: string;
  freelancer_type: string[];
  description: string;
  tags: string[];
  created_at: string;
  company_name?: string;
  location_type: 'onsite' | 'remote';
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: 'Error',
        description: 'Failed to load projects',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = (projectId: string) => {
    // Open project details dialog instead
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setDialogOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Available Projects</h1>
          <p className="text-muted-foreground">Browse and claim projects from clients</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects available at the moment</p>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow border-border/50">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">{project.project_name}</h3>
                        {project.company_name && (
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            {project.company_name}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{project.location_type === 'remote' ? 'Remote' : project.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{project.budget}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{project.timeline}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.freelancer_type.map((type, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      className="bg-primary hover:bg-primary/90 md:w-auto w-full"
                      onClick={() => handleClaim(project.id)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <ProjectDetailsDialog
        project={selectedProject}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onClaimed={fetchProjects}
      />

      <Footer />
    </div>
  );
};

export default Projects;