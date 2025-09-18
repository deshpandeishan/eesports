import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Download, 
  Search, 
  Filter, 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  Clock,
  FileText,
  Calendar
} from 'lucide-react';

interface Registration {
  id: string;
  teamName: string;
  eventName: string;
  playerNames: string[];
  contactNumber: string;
  email: string;
  registrationDate: string;
  paymentAmount: number;
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  paymentId?: string;
  paymentDate?: string;
}

const AdminPaymentTracking = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Pending' | 'Failed'>('All');

  // Mock data - will be replaced with Supabase data
  const [registrations] = useState<Registration[]>([
    {
      id: '1',
      teamName: 'Thunder Wolves',
      eventName: 'BGMI Showdown 2025',
      playerNames: ['Arjun Kumar', 'Vikash Singh', 'Rohit Sharma', 'Priya Patel'],
      contactNumber: '+91 9876543210',
      email: 'thunderwolves@gmail.com',
      registrationDate: '2025-01-15',
      paymentAmount: 249,
      paymentStatus: 'Paid',
      paymentId: 'pay_xyz123',
      paymentDate: '2025-01-15'
    },
    {
      id: '2',
      teamName: 'Elite Squad',
      eventName: 'Engineers Cup Championship',
      playerNames: ['Sneha Reddy', 'Karan Mehta', 'Aditya Joshi', 'Neha Gupta'],
      contactNumber: '+91 9876543211',
      email: 'elitesquad@gmail.com',
      registrationDate: '2025-01-16',
      paymentAmount: 249,
      paymentStatus: 'Pending'
    },
    {
      id: '3',
      teamName: 'Phoenix Gaming',
      eventName: 'BGMI Showdown 2025',
      playerNames: ['Rahul Kumar', 'Amit Singh', 'Pooja Sharma', 'Ravi Patel'],
      contactNumber: '+91 9876543212',
      email: 'phoenixgaming@gmail.com',
      registrationDate: '2025-01-17',
      paymentAmount: 249,
      paymentStatus: 'Paid',
      paymentId: 'pay_abc456',
      paymentDate: '2025-01-17'
    },
    {
      id: '4',
      teamName: 'Storm Riders',
      eventName: 'Engineers Cup Championship',
      playerNames: ['Deepak Yadav', 'Sanjay Kumar', 'Priyanka Das', 'Mohit Agarwal'],
      contactNumber: '+91 9876543213',
      email: 'stormriders@gmail.com',
      registrationDate: '2025-01-18',
      paymentAmount: 249,
      paymentStatus: 'Failed'
    },
    {
      id: '5',
      teamName: 'Cyber Warriors',
      eventName: 'BGMI Showdown 2025',
      playerNames: ['Ankush Sharma', 'Naveen Singh', 'Kritika Jain', 'Suresh Kumar'],
      contactNumber: '+91 9876543214',
      email: 'cyberwarriors@gmail.com',
      registrationDate: '2025-01-19',
      paymentAmount: 249,
      paymentStatus: 'Pending'
    }
  ]);

  // Filter registrations
  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = reg.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || reg.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: registrations.length,
    paid: registrations.filter(r => r.paymentStatus === 'Paid').length,
    pending: registrations.filter(r => r.paymentStatus === 'Pending').length,
    failed: registrations.filter(r => r.paymentStatus === 'Failed').length,
    totalRevenue: registrations
      .filter(r => r.paymentStatus === 'Paid')
      .reduce((sum, r) => sum + r.paymentAmount, 0)
  };

  const handleExportCSV = () => {
    const csvData = [
      ['Team Name', 'Event', 'Contact', 'Email', 'Registration Date', 'Amount', 'Status', 'Payment ID', 'Payment Date'],
      ...filteredRegistrations.map(reg => [
        reg.teamName,
        reg.eventName,
        reg.contactNumber,
        reg.email,
        reg.registrationDate,
        reg.paymentAmount,
        reg.paymentStatus,
        reg.paymentId || '',
        reg.paymentDate || ''
      ])
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Success',
      description: 'Registration data exported successfully'
    });
  };

  const getStatusIcon = (status: Registration['paymentStatus']) => {
    switch (status) {
      case 'Paid':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusBadge = (status: Registration['paymentStatus']) => {
    const variants = {
      Paid: 'bg-green-100 text-green-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      Failed: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={variants[status]}>
        {getStatusIcon(status)}
        <span className="ml-1">{status}</span>
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payment Tracking</h1>
          <p className="text-muted-foreground">Monitor registrations and payment status</p>
        </div>
        
        <Button onClick={handleExportCSV}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Registrations</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paid</p>
                <p className="text-2xl font-bold text-green-600">{stats.paid}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by team name, event, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="All">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>

          {/* Registrations Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Team</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Event</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Contact</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Registration</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Payment ID</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((registration) => (
                  <tr key={registration.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{registration.teamName}</p>
                        <p className="text-sm text-muted-foreground">{registration.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium">{registration.eventName}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm">{registration.contactNumber}</p>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {registration.registrationDate}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold">₹{registration.paymentAmount}</p>
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(registration.paymentStatus)}
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm text-muted-foreground">
                        {registration.paymentId || '-'}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredRegistrations.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No registrations found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPaymentTracking;