import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Upload, X } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { portfolioSchema, validateFile } from '@/lib/validation';
import logError from '@/lib/errorLogger';
import { MultiSelect } from '@/components/ui/multi-select';
import { MARKETING_SKILLS } from '@/lib/skillsList';

const OCCUPATIONS = [
  'UI/UX Designer',
  'Brand Designer',
  'Graphic Designer',
  'Filmmaker',
  'Video Editor',
  'Photographer',
  'Content Writer',
  'Copywriter',
  'Social Media Manager',
  'SEO Specialist',
  'Digital Marketer',
  'Motion Graphics Designer',
  'Illustrator',
  '3D Artist',
  'Web Designer'
];

const PortfolioSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    aliasName: '',
    majorOccupation: '',
    minorOccupation: '',
    location: '',
    budgetMin: '',
    budgetMax: '',
    bio: '',
  });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

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
    
    if (selectedSkills.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'Please select at least one skill',
        variant: 'destructive',
      });
      return;
    }

    const validationData = { ...formData, skills: selectedSkills.join(', ') };
    const validationResult = portfolioSchema.safeParse(validationData);

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

      const portfolioFiles = files.length > 0 ? await uploadFiles(user.id) : [];
      const validData = validationResult.data;

      await supabase
        .from('profiles')
        .update({
          full_name: `${validData.firstName} ${validData.lastName}`
        })
        .eq('id', user.id);

      const { error } = await supabase
        .from('creator_portfolios')
        .insert({
          user_id: user.id,
          first_name: validData.firstName,
          last_name: validData.lastName,
          alias_name: validData.aliasName || null,
          title: validData.aliasName || `${validData.firstName} ${validData.lastName}`,
          major_occupation: validData.majorOccupation,
          minor_occupation: validData.minorOccupation || null,
          location: validData.location,
          budget_min: parseFloat(validData.budgetMin),
          budget_max: parseFloat(validData.budgetMax),
          bio: validData.bio,
          skills: selectedSkills,
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

  const wordCount = formData.bio.trim().split(/\s+/).filter(Boolean).length;

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
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="aliasName">Alias / Work Name / Pen Name (Optional)</Label>
                    <Input
                      id="aliasName"
                      placeholder="e.g., Creative Ninja"
                      value={formData.aliasName}
                      onChange={(e) => setFormData({...formData, aliasName: e.target.value})}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="majorOccupation">Major Occupation *</Label>
                      <Select
                        value={formData.majorOccupation}
                        onValueChange={(value) => setFormData({...formData, majorOccupation: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your main occupation" />
                        </SelectTrigger>
                        <SelectContent>
                          {OCCUPATIONS.map((occupation) => (
                            <SelectItem key={occupation} value={occupation}>
                              {occupation}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="minorOccupation">Minor Occupation (Optional)</Label>
                      <Select
                        value={formData.minorOccupation}
                        onValueChange={(value) => setFormData({...formData, minorOccupation: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select secondary occupation" />
                        </SelectTrigger>
                        <SelectContent>
                          {OCCUPATIONS.map((occupation) => (
                            <SelectItem key={occupation} value={occupation}>
                              {occupation}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Mumbai, India"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="budgetMin">Minimum Budget (₹) *</Label>
                      <Input
                        id="budgetMin"
                        type="number"
                        placeholder="5000"
                        value={formData.budgetMin}
                        onChange={(e) => setFormData({...formData, budgetMin: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="budgetMax">Maximum Budget (₹) *</Label>
                      <Input
                        id="budgetMax"
                        type="number"
                        placeholder="25000"
                        value={formData.budgetMax}
                        onChange={(e) => setFormData({...formData, budgetMax: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">About You *</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell clients about yourself, your experience, and why they should choose you..."
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      rows={6}
                      required
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      {wordCount} / 250 words {wordCount > 250 && <span className="text-destructive">(exceeds limit)</span>}
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="skills">Skills *</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Search and select all skills you can provide
                    </p>
                    <MultiSelect
                      options={MARKETING_SKILLS}
                      selected={selectedSkills}
                      onChange={setSelectedSkills}
                      placeholder="Search for skills..."
                    />
                  </div>

                  <div>
                    <Label>Upload Past Work *</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload images or videos of your previous work to showcase your skills
                    </p>
                    <div className="mt-2">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload portfolio files (images, videos, PDFs)
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
