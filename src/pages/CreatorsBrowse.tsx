
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Users, Folder, Search, Filter } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const CreatorsBrowse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const creators = [
    {
      name: "Sarah Chen",
      initials: "SC",
      specialty: "Brand Designer",
      rating: 4.9,
      projects: 127,
      location: "Mumbai, India",
      tags: ["Logo Design", "Brand Identity", "UI/UX"],
      priceRange: "₹5,000 - ₹25,000",
      premium: true
    },
    {
      name: "Arjun Patel",
      initials: "AP",
      specialty: "Video Editor",
      rating: 4.8,
      projects: 89,
      location: "Delhi, India",
      tags: ["Motion Graphics", "Color Grading", "Social Media"],
      priceRange: "₹3,000 - ₹15,000",
      premium: false
    },
    {
      name: "Priya Sharma",
      initials: "PS",
      specialty: "Filmmaker",
      rating: 5.0,
      projects: 45,
      location: "Bangalore, India",
      tags: ["Cinematography", "Documentary", "Commercial"],
      priceRange: "₹10,000 - ₹50,000",
      premium: true
    },
    {
      name: "Raj Kumar",
      initials: "RK",
      specialty: "Graphic Designer",
      rating: 4.7,
      projects: 156,
      location: "Chennai, India",
      tags: ["Print Design", "Packaging", "Illustrations"],
      priceRange: "₹4,000 - ₹20,000",
      premium: false
    },
    {
      name: "Kavya Menon",
      initials: "KM",
      specialty: "Content Creator",
      rating: 4.9,
      projects: 203,
      location: "Kochi, India",
      tags: ["Social Media", "Copywriting", "Strategy"],
      priceRange: "₹2,500 - ₹12,000",
      premium: true
    },
    {
      name: "Vikram Singh",
      initials: "VS",
      specialty: "Photographer",
      rating: 4.8,
      projects: 98,
      location: "Jaipur, India",
      tags: ["Portrait", "Product", "Event"],
      priceRange: "₹8,000 - ₹35,000",
      premium: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="py-20 bg-gradient-to-br from-background to-background/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Browse All
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Creators</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover talented professionals ready to bring your marketing vision to life
              </p>
            </div>

            {/* Search and Filter Section */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search creators by name, skill, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="photography">Photography</SelectItem>
                    <SelectItem value="content">Content</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Creators Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {creators.map((creator, index) => (
                <Card key={index} className="gradient-card border-border/50 hover-lift group overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">{creator.initials}</span>
                      </div>
                      {creator.premium && (
                        <Badge className="absolute -top-2 -right-2 gradient-accent">
                          Premium
                        </Badge>
                      )}
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold text-lg">{creator.name}</h3>
                      <p className="text-primary font-medium">{creator.specialty}</p>
                      <p className="text-sm text-muted-foreground">{creator.location}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium">{creator.rating}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Folder className="h-4 w-4 mr-1" />
                        {creator.projects} projects
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {creator.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="text-center mb-4">
                      <p className="text-sm font-medium text-primary">{creator.priceRange}</p>
                      <p className="text-xs text-muted-foreground">per project</p>
                    </div>

                    <Button className="w-full group-hover:gradient-accent transition-all duration-300">
                      <Users className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CreatorsBrowse;
