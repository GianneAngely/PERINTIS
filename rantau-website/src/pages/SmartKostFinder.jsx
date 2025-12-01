import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { kosts } from "../data/kosts";
import SearchableSelect from "../components/SearchableSelect";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

const customIcon = new L.DivIcon({
  className: "custom-marker",
  html: `
    <div style="position: relative; width: 40px; height: 48px;">
      <svg width="40" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#D4AF37" stroke="#2D6A4F" stroke-width="2"/>
        ircle cx="12" cy="9" r="3" fill="#2D6A4F"/>
      </svg>
      <div style="position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%); width: 20px; height: 6px; background: radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%); border-radius: 50%;"></div>
    </div>
  `,
  iconSize: [40, 48],
  iconAnchor: [20, 48],
  popupAnchor: [0, -48],
});

function MapUpdater({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function ImprovedLoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center gap-12 px-6">
      <div className="relative">
        <motion.div
          className="relative z-10"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gold via-gold-light to-white shadow-2xl flex items-center justify-center">
            <motion.div
              className="w-24 h-24 rounded-full bg-gradient-to-br from-forest-main via-forest-light to-forest-pale flex items-center justify-center"
              animate={{
                rotate: [0, -180, -360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="text-4xl">🏠</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-gold to-forest-light opacity-30 blur-2xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-gold to-white shadow-lg"
            style={{
              originX: 0.5,
              originY: 0.5,
            }}
            animate={{
              x: [0, Math.cos((i * Math.PI) / 4) * 80, 0],
              y: [0, Math.sin((i * Math.PI) / 4) * 80, 0],
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <div className="text-center space-y-6 max-w-md">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="text-7xl"
        >
          ✨
        </motion.div>

        <div className="space-y-3">
          <h3 className="text-4xl md:text-5xl font-black text-white drop-shadow-2xl leading-tight">
            Lagi nyari kost <span className="text-gold">terbaik</span> buat
            kamu...
          </h3>
          <p className="text-xl text-white/95 font-bold drop-shadow-lg">
            Tunggu sebentar, ya! 🎯
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-4">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              className="w-5 h-5 rounded-full bg-gradient-to-br from-gold via-white to-gold shadow-xl"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SpotlightAnimation({ topKosts, onComplete, onSelectKost }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-forest-main/95 via-forest-dark/95 to-forest-light/95 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
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

      <div className="relative z-10 w-full max-w-6xl mx-auto py-8">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-6 drop-shadow-2xl"
          >
            ✨
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-heading font-black text-gold drop-shadow-2xl leading-tight mb-4">
            Ini Dia Top 3 Kost!
          </h2>
          <p className="text-2xl md:text-3xl text-white font-bold drop-shadow-lg">
            Pilih yang paling cocok buat kamu
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {topKosts.map((kost, idx) => (
            <motion.div
              key={kost.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.8 + idx * 0.2,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => onSelectKost(kost)}
              className="bg-white/98 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl cursor-pointer group relative"
            >
              {idx === 0 && (
                <div className="absolute top-4 right-4 z-10 px-4 py-2 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-forest-dark font-black text-sm shadow-lg flex items-center gap-2">
                  <span className="text-lg">👑</span> Best Match
                </div>
              )}

              <div className="relative h-56 overflow-hidden">
                <img
                  src={kost.photos[0]}
                  alt={kost.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur text-xs font-black text-forest-dark">
                    {kost.category}
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-gold/95 backdrop-blur text-xs font-black text-forest-dark">
                    ⭐ {kost.rating}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-black text-white drop-shadow-lg line-clamp-2 mb-1">
                    {kost.name}
                  </h3>
                  <p className="text-sm text-white/90 font-semibold drop-shadow flex items-center gap-1">
                    <span>📍</span> {kost.city}
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-gradient-to-r from-gold/10 to-transparent rounded-xl p-4 border-l-4 border-gold">
                  <p className="text-xs text-white font-bold mb-1">
                    💰 Harga per bulan
                  </p>
                  <p className="text-3xl font-bold text-white">
                    Rp {(kost.pricePerMonth / 1000000).toFixed(1)} jt
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-white">
                  <span className="font-bold">
                    📏{" "}
                    {kost.distanceMeters < 1000
                      ? `${kost.distanceMeters}m`
                      : `${(kost.distanceMeters / 1000).toFixed(1)}km`}
                  </span>
                  <span>dari {kost.campusNearby}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {kost.facilities.slice(0, 4).map((f) => (
                    <span
                      key={f}
                      className="px-2.5 py-1 rounded-lg bg-forest-pale/30 text-xs font-bold text-forest-dark border border-forest-pale/40"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectKost(kost);
                  }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-forest-main to-forest-light text-white font-black rounded-2xl shadow-lg hover:shadow-2xl transition-all"
                >
                  Lihat Detail Lengkap →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center"
        >
          <motion.button
            onClick={onComplete}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-white/20 backdrop-blur-md border-2 border-white/40 text-white text-lg font-black rounded-2xl shadow-xl hover:bg-white/30 transition-all"
          >
            Lihat Semua Kost →
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ChatModal({ kost, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "owner",
      text: `Halo! Terima kasih sudah tertarik dengan ${kost.name}. Ada yang bisa saya bantu?`,
      time: "Baru saja",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const quickReplies = [
    "Apakah masih ada kamar kosong?",
    "Bagaimana cara pembayarannya?",
    "Boleh lihat kamarnya dulu?",
    "Kapan bisa pindah?",
  ];

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      from: "user",
      text: text,
      time: "Baru saja",
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputText("");

    setTimeout(() => {
      let responseText =
        "Terima kasih atas pertanyaannya! Pemilik kost akan segera merespon. 😊";

      if (
        text.toLowerCase().includes("kosong") ||
        text.toLowerCase().includes("kamar")
      ) {
        responseText = `Saat ini tersedia ${kost.availableRooms} kamar kosong di ${kost.name}. Mau langsung survey?`;
      } else if (
        text.toLowerCase().includes("bayar") ||
        text.toLowerCase().includes("harga")
      ) {
        responseText = `Harga kost Rp ${kost.pricePerMonth.toLocaleString(
          "id-ID",
        )}/bulan. Bisa bayar bulanan atau 3 bulanan dengan diskon 5%! 💰`;
      } else if (
        text.toLowerCase().includes("lihat") ||
        text.toLowerCase().includes("survey")
      ) {
        responseText =
          "Boleh banget! Kapan mau ke lokasi? Saya bisa atur jadwal survey hari ini atau besok. 🏠";
      } else if (
        text.toLowerCase().includes("pindah") ||
        text.toLowerCase().includes("kapan")
      ) {
        responseText =
          "Bisa pindah kapan saja! Kalau sudah deal, biasanya bisa langsung pindah dalam 1-2 hari. ✨";
      }

      const ownerResponse = {
        id: messages.length + 2,
        from: "owner",
        text: responseText,
        time: "Baru saja",
      };

      setMessages((prev) => [...prev, ownerResponse]);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl w-full max-w-2xl h-[600px] shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="bg-gradient-to-r from-forest-main to-forest-light text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-2xl">
              👤
            </div>
            <div>
              <h3 className="font-black text-lg">{kost.owner}</h3>
              <p className="text-xs text-white/80 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                Online
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
          >
            <span className="text-xl font-bold">✕</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                msg.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-5 py-3 ${
                  msg.from === "user"
                    ? "bg-gradient-to-r from-forest-main to-forest-light text-white"
                    : "bg-white shadow-md text-gray-800"
                }`}
              >
                <p className="text-sm font-semibold leading-relaxed">
                  {msg.text}
                </p>
                <p
                  className={`text-xs mt-1 ${
                    msg.from === "user" ? "text-white/70" : "text-gray-500"
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-4 bg-white border-t border-gray-200 space-y-3">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <motion.button
                key={reply}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSendMessage(reply)}
                className="px-4 py-2 rounded-full bg-forest-pale/30 text-forest-dark text-xs font-bold hover:bg-forest-pale/50 transition-all border border-forest-pale/40"
              >
                {reply}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && handleSendMessage(inputText)
              }
              placeholder="Ketik pesan..."
              className="flex-1 px-5 py-3 rounded-2xl border-2 border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all font-semibold text-sm"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSendMessage(inputText)}
              className="w-12 h-12 rounded-2xl bg-gradient-to-r from-gold to-gold-light text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
function FullscreenMapModal({
  kosts,
  onClose,
  onSelectKost,
  initialSelectedKost = null,
}) {
  const [mapCenter] = useState([-2.5489, 118.0149]);
  const [selectedKost, setSelectedKost] = useState(initialSelectedKost);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleKostSelect = (kost) => {
    setSelectedKost(kost);
  };

  const handleViewDetail = (kost) => {
    onSelectKost(kost);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm"
    >
      <div className="absolute top-4 right-4 z-[10001] flex gap-3">
        <button
          onClick={onClose}
          className="px-6 py-3 bg-white/95 backdrop-blur rounded-2xl text-forest-dark font-black shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
        >
          ← Kembali
        </button>
      </div>

      <div className="w-full h-full relative">
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
              eventHandlers={{
                click: () => handleKostSelect(kost),
              }}
            >
              <Popup>
                <div className="text-xs space-y-3 p-3 min-w-[250px]">
                  <div className="relative h-32 rounded-xl overflow-hidden">
                    <img
                      src={kost.photos[0]}
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
                    onClick={() => handleViewDetail(kost)}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-forest-main to-forest-light text-white text-xs font-black rounded-xl hover:shadow-lg transition-all"
                  >
                    Lihat Detail Lengkap →
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <AnimatePresence>
          {selectedKost && (
            <>
              {isMobile ? (
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="absolute bottom-0 left-0 right-0 z-[10000] bg-white rounded-t-3xl shadow-2xl max-h-[70vh] overflow-y-auto border-t-4 border-gold"
                >
                  <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                    <h3 className="text-lg font-black text-forest-dark pr-4 line-clamp-1">
                      {selectedKost.name}
                    </h3>
                    <button
                      onClick={() => setSelectedKost(null)}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold transition-all flex-shrink-0"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="p-6 space-y-4 bg-white">
                    <div className="relative h-48 rounded-2xl overflow-hidden">
                      <img
                        src={selectedKost.photos[0]}
                        alt={selectedKost.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute top-3 right-3 px-4 py-2 rounded-full bg-gold text-forest-dark font-bold text-sm shadow-lg">
                        ⭐ {selectedKost.rating}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-gold flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="font-medium">
                          {selectedKost.address}, {selectedKost.city}
                        </span>
                      </p>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1.5 rounded-full bg-forest-pale/50 text-forest-dark text-xs font-bold">
                          {selectedKost.category}
                        </span>
                        <span className="px-3 py-1.5 rounded-full bg-gold/20 text-gold text-xs font-bold">
                          📍{" "}
                          {selectedKost.distanceMeters < 1000
                            ? `${selectedKost.distanceMeters}m`
                            : `${(selectedKost.distanceMeters / 1000).toFixed(
                                1,
                              )}km`}
                        </span>
                      </div>

                      <div className="bg-gradient-to-r from-gold/10 to-transparent rounded-xl p-4 border-l-4 border-gold">
                        <p className="text-xs text-white mb-1 font-bold">
                          💰 Harga per bulan
                        </p>
                        <p className="text-3xl font-bold text-white">
                          Rp {(selectedKost.pricePerMonth / 1000000).toFixed(1)}{" "}
                          jt
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
                          ✨ Fasilitas
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {selectedKost.facilities.slice(0, 6).map((f) => (
                            <span
                              key={f}
                              className="px-3 py-1.5 rounded-lg bg-forest-pale/30 text-xs font-bold text-forest-dark border border-forest-pale/40"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
                          🏷️ Tags
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {selectedKost.environmentTags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1.5 rounded-full bg-gold/10 text-xs font-bold text-gold border border-gold/30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => handleViewDetail(selectedKost)}
                        className="w-full btn-primary py-4 text-base font-black rounded-xl mt-4 shadow-lg"
                      >
                        Lihat Detail Lengkap →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="absolute left-4 top-20 bottom-4 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gold/30 z-[10000] flex flex-col"
                >
                  <div className="flex items-start justify-between p-5 border-b border-gray-200 flex-shrink-0 bg-white">
                    <h3 className="text-lg font-black text-forest-dark pr-2 line-clamp-2 flex-1">
                      {selectedKost.name}
                    </h3>
                    <button
                      onClick={() => setSelectedKost(null)}
                      className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm transition-all flex-shrink-0 ml-2"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white">
                    <div className="relative h-48 rounded-2xl overflow-hidden">
                      <img
                        src={selectedKost.photos[0]}
                        alt={selectedKost.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-gold text-forest-dark font-bold text-xs">
                        ⭐ {selectedKost.rating}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs text-gray-600 flex items-start gap-2">
                        <svg
                          className="w-4 h-4 text-gold flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="font-medium">
                          {selectedKost.address}, {selectedKost.city}
                        </span>
                      </p>

                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1.5 rounded-full bg-forest-pale/50 text-forest-dark text-xs font-bold">
                          {selectedKost.category}
                        </span>
                        <span className="px-3 py-1.5 rounded-full bg-gold/20 text-gold text-xs font-bold">
                          📍{" "}
                          {selectedKost.distanceMeters < 1000
                            ? `${selectedKost.distanceMeters}m`
                            : `${(selectedKost.distanceMeters / 1000).toFixed(
                                1,
                              )}km`}
                        </span>
                      </div>

                      <div className="bg-gradient-to-r from-gold/10 to-transparent rounded-xl p-4 border-l-4 border-gold">
                        <p className="text-xs text--600 mb-1 font-bold">
                          💰 Harga per bulan
                        </p>
                        <p className="text-2xl font-bold text-white">
                          Rp {(selectedKost.pricePerMonth / 1000000).toFixed(1)}{" "}
                          jt
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
                          ✨ Fasilitas
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedKost.facilities.slice(0, 6).map((f) => (
                            <span
                              key={f}
                              className="px-2.5 py-1 rounded-lg bg-forest-pale/30 text-[10px] font-bold text-forest-dark border border-forest-pale/40"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
                          🏷️ Tags
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedKost.environmentTags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-full bg-gold/10 text-[10px] font-bold text-gold border border-gold/30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => handleViewDetail(selectedKost)}
                        className="w-full btn-primary py-3 text-sm font-black rounded-xl mt-4"
                      >
                        Lihat Detail Lengkap →
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function KostDetailModal({ kost, onClose, onOpenChat }) {
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
            src={kost.photos[0]}
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
              <p className="text-xs text-white mb-2 font-bold uppercase tracking-wider">
                💰 Harga per bulan
              </p>
              <p className="text-4xl font-bold text-white">
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
              onClick={() => onOpenChat(kost)}
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
  const navigate = useNavigate();
  const [surveyMode, setSurveyMode] = useState(false);
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState({});
  const [showLoading, setShowLoading] = useState(false);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [topMatches, setTopMatches] = useState([]);
  const [selectedCampus, setSelectedCampus] = useState("Semua kampus");
  const [category, setCategory] = useState("Semua");
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [sortBy, setSortBy] = useState("terdekat");
  const [selectedKost, setSelectedKost] = useState(null);
  const [showFullscreenMap, setShowFullscreenMap] = useState(false);
  const [sidebarKost, setSidebarKost] = useState(null);
  const [mapCenter, setMapCenter] = useState([-2.5489, 118.0149]);
  const [mapZoom, setMapZoom] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [chatKost, setChatKost] = useState(null);

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
    [],
  );

  const allTags = useMemo(() => {
    const tags = new Set();
    kosts.forEach((k) => k.environmentTags.forEach((tag) => tags.add(tag)));
    return Array.from(tags);
  }, []);

  const filteredKosts = useMemo(() => {
    let list = [...kosts];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      list = list.filter(
        (k) =>
          k.name.toLowerCase().includes(query) ||
          k.city.toLowerCase().includes(query) ||
          k.address.toLowerCase().includes(query) ||
          k.campusNearby.toLowerCase().includes(query),
      );
    }

    if (selectedCampus !== "Semua kampus")
      list = list.filter((k) => k.campusNearby === selectedCampus);
    if (category !== "Semua")
      list = list.filter((k) => k.category === category);
    list = list.filter((k) => k.pricePerMonth <= maxPrice);

    if (selectedTags.length > 0) {
      list = list.filter((k) =>
        selectedTags.every((tag) => k.environmentTags.includes(tag)),
      );
    }

    if (sortBy === "harga")
      list.sort((a, b) => a.pricePerMonth - b.pricePerMonth);
    else if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => a.distanceMeters - b.distanceMeters);

    return list;
  }, [selectedCampus, category, maxPrice, sortBy, searchQuery, selectedTags]);

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
          const top3 =
            filteredKosts.slice(0, 3).length > 0
              ? filteredKosts.slice(0, 3)
              : kosts.slice(0, 3);
          setTopMatches(top3);
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

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleOpenChat = (kost) => {
    setChatKost(kost);
    setSelectedKost(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-pale/20 via-white to-gold/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(45,106,79,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,rgba(212,175,55,0.05),transparent_50%)]" />

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
                  🔍 Cari Manual
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari nama kost atau lokasi..."
                    className="w-full px-4 py-3 pr-10 rounded-xl border-2 border-forest-pale/30 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-sm font-semibold"
                  />
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-black text-gray-600 uppercase tracking-wider">
                  🏷️ Filter by Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <motion.button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                        selectedTags.includes(tag)
                          ? "bg-gradient-to-r from-gold to-gold-light text-white shadow-lg"
                          : "bg-forest-pale/20 text-forest-dark hover:bg-forest-pale/40 border border-forest-pale/40"
                      }`}
                    >
                      {tag}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-black text-gray-600 uppercase tracking-wider">
                  🎓 Kampus terdekat
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
                  🚻 Jenis kost
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
                    💰 Budget maksimal
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
                <div className="flex justify-between text-xs text-gray-500 font-semibold">
                  <span>500K</span>
                  <span>3jt</span>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-black text-gray-600 uppercase tracking-wider">
                  📊 Urutkan
                </label>
                <div className="grid gap-2">
                  {[
                    { value: "terdekat", label: "📍 Terdekat", icon: "📍" },
                    { value: "harga", label: "💰 Termurah", icon: "💰" },
                    { value: "rating", label: "⭐ Rating tinggi", icon: "⭐" },
                  ].map((sort) => (
                    <motion.button
                      key={sort.value}
                      onClick={() => setSortBy(sort.value)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      className={`px-4 py-3 rounded-xl text-sm font-bold transition-all text-left flex items-center gap-2 ${
                        sortBy === sort.value
                          ? "bg-gradient-to-r from-forest-main to-forest-light text-white shadow-lg"
                          : "bg-white/50 text-gray-700 hover:bg-forest-pale/20 border-2 border-transparent hover:border-forest-pale/40"
                      }`}
                    >
                      <span className="text-lg">{sort.icon}</span>
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
                                src={kost.photos[0]}
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
                                    1,
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
                    className="absolute bottom-4 right-4 z-[500] w-12 h-12 bg-white/95 backdrop-blur-md rounded-xl shadow-xl hover:scale-110 transition-all flex items-center justify-center group-hover:scale-105"
                  >
                    <svg
                      className="w-6 h-6 text-forest-dark"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                  </button>
                </div>

                {sidebarKost && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="absolute left-4 top-4 bottom-4 w-80 bg-white rounded-2xl shadow-2xl p-5 overflow-y-auto border-2 border-gold/30 z-[400]"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-black text-forest-dark pr-2 line-clamp-2">
                        {sidebarKost.name}
                      </h3>
                      <button
                        onClick={() => setSidebarKost(null)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm transition-all flex-shrink-0"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="relative h-40 rounded-2xl overflow-hidden mb-4">
                      <img
                        src={sidebarKost.photos[0]}
                        alt={sidebarKost.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-gold text-forest-dark font-bold text-xs">
                        ⭐ {sidebarKost.rating}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <p className="text-xs text-gray-600 flex items-start gap-2">
                        <svg
                          className="w-4 h-4 text-gold flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="font-medium">
                          {sidebarKost.address}, {sidebarKost.city}
                        </span>
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1.5 rounded-full bg-forest-pale/50 text-forest-dark text-xs font-bold">
                          {sidebarKost.category}
                        </span>
                        <span className="px-3 py-1.5 rounded-full bg-gold/20 text-gold text-xs font-bold">
                          📍{" "}
                          {sidebarKost.distanceMeters < 1000
                            ? `${sidebarKost.distanceMeters}m`
                            : `${(sidebarKost.distanceMeters / 1000).toFixed(
                                1,
                              )}km`}
                        </span>
                      </div>
                      <div className="bg-gradient-to-r from-gold/10 to-transparent rounded-xl p-4 border-l-4 border-gold">
                        <p className="text-xs text-white mb-1 font-bold">
                          💰 Harga per bulan
                        </p>
                        <p className="text-2xl font-bold text-white">
                          Rp {(sidebarKost.pricePerMonth / 1000000).toFixed(1)}{" "}
                          jt
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
                          ✨ Fasilitas
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {sidebarKost.facilities.slice(0, 6).map((f) => (
                            <span
                              key={f}
                              className="px-2.5 py-1 rounded-lg bg-forest-pale/30 text-[10px] font-bold text-forest-dark border border-forest-pale/40"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
                          🏷️ Tags
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {sidebarKost.environmentTags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-full bg-gold/10 text-[10px] font-bold text-gold border border-gold/30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedKost(sidebarKost);
                          setSidebarKost(null);
                        }}
                        className="w-full btn-primary py-3 text-sm font-black rounded-xl mt-4"
                      >
                        Lihat Detail Lengkap →
                      </button>
                    </div>
                  </motion.div>
                )}
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
                  key={`${selectedCampus}-${category}-${maxPrice}-${sortBy}-${searchQuery}-${selectedTags.join(
                    ",",
                  )}`}
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
                          src={kost.photos[0]}
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
                              setChatKost(kost);
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
                    Coba longgarkan filter atau ubah pencarian
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
          className="fixed inset-0 z-[9000] bg-gradient-to-br from-forest-main/95 via-forest-light/95 to-gold/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />

          <div className="relative max-w-2xl w-full my-auto">
            <div className="flex items-center justify-between mb-6">
              <motion.button
                onClick={() => {
                  if (surveyStep > 0) {
                    setSurveyStep((s) => s - 1);
                  } else {
                    setSurveyMode(false);
                    setSurveyStep(0);
                    setSurveyAnswers({});
                  }
                }}
                whileHover={{ scale: 1.05, x: -3 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-3 rounded-xl bg-white/20 backdrop-blur-md text-white font-black text-sm hover:bg-white/30 transition-all shadow-lg flex items-center gap-2"
              >
                ← {surveyStep > 0 ? "Kembali" : "Batal"}
              </motion.button>

              <motion.button
                onClick={() => {
                  setSurveyMode(false);
                  setSurveyStep(0);
                  setSurveyAnswers({});
                }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-all font-bold text-xl shadow-lg"
              >
                ✕
              </motion.button>
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/98 backdrop-blur-xl rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl"
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
                          ((surveyStep + 1) / surveyQuestions.length) * 100,
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
                    <div className="max-w-md">
                      <SearchableSelect
                        options={campuses}
                        value={surveyAnswers[currentQuestion.id] || ""}
                        onChange={handleSurveyAnswer}
                        placeholder="Pilih kampus..."
                      />
                    </div>
                  )}

                  {currentQuestion.type === "choice" && (
                    <div className="space-y-3">
                      {currentQuestion.options.map((opt, idx) => (
                        <motion.button
                          key={opt.value}
                          initial={{ opacity: 1, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.08 }}
                          onClick={() => handleSurveyAnswer(opt.value)}
                          className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 rounded-2xl text-sm sm:text-base font-bold transition-all bg-white border-3 border-gray-200 text-gray-700 hover:border-gold hover:shadow-lg hover:bg-gold-5"
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
                              initial={{ opacity: 1, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.06 }}
                              onClick={() => handleMultipleSelect(opt.value)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`px-3 sm:px-4 py-3 sm:py-4 rounded-xl text-xs sm:text-sm font-bold transition-all border-2 ${
                                isSelected
                                  ? "bg-gradient-to-r from-forest-main to-forest-light text-white border-forest-main shadow-lg"
                                  : "bg-white text-gray-700 border-gray-200 hover:border-gold"
                              }`}
                            >
                              <div className="text-xl sm:text-2xl mb-1">
                                {opt.icon}
                              </div>
                              {opt.label}
                            </motion.button>
                          );
                        })}
                      </div>
                      <motion.button
                        onClick={() =>
                          handleSurveyAnswer(
                            surveyAnswers[currentQuestion.id] || [],
                          )
                        }
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-4 px-6 py-4 bg-gradient-to-r from-gold to-gold-light text-white text-base font-black rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={
                          !surveyAnswers[currentQuestion.id] ||
                          surveyAnswers[currentQuestion.id].length === 0
                        }
                      >
                        Lanjut →
                      </motion.button>
                    </div>
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
          <ImprovedLoadingAnimation />
        </motion.div>
      )}

      <AnimatePresence>
        {showSpotlight && topMatches.length > 0 && (
          <SpotlightAnimation
            topKosts={topMatches}
            onComplete={() => {
              setShowSpotlight(false);
              setSurveyMode(false);
              setShowLoading(false);
              // jangan reset surveyStep / surveyAnswers di sini
            }}
            onSelectKost={(kost) => {
              setShowSpotlight(false);
              setSurveyMode(false);
              setShowLoading(false);
              setSelectedKost(kost);
              // surveyAnswers & topMatches tetap tersimpan
            }}
          />
        )}

        {selectedKost && (
          <KostDetailModal
            kost={selectedKost}
            onClose={() => setSelectedKost(null)}
            onOpenChat={handleOpenChat}
          />
        )}
        {chatKost && (
          <ChatModal kost={chatKost} onClose={() => setChatKost(null)} />
        )}
        {showFullscreenMap && (
          <FullscreenMapModal
            kosts={filteredKosts}
            onClose={() => setShowFullscreenMap(false)}
            onSelectKost={setSelectedKost}
            initialSelectedKost={sidebarKost}
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
