import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Calendar, Trophy, MapPin, Upload, Users } from 'lucide-react';

interface Tournament {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  prizePool: string;
  registrationFee: number;
  maxTeams: number;
  teamsRegistered: number;
  status: 'Registration Open' | 'Coming Soon' | 'Completed';
  poster: string;
  description: string;
  rules: string;
}

const AdminEventManagement = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Tournament | null>(null);
  
  // Mock data - will be replaced with Supabase data
  const [tournaments, setTournaments] = useState<Tournament[]>([
    {
      id: '1',
      name: 'BGMI Showdown 2025',
      date: '15 March 2025',
      time: '6:00 PM IST',
      location: 'Mumbai Gaming Arena',
      prizePool: '₹5,00,000',
      registrationFee: 249,
      maxTeams: 128,
      teamsRegistered: 64,
      status: 'Registration Open',
      poster: '/src/assets/bgmi-showdown-poster.jpg',
      description: 'The ultimate BGMI tournament featuring the best teams across India competing for glory and massive prize pool.',
      rules: 'Standard BGMI tournament rules apply. Teams must have 4 players + 1 substitute.'
    },
    {
      id: '2',
      name: 'Engineers Cup Championship',
      date: '22 March 2025',
      time: '7:00 PM IST',
      location: 'Online Tournament',
      prizePool: '₹2,50,000',
      registrationFee: 249,
      maxTeams: 64,
      teamsRegistered: 32,
      status: 'Registration Open',
      poster: '/src/assets/engineers-cup-poster.jpg',
      description: 'Exclusive tournament for engineering students and professionals. Show your tactical prowess.',
      rules: 'Only engineering students/professionals allowed. Proof of education required during registration.'
    },
    {
      id: '3',
      name: 'Pro League Qualifiers',
      date: '5 April 2025',
      time: '5:00 PM IST',
      location: 'Delhi Convention Center',
      prizePool: '₹7,50,000',
      registrationFee: 249,
      maxTeams: 256,
      teamsRegistered: 0,
      status: 'Coming Soon',
      poster: '/src/assets/pro-league-poster.jpg',
      description: 'Qualify for the prestigious Pro League championship. Only the best make it through.',
      rules: 'Qualification round for Pro League. Winners advance to main championship.'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    prizePool: '',
    registrationFee: 249,
    maxTeams: 64,
    status: 'Registration Open' as Tournament['status'],
    poster: '',
    description: '',
    rules: ''
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.date || !formData.time || !formData.location || !formData.prizePool) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    if (editingEvent) {
      // Update existing event
      setTournaments(prev => prev.map(tournament => 
        tournament.id === editingEvent.id 
          ? { 
              ...tournament, 
              ...formData,
              teamsRegistered: tournament.teamsRegistered // Keep existing registration count
            }
          : tournament
      ));
      toast({
        title: 'Success',
        description: 'Tournament updated successfully'
      });
    } else {
      // Add new event
      const newTournament: Tournament = {
        id: Date.now().toString(),
        ...formData,
        teamsRegistered: 0,
        poster: formData.poster || '/placeholder.svg'
      };
      setTournaments(prev => [...prev, newTournament]);
      toast({
        title: 'Success',
        description: 'Tournament created successfully'
      });
    }

    // Reset form
    setFormData({
      name: '',
      date: '',
      time: '',
      location: '',
      prizePool: '',
      registrationFee: 249,
      maxTeams: 64,
      status: 'Registration Open',
      poster: '',
      description: '',
      rules: ''
    });
    setEditingEvent(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (tournament: Tournament) => {
    setEditingEvent(tournament);
    setFormData({
      name: tournament.name,
      date: tournament.date,
      time: tournament.time,
      location: tournament.location,
      prizePool: tournament.prizePool,
      registrationFee: tournament.registrationFee,
      maxTeams: tournament.maxTeams,
      status: tournament.status,
      poster: tournament.poster,
      description: tournament.description,
      rules: tournament.rules
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setTournaments(prev => prev.filter(tournament => tournament.id !== id));
    toast({
      title: 'Success',
      description: 'Tournament deleted successfully'
    });
  };

  const handleAddNew = () => {
    setEditingEvent(null);
    setFormData({
      name: '',
      date: '',
      time: '',
      location: '',
      prizePool: '',
      registrationFee: 249,
      maxTeams: 64,
      status: 'Registration Open',
      poster: '',
      description: '',
      rules: ''
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Event Management</h1>
          <p className="text-muted-foreground">Create and manage tournaments</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew}>
              <Plus className="h-4 w-4 mr-2" />
              Create Tournament
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingEvent ? 'Edit Tournament' : 'Create New Tournament'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Tournament Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="BGMI Championship 2025"
                  />
                </div>
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="Registration Open">Registration Open</option>
                    <option value="Coming Soon">Coming Soon</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    placeholder="15 March 2025"
                  />
                </div>
                
                <div>
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    placeholder="6:00 PM IST"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Mumbai Gaming Arena or Online Tournament"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="prizePool">Prize Pool *</Label>
                  <Input
                    id="prizePool"
                    value={formData.prizePool}
                    onChange={(e) => handleInputChange('prizePool', e.target.value)}
                    placeholder="₹5,00,000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="registrationFee">Registration Fee (₹)</Label>
                  <Input
                    id="registrationFee"
                    type="number"
                    value={formData.registrationFee}
                    onChange={(e) => handleInputChange('registrationFee', parseInt(e.target.value))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="maxTeams">Max Teams</Label>
                  <Input
                    id="maxTeams"
                    type="number"
                    value={formData.maxTeams}
                    onChange={(e) => handleInputChange('maxTeams', parseInt(e.target.value))}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="poster">Poster URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="poster"
                    value={formData.poster}
                    onChange={(e) => handleInputChange('poster', e.target.value)}
                    placeholder="https://example.com/poster.jpg"
                  />
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Tournament description and highlights..."
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="rules">Rules & Regulations</Label>
                <Textarea
                  id="rules"
                  value={formData.rules}
                  onChange={(e) => handleInputChange('rules', e.target.value)}
                  placeholder="Tournament rules, eligibility criteria, format..."
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSubmit} className="flex-1">
                  {editingEvent ? 'Update' : 'Create'} Tournament
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tournaments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tournaments.map((tournament) => (
          <Card key={tournament.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{tournament.name}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {tournament.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {tournament.location}
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  tournament.status === 'Registration Open' 
                    ? 'bg-green-100 text-green-800'
                    : tournament.status === 'Coming Soon'
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {tournament.status}
                </span>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Trophy className="h-4 w-4" />
                      Prize Pool
                    </div>
                    <p className="font-semibold">{tournament.prizePool}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      Registration
                    </div>
                    <p className="font-semibold">
                      {tournament.teamsRegistered}/{tournament.maxTeams} teams
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {tournament.description}
                </p>
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(tournament)}
                    className="flex-1"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(tournament.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {tournaments.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-muted-foreground">No tournaments created yet</p>
            <p className="text-sm text-muted-foreground mb-4">
              Start by creating your first tournament
            </p>
            <Button onClick={handleAddNew}>
              <Plus className="h-4 w-4 mr-2" />
              Create Tournament
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminEventManagement;