import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

interface EditProjectDialogProps {
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
    contact_email?: string;
    contact_linkedin?: string;
    contact_instagram?: string;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
}

const EditProjectDialog = ({ project, open, onOpenChange, onSaved }: EditProjectDialogProps) => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [locationType, setLocationType] = useState<'onsite' | 'remote'>('remote');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [freelancerTypes, setFreelancerTypes] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactLinkedIn, setContactLinkedIn] = useState('');
  const [contactInstagram, setContactInstagram] = useState('');

  useEffect(() => {
    if (project) {
      setProjectName(project.project_name);
      setCompanyName(project.company_name || '');
      setLocation(project.location);
      setLocationType(project.location_type);
      setBudget(project.budget);
      setTimeline(project.timeline);
      setFreelancerTypes(project.freelancer_type);
      setDescription(project.description);
      setTags(project.tags || []);
      setContactEmail(project.contact_email || '');
      setContactLinkedIn(project.contact_linkedin || '');
      setContactInstagram(project.contact_instagram || '');
    }
  }, [project]);

  if (!project) return null;

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('projects')
        .update({
          project_name: projectName,
          company_name: companyName,
          location: locationType === 'remote' ? 'Remote' : location,
          location_type: locationType,
          budget,
          timeline,
          freelancer_type: freelancerTypes,
          description,
          tags,
          contact_email: contactEmail || null,
          contact_linkedin: contactLinkedIn || null,
          contact_instagram: contactInstagram || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', project.id);

      if (error) throw error;

      toast({
        title: 'Project Updated',
        description: 'Your project has been successfully updated.',
      });
      
      onOpenChange(false);
      onSaved?.();
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: 'Error',
        description: 'Failed to update project. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Project</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="project-name">Project Name *</Label>
              <Input
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., Brand Identity Design"
              />
            </div>
            <div>
              <Label htmlFor="company-name">Client/Company Name</Label>
              <Input
                id="company-name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g., Tech Startup Inc."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location-type">Work Location Type *</Label>
              <Select value={locationType} onValueChange={(value: 'onsite' | 'remote') => {
                setLocationType(value);
                if (value === 'remote') setLocation('');
              }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="onsite">On-site</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {locationType === 'onsite' && (
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Mumbai, India"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget">Budget Range *</Label>
              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-5k">Under ₹5,000</SelectItem>
                  <SelectItem value="5k-15k">₹5,000 - ₹15,000</SelectItem>
                  <SelectItem value="15k-30k">₹15,000 - ₹30,000</SelectItem>
                  <SelectItem value="30k-50k">₹30,000 - ₹50,000</SelectItem>
                  <SelectItem value="50k-100k">₹50,000 - ₹1,00,000</SelectItem>
                  <SelectItem value="above-100k">Above ₹1,00,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timeline">Timeline *</Label>
              <Select value={timeline} onValueChange={setTimeline}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asap">ASAP (1-3 days)</SelectItem>
                  <SelectItem value="1-week">Within 1 week</SelectItem>
                  <SelectItem value="2-weeks">Within 2 weeks</SelectItem>
                  <SelectItem value="1-month">Within 1 month</SelectItem>
                  <SelectItem value="flexible">Flexible timeline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Types of Creators Needed *</Label>
            <Select 
              value="" 
              onValueChange={(value) => {
                if (!freelancerTypes.includes(value)) {
                  setFreelancerTypes([...freelancerTypes, value]);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Add creator types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brand-designer">Brand Designer</SelectItem>
                <SelectItem value="video-editor">Video Editor</SelectItem>
                <SelectItem value="filmmaker">Filmmaker</SelectItem>
                <SelectItem value="photographer">Photographer</SelectItem>
                <SelectItem value="graphic-designer">Graphic Designer</SelectItem>
                <SelectItem value="content-creator">Content Creator</SelectItem>
                <SelectItem value="ui-ux-designer">UI/UX Designer</SelectItem>
                <SelectItem value="motion-graphics">Motion Graphics Artist</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-3">
              {freelancerTypes.map((type, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setFreelancerTypes(freelancerTypes.filter(t => t !== type))} />
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="description">Project Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your project in detail..."
              rows={6}
            />
          </div>

          <div>
            <Label>Contact Details (At least one required) *</Label>
            <div className="space-y-3 mt-2">
              <div>
                <Label htmlFor="contact-email" className="text-sm">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <Label htmlFor="contact-linkedin" className="text-sm">LinkedIn Profile</Label>
                <Input
                  id="contact-linkedin"
                  value={contactLinkedIn}
                  onChange={(e) => setContactLinkedIn(e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <div>
                <Label htmlFor="contact-instagram" className="text-sm">Instagram Handle</Label>
                <Input
                  id="contact-instagram"
                  value={contactInstagram}
                  onChange={(e) => setContactInstagram(e.target.value)}
                  placeholder="@yourhandle"
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2 mb-3">
              <Input
                id="tags"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Add tags"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Button 
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button 
              onClick={() => onOpenChange(false)}
              variant="outline"
              disabled={saving}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectDialog;
