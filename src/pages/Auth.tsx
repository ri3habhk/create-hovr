import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Phone } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import logError from '@/lib/errorLogger';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const role = (location.state as any)?.role || 'client';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (roleData?.role === 'creator') {
        const { data: portfolioData } = await supabase
          .from('creator_portfolios')
          .select('id')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (!portfolioData) {
          navigate('/portfolio-setup');
        } else {
          navigate('/creators');
        }
      } else {
        navigate('/');
      }
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth`
        }
      });

      if (error) throw error;
    } catch (error: any) {
      logError('GoogleLogin', error);
      toast({
        title: 'Error',
        description: 'Failed to sign in with Google. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const authData = loginMethod === 'email' 
        ? { email: formData.email, password: formData.password }
        : { phone: formData.phone, password: formData.password };

      const { data, error } = await supabase.auth.signUp({
        ...authData,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        // Create user role
        await supabase.from('user_roles').insert({
          user_id: data.user.id,
          role: role
        });

        toast({
          title: 'Account created!',
          description: role === 'creator' 
            ? 'Now let\'s set up your portfolio.' 
            : 'Welcome to Hovr!',
        });

        if (role === 'creator') {
          navigate('/portfolio-setup');
        } else {
          navigate('/');
        }
      }
    } catch (error: any) {
      logError('SignUp', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create account. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const authData = loginMethod === 'email' 
        ? { email: formData.email, password: formData.password }
        : { phone: formData.phone, password: formData.password };

      const { data, error } = await supabase.auth.signInWithPassword(authData);

      if (error) throw error;

      if (data.user) {
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user.id)
          .maybeSingle();

        if (roleData?.role === 'creator') {
          const { data: portfolioData } = await supabase
            .from('creator_portfolios')
            .select('id')
            .eq('user_id', data.user.id)
            .maybeSingle();

          if (!portfolioData) {
            navigate('/portfolio-setup');
          } else {
            navigate('/creators');
          }
        } else {
          navigate('/');
        }
      }
    } catch (error: any) {
      logError('SignIn', error);
      toast({
        title: 'Error',
        description: 'Failed to sign in. Please check your credentials and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 flex items-center justify-center py-24">
        <div className="container mx-auto px-4">
          <Card className="w-full max-w-md mx-auto bg-card/30 border-border/50">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Welcome to Hovr</CardTitle>
              <CardDescription className="text-center capitalize">
                Continue as {role}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <div className="flex gap-2 mb-4">
                    <Button
                      type="button"
                      variant={loginMethod === 'email' ? 'default' : 'outline'}
                      size="sm"
                      className="flex-1"
                      onClick={() => setLoginMethod('email')}
                    >
                      Email
                    </Button>
                    <Button
                      type="button"
                      variant={loginMethod === 'phone' ? 'default' : 'outline'}
                      size="sm"
                      className="flex-1"
                      onClick={() => setLoginMethod('phone')}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Phone
                    </Button>
                  </div>

                  <form onSubmit={handleSignIn} className="space-y-4">
                    {loginMethod === 'email' ? (
                      <div className="space-y-2">
                        <Label htmlFor="signin-email">Email</Label>
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="signin-phone">Phone Number</Label>
                        <Input
                          id="signin-phone"
                          type="tel"
                          placeholder="+1234567890"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          required
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="signin-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="signin-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <div className="flex gap-2 mb-4">
                    <Button
                      type="button"
                      variant={loginMethod === 'email' ? 'default' : 'outline'}
                      size="sm"
                      className="flex-1"
                      onClick={() => setLoginMethod('email')}
                    >
                      Email
                    </Button>
                    <Button
                      type="button"
                      variant={loginMethod === 'phone' ? 'default' : 'outline'}
                      size="sm"
                      className="flex-1"
                      onClick={() => setLoginMethod('phone')}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Phone
                    </Button>
                  </div>

                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-firstname">First Name</Label>
                        <Input
                          id="signup-firstname"
                          type="text"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-lastname">Last Name</Label>
                        <Input
                          id="signup-lastname"
                          type="text"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    {loginMethod === 'email' ? (
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="signup-phone">Phone Number</Label>
                        <Input
                          id="signup-phone"
                          type="tel"
                          placeholder="+1234567890"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          required
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Sign Up"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Auth;
