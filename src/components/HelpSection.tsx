
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Bot, Users, AlertCircle, Search, Send } from 'lucide-react';
import { useState } from 'react';

const HelpSection = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'bot',
      message: "Hello! I'm your AI assistant. I can help resolve disputes, answer questions about payments, projects, and platform policies. How can I assist you today?"
    }
  ]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage = { type: 'user', message: chatMessage };
    setChatHistory([...chatHistory, newMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        type: 'bot',
        message: "I understand your concern. Let me help you with this issue. Based on our platform policies, here's what I recommend..."
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);
    
    setChatMessage('');
  };

  const helpCategories = [
    {
      title: "Payment Issues",
      description: "Problems with payments, withdrawals, or billing",
      icon: AlertCircle,
      color: "text-red-400"
    },
    {
      title: "Project Disputes",
      description: "Resolve conflicts between creators and clients",
      icon: Users,
      color: "text-yellow-400"
    },
    {
      title: "Account Support",
      description: "Account access, verification, and settings",
      icon: Search,
      color: "text-blue-400"
    }
  ];

  return (
    <section id="help" className="py-20 bg-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Get
            <span className="gradient-accent bg-clip-text text-transparent"> Help</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered support system is here to help resolve disputes and answer your questions 24/7
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* AI Chatbot */}
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="h-5 w-5 mr-2 text-primary" />
                  AI Support Assistant
                  <Badge className="ml-2 gradient-accent">Live</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Chat History */}
                <div className="h-64 overflow-y-auto mb-4 space-y-3 bg-background/20 rounded-lg p-4">
                  {chatHistory.map((chat, index) => (
                    <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs p-3 rounded-lg ${
                        chat.type === 'user' 
                          ? 'bg-primary text-primary-foreground ml-4' 
                          : 'bg-muted text-muted-foreground mr-4'
                      }`}>
                        <p className="text-sm">{chat.message}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Describe your issue or ask a question..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1 min-h-[60px]"
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                  />
                  <Button onClick={handleSendMessage} className="gradient-accent">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground mt-2">
                  Our AI can handle most common issues instantly. For complex disputes, you'll be connected with a human agent.
                </p>
              </CardContent>
            </Card>

            {/* Help Categories */}
            <div className="space-y-6">
              <Card className="gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>Common Issues</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {helpCategories.map((category, index) => (
                      <Card key={index} className="bg-background/20 border-border/50 hover-lift cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <category.icon className={`h-5 w-5 ${category.color} mt-1`} />
                            <div>
                              <h4 className="font-semibold">{category.title}</h4>
                              <p className="text-muted-foreground text-sm">{category.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Dispute Resolution Info */}
              <Card className="gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2 text-primary" />
                    Dispute Resolution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-primary mb-2">How It Works</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• AI analyzes the dispute within minutes</li>
                        <li>• Both parties provide evidence and statements</li>
                        <li>• Fair resolution based on platform policies</li>
                        <li>• Escalation to human agents if needed</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Response Times</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• AI responses: Instant</li>
                        <li>• Simple disputes: Within 2 hours</li>
                        <li>• Complex disputes: Within 24 hours</li>
                        <li>• Payment issues: Within 1 hour</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpSection;
