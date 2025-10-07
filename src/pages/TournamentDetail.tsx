import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Trophy, Users, ArrowLeft, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

const TournamentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [tournament, setTournament] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    teamName: '',
    captainName: '',
    player1: '',
    player2: '',
    player3: '',
    player4: '',
    player5: '',
    contactNumber: '',
    email: ''
  });

  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tournaments/${id}`);
        if (!response.ok) throw new Error('Tournament not found');
        const data = await response.json();
        setTournament(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTournament();
  }, [id]);

  if (loading) return <div className="pt-16 min-h-screen flex items-center justify-center">Loading...</div>;
  if (error || !tournament) return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Tournament Not Found</h1>
        <Button onClick={() => navigate('/events')}>Back to Events</Button>
      </div>
    </div>
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register-event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 1,
          event_name: tournament.name,
          team_name: formData.teamName,
          captain_name: formData.captainName,
          players: [formData.player1, formData.player2, formData.player3, formData.player4, formData.player5],
          contact_number: formData.contactNumber,
          email: formData.email
        })
      });

      if (!response.ok) throw new Error('Failed to register team');

      await response.json();
      toast({
        title: "Registration Successful",
        description: `Your team has been registered for ${tournament.name}`,
      });

      setShowPayment(true);

    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong",
        variant: "destructive"
      });
    }
  };

  const handlePayment = async () => {
    try {
      const registrationResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register-event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 1,
          event_name: tournament.name
        })
      });
      const registrationData = await registrationResponse.json();

      if (!registrationResponse.ok) throw new Error(registrationData.error || 'Registration failed');

      const paymentResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 1,
          amount: tournament.registrationFee,
          status: 'Paid'
        })
      });
      const paymentData = await paymentResponse.json();

      if (!paymentResponse.ok) throw new Error(paymentData.error || 'Payment failed');

      toast({
        title: "Registration Successful!",
        description: `Your team has been registered and payment of ₹${tournament.registrationFee} is successful!`,
      });

      setFormData({
        teamName: '',
        captainName: '',
        player1: '',
        player2: '',
        player3: '',
        player4: '',
        player5: '',
        contactNumber: '',
        email: ''
      });
      setShowPayment(false);
      navigate('/events');

    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-background">
      {/* Header */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/events')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
        </div>
      </section>

      {/* Tournament Poster */}
      <section className="relative">
        <div className="aspect-[21/9] overflow-hidden">
          <img 
            src={tournament.poster} 
            alt={tournament.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-end">
            <div className="container mx-auto px-6 py-12">
              <h1 className="text-5xl font-bold text-white hero-text mb-4">
                {tournament.name}
              </h1>
              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  <span className="text-lg">{tournament.date} at {tournament.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={20} />
                  <span className="text-lg">{tournament.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy size={20} />
                  <span className="text-lg font-bold">{tournament.prizePool}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tournament Info and Registration */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Tournament Info */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Tournament Details
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      tournament.status === 'Registration Open' 
                        ? 'bg-green-100 text-green-800' 
                        : tournament.status === 'Completed'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {tournament.status}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {tournament.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Users className="text-muted-foreground" size={20} />
                        <div>
                          <div className="font-semibold">Teams Registered</div>
                          <div className="text-muted-foreground">{tournament.teamsRegistered}/{tournament.maxTeams}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <CreditCard className="text-muted-foreground" size={20} />
                        <div>
                          <div className="font-semibold">Registration Fee</div>
                          <div className="text-muted-foreground">₹{tournament.registrationFee} per team</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {tournament.rules?.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Tournament Rules</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        {tournament.rules.map((rule: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1.5 text-xs">●</span>
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Registration Form */}
            {tournament.status === 'Registration Open' && (
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Team Registration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="teamName">Team Name *</Label>
                        <Input
                          id="teamName"
                          name="teamName"
                          value={formData.teamName}
                          onChange={handleInputChange}
                          placeholder="Enter team name"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="captainName">Captain Name *</Label>
                        <Input
                          id="captainName"
                          name="captainName"
                          value={formData.captainName}
                          onChange={handleInputChange}
                          placeholder="Captain's name"
                          required
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium mb-3 block">Player IGNs</Label>
                        <div className="space-y-3">
                          {['player1', 'player2', 'player3', 'player4', 'player5'].map((player, index) => (
                            <Input
                              key={player}
                              name={player}
                              value={formData[player as keyof typeof formData]}
                              onChange={handleInputChange}
                              placeholder={`Player ${index + 1}${index < 4 ? ' *' : ' (Optional)'}`}
                              required={index < 4}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="contactNumber">Contact Number *</Label>
                        <Input
                          id="contactNumber"
                          name="contactNumber"
                          type="tel"
                          value={formData.contactNumber}
                          onChange={handleInputChange}
                          placeholder="+91 XXXXX XXXXX"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="team@example.com"
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        Register Now - ₹{tournament.registrationFee}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard size={20} />
                Payment - ₹{tournament.registrationFee}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Complete your team registration by making the payment of ₹{tournament.registrationFee}
              </p>
              
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-medium">Payment Methods:</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• UPI Payment</li>
                  <li>• Debit/Credit Card</li>
                  <li>• Net Banking</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowPayment(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handlePayment}
                  className="flex-1"
                >
                  Pay Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TournamentDetail;
