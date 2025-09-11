import { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Twitter, Youtube, Twitch } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    console.log('Contact Form Data:', formData);
    
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you soon!",
    });

    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', url: '#', color: 'hover:text-pink-400' },
    { icon: Twitter, label: 'Twitter', url: '#', color: 'hover:text-blue-400' },
    { icon: Youtube, label: 'YouTube', url: '#', color: 'hover:text-red-500' },
    { icon: Twitch, label: 'Twitch', url: '#', color: 'hover:text-purple-500' },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="section-dark py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6 text-esports-white">
            Get In <span className="text-esports-grey">Touch</span>
          </h1>
          <p className="text-xl text-esports-grey-light max-w-3xl mx-auto">
            Have questions about tournaments, partnerships, or want to join our community? 
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-light py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-esports-black">
                Send Us a <span className="text-esports-grey">Message</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-esports-black font-semibold mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-lg border-2 border-esports-grey-light focus:border-esports-black focus:outline-none transition-all duration-300"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-esports-black font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-lg border-2 border-esports-grey-light focus:border-esports-black focus:outline-none transition-all duration-300"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-esports-black font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full p-4 rounded-lg border-2 border-esports-grey-light focus:border-esports-black focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Tell us what's on your mind..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-esports-black text-esports-white py-4 px-8 rounded-lg font-bold hover:bg-esports-grey-dark transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-esports-black">
                Contact <span className="text-esports-grey">Information</span>
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-esports-black rounded-lg flex items-center justify-center">
                    <Mail className="text-esports-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-esports-black">Email</h3>
                    <p className="text-esports-grey-dark">support@EReSports.org</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-esports-black rounded-lg flex items-center justify-center">
                    <Phone className="text-esports-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-esports-black">Phone</h3>
                    <p className="text-esports-grey-dark">+91 9XXXX XXXXX</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-esports-black rounded-lg flex items-center justify-center">
                    <MapPin className="text-esports-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-esports-black">Office</h3>
                    <p className="text-esports-grey-dark">Mumbai, Maharashtra, India</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-esports-black">Follow Us</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      className={`w-12 h-12 bg-esports-grey-light rounded-lg flex items-center justify-center text-esports-black transition-all duration-300 ${social.color} hover:scale-110`}
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-10 p-6 bg-esports-grey-light rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-esports-black">Business Hours</h3>
                <div className="space-y-2 text-esports-grey-dark">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-dark py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-esports-white mb-4">
            Ready to Join the <span className="text-esports-grey">Revolution?</span>
          </h2>
          <p className="text-esports-grey-light text-lg mb-8">
            Whether you're a player, sponsor, or fan - there's a place for you in the Engineers Esports family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/events" 
              className="btn-hero inline-block rounded-lg"
            >
              Join Tournament
            </a>
            <a 
              href="mailto:support@EReSports.org" 
              className="btn-outline inline-block rounded-lg"
            >
              Partnership Inquiry
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;