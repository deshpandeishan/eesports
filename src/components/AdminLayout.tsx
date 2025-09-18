import { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Calendar, 
  CreditCard, 
  BarChart3, 
  LogOut, 
  Home,
  Menu,
  X
} from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth');
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/');
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: BarChart3 },
    { name: 'Team Management', href: '/admin/team', icon: Users },
    { name: 'Event Management', href: '/admin/events', icon: Calendar },
    { name: 'Payment Tracking', href: '/admin/payments', icon: CreditCard },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-esports-black transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-200 ease-in-out lg:translate-x-0`}>
        
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-esports-white">#EReSports Admin</h2>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-esports-white hover:text-esports-grey"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-3 py-2 mb-2 rounded-md text-sm font-medium transition-colors ${
                  isActivePath(item.href)
                    ? 'bg-white/10 text-esports-white'
                    : 'text-esports-grey hover:text-esports-white hover:bg-white/5'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10">
          <Link to="/" className="flex items-center px-3 py-2 mb-2 rounded-md text-sm font-medium text-esports-grey hover:text-esports-white hover:bg-white/5">
            <Home className="mr-3 h-5 w-5" />
            Back to Website
          </Link>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-esports-grey hover:text-esports-white hover:bg-white/5"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-background border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-foreground hover:text-muted-foreground"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-semibold text-foreground">
              Engineers Esports Admin
            </h1>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;