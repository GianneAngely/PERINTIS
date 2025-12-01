import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { kosts } from "../data/kosts";
import SearchableSelect from "../components/SearchableSelect";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.DivIcon({
  className: "custom-marker",
  html: `
    <div style="position: relative; width: 50px; height: 60px;">
      <div style="
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 50px;
        background: linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%);
        clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 50% 88%, 18% 100%, 0% 38%);
        filter: drop-shadow(0 4px 12px rgba(212,175,55,0.6));
        animation: bounce 2s infinite;
      "></div>
      <div style="
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        width: 20px;
        height: 20px;
        background: #2D6A4F;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      "></div>
      <div style="
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 30px;
        height: 8px;
        background: radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%);
        border-radius: 50%;
      "></div>
    </div>
    <style>
      @keyframes bounce {
        0%, 100% { transform: translateX(-50%) translateY(0); }
        50% { transform: translateX(-50%) translateY(-8px); }
      }
    </style>
  `,
  iconSize: [50, 60],
  iconAnchor: [25, 60],
  popupAnchor: [0, -60],
});

function MapUpdater({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function RantauLoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <motion.div
        animate={{ x: [-30, 30, -30] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 140 140"
          className="drop-shadow-2xl"
        >
          <motion.g
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            ircle cx="70" cy="35" r="18" fill="#2D6A4F" />
            <ellipse cx="65" cy="33" rx="3" ry="4" fill="white" opacity="0.9" />
            <ellipse cx="75" cy="33" rx="3" ry="4" fill="white" opacity="0.9" />
            <path
              d="M 60 42 Q 70 48 80 42"
              stroke="#1a4d2e"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <rect x="58" y="53" width="24" height="40" rx="6" fill="#2D6A4F" />
            <motion.rect
              x="52"
              y="60"
              width="10"
              height="25"
              rx="5"
              fill="#2D6A4F"
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ transformOrigin: "57px 60px" }}
            />
            <motion.rect
              x="78"
              y="60"
              width="10"
              height="25"
              rx="5"
              fill="#2D6A4F"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ transformOrigin: "83px 60px" }}
            />
            <rect x="60" y="88" width="10" height="28" rx="5" fill="#2D6A4F" />
            <rect x="70" y="88" width="10" height="28" rx="5" fill="#2D6A4F" />
            <ellipse cx="65" cy="117" rx="6" ry="3" fill="#1a4d2e" />
            <ellipse cx="75" cy="117" rx="6" ry="3" fill="#1a4d2e" />
          </motion.g>
          <motion.g
            animate={{ rotate: [0, 25, -25, 0], y: [0, -3, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ transformOrigin: "100px 100px" }}
          >
            <rect
              x="88"
              y="88"
              width="24"
              height="32"
              rx="3"
              fill="#D4AF37"
              stroke="#2D6A4F"
              strokeWidth="2.5"
            />
            <rect x="92" y="92" width="16" height="3" rx="1" fill="#2D6A4F" />
            <rect x="92" y="100" width="16" height="3" rx="1" fill="#2D6A4F" />
            <rect x="92" y="108" width="16" height="3" rx="1" fill="#2D6A4F" />
            ircle cx="100" cy="82" r="3.5" fill="#2D6A4F" />
            <line
              x1="85"
              y1="95"
              x2="88"
              y2="95"
              stroke="#2D6A4F"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            ircle cx="94" cy="122" r="4.5" fill="#1a4d2e" /> ircle cx="106"
            cy="122" r="4.5" fill="#1a4d2e" />
          </motion.g>
        </svg>
      </motion.div>
      <div className="text-center space-y-4">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl"
        >
          🔍
        </motion.div>
        <h3 className="text-3xl md:text-4xl font-black text-white drop-shadow-lg">
          Lagi nyariin kost yang cocok...
        </h3>
        <p className="text-lg text-white/90 font-semibold drop-shadow">
          Tunggu sebentar, ya! ✨
        </p>
        <div className="flex items-center justify-center gap-2 pt-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.25 }}
              className="w-4 h-4 rounded-full bg-gold shadow-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SpotlightAnimation({ kost, onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-forest-main/95 via-forest-dark/95 to-forest-light/95 backdrop-blur-xl flex items-center justify-center p-6"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 3, 2], opacity: [0, 0.9, 0] }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1200px]"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(212,175,55,0.8) 0%, rgba(212,175,55,0.5) 30%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <motion.div
        initial={{ y: -100, opacity: 0, scale: 0.5 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          type: "spring",
          stiffness: 200,
        }}
        className="relative z-10 text-center space-y-6 max-w-2xl"
      >
        <motion.div
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-9xl drop-shadow-2xl"
        >
          ✨
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-5xl md:text-7xl font-heading font-black text-gold drop-shadow-2xl leading-tight"
        >
          Ini Dia!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-2xl md:text-3xl text-white font-bold drop-shadow-lg"
        >
          Kost yang cocok banget buat kamu
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.4, type: "spring" }}
          className="bg-white/95 backdrop-blur rounded-3xl p-6 shadow-2xl mt-8"
        >
          <p className="text-xl font-black text-forest-dark mb-2">
            {kost.name}
          </p>
          <p className="text-sm text-gray-600 mb-4">📍 {kost.address}</p>
          <div className="flex items-center justify-center gap-4">
            <span className="px-4 py-2 rounded-full bg-gold text-forest-dark font-bold text-sm">
              ⭐ {kost.rating}
            </span>
            <span className="px-4 py-2 rounded-full bg-forest-main text-white font-bold text-sm">
              Rp {(kost.pricePerMonth / 1000000).toFixed(1)} jt/bln
            </span>
          </div>
        </motion.div>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          onClick={onComplete}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-10 py-5 bg-gradient-to-r from-gold via-gold-light to-gold text-forest-dark text-xl font-black rounded-2xl shadow-2xl hover:shadow-gold/50 transition-all"
        >
          Lihat Detail Lengkap →
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function FullscreenMapModal({ kosts, onClose, onSelectKost }) {
  const [mapCenter] = useState([-2.5489, 118.0149]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm"
    >
      <div className="absolute top-4 right-4 z-[70] flex gap-3">
        <button
          onClick={onClose}
          className="px-6 py-3 bg-white/95 backdrop-blur rounded-2xl text-forest-dark font-black shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
        >
          ← Kembali
        </button>
      </div>
      <div className="w-full h-full">
        <MapContainer
          center={mapCenter}
          zoom={5}
          style={{ height: "100%", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className="forest-map-filter"
          />
          {kosts.map((kost) => (
            <Marker
              key={kost.id}
              position={[kost.coords.lat, kost.coords.lng]}
              icon={customIcon}
            >
              <Popup>
                <div className="text-xs space-y-3 p-3 min-w-[250px]">
                  <div className="relative h-32 rounded-xl overflow-hidden">
                    <img
                      src={`https://picsum.photos/seed/${kost.id}/400/300`}
                      alt={kost.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute top-2 right-2 px-3 py-1 rounded-full bg-gold text-forest-dark font-bold text-[10px]">
                      ⭐ {kost.rating}
                    </span>
                  </div>
                  <div>
                    <p className="font-black text-forest-dark text-sm mb-1">
                      {kost.name}
                    </p>
                    <p className="text-gold font-bold text-lg">
                      Rp {(kost.pricePerMonth / 1000000).toFixed(1)} jt/bln
                    </p>
                    <p className="text-gray-600 text-[11px] mt-1">
                      {kost.category} • 📍{" "}
                      {kost.distanceMeters < 1000
                        ? `${kost.distanceMeters}m`
                        : `${(kost.distanceMeters / 1000).toFixed(1)}km`}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onSelectKost(kost);
                      onClose();
                    }}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-forest-main to-forest-light text-white text-xs font-black rounded-xl hover:shadow-lg transition-all"
                  >
                    Lihat Detail Lengkap →
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </motion.div>
  );
}

function KostDetailModal({ kost, onClose }) {
  if (!kost) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-80 overflow-hidden">
          <img
            src={`https://picsum.photos/seed/${kost.id}/1200/800`}
            alt={kost.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute top-6 left-6 flex gap-3">
            <span className="px-5 py-2 rounded-full bg-white/95 backdrop-blur text-sm font-black text-forest-dark shadow-lg">
              {kost.category}
            </span>
            <span className="px-5 py-2 rounded-full bg-gold text-forest-dark text-sm font-black flex items-center gap-2 shadow-lg">
              ⭐ {kost.rating}
            </span>
          </div>
          <div className="absolute bottom-8 left-8 right-8">
            <h2 className="text-4xl font-heading font-black text-white mb-3 drop-shadow-lg">
              {kost.name}
            </h2>
            <p className="text-white/95 text-lg font-semibold drop-shadow flex items-center gap-2">
              <span className="text-2xl">📍</span>
              {kost.address}, {kost.city}
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/95 backdrop-blur flex items-center justify-center text-gray-700 hover:bg-white hover:scale-110 transition-all shadow-lg font-bold text-lg"
          >
            ✕
          </button>
        </div>
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-20rem)] space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl p-6 border-l-4 border-gold">
              <p className="text-xs text-gray-600 mb-2 font-bold uppercase tracking-wider">
                💰 Harga per bulan
              </p>
              <p className="text-4xl font-black text-forest-dark">
                Rp {kost.pricePerMonth.toLocaleString("id-ID")}
              </p>
            </div>
            <div className="bg-gradient-to-br from-forest-light/10 to-forest-light/5 rounded-2xl p-6 border-l-4 border-forest-main">
              <p className="text-xs text-gray-600 mb-2 font-bold uppercase tracking-wider">
                📏 Jarak dari kampus
              </p>
              <p className="text-4xl font-black text-forest-main">
                {kost.distanceMeters < 1000
                  ? `${kost.distanceMeters}m`
                  : `${(kost.distanceMeters / 1000).toFixed(1)}km`}
              </p>
            </div>
          </div>
          <div className="bg-forest-pale/20 rounded-2xl p-6">
            <p className="text-xs font-black text-gray-600 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="text-xl">🎓</span>Kampus Terdekat
            </p>
            <p className="text-xl font-black text-forest-dark">
              {kost.campusNearby}
            </p>
          </div>
          <div>
            <p className="text-xs font-black text-gray-600 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="text-xl">✨</span>Fasilitas Lengkap
            </p>
            <div className="flex flex-wrap gap-2">
              {kost.facilities.map((f, idx) => (
                <motion.span
                  key={f}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-forest-pale/50 to-forest-pale/30 text-forest-dark text-sm font-bold border-2 border-forest-pale/40 hover:border-forest-main transition-all"
                >
                  {f}
                </motion.span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-black text-gray-600 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="text-xl">🏘️</span>Lingkungan Sekitar
            </p>
            <div className="flex flex-wrap gap-2">
              {kost.environmentTags.map((tag, idx) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-gold/20 to-gold/10 text-gold-dark text-sm font-bold border border-gold/40"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6">
            <p className="text-xs font-black text-gray-600 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="text-xl">📝</span>Deskripsi
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              {kost.description}
            </p>
          </div>
          <div className="bg-amber-50 rounded-2xl p-6 border-l-4 border-amber-400">
            <p className="text-xs font-black text-gray-600 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="text-xl">⚠️</span>Peraturan Kost
            </p>
            <ul className="space-y-2">
              {kost.rules.map((rule, idx) => (
                <li
                  key={idx}
                  className="text-sm text-gray-700 flex items-start gap-2"
                >
                  <span className="text-amber-600 font-bold">•</span>
                  <span className="font-medium">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between bg-gradient-to-r from-forest-pale/30 to-transparent rounded-2xl p-5">
            <div>
              <p className="text-xs text-gray-600 font-bold mb-1">
                👤 Pemilik Kost
              </p>
              <p className="text-lg font-black text-forest-dark">
                {kost.owner}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600 font-bold mb-1">
                🚪 Kamar Tersedia
              </p>
              <p className="text-2xl font-black text-gold">
                {kost.availableRooms} kamar
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary py-4 text-base font-black rounded-2xl shadow-lg flex items-center justify-center gap-2"
            >
              <span className="text-xl">💬</span>Chat Pemilik Kost
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-4 text-base font-black rounded-2xl shadow-lg bg-gradient-to-r from-gold to-gold-light text-white hover:from-gold-light hover:to-gold transition-all flex items-center justify-center gap-2"
            >
              <span className="text-xl">📅</span>Booking Sekarang
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SmartKostFinder() {
  const [surveyMode, setSurveyMode] = useState(false);
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState({});
  const [showLoading, setShowLoading] = useState(false);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [perfectMatch, setPerfectMatch] = useState(null);
  const [selectedCampus, setSelectedCampus] = useState("Semua kampus");
  const [category, setCategory] = useState("Semua");
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [sortBy, setSortBy] = useState("terdekat");
  const [selectedKost, setSelectedKost] = useState(null);
  const [showFullscreenMap, setShowFullscreenMap] = useState(false);
  const [sidebarKost, setSidebarKost] = useState(null);
  const [mapCenter, setMapCenter] = useState([-2.5489, 118.0149]);
  const [mapZoom, setMapZoom] = useState(5);

  const surveyQuestions = [
    {
      id: "campus",
      question: "Kamu kuliah di kampus mana?",
      emoji: "🎓",
      type: "select",
    },
    {
      id: "budget",
      question: "Budget kost per bulan yang kamu siapkan?",
      emoji: "💰",
      type: "choice",
      options: [
        { label: "Di bawah Rp 800.000", value: "low" },
        { label: "Rp 800.000 - Rp 1.500.000", value: "medium" },
        { label: "Rp 1.500.000 - Rp 2.500.000", value: "high" },
        { label: "Di atas Rp 2.500.000", value: "premium" },
      ],
    },
    {
      id: "distance",
      question: "Seberapa penting jarak kost dari kampus?",
      emoji: "📍",
      type: "choice",
      options: [
        { label: "Sangat penting, harus walking distance", value: "very" },
        { label: "Penting, maksimal 15 menit", value: "medium" },
        { label: "Nggak terlalu penting", value: "low" },
      ],
    },
    {
      id: "facilities",
      question: "Fasilitas apa yang WAJIB ada?",
      emoji: "✅",
      type: "multiple",
      options: [
        { label: "WiFi kenceng", value: "wifi", icon: "📶" },
        { label: "AC", value: "ac", icon: "❄️" },
        { label: "Kamar mandi dalam", value: "bathroom", icon: "🚿" },
        { label: "Dapur", value: "kitchen", icon: "🍳" },
        { label: "Laundry", value: "laundry", icon: "👕" },
        { label: "Parkir", value: "parking", icon: "🏍️" },
      ],
    },
    {
      id: "lifestyle",
      question: "Gaya hidup kamu di kost?",
      emoji: "🌙",
      type: "choice",
      options: [
        { label: "Pulang sore, tidur awal", value: "early" },
        { label: "Suka begadang", value: "night" },
        { label: "Jarang di kost", value: "active" },
        { label: "Home-body", value: "introvert" },
      ],
    },
    {
      id: "environment",
      question: "Lingkungan kost yang kamu cari?",
      emoji: "🏘️",
      type: "choice",
      options: [
        { label: "Deket warung & minimarket", value: "food" },
        { label: "Akses transportasi mudah", value: "transport" },
        { label: "Banyak anak kampus", value: "social" },
        { label: "Tenang & sepi", value: "quiet" },
      ],
    },
    {
      id: "cleanliness",
      question: "Seberapa peduli kebersihan?",
      emoji: "✨",
      type: "choice",
      options: [
        { label: "Perfeksionis, harus rapi", value: "very" },
        { label: "Cukup rapi", value: "medium" },
        { label: "Santai aja", value: "low" },
      ],
    },
    {
      id: "roommate",
      question: "Prefer kost dengan konsep?",
      emoji: "👥",
      type: "choice",
      options: [
        { label: "Kamar sendiri", value: "single" },
        { label: "Sharing 1 orang", value: "double" },
        { label: "Sharing rame-rame", value: "multiple" },
      ],
    },
    {
      id: "security",
      question: "Seberapa penting keamanan?",
      emoji: "🔒",
      type: "choice",
      options: [
        { label: "Sangat penting (CCTV & satpam)", value: "high" },
        { label: "Cukup penting", value: "medium" },
        { label: "Nggak terlalu", value: "low" },
      ],
    },
    {
      id: "priority",
      question: "Yang PALING penting buat kamu?",
      emoji: "🎯",
      type: "choice",
      options: [
        { label: "Harga hemat", value: "price" },
        { label: "Jarak dari kampus", value: "distance" },
        { label: "Fasilitas lengkap", value: "facilities" },
        { label: "Lingkungan nyaman", value: "environment" },
      ],
    },
  ];

  const currentQuestion = surveyQuestions[surveyStep];
  const isSurveyComplete = surveyStep >= surveyQuestions.length;

  const campuses = useMemo(
    () => [
      "Semua kampus",
      ...Array.from(new Set(kosts.map((k) => k.campusNearby))),
    ],
    []
  );

  const filteredKosts = useMemo(() => {
    let list = [...kosts];
    if (selectedCampus !== "Semua kampus")
      list = list.filter((k) => k.campusNearby === selectedCampus);
    if (category !== "Semua")
      list = list.filter((k) => k.category === category);
    list = list.filter((k) => k.pricePerMonth <= maxPrice);
    if (sortBy === "harga")
      list.sort((a, b) => a.pricePerMonth - b.pricePerMonth);
    else if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => a.distanceMeters - b.distanceMeters);
    return list;
  }, [selectedCampus, category, maxPrice, sortBy]);

  const handleSurveyAnswer = (value) => {
    setSurveyAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    if (surveyStep < surveyQuestions.length - 1) {
      setTimeout(() => setSurveyStep((s) => s + 1), 400);
    } else {
      setTimeout(() => {
        setSurveyStep(surveyQuestions.length);
        setShowLoading(true);
        setTimeout(() => {
          setShowLoading(false);
          const match = filteredKosts[0] || kosts[0];
          setPerfectMatch(match);
          setShowSpotlight(true);
        }, 4000);
      }, 400);
    }
  };

  const handleMultipleSelect = (value) => {
    const current = surveyAnswers[currentQuestion.id] || [];
    const newValue = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setSurveyAnswers((prev) => ({ ...prev, [currentQuestion.id]: newValue }));
  };

  const handleMarkerClick = (kost) => {
    setSidebarKost(kost);
    setMapCenter([kost.coords.lat, kost.coords.lng]);
    setMapZoom(15);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-pale/20 via-white to-gold/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(45,106,79,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,rgba(212,175,55,0.05),transparent_50%)]" />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gold/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {!surveyMode && !showLoading && !showSpotlight && (
        <>
          <section className="relative border-b border-forest-pale/20 bg-gradient-to-r from-white/95 via-white/90 to-forest-pale/20 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 md:py-16">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto text-center"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xs sm:text-sm font-black text-gold uppercase tracking-[0.4em] mb-6 flex items-center justify-center gap-3 flex-wrap"
                >
                  <span className="w-16 h-1 bg-gradient-to-r from-transparent via-gold to-gold rounded-full" />
                  Smart Kost Finder
                  <span className="w-16 h-1 bg-gradient-to-l from-transparent via-gold to-gold rounded-full" />
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-forest-dark mb-6 leading-tight"
                >
                  Cari kost yang{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-main via-forest-light to-gold">
                    bener-bener cocok
                  </span>{" "}
                  buat rantau kamu
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8 px-4"
                >
                  Nggak perlu scroll ratusan listing. Jawab survey personal, dan
                  RANTAU nyaring pilihan terbaik.
                </motion.p>
                <motion.button
                  onClick={() => setSurveyMode(true)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-forest-main via-forest-light to-gold text-white text-base sm:text-xl font-black rounded-2xl shadow-2xl hover:shadow-gold/50 transition-all"
                >
                  <span className="flex items-center gap-3">
                    ✨ Mulai Survey Personal
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </section>

          <section className="relative max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 py-12 grid gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-forest-pale/20 space-y-5 h-fit sticky top-6"
            >
              <h3 className="text-lg font-black text-forest-dark flex items-center gap-3">
                <span className="text-2xl">🎛️</span>Filter Cepat
              </h3>
              <div className="space-y-4">
                <label className="block text-xs font-black text-gray-600 uppercase tracking-wider">
                  Kampus terdekat
                </label>
                <SearchableSelect
                  options={campuses}
                  value={selectedCampus}
                  onChange={setSelectedCampus}
                  placeholder="Pilih kampus..."
                />
              </div>
              <div className="space-y-4">
                <label className="block text-xs font-black text-gray-600 uppercase tracking-wider">
                  Jenis kost
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["Semua", "Putra", "Putri", "Campuran"].map((cat) => (
                    <motion.button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-3 rounded-xl text-sm font-black transition-all ${
                        category === cat
                          ? "bg-gradient-to-r from-forest-main to-forest-light text-white shadow-lg"
                          : "bg-forest-pale/20 text-forest-dark hover:bg-forest-pale/40 border-2 border-forest-pale/30"
                      }`}
                    >
                      {cat}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black text-gray-600 uppercase tracking-wider">
                    Budget maksimal
                  </label>
                  <span className="text-base font-black text-gold">
                    Rp {maxPrice.toLocaleString("id-ID")}
                  </span>
                </div>
                <input
                  type="range"
                  min={500000}
                  max={3000000}
                  step={100000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-3 rounded-full accent-gold cursor-pointer"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-xs font-black text-gray-600 uppercase tracking-wider">
                  Urutkan
                </label>
                <div className="grid gap-2">
                  {[
                    { value: "terdekat", label: "📍 Terdekat" },
                    { value: "harga", label: "💰 Termurah" },
                    { value: "rating", label: "⭐ Rating tinggi" },
                  ].map((sort) => (
                    <motion.button
                      key={sort.value}
                      onClick={() => setSortBy(sort.value)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      className={`px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${
                        sortBy === sort.value
                          ? "bg-gradient-to-r from-forest-main to-forest-light text-white shadow-lg"
                          : "bg-white/50 text-gray-700 hover:bg-forest-pale/20 border-2 border-transparent hover:border-forest-pale/40"
                      }`}
                    >
                      {sort.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-forest-pale/20 relative group"
              >
                <div className="h-[500px] lg:h-[600px] w-full relative">
                  <MapContainer
                    center={mapCenter}
                    zoom={mapZoom}
                    style={{ height: "100%", width: "100%" }}
                    className="z-0"
                  >
                    <MapUpdater center={mapCenter} zoom={mapZoom} />
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      className="forest-map-filter"
                    />
                    {filteredKosts.map((kost) => (
                      <Marker
                        key={kost.id}
                        position={[kost.coords.lat, kost.coords.lng]}
                        icon={customIcon}
                        eventHandlers={{ click: () => handleMarkerClick(kost) }}
                      >
                        <Popup>
                          <div className="text-xs space-y-2 p-2 min-w-[220px]">
                            <div className="relative h-28 rounded-xl overflow-hidden">
                              <img
                                src={`https://picsum.photos/seed/${kost.id}/400/300`}
                                alt={kost.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              <span className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-gold text-forest-dark font-bold text-[10px]">
                                ⭐ {kost.rating}
                              </span>
                            </div>
                            <p className="font-black text-forest-dark text-sm">
                              {kost.name}
                            </p>
                            <p className="text-gold font-bold">
                              Rp {(kost.pricePerMonth / 1000000).toFixed(1)}{" "}
                              jt/bln
                            </p>
                            <p className="text-gray-600 text-[11px]">
                              {kost.category} • 📍{" "}
                              {kost.distanceMeters < 1000
                                ? `${kost.distanceMeters}m`
                                : `${(kost.distanceMeters / 1000).toFixed(
                                    1
                                  )}km`}
                            </p>
                            <button
                              onClick={() => setSelectedKost(kost)}
                              className="w-full mt-2 px-3 py-2 bg-gradient-to-r from-forest-main to-forest-light text-white text-xs font-bold rounded-xl hover:shadow-lg transition-all"
                            >
                              Lihat Detail →
                            </button>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                  <button
                    onClick={() => setShowFullscreenMap(true)}
                    className="absolute bottom-4 right-4 z-[500] px-5 py-3 bg-white/95 backdrop-blur-md rounded-2xl text-forest-dark font-black shadow-xl hover:scale-105 transition-all flex items-center gap-2 text-sm group-hover:scale-110"
                  >
                    <span className="text-lg">🗺️</span>
                    Perbesar Peta
                  </button>
                </div>
              </motion.div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-2">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-forest-dark">
                    {filteredKosts.length} kost ditemukan
                  </h2>
                  <p className="text-xs text-gray-600 font-medium">
                    Klik kartu untuk lihat detail lengkap
                  </p>
                </div>
              </div>

              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`${selectedCampus}-${category}-${maxPrice}-${sortBy}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {filteredKosts.map((kost, idx) => (
                    <motion.div
                      key={kost.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -8, scale: 1.03 }}
                      onClick={() => setSelectedKost(kost)}
                      className="bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl cursor-pointer border border-forest-pale/20 hover:border-gold/40 transition-all group"
                    >
                      <div className="h-48 relative overflow-hidden">
                        <img
                          src={`https://picsum.photos/seed/${kost.id}/500/400`}
                          alt={kost.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <span className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur text-xs font-black text-forest-dark shadow-lg">
                          {kost.category}
                        </span>
                        <span className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-gold/95 backdrop-blur text-xs font-black text-forest-dark shadow-lg">
                          ⭐ {kost.rating}
                        </span>
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-lg font-black text-white line-clamp-1 drop-shadow-lg">
                            {kost.name}
                          </h3>
                          <p className="text-xs text-white/90 line-clamp-1 font-semibold drop-shadow">
                            📍 {kost.city}
                          </p>
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        <p className="text-xs text-gray-600 line-clamp-1 font-medium">
                          🎓 {kost.campusNearby} •{" "}
                          <span className="font-bold text-gold">
                            {kost.distanceMeters < 1000
                              ? `${kost.distanceMeters}m`
                              : `${(kost.distanceMeters / 1000).toFixed(1)}km`}
                          </span>
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {kost.facilities.slice(0, 3).map((f) => (
                            <span
                              key={f}
                              className="px-2.5 py-1.5 rounded-lg bg-forest-pale/30 text-[11px] font-bold text-forest-dark border border-forest-pale/40"
                            >
                              {f}
                            </span>
                          ))}
                          {kost.facilities.length > 3 && (
                            <span className="px-2.5 py-1.5 rounded-lg bg-gold/10 text-[11px] font-bold text-gold border border-gold/30">
                              +{kost.facilities.length - 3}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t-2 border-forest-pale/20">
                          <div>
                            <p className="text-2xl font-black text-forest-dark">
                              Rp {(kost.pricePerMonth / 1000000).toFixed(1)} jt
                            </p>
                            <p className="text-[10px] text-gray-500 font-semibold">
                              per bulan
                            </p>
                          </div>
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedKost(kost);
                            }}
                            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                            whileTap={{ scale: 0.9 }}
                            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold to-gold-light text-white text-xs font-black hover:shadow-gold/50 shadow-lg transition-all"
                          >
                            💬 Chat
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {filteredKosts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 bg-white/90 backdrop-blur-md rounded-3xl border-2 border-dashed border-forest-pale/40"
                >
                  <p className="text-6xl mb-4">🔍</p>
                  <p className="text-lg font-black text-gray-700">
                    Belum ada kost yang cocok
                  </p>
                  <p className="text-sm text-gray-500 mt-2 font-medium">
                    Coba longgarkan filter
                  </p>
                </motion.div>
              )}
            </div>
          </section>
        </>
      )}

      {surveyMode && !isSurveyComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 bg-gradient-to-br from-forest-main/95 via-forest-light/95 to-gold/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
          <div className="relative max-w-3xl w-full">
            <button
              onClick={() => setSurveyMode(false)}
              className="absolute -top-2 right-0 sm:-top-4 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all font-bold text-xl shadow-lg"
            >
              ✕
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-10 md:p-14 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="text-4xl sm:text-6xl">
                      {currentQuestion.emoji}
                    </div>
                    <div>
                      <p className="text-xs font-black text-gold uppercase tracking-wider">
                        Pertanyaan {surveyStep + 1} dari{" "}
                        {surveyQuestions.length}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 font-semibold mt-1">
                        {Math.round(
                          ((surveyStep + 1) / surveyQuestions.length) * 100
                        )}
                        % selesai
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full h-2.5 sm:h-3 rounded-full bg-gray-200 mb-6 sm:mb-8 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        ((surveyStep + 1) / surveyQuestions.length) * 100
                      }%`,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-gold via-forest-light to-forest-main rounded-full shadow-lg"
                  />
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5 sm:space-y-6"
                >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-forest-dark leading-tight">
                    {currentQuestion.question}
                  </h2>
                  {currentQuestion.type === "select" && (
                    <SearchableSelect
                      options={campuses}
                      value={surveyAnswers[currentQuestion.id] || ""}
                      onChange={handleSurveyAnswer}
                      placeholder="Pilih kampus..."
                    />
                  )}
                  {currentQuestion.type === "choice" && (
                    <div className="space-y-3">
                      {currentQuestion.options.map((opt, idx) => (
                        <motion.button
                          key={opt.value}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.08 }}
                          onClick={() => handleSurveyAnswer(opt.value)}
                          whileHover={{ scale: 1.02, x: 8 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 rounded-2xl text-sm sm:text-base font-bold transition-all bg-white border-3 border-gray-200 text-gray-700 hover:border-gold hover:shadow-xl hover:bg-gradient-to-r hover:from-gold/5 hover:to-transparent"
                        >
                          {opt.label}
                        </motion.button>
                      ))}
                    </div>
                  )}
                  {currentQuestion.type === "multiple" && (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                        Pilih semua yang sesuai, lalu klik Lanjut
                      </p>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        {currentQuestion.options.map((opt, idx) => {
                          const isSelected = (
                            surveyAnswers[currentQuestion.id] || []
                          ).includes(opt.value);
                          return (
                            <motion.button
                              key={opt.value}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.06 }}
                              onClick={() => handleMultipleSelect(opt.value)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`px-3 sm:px-4 py-3 sm:py-4 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                                isSelected
                                  ? "bg-gradient-to-r from-forest-main to-forest-light text-white shadow-lg border-2 border-forest-main"
                                  : "bg-white border-2 border-gray-200 text-gray-700 hover:border-forest-pale"
                              }`}
                            >
                              <span className="text-xl sm:text-2xl mb-1 sm:mb-2 block">
                                {opt.icon}
                              </span>
                              {opt.label}
                            </motion.button>
                          );
                        })}
                      </div>
                      <motion.button
                        onClick={() =>
                          handleSurveyAnswer(surveyAnswers[currentQuestion.id])
                        }
                        disabled={
                          !(surveyAnswers[currentQuestion.id]?.length > 0)
                        }
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-4 px-6 py-3.5 sm:py-4 bg-gradient-to-r from-gold to-gold-light text-forest-dark text-sm sm:text-base font-black rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Lanjut →
                      </motion.button>
                    </div>
                  )}
                  {surveyStep > 0 && (
                    <button
                      onClick={() => setSurveyStep((s) => s - 1)}
                      className="text-forest-main hover:text-forest-dark font-bold hover:underline text-sm"
                    >
                      ← Kembali
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}

      {showLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-forest-dark/95 via-forest-main/95 to-forest-light/95 backdrop-blur-xl flex items-center justify-center"
        >
          <RantauLoadingAnimation />
        </motion.div>
      )}

      <AnimatePresence>
        {showSpotlight && perfectMatch && (
          <SpotlightAnimation
            kost={perfectMatch}
            onComplete={() => {
              setShowSpotlight(false);
              setSurveyMode(false);
            }}
          />
        )}
      </AnimatePresence>

      {selectedKost && (
        <KostDetailModal
          kost={selectedKost}
          onClose={() => setSelectedKost(null)}
        />
      )}

      <AnimatePresence>
        {showFullscreenMap && (
          <FullscreenMapModal
            kosts={filteredKosts}
            onClose={() => setShowFullscreenMap(false)}
            onSelectKost={setSelectedKost}
          />
        )}
      </AnimatePresence>

      <style jsx>{`
        .forest-map-filter {
          filter: hue-rotate(40deg) saturate(1.8) brightness(0.9) contrast(1.1);
        }

        .custom-marker {
          background: transparent !important;
          border: none !important;
        }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #d4af37, #f4d03f);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #b8941f, #d4af37);
        }
      `}</style>
    </div>
  );
}
