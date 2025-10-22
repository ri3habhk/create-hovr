import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload, X } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { portfolioSchema, validateFile } from '@/lib/validation';
import logError from '@/lib/errorLogger';

const PortfolioSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    bio: '',
    skills: '',
    hourlyRate: '',
    location: '',
    experienceYears: '',
    categories: ''
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const selectedFiles = Array.from(e.target.files);
    const validFiles: File[] = [];
    
    for (const file of selectedFiles) {
      const validation = validateFile(file);
      if (!validation.valid) {
        toast({
          title: 'Invalid file',
          description: validation.error,
          variant: 'destructive',
        });
        continue;
      }
      validFiles.push(file);
    }
    
    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const uploadFiles = async (userId: string) => {
    const uploadedUrls: string[] = [];
    
    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Math.random()}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('portfolios')
        .upload(fileName, file);

      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('portfolios')
        .getPublicUrl(fileName);
      
      uploadedUrls.push(publicUrl);
    }
    
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs using zod schema
    const validationResult = portfolioSchema.safeParse(formData);

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
      if (!user) throw new Error('Not authenticated');

      // Upload files first
      const portfolioFiles = files.length > 0 ? await uploadFiles(user.id) : [];

      // Use validated data
      const validData = validationResult.data;

      // Create portfolio
      const { error } = await supabase
        .from('creator_portfolios')
        .insert({
          user_id: user.id,
          title: validData.title,
          bio: validData.bio || null,
          skills: validData.skills,
          hourly_rate: validData.hourlyRate ? parseFloat(validData.hourlyRate) : null,
          location: validData.location || null,
          experience_years: validData.experience ? parseInt(validData.experience) : null,
          categories: validData.categories,
          portfolio_files: portfolioFiles,
          is_published: true
        });

      if (error) throw error;

      toast({
        title: 'Portfolio created!',
        description: 'Your portfolio is now live and visible to clients.',
      });

      navigate('/creators');
    } catch (error: any) {
      logError('PortfolioSetup', error);
      toast({
        title: 'Error',
        description: 'Failed to create portfolio. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Set Up Your Portfolio</h1>
            <p className="text-muted-foreground mb-8">
              Showcase your work and get discovered by clients
            </p>

            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="title">Professional Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Senior UI/UX Designer"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio *</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell clients about yourself and your experience..."
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      rows={4}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="e.g., New York, USA"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        placeholder="50"
                        value={formData.hourlyRate}
                        onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="experienceYears">Years of Experience</Label>
                      <Input
                        id="experienceYears"
                        type="number"
                        placeholder="5"
                        value={formData.experienceYears}
                        onChange={(e) => setFormData({...formData, experienceYears: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="categories">Categories (comma-separated)</Label>
                      <Input
                        id="categories"
                        placeholder="Design, Branding, UI/UX"
                        value={formData.categories}
                        onChange={(e) => setFormData({...formData, categories: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="skills">Skills (comma-separated) *</Label>
                    <Input
                      id="skills"
                      placeholder="Figma, Adobe XD, Sketch, Prototyping"
                      value={formData.skills}
                      onChange={(e) => setFormData({...formData, skills: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label>Portfolio Files</Label>
                    <div className="mt-2">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload portfolio files
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          multiple
                          accept="image/*,video/*,.pdf"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>

                    {files.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                            <span className="text-sm truncate">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Creating Portfolio...' : 'Create Portfolio'}
                  </Button>
                </CardContent>
              </Card>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PortfolioSetup;
