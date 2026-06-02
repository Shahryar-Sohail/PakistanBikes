import { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { logout } from "../../services/authService";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/admin", icon: "dashboard", end: true },
  { label: "Bikes", to: "/admin/bikes", icon: "two_wheeler" },
  { label: "Users", to: "/admin/users", icon: "group" },
  { label: "Reviews", to: "/admin/reviews", icon: "reviews" },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const { clearUser } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    clearUser();
    navigate("/login");
  };

  const linkCls = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 border-secondary bg-white/10 text-white w-full text-left"
      : "flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 border-transparent hover:bg-white/5 hover:border-white/20 text-white/60 hover:text-white transition-colors w-full text-left";

  return (
    <div className="h-screen overflow-hidden flex bg-background font-body-md text-body-md">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed md:static z-40 top-0 left-0 h-full w-64 flex-shrink-0 flex flex-col
          bg-[#1c1c1e] border-r border-white/5
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Brand */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h1 className="font-headline-md text-headline-md text-white font-bold">
            PK Bikes Admin
          </h1>
          <button
            className="md:hidden text-white/60 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 flex flex-col gap-1 px-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              className={linkCls}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
              <span className="font-label-md text-label-md">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-2 py-4 border-t border-white/10 flex flex-col gap-1">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 border-transparent hover:bg-white/5 text-white/60 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[22px]">settings</span>
            <span className="font-label-md text-label-md">Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 border-transparent hover:bg-error/10 text-white/60 hover:text-error transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">logout</span>
            <span className="font-label-md text-label-md">Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Content ── */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top bar */}
        <header className="h-16 border-b border-black/10 bg-surface-container-lowest px-4 md:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 text-on-surface"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <span className="font-headline-md text-headline-md text-on-surface hidden sm:block">
              PK Bikes Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-variant transition-colors relative">
              <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
            </button>
            <div className="w-10 h-10 rounded-full bg-[#1c1c1e] overflow-hidden border-2 border-outline-variant/20 flex items-center justify-center">
              <span
                className="material-symbols-outlined text-white text-[22px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                account_circle
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
