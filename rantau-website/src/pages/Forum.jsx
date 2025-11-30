import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Search,
  ThumbsUp,
  MessageCircle,
  Eye,
  TrendingUp,
  Clock,
  Plus,
  Filter,
  X,
} from "lucide-react";

export default function Forum() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showNewPost, setShowNewPost] = useState(false);

  const categories = [
    { id: "all", label: "Semua Post", icon: "📋", count: 1234 },
    { id: "tips", label: "Tips & Trik", icon: "💡", count: 456 },
    { id: "scholarship", label: "Beasiswa", icon: "💰", count: 234 },
    { id: "jobs", label: "Kerja Paruh Waktu", icon: "💼", count: 189 },
    { id: "kost", label: "Review Kost", icon: "🏠", count: 345 },
    { id: "qa", label: "Tanya Jawab", icon: "❓", count: 567 },
  ];

  const posts = [
    {
      id: 1,
      author: {
        name: "Dimas Kurniawan",
        avatar: "DK",
        role: "Mahasiswa",
        university: "UGM Yogyakarta",
      },
      category: "tips",
      title: "Tips Hemat Hidup di Jogja untuk Mahasiswa Perantau",
      excerpt:
        "Halo teman-teman! Aku mau share pengalaman hidup hemat di Jogja selama 2 tahun. Beberapa tips yang bisa aku bagi...",
      likes: 124,
      replies: 45,
      views: 1234,
      time: "2 jam lalu",
      trending: true,
    },
    {
      id: 2,
      author: {
        name: "Novi Pratiwi",
        avatar: "NP",
        role: "Mahasiswa",
        university: "UI Jakarta",
      },
      category: "scholarship",
      title: "Info Beasiswa LPDP 2025 - Deadline & Tips Apply",
      excerpt:
        "Ada kabar baik! Beasiswa LPDP buka pendaftaran untuk tahun 2025. Ini info lengkap dan tips dari pengalaman kakak tingkat...",
      likes: 256,
      replies: 89,
      views: 3456,
      time: "5 jam lalu",
      trending: true,
    },
    {
      id: 3,
      author: {
        name: "Rina Safitri",
        avatar: "RS",
        role: "Mahasiswa",
        university: "ITB Bandung",
      },
      category: "jobs",
      title: "Part-time Remote Jobs untuk Mahasiswa IT",
      excerpt:
        "Buat yang cari side hustle, aku punya list website yang legit untuk freelance developer dan designer...",
      likes: 189,
      replies: 67,
      views: 2341,
      time: "1 hari lalu",
      trending: false,
    },
    {
      id: 4,
      author: {
        name: "Budi Santoso",
        avatar: "BS",
        role: "Mahasiswa",
        university: "UNAIR Surabaya",
      },
      category: "kost",
      title: "Review Kost Modern di Surabaya - Worth it!",
      excerpt:
        "Baru pindah kost dan pengen share review. Kost ini ada AC, WiFi unlimited, dan dekat kampus. Harga juga masih oke...",
      likes: 98,
      replies: 34,
      views: 876,
      time: "2 hari lalu",
      trending: false,
    },
    {
      id: 5,
      author: {
        name: "Amanda Putri",
        avatar: "AP",
        role: "Mahasiswa",
        university: "UNPAD Bandung",
      },
      category: "qa",
      title: "Cara Ngurus KTP Domisili Perantau?",
      excerpt:
        "Guys, ada yang tau ga cara ngurus KTP domisili buat mahasiswa perantau? Dokumen apa aja yang perlu disiapkan?",
      likes: 45,
      replies: 23,
      views: 567,
      time: "3 hari lalu",
      trending: false,
    },
  ];

  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-forest-dark via-forest-main to-forest-light py-12 sm:py-16 lg:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-4">
              <span className="text-white font-semibold text-xs sm:text-sm">
                FORUM KOMUNITAS PERANTAU
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Terhubung, Berbagi & Berkembang Bersama
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto px-4">
              Bergabung dengan ribuan mahasiswa di seluruh Indonesia
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari diskusi, topik, atau pertanyaan..."
                className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 focus:outline-none focus:border-white/40 text-sm sm:text-base"
              />
            </div>
            <button
              onClick={() => setShowNewPost(true)}
              className="bg-gold hover:bg-gold-light text-forest-dark px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold shadow-xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Buat Post Baru</span>
              <span className="sm:hidden">Post Baru</span>
            </button>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 px-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold transition-all whitespace-nowrap text-xs sm:text-sm ${
                  activeCategory === category.id
                    ? "bg-forest-main text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="text-base sm:text-lg">{category.icon}</span>
                <span className="hidden sm:inline">{category.label}</span>
                <span className="sm:hidden">
                  {category.label.split(" ")[0]}
                </span>
                <span
                  className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold ${
                    activeCategory === category.id
                      ? "bg-white/20 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-gray-900">
              {filteredPosts.length} Diskusi Ditemukan
            </h2>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-forest-main px-3 sm:px-4 py-2 rounded-lg font-medium text-gray-700 transition-all text-xs sm:text-sm">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>
              <select className="flex-1 sm:flex-none bg-white border-2 border-gray-200 px-3 sm:px-4 py-2 rounded-lg font-medium text-gray-700 focus:outline-none focus:border-forest-main text-xs sm:text-sm">
                <option>Terbaru</option>
                <option>Terpopuler</option>
                <option>Trending</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-md hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-forest-main/20"
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-forest-main to-gold flex items-center justify-center text-white font-bold flex-shrink-0 text-sm sm:text-base">
                    {post.author.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                        {post.author.name}
                      </h3>
                      <span className="text-gray-400 text-xs hidden sm:inline">
                        •
                      </span>
                      <span className="text-xs sm:text-sm text-gray-600 truncate">
                        {post.author.university}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{post.time}</span>
                      {post.trending && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1 text-orange-600 font-semibold">
                            <TrendingUp className="w-3 h-3" />
                            <span>Trending</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h2 className="font-bold text-gray-900 text-base sm:text-lg lg:text-xl mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600">
                  <button className="flex items-center gap-1.5 hover:text-forest-main transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="font-semibold">{post.likes}</span>
                    <span className="hidden sm:inline">Suka</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="font-semibold">{post.replies}</span>
                    <span className="hidden sm:inline">Balasan</span>
                  </button>
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    <span className="font-semibold">{post.views}</span>
                    <span className="hidden sm:inline">Views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <button className="bg-forest-main hover:bg-forest-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold transition-all text-sm sm:text-base">
              Muat Lebih Banyak
            </button>
          </div>
        </div>
      </section>

      {showNewPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Buat Post Baru
              </h3>
              <button
                onClick={() => setShowNewPost(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kategori
                </label>
                <select className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-forest-main text-sm sm:text-base">
                  <option>Pilih Kategori</option>
                  {categories.slice(1).map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Judul
                </label>
                <input
                  type="text"
                  placeholder="Tulis judul yang menarik..."
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-forest-main text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Konten
                </label>
                <textarea
                  rows="6"
                  placeholder="Bagikan cerita, tips, atau pertanyaan kamu..."
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-forest-main resize-none text-sm sm:text-base"
                ></textarea>
              </div>

              <div className="flex flex-col-reverse sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewPost(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold transition-all text-sm sm:text-base"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-forest-main to-forest-light hover:from-forest-dark hover:to-forest-main text-white px-6 py-3 rounded-xl font-bold transition-all text-sm sm:text-base"
                >
                  Posting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="h-16 sm:h-0"></div>
    </div>
  );
}
