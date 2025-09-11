import { Instagram, Twitter, Youtube, Twitch } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, label: 'Instagram', url: '#' },
    { icon: Twitter, label: 'Twitter', url: '#' },
    { icon: Youtube, label: 'YouTube', url: '#' },
    { icon: Twitch, label: 'Twitch', url: '#' },
  ];

  return (
    <footer className="section-dark py-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="text-center">
          {/* Logo */}
          <div className="brand-logo text-2xl mb-6">
            <span className="text-esports-white">ENGINEERS</span>
            <span className="text-esports-grey ml-2">eSports</span>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-8">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-esports-grey hover:text-esports-white hover:bg-white/20 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-esports-grey text-sm">
            <p>&copy; 2025 Engineers Esports. All rights reserved.</p>
            <p className="mt-2">Engineered to Win. Built to Last.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;