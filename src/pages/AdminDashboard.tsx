import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, CreditCard, TrendingUp, Trophy, UserCheck } from 'lucide-react';

const AdminDashboard = () => {
  // Mock data - will be replaced with actual data from Supabase
  const stats = [
    {
      title: 'Total Events',
      value: '12',
      change: '+3 this month',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      title: 'Team Members', 
      value: '8',
      change: '+2 new members',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Registered Teams',
      value: '156',
      change: '+24 this week',
      icon: UserCheck,
      color: 'text-purple-600'
    },
    {
      title: 'Total Revenue',
      value: '₹38,844',
      change: '+12% from last month',
      icon: CreditCard,
      color: 'text-orange-600'
    }
  ];

  const recentEvents = [
    { name: 'BGMI Showdown 2025', registrations: 64, revenue: '₹15,936' },
    { name: 'Engineers Cup Championship', registrations: 32, revenue: '₹7,968' },
    { name: 'Pro League Qualifiers', registrations: 0, revenue: '₹0' }
  ];

  const recentRegistrations = [
    { teamName: 'Thunder Wolves', event: 'BGMI Showdown 2025', amount: '₹249', status: 'Paid' },
    { teamName: 'Elite Squad', event: 'Engineers Cup', amount: '₹249', status: 'Pending' },
    { teamName: 'Phoenix Gaming', event: 'BGMI Showdown 2025', amount: '₹249', status: 'Paid' },
    { teamName: 'Storm Riders', event: 'Engineers Cup', amount: '₹249', status: 'Paid' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Engineers Esports Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Recent Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.name} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-foreground">{event.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.registrations} teams registered
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{event.revenue}</p>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Registrations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Registrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRegistrations.map((registration, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-foreground">{registration.teamName}</p>
                    <p className="text-sm text-muted-foreground">{registration.event}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{registration.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      registration.status === 'Paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {registration.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;