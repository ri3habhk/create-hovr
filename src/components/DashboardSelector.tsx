import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, User } from 'lucide-react';
import CreatorDashboard from './CreatorDashboard';
import ClientDashboard from './ClientDashboard';

const DashboardSelector = () => {
  const [selectedDashboard, setSelectedDashboard] = useState<'creator' | 'client'>('creator');

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Type Selector */}
      <div className="border-b border-border/40 bg-background sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center py-4">
            <Card className="bg-card/50 border-border/50 p-1">
              <CardContent className="p-0">
                <div className="flex space-x-1">
                  <Button
                    variant={selectedDashboard === 'creator' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedDashboard('creator')}
                    className={`${
                      selectedDashboard === 'creator'
                        ? 'bg-foreground text-background'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Creator Dashboard
                  </Button>
                  <Button
                    variant={selectedDashboard === 'client' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedDashboard('client')}
                    className={`${
                      selectedDashboard === 'client'
                        ? 'bg-foreground text-background'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Client Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      {selectedDashboard === 'creator' ? <CreatorDashboard /> : <ClientDashboard />}
    </div>
  );
};

export default DashboardSelector;