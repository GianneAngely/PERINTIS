import { Link, useLocation } from "react-router-dom";
import { Home, Search, Users, Receipt, MessageSquare } from "lucide-react";

export default function MobileBottomNav() {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Beranda" },
    { path: "/smart-kost-finder", icon: Search, label: "Cari" },
    { path: "/roommate", icon: Users, label: "Roommate" },
    { path: "/tagihan-kost", icon: Receipt, label: "Tagihan" },
    { path: "/forum", icon: MessageSquare, label: "Forum" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="grid grid-cols-5 gap-1 px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all ${
                isActive(item.path)
                  ? "text-forest-main bg-forest-pale"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
