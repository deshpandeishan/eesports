import { useState } from 'react';
import { Calendar, MapPin, Trophy, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Events = () => {
  const [formData, setFormData] = useState({
    teamName: '',
    captainName: '',
    player1: '',
    player2: '',
    player3: '',
    player4: '',
    player5: '',
    contactNumber: '',
    email: '',
    paymentConfirmation: null as File | null
  });

  const { toast } = useToast();

  // Mock upcoming events
  const upcomingEvents = [
    {
      id: 1,
      name: 'BGMI Showdown 2025',
      date: '15 March 2025',
      location: 'Mumbai Gaming Arena',
      prizePool: '₹5,00,000',
      teamsRegistered: 64,
      maxTeams: 128,
      status: 'Registration Open'
    },
    {
      id: 2,
      name: 'Engineers Cup Championship',
      date: '22 March 2025',
      location: 'Online Tournament',
      prizePool: '₹2,50,000',
      teamsRegistered: 32,
      maxTeams: 64,
      status: 'Registration Open'
    },
    {
      id: 3,
      name: 'Pro League Qualifiers',
      date: '5 April 2025',
      location: 'Delhi Convention Center',
      prizePool: '₹7,50,000',
      teamsRegistered: 0,
      maxTeams: 256,
      status: 'Coming Soon'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['teamName', 'captainName', 'player1', 'player2', 'player3', 'player4', 'contactNumber', 'email'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    console.log('Team Registration Data:', formData);
    
    toast({
      title: "Registration Successful!",
      description: "Your team has been registered successfully. See you at the battlefield!",
    });

    // Reset form
    setFormData({
      teamName: '',
      captainName: '',
      player1: '',
      player2: '',
      player3: '',
      player4: '',
      player5: '',
      contactNumber: '',
      email: '',
      paymentConfirmation: null
    });
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="section-dark py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6 text-esports-white">
            Upcoming <span className="text-esports-grey">Events</span>
          </h1>
          <p className="text-xl text-esports-grey-light max-w-3xl mx-auto">
            Join the most competitive BGMI tournaments in India. 
            Battle for glory, prizes, and the chance to become legends.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-light py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-esports-black">
            Tournament <span className="text-esports-grey">Schedule</span>
          </h2>
          
          <div className="grid gap-8 max-w-4xl mx-auto">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-esports-black mb-2">{event.name}</h3>
                    <div className="flex flex-wrap gap-4 text-esports-grey-dark">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy size={16} />
                        <span>{event.prizePool}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span>{event.teamsRegistered}/{event.maxTeams} Teams</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      event.status === 'Registration Open' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {event.status}
                    </span>
                    {event.status === 'Registration Open' && (
                      <button 
                        className="btn-hero text-sm px-6 py-2 rounded-lg"
                        onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
                      >
                        Register Team
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="registration-form" className="section-dark py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8 text-esports-white">
              Team <span className="text-esports-grey">Registration</span>
            </h2>
            <p className="text-center text-esports-grey-light mb-12">
              Fill out the form below to register your team for upcoming tournaments.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-esports-white font-semibold mb-2">
                    Team Name *
                  </label>
                  <input
                    type="text"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-esports-white placeholder-esports-grey focus:border-esports-white focus:outline-none"
                    placeholder="Enter team name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-esports-white font-semibold mb-2">
                    Captain Name *
                  </label>
                  <input
                    type="text"
                    name="captainName"
                    value={formData.captainName}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-esports-white placeholder-esports-grey focus:border-esports-white focus:outline-none"
                    placeholder="Captain's name"
                    required
                  />
                </div>
              </div>

              <div>
                <h3 className="text-esports-white font-semibold mb-4">Player IGNs & IDs</h3>
                <div className="grid gap-4">
                  {['player1', 'player2', 'player3', 'player4', 'player5'].map((player, index) => (
                    <div key={player}>
                      <label className="block text-esports-grey-light text-sm mb-1">
                        Player {index + 1} {index < 4 ? '*' : '(Optional)'}
                      </label>
                      <input
                        type="text"
                        name={player}
                        value={formData[player as keyof typeof formData] as string}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-esports-white placeholder-esports-grey focus:border-esports-white focus:outline-none"
                        placeholder="Player IGN & ID"
                        required={index < 4}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-esports-white font-semibold mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-esports-white placeholder-esports-grey focus:border-esports-white focus:outline-none"
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>
                <div>
                  <label className="block text-esports-white font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-esports-white placeholder-esports-grey focus:border-esports-white focus:outline-none"
                    placeholder="team@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-esports-white font-semibold mb-2">
                  Payment Confirmation (Optional)
                </label>
                <input
                  type="file"
                  name="paymentConfirmation"
                  onChange={handleInputChange}
                  accept="image/*,.pdf"
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-esports-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-esports-white file:text-esports-black file:font-semibold hover:file:bg-esports-grey-light"
                />
                <p className="text-esports-grey text-sm mt-1">
                  Upload payment screenshot for paid tournaments
                </p>
              </div>

              <button
                type="submit"
                className="w-full btn-hero py-4 text-lg font-bold rounded-lg"
              >
                Register Your Team
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;