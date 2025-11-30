import { Link, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Beranda" },
    { path: "/smart-kost-finder", label: "Cari Kost" },
    { path: "/roommate", label: "Roommate" },
    { path: "/kost-owner", label: "Pemilik Kost" },
    { path: "/tagihan-kost", label: "Tagihan" },
    { path: "/forum", label: "Forum" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo rantau baru-nobg.png"
              alt="RANTAU Logo"
              className="h-10 w-auto"
            />
            <span className="font-heading text-2xl font-bold text-forest-dark">
              RANTAU
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive(item.path)
                    ? "bg-forest-main text-white"
                    : "text-gray-700 hover:bg-forest-pale hover:text-forest-dark"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="text-forest-main font-medium hover:text-forest-dark transition-colors"
            >
              Masuk
            </Link>
            <Link
              to="/register"
              className="btn-secondary flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Daftar
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive(item.path)
                      ? "bg-forest-main text-white"
                      : "text-gray-700 hover:bg-forest-pale"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-primary text-center"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-secondary text-center"
                >
                  Daftar
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
