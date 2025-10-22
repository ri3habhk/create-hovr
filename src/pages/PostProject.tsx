
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X, MapPin, DollarSign, Clock, Users } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { projectSchema } from '@/lib/validation';
import logError from '@/lib/errorLogger';

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

const PostProject = () => {
  const [projectName, setProjectName] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [freelancerTypes, setFreelancerTypes] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState<boolean | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [companyName, setCompanyName] = useState('');
  const [locationType, setLocationType] = useState<'onsite' | 'remote'>('remote');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUserRole();
    loadAllProjects();
  }, []);

  const checkUserRole = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setIsClient(false);
      setCheckingAuth(false);
      return;
    }

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id);

    setIsClient(roles?.some(r => r.role === 'client') || false);
    setCheckingAuth(false);
  };

  const loadAllProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(6);

    if (!error && data) {
      setAllProjects(data);
    }
    setLoadingProjects(false);
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    // Validate inputs using zod schema
    const validationResult = projectSchema.safeParse({
      project_name: projectName,
      description,
      location: locationType === 'remote' ? 'Remote' : location,
      tags,
      budget,
      timeline,
      freelancer_type: freelancerTypes,
      company_name: companyName,
      location_type: locationType
    });

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      const firstError = Object.values(errors).flat()[0];
      toast({
        title: 'Validation Error',
        description: firstError,
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'Authentication Required',
          description: 'Please sign in to post a project',
          variant: 'destructive',
        });
        navigate('/auth');
        return;
      }

      const { error } = await supabase.from('projects').insert({
        user_id: user.id,
        project_name: projectName,
        location: locationType === 'remote' ? 'Remote' : location,
        budget,
        timeline,
        freelancer_type: freelancerTypes,
        description,
        tags,
        company_name: companyName,
        location_type: locationType
      });

      if (error) throw error;

      toast({
        title: 'Success!',
        description: 'Your project has been posted',
      });
      
      // Reset form
      setProjectName('');
      setLocation('');
      setBudget('');
      setTimeline('');
      setFreelancerTypes([]);
      setDescription('');
      setTags([]);
      setCompanyName('');
      setLocationType('remote');
      
      // Reload projects
      loadAllProjects();
    } catch (error) {
      logError('PostProject', error);
      toast({
        title: 'Error',
        description: 'Failed to post project. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero/Features Section - Always shown */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="text-center py-12 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Find Top Creative Talent
                <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                  In Minutes, Not Days
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Post your project and get matched with India's best designers, videographers, 
                and content creators using our AI-powered platform
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-card/50 border-border/50 text-center p-6">
                <div className="flex justify-center mb-3">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">AI-Powered Matching</h3>
                <p className="text-sm text-muted-foreground">
                  Smart algorithm finds perfect creators for your project
                </p>
              </Card>
              
              <Card className="bg-card/50 border-border/50 text-center p-6">
                <div className="flex justify-center mb-3">
                  <Clock className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Save Time & Money</h3>
                <p className="text-sm text-muted-foreground">
                  Get matched with pre-vetted professionals instantly
                </p>
              </Card>
              
              <Card className="bg-card/50 border-border/50 text-center p-6">
                <div className="flex justify-center mb-3">
                  <DollarSign className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Transparent Pricing</h3>
                <p className="text-sm text-muted-foreground">
                  Clear budgets, no hidden fees, fair pricing
                </p>
              </Card>
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            {/* Project Form - only for clients */}
            {isClient === true && (
              <Card className="bg-card/50 border-border/50 mb-12 max-w-3xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Plus className="h-6 w-6 mr-2" />
                    Project Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="location-type" className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        Work Location Type *
                      </Label>
                      <Select value={locationType} onValueChange={(value: 'onsite' | 'remote') => {
                        setLocationType(value);
                        if (value === 'remote') setLocation('');
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location type" />
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="budget" className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        Budget Range *
                      </Label>
                      <Select value={budget} onValueChange={setBudget}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
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
                      <Label htmlFor="timeline" className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Timeline *
                      </Label>
                      <Select value={timeline} onValueChange={setTimeline}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
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
                    <Label htmlFor="freelancer-type" className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Types of Creators Needed *
                    </Label>
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
                      placeholder="Describe your project in detail. What do you need? What's your vision? Any specific requirements?"
                      rows={6}
                    />
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags for AI Matching</Label>
                    <div className="flex gap-2 mb-3">
                      <Input
                        id="tags"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        placeholder="Add relevant tags (e.g., modern, minimalist, corporate)"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      />
                      <Button type="button" onClick={addTag} variant="outline">
                        Add Tag
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
                    <p className="text-sm text-muted-foreground mt-2">
                      Tags help our AI match you with the most suitable creators
                    </p>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90" 
                      size="lg"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      {loading ? 'Posting...' : 'Post Project & Find Creators'}
                    </Button>
                    <p className="text-center text-sm text-muted-foreground mt-4">
                      By posting, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Not a client message */}
            {isClient === false && (
              <Card className="bg-card/50 border-border/50 mb-12 max-w-3xl mx-auto">
                <CardContent className="py-12 text-center">
                  <h3 className="text-2xl font-bold mb-4">Ready to Post a Project?</h3>
                  <p className="text-muted-foreground mb-6">
                    Sign in as a client to post projects and connect with talented creators
                  </p>
                  <Button 
                    onClick={() => navigate('/role-selection')}
                    size="lg"
                    className="bg-primary hover:bg-primary/90"
                  >
                    Get Started - It's Free
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* All Projects Section */}
            <div className="mt-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  Browse Active
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"> Projects</span>
                </h2>
                <p className="text-muted-foreground">
                  Explore projects posted by clients looking for talented creators
                </p>
              </div>

              {loadingProjects ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading projects...</p>
                </div>
              ) : allProjects.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No projects available at the moment</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allProjects.map((project) => (
                    <Card key={project.id} className="bg-card/50 border-border/50 hover:border-primary/50 transition-all">
                      <CardHeader>
                        <CardTitle className="text-xl">{project.project_name}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          {project.location}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {project.description}
                        </p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <DollarSign className="h-4 w-4 mr-1 text-primary" />
                            <span className="font-medium">{project.budget}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-1 text-primary" />
                            <span>{project.timeline}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Users className="h-4 w-4 mr-1 text-primary" />
                            <span>{project.freelancer_type}</span>
                          </div>
                        </div>

                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <Button className="w-full" variant="outline">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostProject;
