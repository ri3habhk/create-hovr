import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Settings, Plus, FileText, Users, Search, Bookmark, TrendingUp } from 'lucide-react';

const ClientDashboard = () => {
  const [hoveredActivity, setHoveredActivity] = useState<number | null>(null);

  const stats = {
    briefsPosted: 12,
    responses: 48,
    savedCreators: 15,
    activeProjects: 6
  };

  const activities = [
    { label: 'Brief Responses', value: 75, count: 156, color: 'bg-blue-500' },
    { label: 'Creator Views', value: 90, count: 234, color: 'bg-green-500' },
    { label: 'Messages Sent', value: 65, count: 89, color: 'bg-purple-500' },
    { label: 'Projects Completed', value: 85, count: 28, color: 'bg-orange-500' }
  ];

  const recommendedCreators = [
    { name: 'Sarah Chen', specialty: 'UI/UX Design', rating: 4.9 },
    { name: 'Marcus Johnson', specialty: 'Brand Identity', rating: 4.8 },
    { name: 'Priya Sharma', specialty: 'Social Media', rating: 4.9 }
  ];

  const activeBriefs = [
    { title: 'Mobile App Design', responses: 12, status: 'Active' },
    { title: 'Brand Logo Creation', responses: 8, status: 'Under Review' }
  ];

  return (
    <main className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Client Dashboard</h1>
              <p className="text-muted-foreground">Find and manage creative talent</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="bg-foreground text-background hover:bg-foreground/90">
                <Plus className="h-4 w-4 mr-2" />
                Post Brief
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-foreground">
                  <FileText className="h-5 w-5 mr-2" />
                  Briefs Posted
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{stats.briefsPosted}</p>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-foreground">
                  <Users className="h-5 w-5 mr-2" />
                  Responses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{stats.responses}</p>
                <p className="text-sm text-muted-foreground">From creators</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-foreground">
                  <Bookmark className="h-5 w-5 mr-2" />
                  Saved Creators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{stats.savedCreators}</p>
                <p className="text-sm text-muted-foreground">In favorites</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-foreground">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Active Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{stats.activeProjects}</p>
                <p className="text-sm text-muted-foreground">In progress</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Activity Analytics */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Project Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <div key={index} className="space-y-2 relative">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">{activity.label}</span>
                          <span className="text-sm font-medium text-foreground">{activity.value}%</span>
                        </div>
                        <div 
                          className="w-full bg-border/50 rounded-full h-2 relative cursor-pointer"
                          onMouseEnter={() => setHoveredActivity(index)}
                          onMouseLeave={() => setHoveredActivity(null)}
                        >
                          <div 
                            className={`h-2 rounded-full ${activity.color} transition-all duration-200 hover:opacity-80`}
                            style={{ width: `${activity.value}%` }}
                          />
                          {hoveredActivity === index && (
                            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-3 py-2 rounded-lg text-xs whitespace-nowrap z-10 shadow-lg">
                              {activity.value}% ({activity.count} total)
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-foreground"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Active Briefs */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Active Briefs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeBriefs.map((brief, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-foreground">{brief.title}</h4>
                          <p className="text-sm text-muted-foreground">{brief.responses} responses</p>
                        </div>
                        <Badge className="bg-foreground text-background">{brief.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
                    <Search className="h-4 w-4 mr-2" />
                    Find Creators
                  </Button>
                  <Button variant="outline" className="w-full border-border/50 text-foreground hover:bg-card">
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Brief
                  </Button>
                </CardContent>
              </Card>

              {/* Recommended Creators */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Recommended Creators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recommendedCreators.map((creator, index) => (
                      <div key={index} className="p-3 bg-background/50 rounded-lg">
                        <h4 className="font-medium text-foreground">{creator.name}</h4>
                        <p className="text-sm text-muted-foreground">{creator.specialty}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-foreground">★ {creator.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
  );
};

export default ClientDashboard;