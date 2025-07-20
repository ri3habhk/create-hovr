
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DollarSign, Clock, CheckCircle, AlertTriangle, Calendar } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const totalEarnings = 125000;
  const pendingEarnings = 45000;

  const projects = [
    {
      id: 1,
      title: "E-commerce Brand Identity",
      client: "TechMart Solutions",
      deadline: "2024-07-15",
      timeRemaining: 85,
      status: "In Progress",
      payment: 25000,
      description: "Complete brand identity package including logo, colors, and guidelines"
    },
    {
      id: 2,
      title: "Mobile App UI Design",
      client: "StartupXYZ",
      deadline: "2024-07-08",
      timeRemaining: 25,
      status: "In Progress",
      payment: 35000,
      description: "UI/UX design for fitness tracking mobile application"
    },
    {
      id: 3,
      title: "Website Redesign",
      client: "Local Restaurant",
      deadline: "2024-07-06",
      timeRemaining: 10,
      status: "Urgent",
      payment: 18000,
      description: "Complete website redesign with modern responsive layout"
    },
    {
      id: 4,
      title: "Product Photography",
      client: "Fashion Brand Co",
      deadline: "2024-07-20",
      timeRemaining: 95,
      status: "Just Started",
      payment: 22000,
      description: "Product photography for new clothing line launch"
    }
  ];

  const getTextColor = (timeRemaining: number) => {
    if (timeRemaining < 15) return 'text-red-400';
    if (timeRemaining < 30) return 'text-yellow-400';
    return 'text-foreground';
  };

  const getStatusColor = (timeRemaining: number) => {
    if (timeRemaining < 15) return 'destructive';
    if (timeRemaining < 30) return 'outline';
    return 'secondary';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Creator Dashboard</h1>
            <p className="text-muted-foreground">Track your earnings and manage ongoing projects</p>
          </div>

          {/* Earnings Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Total Earnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-400">
                  ₹{totalEarnings.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Lifetime earnings</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Pending Payments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-orange-400">
                  ₹{pendingEarnings.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Awaiting completion</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Active Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-400">{projects.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Currently working on</p>
              </CardContent>
            </Card>
          </div>

          {/* Active Projects */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Active Projects</h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <Card 
                  key={project.id} 
                  className="bg-card/50 border-border/50 transition-all hover:shadow-md"
                >
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className={`text-xl mb-2 flex items-center ${getTextColor(project.timeRemaining)}`}>
                          {project.title}
                          {project.timeRemaining < 15 && (
                            <AlertTriangle className="h-5 w-5 ml-2 text-red-400" />
                          )}
                        </CardTitle>
                        <p className="text-muted-foreground mb-2">Client: {project.client}</p>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${getTextColor(project.timeRemaining)}`}>₹{project.payment.toLocaleString()}</p>
                        <Badge variant={getStatusColor(project.timeRemaining) as any} className="mt-1">
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Deadline: {new Date(project.deadline).toLocaleDateString()}
                        </span>
                        <span className={`font-medium ${getTextColor(project.timeRemaining)}`}>
                          {project.timeRemaining}% time remaining
                        </span>
                      </div>
                      <Progress 
                        value={project.timeRemaining} 
                        className={`h-2 ${
                          project.timeRemaining < 15 ? '[&>div]:bg-red-500' :
                          project.timeRemaining < 30 ? '[&>div]:bg-yellow-500' : ''
                        }`}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
