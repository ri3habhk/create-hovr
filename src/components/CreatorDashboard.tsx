import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Settings, Upload, Eye, MessageSquare, DollarSign } from 'lucide-react';
import logError from '@/lib/errorLogger';

const CreatorDashboard = () => {
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadPortfolios();
  }, []);

  const loadPortfolios = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('creator_portfolios')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      if (data) {
        setPortfolios(data);
      }
    } catch (error) {
      logError('CreatorDashboard', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    profileViews: 0,
    pendingProjects: 0,
    totalEarnings: 0
  };

  return (
    <main className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Creator Dashboard</h1>
              <p className="text-muted-foreground">Manage your creative business</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button 
                onClick={() => navigate('/settings')}
                variant="ghost" 
                size="sm"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-foreground">
                  <Eye className="h-5 w-5 mr-2" />
                  Profile Views
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{stats.profileViews}</p>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-foreground">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Pending Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{stats.pendingProjects}</p>
                <p className="text-sm text-muted-foreground">Awaiting response</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-foreground">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Earnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-foreground">₹{stats.totalEarnings.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total earned</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Portfolio Status */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Your Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <p className="text-muted-foreground text-center py-4">Loading portfolio...</p>
                  ) : portfolios.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">No portfolio created yet</p>
                      <Button 
                        onClick={() => navigate('/portfolio-setup')}
                        variant="outline"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Create Your Portfolio
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {portfolios.map((portfolio) => (
                        <div key={portfolio.id} className="p-4 bg-background/50 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-foreground">{portfolio.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{portfolio.bio?.substring(0, 100)}...</p>
                              <div className="flex gap-2 mt-2">
                                {portfolio.skills?.slice(0, 3).map((skill: string, index: number) => (
                                  <span key={index} className="text-xs bg-background px-2 py-1 rounded">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded ${portfolio.is_published ? 'bg-green-500/20 text-green-500' : 'bg-orange-500/20 text-orange-500'}`}>
                              {portfolio.is_published ? 'Published' : 'Draft'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Quick Upload */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Quick Upload</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => navigate('/portfolio-setup')}
                    className="w-full bg-foreground text-background hover:bg-foreground/90"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Add to Portfolio
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  {portfolios.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Create your portfolio to start getting noticed by clients
                    </p>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-sm text-muted-foreground p-3 bg-background/50 rounded-lg">
                        Portfolio created: <span className="text-foreground font-medium">{portfolios[0]?.title}</span>
                        <p className="text-xs mt-1">{new Date(portfolios[0]?.created_at).toLocaleDateString()}</p>
                      </div>
                      {portfolios[0]?.is_published && (
                        <div className="text-sm text-muted-foreground p-3 bg-background/50 rounded-lg">
                          ✓ Portfolio is live and visible to clients
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
  );
};

export default CreatorDashboard;