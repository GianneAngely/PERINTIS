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
    { id: "all", label: "All Posts", icon: "📋", count: 1234 },
    { id: "tips", label: "Tips & Tricks", icon: "💡", count: 456 },
    { id: "scholarship", label: "Scholarship", icon: "💰", count: 234 },
    { id: "jobs", label: "Part-time Jobs", icon: "💼", count: 189 },
    { id: "kost", label: "Kost Reviews", icon: "🏠", count: 345 },
    { id: "qa", label: "Q&A", icon: "❓", count: 567 },
  ];

  const posts = [
    {
      id: 1,
      author: {
        name: "Dimas Kurniawan",
        avatar: "DK",
        role: "Student",
        university: "UGM Yogyakarta",
      },
      category: "tips",
      title: "Tips Hemat Hidup di Jogja untuk Mahasiswa Perantau",
      excerpt:
        "Halo teman-teman! Aku mau share pengalaman hidup hemat di Jogja selama 2 tahun. Beberapa tips yang bisa aku bagi...",
      likes: 124,
      replies: 45,
      views: 1234,
      time: "2 hours ago",
      trending: true,
    },
    {
      id: 2,
      author: {
        name: "Novi Pratiwi",
        avatar: "NP",
        role: "Student",
        university: "UI Jakarta",
      },
      category: "scholarship",
      title: "Info Beasiswa LPDP 2025 - Deadline & Tips Apply",
      excerpt:
        "Ada kabar baik! Beasiswa LPDP buka pendaftaran untuk tahun 2025. Ini info lengkap dan tips dari pengalaman kakak tingkat...",
      likes: 256,
      replies: 89,
      views: 3456,
      time: "5 hours ago",
      trending: true,
    },
    {
      id: 3,
      author: {
        name: "Rina Safitri",
        avatar: "RS",
        role: "Student",
        university: "ITB Bandung",
      },
      category: "jobs",
      title: "Part-time Remote Jobs untuk Mahasiswa IT",
      excerpt:
        "Buat yang cari side hustle, aku punya list website yang legit untuk freelance developer dan designer...",
      likes: 189,
      replies: 67,
      views: 2341,
      time: "1 day ago",
      trending: false,
    },
    {
      id: 4,
      author: {
        name: "Budi Santoso",
        avatar: "BS",
        role: "Student",
        university: "UNAIR Surabaya",
      },
      category: "kost",
      title: "Review Kost Modern di Surabaya - Worth it!",
      excerpt:
        "Baru pindah kost dan pengen share review. Kost ini ada AC, WiFi unlimited, dan dekat kampus. Harga juga masih oke...",
      likes: 98,
      replies: 34,
      views: 876,
      time: "2 days ago",
      trending: false,
    },
    {
      id: 5,
      author: {
        name: "Amanda Putri",
        avatar: "AP",
        role: "Student",
        university: "UNPAD Bandung",
      },
      category: "qa",
      title: "Cara Ngurus KTP Domisili Perantau?",
      excerpt:
        "Guys, ada yang tau ga cara ngurus KTP domisili buat mahasiswa perantau? Dokumen apa aja yang perlu disiapkan?",
      likes: 45,
      replies: 23,
      views: 567,
      time: "3 days ago",
      trending: false,
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
              <span className="text-forest-pale text-sm">/ Forum</span>
            </Link>
            <Link
              to="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            Forum <span className="text-gold">Rantau</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Connect, share, and grow with thousands of students across Indonesia
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-forest-dark/60 to-forest-main/40 backdrop-blur-xl border border-forest-light/20 rounded-2xl p-6 sticky top-24">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                      activeCategory === cat.id
                        ? "bg-forest-main text-white"
                        : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{cat.icon}</span>
                      <span className="font-medium text-sm">{cat.label}</span>
                    </div>
                    <span className="text-xs opacity-70">{cat.count}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowNewPost(true)}
                className="w-full mt-6 bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-forest-dark py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Plus className="w-5 h-5" />
                New Post
              </button>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-forest-pale focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gradient-to-br from-forest-dark/60 to-forest-main/40 backdrop-blur-xl border border-forest-light/20 rounded-2xl p-6 hover:border-forest-pale/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-forest-main to-gold flex items-center justify-center text-white font-bold flex-shrink-0">
                      {post.author.avatar}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-white">
                          {post.author.name}
                        </span>
                        <span className="text-gray-500 text-sm">•</span>
                        <span className="text-gray-400 text-sm">
                          {post.author.university}
                        </span>
                        <span className="text-gray-500 text-sm">•</span>
                        <span className="text-gray-400 text-sm flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.time}
                        </span>
                        {post.trending && (
                          <span className="bg-gold/20 text-gold px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Trending
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-white text-lg mb-2 group-hover:text-gold transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 text-gray-400 hover:text-forest-pale transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {post.likes}
                          </span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-400 hover:text-forest-pale transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {post.replies}
                          </span>
                        </button>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">{post.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl font-medium transition-all">
                Load More Posts
              </button>
            </div>
          </div>
        </div>
      </div>

      {showNewPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-forest-dark to-forest-main rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-forest-light/20 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowNewPost(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-bold text-white mb-6">
              Create New Post
            </h3>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-forest-pale mb-2">
                  Category
                </label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-forest-pale">
                  <option value="tips">💡 Tips & Tricks</option>
                  <option value="scholarship">💰 Scholarship</option>
                  <option value="jobs">💼 Part-time Jobs</option>
                  <option value="kost">🏠 Kost Reviews</option>
                  <option value="qa">❓ Q&A</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-forest-pale mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="What's your post about?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-forest-pale"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-forest-pale mb-2">
                  Content
                </label>
                <textarea
                  rows="6"
                  placeholder="Share your thoughts, tips, or questions..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-forest-pale resize-none"
                ></textarea>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewPost(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-xl font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-forest-dark py-3 rounded-xl font-bold transition-all"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
