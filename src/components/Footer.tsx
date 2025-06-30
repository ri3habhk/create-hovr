
import { Button } from '@/components/ui/button';
import { Mail, Users, Folder } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Platform: [
      'How It Works',
      'Find Creators',
      'Post a Project',
      'Success Stories',
      'Help Center'
    ],
    Creators: [
      'Join as Creator',
      'Creator Resources',
      'Portfolio Tips',
      'Pricing Guide',
      'Success Stories'
    ],
    Clients: [
      'Post Your Project',
      'Find Talent',
      'Client Resources',
      'Project Management',
      'Quality Guarantee'
    ],
    Company: [
      'About Us',
      'Careers',
      'Press',
      'Partner Program',
      'Contact'
    ],
    Legal: [
      'Terms of Service',
      'Privacy Policy',
      'Payment Terms',
      'Creator Agreement',
      'Client Agreement'
    ]
  };

  return (
    <footer className="bg-background border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <h3 className="text-2xl font-bold gradient-accent bg-clip-text text-transparent mb-4">
              CreativeHub
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              The premier marketplace connecting brands with elite marketing creators worldwide.
            </p>
            <div className="flex space-x-2">
              <Button size="sm" className="gradient-accent">
                <Users className="h-4 w-4 mr-2" />
                Join Now
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="lg:col-span-1">
              <h4 className="font-semibold mb-4 text-foreground">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment & Security Info */}
        <div className="border-t border-border/40 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4 text-primary">Payment Security</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Secure escrow payment system</li>
                <li>• 30% upfront, 70% on completion</li>
                <li>• 5% platform fee (transparent pricing)</li>
                <li>• Full payment protection guarantee</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-primary">Quality Assurance</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Verified creator profiles</li>
                <li>• Portfolio validation system</li>
                <li>• Client satisfaction guarantee</li>
                <li>• 24/7 dispute resolution</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border/40 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2024 CreativeHub. All rights reserved. | 
              <span className="text-xs ml-2">
                Platform fee: 5% on all transactions (non-negotiable)
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
