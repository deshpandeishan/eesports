import { Link } from 'react-router-dom';
import { ChevronRight, Trophy, Users, Calendar } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

const Home = () => {
  // Mock countdown for next event (3 days from now)
  const eventDate = new Date();
  eventDate.setDate(eventDate.getDate() + 3);
  
  return (
    <>
      {/* Hero Section */}
      <section 
        className="section-hero flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="hero-text text-5xl md:text-7xl text-esports-white mb-6">
            Engineered to Win.
            <br />
            <span className="text-esports-grey">Built to Last.</span>
          </h1>
          <p className="text-xl md:text-2xl text-esports-grey-light mb-8 max-w-3xl mx-auto">
            Pioneering the future of BGMI tournaments and esports events.
          </p>
          <Link 
            to="/events" 
            className="btn-hero inline-flex items-center gap-2 rounded-lg"
          >
            Join the Action
            <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="section-dark py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-esports-white">
            Tournament <span className="text-esports-grey">Highlights</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Upcoming Event Card */}
            <div className="card-premium p-8 rounded-xl text-center">
              <Calendar className="w-12 h-12 text-esports-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-esports-white mb-2">Next Event</h3>
              <p className="text-esports-grey mb-4">BGMI Championship 2025</p>
              <div className="text-2xl font-bold text-esports-white">
                {Math.ceil((eventDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24))} Days
              </div>
              <p className="text-esports-grey-light text-sm">to go</p>
            </div>

            {/* Prize Pool Card */}
            <div className="card-premium p-8 rounded-xl text-center">
              <Trophy className="w-12 h-12 text-esports-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-esports-white mb-2">Prize Pool</h3>
              <p className="text-esports-grey mb-4">Total Rewards</p>
              <div className="text-2xl font-bold text-esports-white">₹5,00,000</div>
              <p className="text-esports-grey-light text-sm">and growing</p>
            </div>

            {/* Teams Card */}
            <div className="card-premium p-8 rounded-xl text-center">
              <Users className="w-12 h-12 text-esports-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-esports-white mb-2">Teams</h3>
              <p className="text-esports-grey mb-4">Registered Teams</p>
              <div className="text-2xl font-bold text-esports-white">128+</div>
              <p className="text-esports-grey-light text-sm">and counting</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Link 
              to="/events" 
              className="btn-outline inline-flex items-center gap-2 rounded-lg"
            >
              View All Events
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Core Message Section */}
      <section className="section-light py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8 text-esports-black">
            Our <span className="text-esports-grey">Mission</span>
          </h2>
          <p className="text-xl text-esports-grey-dark max-w-4xl mx-auto leading-relaxed">
            At Engineers Esports, we're not just organizing tournaments – we're building 
            the future of competitive gaming in India. Our commitment to excellence, 
            innovation, and community drives every event we create.
          </p>
          <div className="mt-12">
            <Link 
              to="/about" 
              className="inline-flex items-center gap-2 text-esports-black border-2 border-esports-black px-6 py-3 rounded-lg font-bold hover:bg-esports-black hover:text-esports-white transition-all duration-300"
            >
              Learn More About Us
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;