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
  ChevronDown,
} from "lucide-react";

export default function KostOwner() {
  const stats = [
    {
      label: "Total Properti",
      value: "12",
      icon: <Home className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-green-600 to-green-700",
      change: "+2 this month",
      changeLabel: "+2 bulan ini",
    },
    {
      label: "Rp 48.5M",
      sublabel: "Total Revenue",
      icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-yellow-500 to-yellow-600",
      change: "+12% from last month",
      changeLabel: "+12% dari bulan lalu",
    },
    {
      label: "94%",
      sublabel: "Occupancy Rate",
      icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-blue-500 to-blue-600",
      change: "+3% improvement",
      changeLabel: "+3% peningkatan",
    },
    {
      label: "15.2K",
      sublabel: "Total Views",
      icon: <Eye className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-purple-500 to-purple-600",
      change: "+8% this week",
      changeLabel: "+8% minggu ini",
    },
  ];

  const properties = [
    {
      id: 1,
      name: "Kost Modern Jakarta Selatan",
      location: "Jakarta Selatan",
      gradient: "from-forest-dark to-forest-main",
      rooms: { occupied: 18, total: 20 },
      price: "Rp 4.5M",
      rating: 4.8,
      reviews: 124,
      revenue: "Rp 4.5M",
      status: "Active",
    },
    {
      id: 2,
      name: "Kost Minimalis Bali",
      location: "Denpasar, Bali",
      gradient: "from-forest-main to-forest-light",
      rooms: { occupied: 14, total: 15 },
      price: "Rp 4.2M",
      rating: 4.9,
      reviews: 89,
      revenue: "Rp 2.0M",
      status: "Active",
    },
    {
      id: 3,
      name: "Kost Premium Bandung",
      location: "Bandung",
      gradient: "from-forest-light to-forest-pale",
      rooms: { occupied: 23, total: 26 },
      price: "Rp 4.1M",
      rating: 4.7,
      reviews: 156,
      revenue: "Rp 4.1M",
      status: "Active",
    },
    {
      id: 4,
      name: "Kost Strategis Jogja",
      location: "Yogyakarta",
      gradient: "from-gold to-gold-light",
      rooms: { occupied: 15, total: 18 },
      price: "Rp 3.7M",
      rating: 4.6,
      reviews: 92,
      revenue: "Rp 3.7M",
      status: "Active",
    },
  ];

  const quickActions = [
    {
      label: "Add New Property",
      labelId: "Tambah Properti Baru",
      icon: <Plus className="w-5 h-5" />,
      color: "from-yellow-500 to-yellow-600",
      link: "/add-property",
    },
    {
      label: "View Analytics",
      labelId: "Lihat Analitik",
      icon: <BarChart3 className="w-5 h-5" />,
      color: "from-blue-500 to-blue-600",
      link: "/analytics",
    },
    {
      label: "Manage Tenants",
      labelId: "Kelola Penyewa",
      icon: <Users className="w-5 h-5" />,
      color: "from-green-500 to-green-600",
      link: "/tenants",
    },
    {
      label: "Payment History",
      labelId: "Riwayat Pembayaran",
      icon: <DollarSign className="w-5 h-5" />,
      color: "from-purple-500 to-purple-600",
      link: "/payments",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-[#1a3a2e] via-[#2d5a45] to-[#1a3a2e] py-8 sm:py-12 lg:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <div className="text-sm text-green-300 mb-2">
              RANTAU / <span className="text-white">Kost Owner</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
              Kost Owner <span className="text-yellow-400">Dashboard</span>
            </h1>
            <p className="text-base sm:text-lg text-green-200">
              Kelola properti dan kembangkan bisnis Anda
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[#2d5a45] rounded-2xl p-4 sm:p-6 border border-green-700/30 hover:border-green-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}
                  >
                    {stat.icon}
                  </div>
                  {index === 0 && (
                    <span className="text-xs text-green-300">
                      {stat.changeLabel}
                    </span>
                  )}
                  {index > 0 && (
                    <span className="text-xs text-green-300">
                      {stat.changeLabel}
                    </span>
                  )}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {stat.label}
                </div>
                {stat.sublabel && (
                  <div className="text-xs sm:text-sm text-green-300">
                    {stat.sublabel}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#2d5a45] rounded-3xl p-6 sm:p-8 border border-green-700/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    Revenue Overview
                  </h2>
                  <p className="text-green-300 text-sm">
                    Pendapatan meningkat 12% bulan ini
                  </p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-[#1a3a2e] text-white px-3 sm:px-4 py-2 rounded-lg text-sm hover:bg-[#152d24] transition-all">
                  Last 7 days
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-[#1a3a2e] rounded-2xl p-4 sm:p-6 mb-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-green-300 text-xs mb-1">Hari Ini</div>
                    <div className="text-white font-bold text-lg sm:text-xl">
                      Rp 8.5M
                    </div>
                  </div>
                  <div>
                    <div className="text-green-300 text-xs mb-1">
                      Minggu Ini
                    </div>
                    <div className="text-white font-bold text-lg sm:text-xl">
                      Rp 52M
                    </div>
                  </div>
                  <div>
                    <div className="text-green-300 text-xs mb-1">Bulan Ini</div>
                    <div className="text-yellow-400 font-bold text-lg sm:text-xl">
                      Rp 48.5M
                    </div>
                  </div>
                  <div>
                    <div className="text-green-300 text-xs mb-1">Growth</div>
                    <div className="text-green-400 font-bold text-lg sm:text-xl flex items-center justify-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      +12%
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a3a2e] rounded-2xl p-6">
                <div className="flex gap-4">
                  <div className="flex flex-col justify-between text-green-300 text-xs py-2">
                    <span>9M</span>
                    <span>7.5M</span>
                    <span>6M</span>
                    <span>4.5M</span>
                    <span>3M</span>
                    <span>1.5M</span>
                    <span>0</span>
                  </div>

                  <div className="flex-1 relative">
                    <svg
                      className="w-full"
                      viewBox="0 0 700 300"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient
                          id="areaGradient"
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            stopColor="#4ade80"
                            stopOpacity="0.3"
                          />
                          <stop
                            offset="100%"
                            stopColor="#4ade80"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>

                      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                        <line
                          key={i}
                          x1="0"
                          y1={i * 50}
                          x2="700"
                          y2={i * 50}
                          stroke="#2d5a45"
                          strokeWidth="1"
                          strokeDasharray="5,5"
                        />
                      ))}

                      <path
                        d="M 0,250 L 100,200 L 200,180 L 300,150 L 400,170 L 500,120 L 600,100 L 700,50 L 700,300 L 0,300 Z"
                        fill="url(#areaGradient)"
                      />

                      <polyline
                        points="0,250 100,200 200,180 300,150 400,170 500,120 600,100 700,50"
                        fill="none"
                        stroke="#4ade80"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {[
                        { x: 0, y: 250, value: "1.5M" },
                        { x: 100, y: 200, value: "3M" },
                        { x: 200, y: 180, value: "3.5M" },
                        { x: 300, y: 150, value: "4.5M" },
                        { x: 400, y: 170, value: "4M" },
                        { x: 500, y: 120, value: "5.5M" },
                        { x: 600, y: 100, value: "6.5M" },
                        { x: 700, y: 50, value: "8.5M" },
                      ].map((point, i) => (
                        <g key={i}>
                          ircle cx={point.x}
                          cy={point.y}
                          r="6" fill="#1a3a2e" stroke="#4ade80" strokeWidth="3"
                          /
                        </g>
                      ))}
                    </svg>

                    <div className="flex justify-between text-green-300 text-xs mt-2 px-1">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-[#1a3a2e] rounded-xl p-3 sm:p-4 text-center">
                  <div className="text-2xl sm:text-3xl mb-1">📈</div>
                  <div className="text-green-300 text-xs mb-1">Peak Day</div>
                  <div className="text-white font-bold text-sm">Sunday</div>
                </div>
                <div className="bg-[#1a3a2e] rounded-xl p-3 sm:p-4 text-center">
                  <div className="text-2xl sm:text-3xl mb-1">💰</div>
                  <div className="text-green-300 text-xs mb-1">Avg/Day</div>
                  <div className="text-white font-bold text-sm">Rp 5.2M</div>
                </div>
                <div className="bg-[#1a3a2e] rounded-xl p-3 sm:p-4 text-center">
                  <div className="text-2xl sm:text-3xl mb-1">🎯</div>
                  <div className="text-green-300 text-xs mb-1">Target</div>
                  <div className="text-white font-bold text-sm">95%</div>
                </div>
              </div>
            </div>

            <div className="bg-[#2d5a45] rounded-3xl p-6 sm:p-8 border border-green-700/30">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                Quick Actions
              </h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.link}
                    className="flex items-center gap-3 bg-[#1a3a2e] hover:bg-[#234439] p-4 rounded-xl transition-all group"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      {action.icon}
                    </div>
                    <span className="text-white font-semibold text-sm sm:text-base">
                      {action.labelId}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Your Properties
            </h2>
            <button className="flex items-center gap-2 bg-forest-main hover:bg-forest-dark text-white px-4 py-2 rounded-lg text-sm transition-all">
              All Status
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border-2 border-gray-200 hover:border-forest-main/30"
              >
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${property.gradient}`}
                  ></div>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {property.status}
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-1">
                      {property.name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{property.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-gray-900 font-semibold">
                      {property.rating}
                    </span>
                    <span className="text-gray-600 text-sm">
                      {property.reviews} reviews
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-gray-600 text-xs mb-1">Rooms</div>
                        <div className="text-gray-900 font-bold text-lg">
                          {property.rooms.occupied}/{property.rooms.total}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600 text-xs mb-1">
                          Revenue
                        </div>
                        <div className="text-gold font-bold text-lg">
                          {property.revenue}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-forest-main hover:bg-forest-dark text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2">
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-16 sm:h-0"></div>
    </div>
  );
}
