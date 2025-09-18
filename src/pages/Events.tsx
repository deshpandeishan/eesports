import { Calendar, MapPin, Trophy, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Import tournament posters
import bgmiShowdownPoster from '@/assets/bgmi-showdown-poster.jpg';
import engineersCupPoster from '@/assets/engineers-cup-poster.jpg';
import proLeaguePoster from '@/assets/pro-league-poster.jpg';

const Events = () => {
  // Tournament data with posters
  const upcomingEvents = [
    {
      id: 1,
      name: 'BGMI Showdown 2025',
      date: '15 March 2025',
      time: '6:00 PM IST',
      location: 'Mumbai Gaming Arena',
      prizePool: '₹5,00,000',
      teamsRegistered: 64,
      maxTeams: 128,
      status: 'Registration Open',
      poster: bgmiShowdownPoster,
      description: 'The ultimate BGMI tournament featuring the best teams across India competing for glory and massive prize pool.',
      registrationFee: 249
    },
    {
      id: 2,
      name: 'Engineers Cup Championship',
      date: '22 March 2025', 
      time: '7:00 PM IST',
      location: 'Online Tournament',
      prizePool: '₹2,50,000',
      teamsRegistered: 32,
      maxTeams: 64,
      status: 'Registration Open',
      poster: engineersCupPoster,
      description: 'Exclusive tournament for engineering students and professionals. Show your tactical prowess.',
      registrationFee: 249
    },
    {
      id: 3,
      name: 'Pro League Qualifiers',
      date: '5 April 2025',
      time: '5:00 PM IST', 
      location: 'Delhi Convention Center',
      prizePool: '₹7,50,000',
      teamsRegistered: 0,
      maxTeams: 256,
      status: 'Coming Soon',
      poster: proLeaguePoster,
      description: 'Qualify for the prestigious Pro League championship. Only the best make it through.',
      registrationFee: 249
    }
  ];

  const pastEvents = [
    {
      id: 4,
      name: 'Winter Championship 2024',
      date: '15 December 2024',
      time: '6:00 PM IST',
      location: 'Bangalore Gaming Hub',
      prizePool: '₹3,00,000',
      teamsRegistered: 128,
      maxTeams: 128,
      status: 'Completed',
      poster: bgmiShowdownPoster,
      description: 'The winter finale tournament that brought together top BGMI teams.',
      registrationFee: 199
    }
  ];

  return (
    <div className="pt-16 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="section-dark py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6 text-esports-white hero-text">
            Tournament <span className="text-esports-grey">Events</span>
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
            Upcoming <span className="text-esports-grey">Tournaments</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:scale-[1.02] transition-all duration-300 card-premium">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={event.poster} 
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-card-foreground mb-2">{event.name}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{event.date} at {event.time}</span>
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
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      event.status === 'Registration Open' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {event.status}
                    </span>
                    <Link to={`/tournament/${event.id}`}>
                      <Button variant="default" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="section-dark py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-esports-white">
            Past <span className="text-esports-grey">Tournaments</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pastEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:scale-[1.02] transition-all duration-300 card-premium bg-card/50">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={event.poster} 
                    alt={event.name}
                    className="w-full h-full object-cover opacity-75"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-card-foreground mb-2">{event.name}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
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
                      <span>{event.teamsRegistered} Teams Participated</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                      {event.status}
                    </span>
                    <Link to={`/tournament/${event.id}`}>
                      <Button variant="outline" size="sm">
                        View Results
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;