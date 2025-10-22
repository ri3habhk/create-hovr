import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, LogOut } from 'lucide-react';
import Navigation from '@/components/Navigation';
import logError from '@/lib/errorLogger';

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [portfolio, setPortfolio] = useState<any>(null);
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }

      // Load profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setProfile(profileData);

      // Load role
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      setUserRole(roleData?.role || '');

      // Load portfolio if creator
      if (roleData?.role === 'creator') {
        const { data: portfolioData } = await supabase
          .from('creator_portfolios')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        setPortfolio(portfolioData);
      }
    } catch (error: any) {
      logError('LoadUserData', error);
    }
  };

  const updateProfile = async (updates: any) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });

      await loadUserData();
    } catch (error: any) {
      logError('UpdateProfile', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePortfolio = async (updates: any) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('creator_portfolios')
        .update(updates)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: 'Portfolio updated',
        description: 'Your portfolio has been updated successfully.',
      });

      await loadUserData();
    } catch (error: any) {
      logError('UpdatePortfolio', error);
      toast({
        title: 'Error',
        description: 'Failed to update portfolio. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your account and preferences</p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                {userRole === 'creator' && (
                  <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                )}
                <TabsTrigger value="account">Account</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={profile.avatar_url} />
                        <AvatarFallback>
                          {profile.full_name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Change Avatar
                      </Button>
                    </div>

                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={profile.full_name || ''}
                        onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email || ''}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profile.phone || ''}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      />
                    </div>

                    <Button onClick={() => updateProfile(profile)} disabled={loading}>
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {userRole === 'creator' && portfolio && (
                <TabsContent value="portfolio">
                  <Card>
                    <CardHeader>
                      <CardTitle>Portfolio Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="title">Professional Title</Label>
                        <Input
                          id="title"
                          value={portfolio.title || ''}
                          onChange={(e) => setPortfolio({...portfolio, title: e.target.value})}
                        />
                      </div>

                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={portfolio.bio || ''}
                          onChange={(e) => setPortfolio({...portfolio, bio: e.target.value})}
                          rows={4}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={portfolio.location || ''}
                            onChange={(e) => setPortfolio({...portfolio, location: e.target.value})}
                          />
                        </div>

                        <div>
                          <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                          <Input
                            id="hourlyRate"
                            type="number"
                            value={portfolio.hourly_rate || ''}
                            onChange={(e) => setPortfolio({...portfolio, hourly_rate: e.target.value})}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="skills">Skills (comma-separated)</Label>
                        <Input
                          id="skills"
                          value={portfolio.skills?.join(', ') || ''}
                          onChange={(e) => setPortfolio({
                            ...portfolio, 
                            skills: e.target.value.split(',').map(s => s.trim())
                          })}
                        />
                      </div>

                      <Button onClick={() => updatePortfolio(portfolio)} disabled={loading}>
                        Save Portfolio
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Account Type</h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {userRole} Account
                      </p>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="font-medium mb-2 text-destructive">Danger Zone</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Once you delete your account, there is no going back.
                      </p>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
