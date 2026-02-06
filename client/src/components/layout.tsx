import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Search, 
  Upload, 
  BookOpen, 
  Settings, 
  LogOut,
  Menu,
  X,
  History
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Research & Search', href: '/search', icon: Search },
    { name: 'Data Upload', href: '/upload', icon: Upload },
    { name: 'Knowledge Graph', href: '/insights', icon: BookOpen },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900 text-white border-r border-slate-800">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="h-10 w-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg flex items-center justify-center shadow-lg shadow-amber-900/20">
          <History className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="font-serif text-xl font-bold tracking-tight text-slate-100">Legacy Atlas</h1>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">Research Core</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer group",
                  isActive
                    ? "bg-slate-800 text-amber-500 shadow-md border-l-2 border-amber-500"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                )}
              >
                <item.icon className={cn("h-5 w-5 transition-colors", isActive ? "text-amber-500" : "text-slate-500 group-hover:text-slate-300")} />
                {item.name}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <Link href="/settings">
          <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 cursor-pointer rounded-lg hover:bg-slate-800/50">
            <Settings className="h-5 w-5" />
            Settings
          </div>
        </Link>
        <Link href="/">
          <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-400 hover:text-red-300 cursor-pointer rounded-lg hover:bg-red-950/20 mt-1">
            <LogOut className="h-5 w-5" />
            Sign Out
          </div>
        </Link>
      </div>

      <div className="p-6 bg-slate-950">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
            <span className="font-medium text-sm text-slate-300">JD</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-slate-200 truncate">Dr. Jane Doe</p>
            <p className="text-xs text-slate-500 truncate">Senior Archaeologist</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 h-screen sticky top-0 shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <div className={cn(
        "fixed inset-0 z-50 bg-black/80 md:hidden transition-opacity",
        isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )} onClick={() => setIsMobileMenuOpen(false)}>
        <div className={cn(
          "absolute left-0 top-0 bottom-0 w-72 transition-transform duration-300",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )} onClick={e => e.stopPropagation()}>
          <SidebarContent />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden h-16 border-b bg-card flex items-center justify-between px-4 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
            <span className="font-serif font-bold text-lg text-primary">Legacy Atlas</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-2">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
