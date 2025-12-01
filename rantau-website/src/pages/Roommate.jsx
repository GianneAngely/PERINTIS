import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { roommates } from "../data/roommates";

function ChatModal({ roommate, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "roommate",
      text: `Halo! Aku ${
        roommate.name.split(" ")[0]
      }. Senang bisa kenalan sama kamu! 😊`,
      time: "Baru saja",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const quickReplies = [
    "Kamu biasanya tidur jam berapa?",
    "Suka ngapain di waktu luang?",
    "Gimana kebiasaan belajar kamu?",
    "Boleh cerita tentang hobi kamu?",
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
        "Wah, pertanyaan menarik! Mari kita saling kenal lebih dalam 😊";

      if (
        text.toLowerCase().includes("tidur") ||
        text.toLowerCase().includes("jam")
      ) {
        responseText = `Aku biasanya ${roommate.sleepSchedule.toLowerCase()}. Gimana dengan kamu?`;
      } else if (
        text.toLowerCase().includes("hobi") ||
        text.toLowerCase().includes("waktu luang")
      ) {
        const hobbies = roommate.hobbies.slice(0, 2).join(" dan ");
        responseText = `Aku suka ${hobbies}! Kamu suka hal yang sama nggak?`;
      } else if (
        text.toLowerCase().includes("belajar") ||
        text.toLowerCase().includes("kuliah")
      ) {
        responseText = `${roommate.studyHabits}. Kalau kamu lebih suka belajar gimana?`;
      } else if (
        text.toLowerCase().includes("kebersihan") ||
        text.toLowerCase().includes("rapi")
      ) {
        responseText = `Soal kebersihan, aku tipe ${roommate.cleanliness.toLowerCase()}. Penting banget buat aku!`;
      }

      const roommateResponse = {
        id: messages.length + 2,
        from: "roommate",
        text: responseText,
        time: "Baru saja",
      };

      setMessages((prev) => [...prev, roommateResponse]);
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
              {roommate.gender === "Perempuan" ? "👩" : "👨"}
            </div>
            <div>
              <h3 className="font-black text-lg">{roommate.name}</h3>
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

function MatchAnimation() {
  const particlePositions = useMemo(
    () =>
      [...Array(12)].map((_, i) => ({
        x: Math.cos((i * Math.PI) / 6) * 100,
        y: Math.sin((i * Math.PI) / 6) * 100,
      })),
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-forest-dark/95 via-forest-main/95 to-gold/90 backdrop-blur-xl flex items-center justify-center"
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

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 rounded-full bg-gradient-to-br from-gold via-gold-light to-white shadow-2xl flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-forest-main via-forest-light to-forest-pale flex items-center justify-center"
              >
                <span className="text-5xl">🤝</span>
              </motion.div>
            </motion.div>

            {particlePositions.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-gold shadow-lg"
                style={{
                  originX: 0.5,
                  originY: 0.5,
                }}
                animate={{
                  x: [0, pos.x, 0],
                  y: [0, pos.y, 0],
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.h2
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl md:text-7xl font-heading font-black text-gold drop-shadow-2xl mb-4"
          >
            Mencari Kecocokan...
          </motion.h2>
          <p className="text-2xl md:text-3xl text-white font-bold drop-shadow-lg">
            Tunggu sebentar, ya! ✨
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-3 mt-8">
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
    </motion.div>
  );
}

function RoommateDetailModal({ roommate, onClose, onChat }) {
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
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 bg-gradient-to-br from-forest-main via-forest-light to-gold overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />

          <div className="absolute top-6 right-6">
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-white/95 backdrop-blur flex items-center justify-center text-gray-700 hover:bg-white hover:scale-110 transition-all shadow-lg font-bold text-lg"
            >
              ✕
            </button>
          </div>

          <div className="absolute bottom-6 left-8 right-8 flex items-end gap-6">
            <div className="w-32 h-32 rounded-2xl bg-white shadow-2xl flex items-center justify-center text-7xl border-4 border-white">
              {roommate.gender === "Perempuan" ? "👩" : "👨"}
            </div>
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-heading font-black text-white drop-shadow-lg">
                  {roommate.name}
                </h2>
                {roommate.verified && (
                  <span className="px-3 py-1 rounded-full bg-gold text-forest-dark text-xs font-black flex items-center gap-1">
                    ✓ Verified
                  </span>
                )}
              </div>
              <p className="text-white/95 text-sm font-semibold drop-shadow">
                {roommate.major}, {roommate.university}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 overflow-y-auto max-h-[calc(90vh-16rem)] space-y-6">
          <div className="bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl p-6 border-l-4 border-gold">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-gray-600 font-bold uppercase tracking-wider">
                🎯 Compatibility Match
              </p>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light"
              >
                {roommate.matchPercentage}%
              </motion.div>
            </div>
            <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${roommate.matchPercentage}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-gold via-gold-light to-gold rounded-full"
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-black text-gray-600 uppercase tracking-wider mb-3">
              💬 Bio
            </p>
            <p className="text-base text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-4">
              {roommate.bio}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-forest-pale/20 rounded-2xl p-4">
              <p className="text-xs font-bold text-gray-600 mb-2">👤 Usia</p>
              <p className="text-lg font-black text-forest-dark">
                {roommate.age} tahun
              </p>
            </div>
            <div className="bg-forest-pale/20 rounded-2xl p-4">
              <p className="text-xs font-bold text-gray-600 mb-2">
                📚 Semester
              </p>
              <p className="text-lg font-black text-forest-dark">
                Semester {roommate.semester}
              </p>
            </div>
            <div className="bg-forest-pale/20 rounded-2xl p-4">
              <p className="text-xs font-bold text-gray-600 mb-2">🏠 Asal</p>
              <p className="text-lg font-black text-forest-dark">
                {roommate.hometown}
              </p>
            </div>
            <div className="bg-forest-pale/20 rounded-2xl p-4">
              <p className="text-xs font-bold text-gray-600 mb-2">💰 Budget</p>
              <p className="text-lg font-black text-forest-dark">
                Rp {roommate.budget}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-black text-gray-600 uppercase tracking-wider mb-3">
              📍 Lokasi Preferensi
            </p>
            <p className="text-base font-bold text-forest-dark bg-forest-pale/20 rounded-xl p-4">
              {roommate.preferredArea}
            </p>
          </div>

          <div>
            <p className="text-xs font-black text-gray-600 uppercase tracking-wider mb-3">
              🌙 Kebiasaan & Gaya Hidup
            </p>
            <div className="grid gap-3">
              {[
                {
                  icon: "😴",
                  label: "Jadwal Tidur",
                  value: roommate.sleepSchedule,
                },
                {
                  icon: "✨",
                  label: "Kebersihan",
                  value: roommate.cleanliness,
                },
                {
                  icon: "📖",
                  label: "Kebiasaan Belajar",
                  value: roommate.studyHabits,
                },
                {
                  icon: "👥",
                  label: "Tingkat Sosial",
                  value: roommate.socialLevel,
                },
                { icon: "🚭", label: "Merokok", value: roommate.smoking },
                { icon: "🐾", label: "Hewan Peliharaan", value: roommate.pets },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 bg-white rounded-xl p-4 border-2 border-forest-pale/20"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 font-bold mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-black text-gray-600 uppercase tracking-wider mb-3">
              🎨 Hobi & Minat
            </p>
            <div className="flex flex-wrap gap-2">
              {roommate.hobbies.map((hobby, idx) => (
                <motion.span
                  key={hobby}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-gold/20 to-gold/10 text-gold-dark text-sm font-bold border border-gold/40"
                >
                  {hobby}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.button
            onClick={() => onChat(roommate)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 text-base font-black rounded-2xl shadow-lg bg-gradient-to-r from-forest-main to-forest-light text-white flex items-center justify-center gap-2"
          >
            <span className="text-xl">💬</span>
            Mulai Obrolan Aman
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

const surveyQuestions = [
  {
    id: "sleepSchedule",
    question: "Kamu biasanya tidur jam berapa?",
    emoji: "🌙",
    type: "choice",
    options: [
      {
        label: "Early bird (21.00-22.00)",
        value: "early",
        points: { early: 10, medium: 5, night: 0 },
      },
      {
        label: "Normal (22.00-23.00)",
        value: "medium",
        points: { early: 5, medium: 10, night: 5 },
      },
      {
        label: "Night owl (23.00-01.00)",
        value: "night",
        points: { early: 0, medium: 5, night: 10 },
      },
      {
        label: "Fleksibel, tergantung situasi",
        value: "flexible",
        points: { early: 7, medium: 7, night: 7 },
      },
    ],
  },
  {
    id: "cleanliness",
    question: "Seberapa penting kebersihan buat kamu?",
    emoji: "✨",
    type: "choice",
    options: [
      {
        label: "Sangat penting! Aku perfeksionis soal kebersihan",
        value: "very",
        points: { very: 10, medium: 3, low: 0 },
      },
      {
        label: "Cukup penting, asal rapi aja",
        value: "medium",
        points: { very: 5, medium: 10, low: 5 },
      },
      {
        label: "Santai, yang penting nyaman",
        value: "low",
        points: { very: 0, medium: 5, low: 10 },
      },
    ],
  },
  {
    id: "socialLevel",
    question: "Gimana tipe kepribadian kamu?",
    emoji: "👥",
    type: "choice",
    options: [
      {
        label: "Ekstrovert banget! Suka ngobrol & ngumpul",
        value: "extrovert",
        points: { extrovert: 10, ambivert: 5, introvert: 2 },
      },
      {
        label: "Ambivert, tergantung mood",
        value: "ambivert",
        points: { extrovert: 5, ambivert: 10, introvert: 5 },
      },
      {
        label: "Introvert, butuh me-time",
        value: "introvert",
        points: { extrovert: 2, ambivert: 5, introvert: 10 },
      },
    ],
  },
  {
    id: "studyHabits",
    question: "Kapan waktu produktif belajar kamu?",
    emoji: "📚",
    type: "choice",
    options: [
      {
        label: "Pagi sampai siang",
        value: "morning",
        points: { morning: 10, afternoon: 5, night: 2 },
      },
      {
        label: "Sore sampai malam",
        value: "afternoon",
        points: { morning: 5, afternoon: 10, night: 5 },
      },
      {
        label: "Tengah malam (midnight study)",
        value: "night",
        points: { morning: 0, afternoon: 5, night: 10 },
      },
      {
        label: "Kapan aja kalau lagi mood",
        value: "flexible",
        points: { morning: 7, afternoon: 7, night: 7 },
      },
    ],
  },
  {
    id: "noiseTolerance",
    question: "Toleransi kamu terhadap suara?",
    emoji: "🔊",
    type: "choice",
    options: [
      {
        label: "Harus super tenang, gak bisa ada suara",
        value: "low",
        points: { low: 10, medium: 3, high: 0 },
      },
      {
        label: "Bisa toleransi suara wajar",
        value: "medium",
        points: { low: 5, medium: 10, high: 5 },
      },
      {
        label: "Santai, gak masalah agak berisik",
        value: "high",
        points: { low: 0, medium: 5, high: 10 },
      },
    ],
  },
  {
    id: "guestPolicy",
    question: "Gimana kebijakan soal tamu?",
    emoji: "🚪",
    type: "choice",
    options: [
      {
        label: "Boleh, asalkan dikasih tau dulu",
        value: "informed",
        points: { informed: 10, limited: 7, no: 3 },
      },
      {
        label: "Jarang-jarang aja, gak sering",
        value: "limited",
        points: { informed: 7, limited: 10, no: 5 },
      },
      {
        label: "Lebih baik gak ada tamu",
        value: "no",
        points: { informed: 3, limited: 5, no: 10 },
      },
    ],
  },
  {
    id: "budget",
    question: "Budget kost per bulan kamu?",
    emoji: "💰",
    type: "choice",
    options: [
      {
        label: "Di bawah Rp 800.000",
        value: "low",
        points: { low: 10, medium: 5, high: 2 },
      },
      {
        label: "Rp 800.000 - Rp 1.200.000",
        value: "medium",
        points: { low: 5, medium: 10, high: 5 },
      },
      {
        label: "Rp 1.200.000 - Rp 1.800.000",
        value: "high",
        points: { low: 2, medium: 5, high: 10 },
      },
      {
        label: "Di atas Rp 1.800.000",
        value: "premium",
        points: { low: 0, medium: 3, high: 8 },
      },
    ],
  },
  {
    id: "sharingStyle",
    question: "Gimana preferensi sharing barang?",
    emoji: "🤝",
    type: "choice",
    options: [
      {
        label: "Oke banget! Sharing is caring",
        value: "open",
        points: { open: 10, limited: 5, private: 2 },
      },
      {
        label: "Boleh, tapi izin dulu ya",
        value: "limited",
        points: { open: 7, limited: 10, private: 5 },
      },
      {
        label: "Lebih suka pakai barang sendiri",
        value: "private",
        points: { open: 2, limited: 5, private: 10 },
      },
    ],
  },
  {
    id: "conflictStyle",
    question: "Kalau ada masalah, kamu tipe yang?",
    emoji: "💬",
    type: "choice",
    options: [
      {
        label: "Langsung ngomong, selesaikan cepat",
        value: "direct",
        points: { direct: 10, diplomatic: 7, avoid: 3 },
      },
      {
        label: "Diplomatis, cari solusi bareng",
        value: "diplomatic",
        points: { direct: 7, diplomatic: 10, avoid: 5 },
      },
      {
        label: "Avoid konflik, biarkan waktu menyelesaikan",
        value: "avoid",
        points: { direct: 3, diplomatic: 5, avoid: 10 },
      },
    ],
  },
  {
    id: "lifestyle",
    question: "Gaya hidup kamu yang mana?",
    emoji: "🎯",
    type: "choice",
    options: [
      {
        label: "Home-body, lebih suka di kost",
        value: "homebody",
        points: { homebody: 10, balanced: 7, active: 3 },
      },
      {
        label: "Seimbang antara kost & aktivitas luar",
        value: "balanced",
        points: { homebody: 7, balanced: 10, active: 7 },
      },
      {
        label: "Aktif, jarang di kost",
        value: "active",
        points: { homebody: 3, balanced: 7, active: 10 },
      },
    ],
  },
];

function calculateCompatibility(userAnswers, roommate) {
  let totalScore = 0;
  let maxScore = 0;

  const roommateProfile = {
    sleepSchedule: roommate.sleepSchedule.includes("21.00-22.00")
      ? "early"
      : roommate.sleepSchedule.includes("23.00") ||
        roommate.sleepSchedule.includes("00.00") ||
        roommate.sleepSchedule.includes("01.00")
      ? "night"
      : roommate.sleepSchedule.includes("Fleksibel")
      ? "flexible"
      : "medium",
    cleanliness: roommate.cleanliness.includes("Sangat")
      ? "very"
      : roommate.cleanliness.includes("Cukup")
      ? "medium"
      : "low",
    socialLevel:
      roommate.socialLevel.includes("Sangat sosial") ||
      roommate.socialLevel.includes("Ekstrovert")
        ? "extrovert"
        : roommate.socialLevel.includes("Introvert")
        ? "introvert"
        : "ambivert",
    studyHabits:
      roommate.studyHabits.includes("pagi") ||
      roommate.studyHabits.includes("siang")
        ? "morning"
        : roommate.studyHabits.includes("malam") ||
          roommate.studyHabits.includes("begadang")
        ? "night"
        : "afternoon",
    budget:
      parseInt(roommate.budget.split("-")[0].replace(/\D/g, "")) < 800000
        ? "low"
        : parseInt(roommate.budget.split("-")[0].replace(/\D/g, "")) < 1200000
        ? "medium"
        : "high",
  };

  surveyQuestions.forEach((question) => {
    const userAnswer = userAnswers[question.id];
    if (!userAnswer) return;

    const selectedOption = question.options.find(
      (opt) => opt.value === userAnswer
    );
    if (!selectedOption) return;

    maxScore += 10;

    const roommateValue = roommateProfile[question.id];
    if (roommateValue && selectedOption.points[roommateValue] !== undefined) {
      totalScore += selectedOption.points[roommateValue];
    } else {
      totalScore += 5;
    }
  });

  return maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
}

export default function Roommate() {
  const [surveyMode, setSurveyMode] = useState(false);
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState({});
  const [showLoading, setShowLoading] = useState(false);
  const [matchedRoommates, setMatchedRoommates] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedRoommate, setSelectedRoommate] = useState(null);
  const [chatRoommate, setChatRoommate] = useState(null);
  const [filterGender, setFilterGender] = useState("Semua");
  const [filterUniversity, setFilterUniversity] = useState("Semua");
  const [sortBy, setSortBy] = useState("compatibility");

  const currentQuestion = surveyQuestions[surveyStep];
  const isSurveyComplete = surveyStep >= surveyQuestions.length;

  const floatingParticles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        left: (i * 8.33 + 15) % 100,
        top: (i * 7.14 + 20) % 100,
        duration: 3 + (i % 3),
        delay: i * 0.2,
      })),
    []
  );
  const universities = useMemo(
    () => ["Semua", ...Array.from(new Set(roommates.map((r) => r.university)))],
    []
  );

  const handleSurveyAnswer = (value) => {
    setSurveyAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));

    if (surveyStep < surveyQuestions.length - 1) {
      setTimeout(() => setSurveyStep((s) => s + 1), 300);
    } else {
      setTimeout(() => {
        setSurveyStep(surveyQuestions.length);
        setShowLoading(true);

        setTimeout(() => {
          const matched = roommates
            .map((roommate) => ({
              ...roommate,
              matchPercentage: calculateCompatibility(surveyAnswers, roommate),
            }))
            .sort((a, b) => b.matchPercentage - a.matchPercentage);

          setMatchedRoommates(matched);
          setShowLoading(false);
          setShowResults(true);
        }, 3000);
      }, 300);
    }
  };

  const filteredRoommates = useMemo(() => {
    let list =
      matchedRoommates.length > 0
        ? [...matchedRoommates]
        : roommates.map((r) => ({ ...r, matchPercentage: 0 }));

    if (filterGender !== "Semua") {
      list = list.filter((r) => r.gender === filterGender);
    }

    if (filterUniversity !== "Semua") {
      list = list.filter((r) => r.university === filterUniversity);
    }

    if (sortBy === "compatibility") {
      list.sort((a, b) => b.matchPercentage - a.matchPercentage);
    } else if (sortBy === "semester") {
      list.sort((a, b) => b.semester - a.semester);
    } else if (sortBy === "age") {
      list.sort((a, b) => a.age - b.age);
    }

    return list;
  }, [matchedRoommates, filterGender, filterUniversity, sortBy]);

  const handleStartSurvey = () => {
    setSurveyMode(true);
    setSurveyStep(0);
    setSurveyAnswers({});
  };

  const handleOpenChat = (roommate) => {
    setChatRoommate(roommate);
    setSelectedRoommate(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-pale/20 via-white to-gold/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(45,106,79,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,rgba(212,175,55,0.05),transparent_50%)]" />

      {floatingParticles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gold/20 rounded-full"
          style={{ left: `${particle.left}%`, top: `${particle.top}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}

      {!surveyMode && !showLoading && !showResults && (
        <>
          <section className="relative border-b border-forest-pale/20 bg-gradient-to-r from-white/95 via-white/90 to-forest-pale/20 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-20">
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
                  Roommate Matching
                  <span className="w-16 h-1 bg-gradient-to-l from-transparent via-gold to-gold rounded-full" />
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-forest-dark mb-6 leading-tight"
                >
                  Temukan roommate yang{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-main via-forest-light to-gold">
                    bener-bener cocok
                  </span>{" "}
                  sama kamu
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8 px-4"
                >
                  Nggak perlu khawatir salah pilih roommate. Jawab 10 pertanyaan
                  personal, dan algoritma RANTAU akan carikan kandidat dengan
                  tingkat kecocokan terbaik buat kamu.
                </motion.p>

                <motion.button
                  onClick={handleStartSurvey}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-forest-main via-forest-light to-gold text-white text-base sm:text-xl font-black rounded-2xl shadow-2xl hover:shadow-gold/50 transition-all"
                >
                  <span className="flex items-center gap-3">
                    🤝 Mulai Cari Roommate
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

          <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12">
            <div className="bg-gradient-to-br from-forest-pale/30 to-gold/10 rounded-3xl p-8 md:p-12 border-2 border-forest-pale/30 mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-black text-forest-dark mb-6 flex items-center gap-3">
                <span className="text-5xl">💡</span>
                Kenapa Pakai Roommate Matching?
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: "🎯",
                    title: "Algoritma Cerdas",
                    desc: "Sistem matching berdasarkan 10 dimensi kepribadian & kebiasaan",
                  },
                  {
                    icon: "🔒",
                    title: "Obrolan Aman",
                    desc: "Chat langsung dengan calon roommate tanpa share nomor pribadi",
                  },
                  {
                    icon: "✓",
                    title: "Profil Terverifikasi",
                    desc: "Hanya mahasiswa terverifikasi dengan KTM asli",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-forest-pale/20"
                  >
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-black text-forest-dark mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-forest-dark mb-2">
                  Jelajahi Profil Roommate
                </h2>
                <p className="text-sm text-gray-600">
                  {filteredRoommates.length} kandidat tersedia
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <select
                  value={filterGender}
                  onChange={(e) => setFilterGender(e.target.value)}
                  className="px-4 py-2 rounded-xl border-2 border-forest-pale/30 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none font-bold text-sm bg-white"
                >
                  <option value="Semua">Semua Gender</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>

                <select
                  value={filterUniversity}
                  onChange={(e) => setFilterUniversity(e.target.value)}
                  className="px-4 py-2 rounded-xl border-2 border-forest-pale/30 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none font-bold text-sm bg-white"
                >
                  {universities.map((uni) => (
                    <option key={uni} value={uni}>
                      {uni}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-xl border-2 border-forest-pale/30 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none font-bold text-sm bg-white"
                >
                  <option value="compatibility">Kecocokan Tertinggi</option>
                  <option value="semester">Semester</option>
                  <option value="age">Usia</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRoommates.map((roommate, idx) => (
                <motion.div
                  key={roommate.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => setSelectedRoommate(roommate)}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer border border-forest-pale/20 hover:border-gold/40 transition-all group"
                >
                  <div className="relative h-48 bg-gradient-to-br from-forest-main via-forest-light to-gold overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                        {roommate.gender === "Perempuan" ? "👩" : "👨"}
                      </div>
                    </div>

                    {roommate.verified && (
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gold text-forest-dark text-xs font-black flex items-center gap-1">
                        ✓ Verified
                      </span>
                    )}

                    {roommate.matchPercentage > 0 && (
                      <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                        {roommate.matchPercentage}% Match
                      </div>
                    )}
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-lg font-black text-forest-dark line-clamp-1 mb-1">
                        {roommate.name}
                      </h3>
                      <p className="text-xs text-gray-600 font-semibold line-clamp-1">
                        {roommate.major}
                      </p>
                      <p className="text-xs text-gray-500 font-medium mt-1">
                        📍 {roommate.preferredArea}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded-lg bg-forest-pale/30 text-xs font-bold text-forest-dark border border-forest-pale/40">
                        {roommate.gender === "Perempuan"
                          ? "👩 Putri"
                          : "👨 Putra"}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-gold/10 text-xs font-bold text-gold border border-gold/30">
                        Semester {roommate.semester}
                      </span>
                    </div>

                    <p className="text-xs text-gray-700 line-clamp-2 leading-relaxed">
                      {roommate.bio}
                    </p>

                    <div className="flex gap-2 pt-2 border-t border-forest-pale/20">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRoommate(roommate);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 px-3 py-2 rounded-xl bg-gradient-to-r from-forest-main to-forest-light text-white text-xs font-black hover:shadow-lg transition-all"
                      >
                        Lihat Profil
                      </motion.button>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          setChatRoommate(roommate);
                        }}
                        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                        whileTap={{ scale: 0.9 }}
                        className="px-3 py-2 rounded-xl bg-gradient-to-r from-gold to-gold-light text-white text-xs font-black hover:shadow-lg transition-all"
                      >
                        💬
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
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
          <MatchAnimation onComplete={() => setShowLoading(false)} />
        </motion.div>
      )}

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-gradient-to-br from-forest-main/95 via-forest-dark/95 to-forest-light/95 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />

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
                  🎉
                </motion.div>
                <h2 className="text-5xl md:text-7xl font-heading font-black text-gold drop-shadow-2xl leading-tight mb-4">
                  Roommate Terbaik Buat Kamu!
                </h2>
                <p className="text-2xl md:text-3xl text-white font-bold drop-shadow-lg">
                  Berdasarkan analisis kepribadian & kebiasaan
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {matchedRoommates.slice(0, 6).map((roommate, idx) => (
                  <motion.div
                    key={roommate.id}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: 0.5 + idx * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    onClick={() => {
                      setSelectedRoommate(roommate);
                      setShowResults(false);
                    }}
                    className="bg-white/98 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl cursor-pointer group relative"
                  >
                    {idx === 0 && (
                      <div className="absolute top-4 right-4 z-10 px-4 py-2 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-forest-dark font-black text-sm shadow-lg flex items-center gap-2">
                        <span className="text-lg">🏆</span> Best Match
                      </div>
                    )}

                    <div className="relative h-48 bg-gradient-to-br from-forest-main via-forest-light to-gold overflow-hidden">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                          {roommate.gender === "Perempuan" ? "👩" : "👨"}
                        </div>
                      </div>

                      <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/95 backdrop-blur">
                        <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                          {roommate.matchPercentage}%
                        </p>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div>
                        <h3 className="text-xl font-black text-forest-dark line-clamp-1 mb-1">
                          {roommate.name}
                        </h3>
                        <p className="text-sm text-gray-600 font-semibold line-clamp-1">
                          {roommate.major}
                        </p>
                      </div>

                      <p className="text-xs text-gray-700 line-clamp-2 leading-relaxed">
                        {roommate.bio}
                      </p>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRoommate(roommate);
                          setShowResults(false);
                        }}
                        className="w-full px-6 py-3 bg-gradient-to-r from-forest-main to-forest-light text-white font-black rounded-xl shadow-lg hover:shadow-2xl transition-all"
                      >
                        Lihat Profil Lengkap →
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-center"
              >
                <motion.button
                  onClick={() => {
                    setShowResults(false);
                    setSurveyMode(false);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 bg-white/20 backdrop-blur-md border-2 border-white/40 text-white text-lg font-black rounded-2xl shadow-xl hover:bg-white/30 transition-all"
                >
                  Lihat Semua Kandidat →
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {selectedRoommate && (
          <RoommateDetailModal
            roommate={selectedRoommate}
            onClose={() => setSelectedRoommate(null)}
            onChat={handleOpenChat}
          />
        )}

        {chatRoommate && (
          <ChatModal
            roommate={chatRoommate}
            onClose={() => setChatRoommate(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
