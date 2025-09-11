import { useState } from 'react';

const About = () => {
  // Mock team data - 12 core members
  const teamMembers = [
    { id: 1, name: 'Arjun Sharma', role: 'Founder & CEO', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun' },
    { id: 2, name: 'Priya Patel', role: 'Tech Lead', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya' },
    { id: 3, name: 'Rohit Kumar', role: 'Marketing Lead', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohit' },
    { id: 4, name: 'Sneha Reddy', role: 'Operations Manager', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha' },
    { id: 5, name: 'Vikram Singh', role: 'Tournament Director', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikram' },
    { id: 6, name: 'Anita Gupta', role: 'Community Manager', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anita' },
    { id: 7, name: 'Rajesh Nair', role: 'Broadcast Lead', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh' },
    { id: 8, name: 'Kavya Iyer', role: 'Content Creator', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kavya' },
    { id: 9, name: 'Amit Joshi', role: 'Sponsor Relations', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amit' },
    { id: 10, name: 'Deepika Rao', role: 'Event Coordinator', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=deepika' },
    { id: 11, name: 'Karthik Menon', role: 'Technical Support', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karthik' },
    { id: 12, name: 'Meera Shah', role: 'Finance Manager', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=meera' }
  ];

  return (
    <div className="pt-16">
      {/* Introduction Section */}
      <section className="section-dark py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-8 text-esports-white">
              About <span className="text-esports-grey">Engineers Esports</span>
            </h1>
            <p className="text-xl text-esports-grey-light leading-relaxed mb-8">
              Founded by passionate engineers and gaming enthusiasts, Engineers Esports 
              represents the perfect fusion of technical excellence and competitive gaming spirit.
            </p>
            <p className="text-lg text-esports-grey leading-relaxed">
              We believe that the future of esports lies in precision, innovation, and community. 
              Our mission is to create world-class tournament experiences that showcase the 
              incredible talent within India's BGMI community while setting new standards 
              for competitive integrity and production quality.
            </p>
          </div>
        </div>
      </section>

      {/* Core Team Section */}
      <section className="section-light py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-esports-black">
            Our <span className="text-esports-grey">Core Team</span>
          </h2>
          <p className="text-center text-esports-grey-dark mb-16 text-lg">
            Meet the engineers behind the esports revolution
          </p>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-esports-grey-light">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <h3 className="text-lg font-bold text-esports-black mb-1">
                  {member.name}
                </h3>
                <p className="text-esports-grey font-medium">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="section-dark py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-esports-white">
                Our <span className="text-esports-grey">Vision</span>
              </h2>
              <p className="text-lg text-esports-grey-light leading-relaxed mb-6">
                To become India's premier esports organization, known for innovation, 
                integrity, and world-class tournament production.
              </p>
              <ul className="space-y-3 text-esports-grey-light">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-esports-white rounded-full mr-3"></span>
                  Excellence in tournament organization
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-esports-white rounded-full mr-3"></span>
                  Community-first approach
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-esports-white rounded-full mr-3"></span>
                  Innovation in gaming technology
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-esports-white rounded-full mr-3"></span>
                  Transparent and fair competition
                </li>
              </ul>
            </div>
            <div className="text-center">
              <div className="card-premium p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-esports-white mb-4">Our Impact</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-esports-white">50+</div>
                    <div className="text-esports-grey">Tournaments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-esports-white">10K+</div>
                    <div className="text-esports-grey">Players</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-esports-white">₹50L+</div>
                    <div className="text-esports-grey">Prize Pool</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-esports-white">2M+</div>
                    <div className="text-esports-grey">Viewership</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Statement */}
      <section className="section-light py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-esports-black mb-4">
            "Together, we build the future of <span className="text-esports-grey">esports</span>."
          </h2>
          <p className="text-esports-grey-dark text-lg">
            Join us on our journey to elevate Indian esports to global standards.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;