import { Link } from "react-router-dom";
import {
  Home,
  TrendingUp,
  Users,
  DollarSign,
  Plus,
  Eye,
  MapPin,
  Star,
  Edit,
  Trash2,
  BarChart3,
} from "lucide-react";

export default function KostOwner() {
  const stats = [
    {
      label: "Total Properties",
      value: "12",
      icon: <Home className="w-6 h-6" />,
      color: "from-forest-main to-forest-light",
      change: "+2 this month",
    },
    {
      label: "Total Revenue",
      value: "Rp 48.5M",
      icon: <DollarSign className="w-6 h-6" />,
      color: "from-gold to-gold-light",
      change: "+12% from last month",
    },
    {
      label: "Occupancy Rate",
      value: "94%",
      icon: <Users className="w-6 h-6" />,
      color: "from-forest-light to-forest-pale",
      change: "+3% improvement",
    },
    {
      label: "Total Views",
      value: "15.2K",
      icon: <Eye className="w-6 h-6" />,
      color: "from-forest-pale to-gold",
      change: "+8% this week",
    },
  ];

  const properties = [
    {
      id: 1,
      name: "Kost Modern Jakarta Selatan",
      location: "Jakarta Selatan",
      rooms: 20,
      occupied: 18,
      price: "Rp 2.5jt",
      rating: 4.8,
      reviews: 124,
      image: "from-purple-500 to-pink-500",
      revenue: "Rp 4.5M",
      status: "active",
    },
    {
      id: 2,
      name: "Kost Minimalis Bali",
      location: "Denpasar, Bali",
      rooms: 15,
      occupied: 14,
      price: "Rp 2.0jt",
      rating: 4.9,
      reviews: 98,
      image: "from-blue-500 to-cyan-500",
      revenue: "Rp 3.0M",
      status: "active",
    },
    {
      id: 3,
      name: "Kost Premium Bandung",
      location: "Bandung",
      rooms: 25,
      occupied: 23,
      price: "Rp 1.8jt",
      rating: 4.7,
      reviews: 156,
      image: "from-green-500 to-emerald-500",
      revenue: "Rp 4.1M",
      status: "active",
    },
    {
      id: 4,
      name: "Kost Strategis Jogja",
      location: "Yogyakarta",
      rooms: 18,
      occupied: 15,
      price: "Rp 1.5jt",
      rating: 4.6,
      reviews: 89,
      image: "from-orange-500 to-red-500",
      revenue: "Rp 2.7M",
      status: "active",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1f16] via-[#0a1410] to-[#050a08]">
      <nav className="bg-forest-dark/50 backdrop-blur-xl border-b border-forest-light/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-heading text-xl font-bold text-white">
                RANTAU
              </span>
              <span className="text-forest-pale text-sm">/ Kost Owner</span>
            </Link>
            <div className="flex items-center gap-4">
              <button className="bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-forest-dark px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all">
                <Plus className="w-5 h-5" />
                Add Property
              </button>
              <Link
                to="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-2">
            Kost Owner <span className="text-gold">Dashboard</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your properties and grow your business
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-forest-dark/60 to-forest-main/40 backdrop-blur-xl border border-forest-light/20 rounded-2xl p-6 hover:border-forest-pale/40 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl text-white`}
                >
                  {stat.icon}
                </div>
                <span className="text-forest-pale text-xs font-medium">
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-gradient-to-br from-forest-dark/60 to-forest-main/40 backdrop-blur-xl border border-forest-light/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Revenue Overview</h3>
              <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
              </select>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {[65, 78, 82, 70, 88, 92, 85].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div
                    className="w-full bg-gradient-to-t from-gold to-gold-light rounded-t-lg transition-all hover:from-gold-light hover:to-gold"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-gray-400">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-forest-dark/60 to-forest-main/40 backdrop-blur-xl border border-forest-light/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
            <div className="space-y-3">
              {[
                {
                  icon: <Plus className="w-5 h-5" />,
                  label: "Add New Property",
                  color: "from-gold to-gold-light",
                },
                {
                  icon: <BarChart3 className="w-5 h-5" />,
                  label: "View Analytics",
                  color: "from-forest-main to-forest-light",
                },
                {
                  icon: <Users className="w-5 h-5" />,
                  label: "Manage Tenants",
                  color: "from-forest-light to-forest-pale",
                },
                {
                  icon: <DollarSign className="w-5 h-5" />,
                  label: "Payment History",
                  color: "from-forest-pale to-gold",
                },
              ].map((action, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 text-white transition-all group"
                >
                  <div
                    className={`bg-gradient-to-r ${action.color} p-2 rounded-lg`}
                  >
                    {action.icon}
                  </div>
                  <span className="font-medium group-hover:text-gold transition-colors">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-forest-dark/60 to-forest-main/40 backdrop-blur-xl border border-forest-light/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Your Properties</h3>
            <div className="flex items-center gap-3">
              <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none">
                <option>All Status</option>
                <option>Active</option>
                <option>Full</option>
                <option>Maintenance</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-forest-pale/40 transition-all group"
              >
                <div
                  className={`h-32 bg-gradient-to-br ${property.image} relative`}
                >
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-xs font-semibold capitalize">
                      {property.status}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-lg mb-1 group-hover:text-gold transition-colors">
                        {property.name}
                      </h4>
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{property.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-white font-semibold text-sm">
                            {property.rating}
                          </span>
                          <span className="text-gray-400 text-xs">
                            ({property.reviews})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-gray-400 text-xs mb-1">Rooms</div>
                      <div className="text-white font-bold">
                        {property.occupied}/{property.rooms}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-gray-400 text-xs mb-1">Revenue</div>
                      <div className="text-gold font-bold text-sm">
                        {property.revenue}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex-1 bg-forest-main hover:bg-forest-dark text-white py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2">
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 p-2 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
