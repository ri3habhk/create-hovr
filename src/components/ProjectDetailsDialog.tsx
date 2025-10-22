import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, DollarSign, Calendar, Briefcase, Building } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface ProjectDetailsDialogProps {
  project: {
    id: string;
    project_name: string;
    company_name?: string;
    location: string;
    location_type: 'onsite' | 'remote';
    budget: string;
    timeline: string;
    freelancer_type: string[];
    description: string;
    tags: string[];
    created_at: string;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClaimed?: () => void;
}

const ProjectDetailsDialog = ({ project, open, onOpenChange, onClaimed }: ProjectDetailsDialogProps) => {
  const { toast } = useToast();
  const [claiming, setClaiming] = useState(false);

  if (!project) return null;

  const handleClaim = async () => {
    setClaiming(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'Authentication Required',
          description: 'Please sign in to claim projects',
          variant: 'destructive',
        });
        return;
      }

      // Check if user has creator role
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'creator')
        .maybeSingle();

      if (!roleData) {
        toast({
          title: 'Creator Role Required',
          description: 'You need to have a creator role to claim projects',
          variant: 'destructive',
        });
        return;
      }

      // Check if already claimed
      const { data: existingClaim } = await supabase
        .from('project_claims')
        .select('id')
        .eq('project_id', project.id)
        .eq('creator_id', user.id)
        .maybeSingle();

      if (existingClaim) {
        toast({
          title: 'Already Claimed',
          description: 'You have already claimed this project',
          variant: 'destructive',
        });
        return;
      }

      const { error } = await supabase
        .from('project_claims')
        .insert({
          project_id: project.id,
          creator_id: user.id,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: 'Project Claimed!',
        description: 'You have successfully claimed this project. The client will review your profile.',
      });
      
      onOpenChange(false);
      onClaimed?.();
    } catch (error) {
      console.error('Error claiming project:', error);
      toast({
        title: 'Error',
        description: 'Failed to claim project. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setClaiming(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.project_name}</DialogTitle>
          {project.company_name && (
            <DialogDescription className="flex items-center gap-2 text-base">
              <Building className="h-4 w-4" />
              {project.company_name}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">
                  {project.location_type === 'remote' ? 'Remote' : project.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Budget</p>
                <p className="font-medium">{project.budget}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Timeline</p>
                <p className="font-medium">{project.timeline}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Creator Types</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.freelancer_type.map((type, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">{project.description}</p>
          </div>

          {project.tags && project.tags.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t">
            <Button 
              onClick={handleClaim}
              disabled={claiming}
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              {claiming ? 'Claiming...' : 'Claim This Project'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsDialog;
