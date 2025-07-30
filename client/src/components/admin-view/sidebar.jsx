import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Settings,
  ChartNoAxesCombined,
} from 'lucide-react';
import { Fragment } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/features', label: 'Features', icon: Settings },
];

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-64 flex flex-col p-0 bg-white dark:bg-zinc-900 border-r border-border shadow-lg"
        >
          <SheetHeader className="border-b px-4 py-3 bg-muted/40">
            <SheetTitle className="flex items-center gap-3 text-lg font-bold text-foreground">
              <ChartNoAxesCombined size={22} className="text-primary" />
              Admin Panel
            </SheetTitle>
          </SheetHeader>

          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t px-3 py-3 space-y-2">
            <button
              onClick={() => {
              }}
              className="w-full text-sm font-medium text-muted-foreground hover:text-foreground transition"
            >
              Settings
            </button>
          </div>
        </SheetContent>
      </Sheet>


      <aside className="w-64 hidden md:flex flex-col border-r bg-background p-5 shadow-md">
        <div
          className="h-16 flex items-center justify-start gap-3 px-2 mb-6 cursor-pointer hover:opacity-80 transition"
          onClick={() => navigate('/admin/dashboard')}
        >
          <ChartNoAxesCombined size={24} className="text-primary" />
          <h1 className="text-lg font-bold text-foreground">Admin Panel</h1>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                      ? 'bg-primary text-white shadow'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }`
                  }
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t pt-4 mt-4 px-3">
          <button
            onClick={() => {
            }}
            className="w-full text-sm font-medium text-muted-foreground hover:text-foreground transition"
          >
            Settings
          </button>
        </div>
      </aside>

    </Fragment>
  );
};

export default AdminSidebar;
