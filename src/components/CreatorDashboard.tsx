import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Bell, Settings, Upload, Eye, MessageSquare, TrendingUp, DollarSign, Clock, CheckCircle } from 'lucide-react';

const CreatorDashboard = () => {
  const [hoveredActivity, setHoveredActivity] = useState<number | null>(null);
  const [earningsView, setEarningsView] = useState<'weekly' | 'monthly'>('monthly');

  const stats = {
    profileViews: 1240,
    pendingProjects: 3,
    unreadMessages: 7,
    totalEarnings: 125000,
    weeklyEarnings: 8500,
    monthlyEarnings: 32000,
    pendingEarnings: 45000,
    activeProjects: 4
  };

  const activities = [
    { label: 'Profile Views', value: 85, count: 1054, color: 'bg-blue-500' },
    { label: 'Project Responses', value: 60, count: 72, color: 'bg-green-500' },
    { label: 'Message Replies', value: 95, count: 114, color: 'bg-purple-500' },
    { label: 'Portfolio Updates', value: 40, count: 12, color: 'bg-orange-500' }
  ];

  const tips = [
    "Complete your portfolio to get 3x more views",
    "Respond to messages within 24 hours for better ranking",
    "Upload new work samples weekly to stay relevant"
  ];

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
              <Button variant="ghost" size="sm">
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
                <Tabs value={earningsView} onValueChange={(value) => setEarningsView(value as 'weekly' | 'monthly')} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-3">
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  </TabsList>
                  <TabsContent value="weekly">
                    <p className="text-3xl font-bold text-foreground">₹{stats.weeklyEarnings.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">This week</p>
                  </TabsContent>
                  <TabsContent value="monthly">
                    <p className="text-3xl font-bold text-foreground">₹{stats.monthlyEarnings.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">This month</p>
                  </TabsContent>
                </Tabs>
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
                    Activity Overview
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

              {/* Active Projects */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Active Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">E-commerce Brand Identity</h4>
                        <p className="text-sm text-muted-foreground">TechMart Solutions</p>
                      </div>
                      <Badge className="bg-foreground text-background">In Progress</Badge>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">Mobile App UI Design</h4>
                        <p className="text-sm text-muted-foreground">StartupXYZ</p>
                      </div>
                      <Badge variant="outline" className="border-orange-500 text-orange-500">Review</Badge>
                    </div>
                  </div>
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
                  <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
                    <Upload className="h-4 w-4 mr-2" />
                    Add to Portfolio
                  </Button>
                </CardContent>
              </Card>

              {/* Growth Tips */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Growth Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tips.map((tip, index) => (
                      <div key={index} className="text-sm text-muted-foreground p-3 bg-background/50 rounded-lg">
                        {tip}
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

export default CreatorDashboard;