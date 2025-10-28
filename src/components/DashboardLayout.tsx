import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Scale, Search, FileText, FileEdit, BarChart3, Settings, Bell, User, Menu, LogOut, Brain, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const { user, role, signOut, updateRole } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { icon: Search, label: "ASK", path: "/dashboard/ask", description: "Legal Research" },
    { icon: FileText, label: "INTERACT", path: "/dashboard/interact", description: "Document Analysis" },
    { icon: FileEdit, label: "DRAFT", path: "/dashboard/draft", description: "Document Generation" },
    { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics", description: "Usage Stats" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings", description: "Preferences" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-sidebar text-sidebar-foreground flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-sidebar-primary" />
            <span className="text-xl font-bold">LexiFlow</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs opacity-70">{item.description}</div>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="bg-sidebar-accent/30 rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium">Upgrade to Pro</p>
            <p className="text-xs text-sidebar-foreground/70">
              Unlock unlimited AI queries and advanced features
            </p>
            <Button size="sm" className="w-full bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground">
              Upgrade Now
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search legal topics, documents..."
                className="pl-10 bg-background"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {role && (
              <Badge variant="outline" className="gap-1">
                {role === 'expert' ? (
                  <>
                    <Brain className="h-3 w-3" />
                    Expert
                  </>
                ) : (
                  <>
                    <Heart className="h-3 w-3" />
                    Simple
                  </>
                )}
              </Badge>
            )}
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-accent rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-popover">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">My Account</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                  Switch Experience
                </DropdownMenuLabel>
                {role === 'expert' ? (
                  <DropdownMenuItem onClick={() => updateRole('normal')}>
                    <Heart className="mr-2 h-4 w-4 text-accent" />
                    Switch to Simple Mode
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => updateRole('expert')}>
                    <Brain className="mr-2 h-4 w-4 text-accent" />
                    Switch to Expert Mode
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
