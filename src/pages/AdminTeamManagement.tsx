import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Upload, User } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  contact: string;
  email: string;
}

const AdminTeamManagement = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  
  // Mock data - will be replaced with Supabase data
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Arjun Kumar',
      role: 'Founder & Tournament Director',
      photo: '/placeholder.svg',
      contact: '+91 9876543210',
      email: 'arjun@esports.com'
    },
    {
      id: '2', 
      name: 'Priya Sharma',
      role: 'Event Manager',
      photo: '/placeholder.svg',
      contact: '+91 9876543211',
      email: 'priya@esports.com'
    },
    {
      id: '3',
      name: 'Rohit Singh',
      role: 'Technical Lead',
      photo: '/placeholder.svg', 
      contact: '+91 9876543212',
      email: 'rohit@esports.com'
    },
    {
      id: '4',
      name: 'Sneha Patel',
      role: 'Community Manager',
      photo: '/placeholder.svg',
      contact: '+91 9876543213', 
      email: 'sneha@esports.com'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    photo: '',
    contact: '',
    email: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.role || !formData.email) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    if (editingMember) {
      // Update existing member
      setTeamMembers(prev => prev.map(member => 
        member.id === editingMember.id 
          ? { ...member, ...formData }
          : member
      ));
      toast({
        title: 'Success',
        description: 'Team member updated successfully'
      });
    } else {
      // Add new member
      const newMember: TeamMember = {
        id: Date.now().toString(),
        ...formData,
        photo: formData.photo || '/placeholder.svg'
      };
      setTeamMembers(prev => [...prev, newMember]);
      toast({
        title: 'Success', 
        description: 'Team member added successfully'
      });
    }

    // Reset form
    setFormData({ name: '', role: '', photo: '', contact: '', email: '' });
    setEditingMember(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      photo: member.photo,
      contact: member.contact,
      email: member.email
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== id));
    toast({
      title: 'Success',
      description: 'Team member deleted successfully'
    });
  };

  const handleAddNew = () => {
    setEditingMember(null);
    setFormData({ name: '', role: '', photo: '', contact: '', email: '' });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team Management</h1>
          <p className="text-muted-foreground">Manage core team members and their roles</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew}>
              <Plus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <Label htmlFor="role">Role *</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  placeholder="e.g. Tournament Director"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
              
              <div>
                <Label htmlFor="contact">Contact Number</Label>
                <Input
                  id="contact"
                  value={formData.contact}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                  placeholder="+91 9876543210"
                />
              </div>
              
              <div>
                <Label htmlFor="photo">Photo URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="photo"
                    value={formData.photo}
                    onChange={(e) => handleInputChange('photo', e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                  />
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSubmit} className="flex-1">
                  {editingMember ? 'Update' : 'Add'} Member
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                {member.photo && member.photo !== '/placeholder.svg' ? (
                  <img 
                    src={member.photo} 
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <CardTitle className="text-lg">{member.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Email:</span> {member.email}</p>
                {member.contact && (
                  <p><span className="font-medium">Contact:</span> {member.contact}</p>
                )}
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEdit(member)}
                  className="flex-1"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDelete(member.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {teamMembers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-muted-foreground">No team members added yet</p>
            <p className="text-sm text-muted-foreground mb-4">
              Start by adding your first team member
            </p>
            <Button onClick={handleAddNew}>
              <Plus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminTeamManagement;