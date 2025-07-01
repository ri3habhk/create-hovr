
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Plus, Mail, User, Lock, CreditCard, Shield } from 'lucide-react';

const CreateSection = () => {
  return (
    <section id="create" className="py-20 bg-gradient-to-br from-background to-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Create Your
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Account</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of creators and clients on Hovr. Get started in minutes with secure authentication.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sign Up Form */}
            <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Google Sign Up */}
                <Button className="w-full" variant="outline" size="lg">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
                  </div>
                </div>

                {/* Email Sign Up */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" placeholder="Enter your email address" className="pl-10" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="password">Create Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="password" type="password" placeholder="Create a secure password" className="pl-10" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="userType">Account Type</Label>
                    <select id="userType" className="w-full p-3 bg-background border border-border rounded-md">
                      <option value="creator">I'm a Creator</option>
                      <option value="client">I'm a Client</option>
                    </select>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white" size="lg">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Account
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
              </CardContent>
            </Card>

            {/* Account Benefits */}
            <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Why Join Hovr?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">Secure Payments</h4>
                      <p className="text-muted-foreground text-sm">All transactions are processed through our secure escrow system with full payment protection.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CreditCard className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">Wallet Dashboard</h4>
                      <p className="text-muted-foreground text-sm">Track all your earnings and payments in one secure dashboard. Withdraw funds easily after verification.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">AI-Powered Matching</h4>
                      <p className="text-muted-foreground text-sm">Our intelligent system matches you with the perfect projects or creators based on your needs.</p>
                    </div>
                  </div>
                </div>

                <Card className="bg-background/20 border-border/50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2 text-primary">Payment Verification Required</h4>
                    <p className="text-sm text-muted-foreground">
                      To withdraw funds from your wallet, you need to upload valid payment details including bank account information or preferred payment method for secure transactions.
                    </p>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account? <a href="#" className="text-primary hover:underline">Sign in here</a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateSection;
