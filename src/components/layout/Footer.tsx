import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">IS</span>
              </div>
              <div>
                <p className="font-bold leading-tight">INK Star</p>
                <p className="text-xs opacity-80 leading-tight">Printers & Plastic Machinery</p>
              </div>
            </div>
            <p className="text-sm opacity-80">
              Premium printing & packaging solutions with quality, speed & sustainability. 
              Over 10 years of industry experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products?category=bags" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">
                  Bags & Packaging
                </Link>
              </li>
              <li>
                <Link to="/products?category=stationery" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">
                  Business Stationery
                </Link>
              </li>
              <li>
                <Link to="/products?category=boxes" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">
                  Boxes & Pouches
                </Link>
              </li>
              <li>
                <Link to="/products?category=specialty" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">
                  Specialty Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 shrink-0 text-primary" />
                <span className="opacity-80">Industrial Area, Your City, State - 123456</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span className="opacity-80">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span className="opacity-80">info@inkstar.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 shrink-0 text-primary" />
                <span className="opacity-80">WhatsApp Available</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-secondary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-60">
              © {currentYear} INK Star Printers & Plastic Machinery. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
