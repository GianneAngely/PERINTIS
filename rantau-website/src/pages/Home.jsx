import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowRight,
  Star,
  MapPin,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Sparkles,
  Map,
  X,
  ThumbsUp,
  MessageCircle,
} from "lucide-react";
import { kosts } from "../data/kosts";

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({
    budget: "",
    location: "",
    facilities: [],
  });

  const featuredKosts = kosts.slice(0, 12);

  const quizQuestions = [
    {
      question: "What's your budget range?",
      options: [
        { label: "< Rp 1 juta", value: "low" },
        { label: "Rp 1-2 juta", value: "medium" },
        { label: "Rp 2-3 juta", value: "high" },
        { label: "> Rp 3 juta", value: "premium" },
      ],
    },
    {
      question: "Preferred location?",
      options: [
        { label: "Jakarta", value: "jakarta" },
        { label: "Bandung", value: "bandung" },
        { label: "Yogyakarta", value: "yogyakarta" },
        { label: "Surabaya", value: "surabaya" },
      ],
    },
    {
      question: "Must-have facilities?",
      options: [
        { label: "Wi-Fi", value: "wifi" },
        { label: "AC", value: "ac" },
        { label: "Laundry", value: "laundry" },
        { label: "Parking", value: "parking" },
      ],
      multiple: true,
    },
  ];

  const handleQuizAnswer = (value) => {
    if (quizStep === 0) {
      setQuizAnswers({ ...quizAnswers, budget: value });
    } else if (quizStep === 1) {
      setQuizAnswers({ ...quizAnswers, location: value });
    }

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setShowQuiz(false);
      setQuizStep(0);
    }
  };

  const toggleFacility = (value) => {
    const facilities = quizAnswers.facilities.includes(value)
      ? quizAnswers.facilities.filter((f) => f !== value)
      : [...quizAnswers.facilities, value];
    setQuizAnswers({ ...quizAnswers, facilities });
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 pb-32 bg-gradient-to-br from-gray-50 via-white to-forest-pale/10">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-forest-main/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mb-16">
          <span className="bg-gradient-to-r from-forest-light via-forest-pale to-gold bg-clip-text text-transparent text-4xl sm:text-6xl lg:text-7xl font-bold">
            RANTAU
          </span>
          <br />
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight max-w-4xl mx-auto">
            Ruang Temu Anak Perantau
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Kami menangani pencarian, pencocokan, komunitas, pengelolaan
            tagihan, dan komunitas.
          </p>

          <Link
            to="/register"
            className="inline-block bg-gradient-to-r from-forest-main to-forest-light hover:from-forest-dark hover:to-forest-main text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl shadow-forest-main/50 transition-all duration-300"
          >
            Get started free
          </Link>
        </div>

        <div className="relative z-10 w-full flex items-center justify-center perspective-container mt-12">
          <div className="cylinder-carousel">
            {featuredKosts.map((kost, index) => (
              <div
                key={kost.id}
                className="cylinder-card"
                style={{
                  "--rotation": index * 30,
                  transform: `rotateY(${index * 30}deg) translateZ(280px)`,
                }}
              >
                <div className="cylinder-card-inner w-full h-full rounded-xl shadow-2xl flex flex-col justify-between p-2.5 sm:p-3 relative overflow-hidden">
                  <img
                    src={kost.photos[0]}
                    alt={kost.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>

                  <div className="relative z-10">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded px-1.5 py-0.5 inline-block mb-1.5">
                      <span className="text-white text-[8px] font-semibold">
                        Featured
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-white font-bold text-xs mb-1 line-clamp-1">
                      {kost.name}
                    </h3>
                    <div className="flex items-center gap-1 text-white/80 text-[9px] mb-1.5">
                      <MapPin className="w-2 h-2" />
                      <span className="truncate">{kost.city}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="flex items-center gap-0.5">
                        <Star className="w-2 h-2 text-yellow-400 fill-yellow-400" />
                        <span className="text-white font-semibold text-[10px]">
                          {kost.rating}
                        </span>
                      </div>
                      <div className="text-white/60 text-[9px]">
                        • {kost.availableRooms} rooms
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white/60 text-[8px]">
                          Mulai dari
                        </div>
                        <div className="text-white font-bold text-[11px]">
                          Rp {(kost.pricePerMonth / 1000000).toFixed(1)}jt
                          <span className="text-[9px] font-normal">/bln</span>
                        </div>
                      </div>
                      <Link
                        to="/kost-finder"
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-2 py-0.5 rounded text-[9px] font-semibold transition-all hover:scale-105"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 relative bg-white">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              A better way to be a <span className="text-gold">perantau</span>.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dirancang untuk menjadi platform paling intuitif dan kaya fitur
              bagi para siswa. Setiap fitur yang Anda butuhkan dilengkapi dengan
              kecerdasan buatan (AI) untuk memudahkan perjalanan belajar Anda.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Temukan kost sempurna anda dengan cepat
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Pencarian bertenaga AI dengan filter canggih. Ikuti kuis singkat
                kami untuk rekomendasi yang disesuaikan atau jelajahi peta untuk
                menemukan kos dekat kampus Anda.
              </p>
              <ul className="space-y-3">
                {[
                  "Quick quiz for instant recommendations",
                  "Interactive map with campus locations",
                  "Verified listings & real reviews",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-forest-main/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-forest-main" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-forest-light/20 to-forest-pale/20 blur-3xl rounded-3xl"></div>
              <div className="relative bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-xl">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Search kost location..."
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-forest-main focus:ring-2 focus:ring-forest-main/20"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                      onClick={() => setShowQuiz(true)}
                      className="bg-gold/20 hover:bg-gold/30 border border-gold/40 text-gold px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Quick Quiz
                    </button>
                    <Link
                      to="/kost-finder"
                      className="bg-forest-main/10 hover:bg-forest-main/20 border border-forest-main/30 text-forest-main px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <Map className="w-4 h-4" />
                      View Map
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {kosts.slice(0, 3).map((kost, i) => (
                      <Link
                        key={i}
                        to="/kost-finder"
                        className="bg-white border border-gray-200 rounded-xl p-3 hover:border-forest-main hover:shadow-md transition-all cursor-pointer block"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={kost.photos[0]}
                              alt={kost.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <h4 className="text-gray-900 font-semibold text-sm mb-1">
                                {kost.name}
                              </h4>
                              <div className="flex items-center gap-2">
                                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                <span className="text-gray-600 text-xs">
                                  {kost.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-gold font-bold text-sm">
                            Rp {(kost.pricePerMonth / 1000000).toFixed(1)}jt
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-forest-dark to-forest-main rounded-3xl p-8 lg:p-12 mb-20 shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
                  Split & <span className="text-gold">Reminder System</span>
                </h3>
                <p className="text-forest-pale text-lg mb-8 leading-relaxed">
                  Sistem pembagian dan reminder otomatis untuk tagihan bersama.
                  Transparan, dan hassle-free!
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    {
                      icon: <DollarSign className="w-6 h-6" />,
                      title: "Easy Bill Splitting",
                      desc: "Bagi tagihan bulanan secara otomatis dan adil dengan roommate-mu",
                    },
                    {
                      icon: <Clock className="w-6 h-6" />,
                      title: "Auto Reminder",
                      desc: "Notifikasi otomatis sebelum jatuh tempo agar tidak telat bayar",
                    },
                    {
                      icon: <Users className="w-6 h-6" />,
                      title: "Group Management",
                      desc: "Kelola pengeluaran bersama dan lacak siapa sudah membayar",
                    },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 hover:bg-white/15 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-gold text-forest-dark p-3 rounded-lg flex-shrink-0">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="text-white font-bold mb-1">
                            {feature.title}
                          </h4>
                          <p className="text-forest-pale text-sm">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  to="/split-reminder"
                  className="bg-gold hover:bg-gold-light text-forest-dark px-6 py-3 rounded-xl font-bold transition-all inline-block"
                >
                  Try Split Calculator
                </Link>
              </div>

              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-forest-pale/40 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-bold text-forest-dark text-xl">
                      Monthly Bills
                    </h4>
                    <span className="bg-gold text-forest-dark px-3 py-1 rounded-full text-sm font-bold">
                      November 2025
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    {[
                      {
                        icon: "⚡",
                        name: "Listrik",
                        subtitle: "Split 4 orang",
                        amount: "Rp 150,000",
                        status: "Paid",
                        color: "bg-green-100",
                      },
                      {
                        icon: "💧",
                        name: "Air",
                        subtitle: "Split 4 orang",
                        amount: "Rp 75,000",
                        status: "Pending",
                        color: "bg-yellow-100",
                      },
                      {
                        icon: "📡",
                        name: "WiFi",
                        subtitle: "Split 4 orang",
                        amount: "Rp 200,000",
                        status: "Paid",
                        color: "bg-green-100",
                      },
                      {
                        icon: "🔥",
                        name: "Gas",
                        subtitle: "Split 4 orang",
                        amount: "Rp 50,000",
                        status: "Pending",
                        color: "bg-yellow-100",
                      },
                    ].map((bill, i) => (
                      <div key={i} className={`${bill.color} rounded-xl p-4`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{bill.icon}</span>
                            <div>
                              <div className="font-bold text-forest-dark">
                                {bill.name}
                              </div>
                              <div className="text-xs text-gray-600">
                                {bill.subtitle}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-forest-dark">
                              {bill.amount}
                            </div>
                            <div className="text-xs text-gray-600">
                              {bill.status}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t-2 border-gray-300 pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-700 font-medium">
                        Your Share
                      </span>
                      <span className="text-3xl font-bold text-forest-main">
                        Rp 118,750
                      </span>
                    </div>
                    <button className="w-full bg-forest-main hover:bg-forest-dark text-white py-3 rounded-xl font-bold transition-all">
                      💳 Pay Now
                    </button>
                  </div>
                </div>

                <div className="bg-forest-dark/10 px-6 py-4 grid grid-cols-3 gap-4 text-center">
                  {[
                    { value: "2.5M+", label: "Total Bills Managed" },
                    { value: "98%", label: "On-time Payment Rate" },
                    { value: "3,500+", label: "Active Users" },
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className="text-xl font-bold text-gold">
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-gray-600 leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-forest-pale/10 border-2 border-gray-200 rounded-3xl p-6 sm:p-8 lg:p-12 mb-20 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="inline-block bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  Support Local
                </div>
                <h3 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Empowering <span className="text-gold">UMKM Kost</span> Owners
                </h3>
                <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                  Platform khusus untuk pemilik kost dan UMKM lokal. Kelola
                  properti, promosikan bisnis, dan jangkau lebih banyak
                  perantau.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 lg:gap-6 mb-8">
                  {[
                    { value: "2,500+", label: "High Rent Kos" },
                    { value: "850+", label: "UMKM Partners" },
                    { value: "15K+", label: "Active Users" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="text-center bg-white rounded-2xl p-5 sm:p-4 shadow-md border border-gray-200"
                    >
                      <div className="text-3xl sm:text-2xl lg:text-3xl font-bold text-gold mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm sm:text-xs lg:text-sm text-gray-600 leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  to="/kost-owner"
                  className="bg-gold hover:bg-gold-light text-forest-dark px-6 py-3 rounded-xl font-bold transition-all inline-block"
                >
                  Register Your Business
                </Link>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: "🏢",
                    title: "Property Management",
                    desc: "Dashboard lengkap untuk kelola semua kost dengan mudah dan efisien",
                  },
                  {
                    icon: "📊",
                    title: "Analytics & Insights",
                    desc: "Data analytics untuk optimasi bisnis kost dan performa",
                  },
                  {
                    icon: "💳",
                    title: "Payment Gateway",
                    desc: "Terima pembayaran online dengan aman dan mudah",
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="bg-white border-2 border-gray-200 hover:border-gold rounded-2xl p-6 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{feature.icon}</div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 text-sm">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-forest-light/20 to-forest-pale/20 blur-3xl rounded-3xl"></div>
              <div className="relative bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      name: "Andi M.",
                      match: "93%",
                      color: "from-forest-main to-forest-light",
                    },
                    {
                      name: "Siti R.",
                      match: "87%",
                      color: "from-forest-light to-forest-pale",
                    },
                    {
                      name: "Budi S.",
                      match: "91%",
                      color: "from-gold to-gold-light",
                    },
                    {
                      name: "Rina P.",
                      match: "89%",
                      color: "from-forest-pale to-gold-light",
                    },
                  ].map((person, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 border border-gray-200 rounded-2xl p-4"
                    >
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${person.color} mb-3`}
                      ></div>
                      <div className="text-gray-900 font-semibold mb-1">
                        {person.name}
                      </div>
                      <div className="text-gold font-bold text-xl">
                        {person.match}
                      </div>
                      <div className="text-gray-500 text-xs">Match Score</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h3 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Temukan Teman sekamar yang Cocok
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Biarkan AI menemukan teman sekamar yang cocok untuk Anda.
                Tambahkan preferensi, kebiasaan gaya hidup, dan ciri kepribadian
                Anda. Sistem kami akan mencocokkan Anda dengan teman sekamar
                yang sempurna.
              </p>
              <ul className="space-y-3">
                {[
                  "AI-powered compatibility matching",
                  "Verified student profiles only",
                  "Safe in-app messaging system",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-forest-main/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-forest-main" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Bergabunglah dengan Forum Perantau
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Bergabunglah dengan ribuan mahasiswa. Bagikan pengalaman,
                dapatkan tips, temukan beasiswa, dan temukan peluang pekerjaan
                paruh waktu, semua dalam satu komunitas.
              </p>
              <ul className="space-y-3">
                {[
                  "Share tips & experiences",
                  "Find scholarships & job info",
                  "Connect with fellow students",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-forest-main/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-forest-main" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-forest-main/20 to-forest-pale/20 blur-3xl rounded-3xl"></div>
              <div className="relative bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-xl">
                <div className="space-y-4">
                  {[
                    {
                      user: "Dimas K.",
                      title: "Tips Hemat di Jogja",
                      likes: 24,
                      replies: 12,
                      time: "2h ago",
                    },
                    {
                      user: "Novi P.",
                      title: "Info Beasiswa LPDP",
                      likes: 45,
                      replies: 28,
                      time: "5h ago",
                    },
                    {
                      user: "Rina S.",
                      title: "Part-time Remote Jobs",
                      likes: 31,
                      replies: 18,
                      time: "1d ago",
                    },
                  ].map((post, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 border border-gray-200 rounded-2xl p-4 hover:border-forest-main hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-forest-main to-gold flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-gray-900 font-semibold text-sm">
                              {post.user}
                            </span>
                            <span className="text-gray-400 text-xs">
                              • {post.time}
                            </span>
                          </div>
                          <h4 className="text-gray-900 font-medium mb-2">
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" /> {post.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />{" "}
                              {post.replies}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 relative bg-white">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="bg-gradient-to-r from-forest-main to-forest-light rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
            <div className="relative z-10">
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
                Ready to start your perantau journey?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Siapkan diri Anda untuk berkembang dengan koneksi cerdas.
                Bergabunglah dengan lebih dari 10.000 siswa yang mempercayai
                RANTAU untuk perjalanan Perantauan mereka.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-white text-forest-dark px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-white/50 transition-all"
              >
                Get started today
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {showQuiz && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-forest-dark to-forest-main rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-forest-light/20 relative">
            <button
              onClick={() => {
                setShowQuiz(false);
                setQuizStep(0);
              }}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">
                  Quick Preference Quiz
                </h3>
                <span className="text-gold font-semibold">
                  {quizStep + 1}/{quizQuestions.length}
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-gold h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((quizStep + 1) / quizQuestions.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xl text-white font-semibold mb-6">
                {quizQuestions[quizStep].question}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {quizQuestions[quizStep].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (quizQuestions[quizStep].multiple) {
                        toggleFacility(option.value);
                      } else {
                        handleQuizAnswer(option.value);
                      }
                    }}
                    className={`p-4 rounded-xl font-medium transition-all ${
                      quizQuestions[quizStep].multiple &&
                      quizAnswers.facilities.includes(option.value)
                        ? "bg-gold text-forest-dark"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {quizQuestions[quizStep].multiple && (
              <button
                onClick={() => {
                  if (quizStep < quizQuestions.length - 1) {
                    setQuizStep(quizStep + 1);
                  } else {
                    setShowQuiz(false);
                    setQuizStep(0);
                  }
                }}
                className="w-full bg-gold hover:bg-gold-light text-forest-dark py-3 rounded-xl font-bold transition-all"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      )}

      <div className="h-16 sm:h-0"></div>
    </div>
  );
}
