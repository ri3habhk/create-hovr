
import { useState } from 'react';
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
import { Link } from 'react-router-dom';

const PostProject = () => {
  const [projectName, setProjectName] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [freelancerType, setFreelancerType] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">
                Post Your
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"> Project</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Find the perfect creator for your project with AI-powered matching
              </p>
            </div>

            <Card className="bg-card/50 border-border/50">
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
                    <Label htmlFor="location" className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g., Mumbai, India or Remote"
                    />
                  </div>
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
                    Type of Creator Needed *
                  </Label>
                  <Select value={freelancerType} onValueChange={setFreelancerType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select creator type" />
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
                  <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                    <Plus className="h-5 w-5 mr-2" />
                    Post Project & Find Creators
                  </Button>
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    By posting, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostProject;
