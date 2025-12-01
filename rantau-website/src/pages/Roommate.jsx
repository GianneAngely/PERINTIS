import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import roommates from "../data/roommates";

const surveyQuestions = [
  {
    id: "sleepSchedule",
    question: "Kamu biasanya tidur jam berapa?",
    emoji: "🌙",
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
      : roommate.sleepSchedule.includes("00.00") ||
        roommate.sleepSchedule.includes("01.00")
      ? "night"
      : roommate.sleepSchedule.toLowerCase().includes("fleksibel")
      ? "flexible"
      : "medium",
    cleanliness: roommate.cleanliness.toLowerCase().includes("sangat")
      ? "very"
      : roommate.cleanliness.toLowerCase().includes("cukup")
      ? "medium"
      : "low",
    socialLevel:
      roommate.socialLevel.toLowerCase().includes("ekstrovert") ||
      roommate.socialLevel.toLowerCase().includes("sangat sosial")
        ? "extrovert"
        : roommate.socialLevel.toLowerCase().includes("introvert")
        ? "introvert"
        : "ambivert",
    studyHabits:
      roommate.studyHabits.toLowerCase().includes("pagi") ||
      roommate.studyHabits.toLowerCase().includes("siang")
        ? "morning"
        : roommate.studyHabits.toLowerCase().includes("malam") ||
          roommate.studyHabits.toLowerCase().includes("begadang")
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

function DetailModal({ roommate, onClose, onChat }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 bg-gradient-to-br from-forest-main via-forest-light to-gold overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/95 backdrop-blur flex items-center justify-center text-gray-700 hover:bg-white hover:scale-110 transition-all shadow-lg font-bold text-lg z-10"
          >
            ✕
          </button>

          <div className="absolute bottom-6 left-8 right-8 flex items-end gap-6">
            <div className="w-32 h-32 rounded-2xl bg-white shadow-2xl overflow-hidden border-4 border-white">
              <img
                src={roommate.photoUrl}
                alt={roommate.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                className="w-full h-full bg-gradient-to-br from-forest-pale to-forest-light flex items-center justify-center text-6xl"
                style={{ display: "none" }}
              >
                {roommate.gender === "Perempuan" ? "👩" : "👨"}
              </div>
            </div>
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-heading font-black text-white drop-shadow-lg">
                  {roommate.name}
                </h2>
                {roommate.verified && (
                  <span className="px-3 py-1 rounded-full bg-gold text-forest-dark text-xs font-black">
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
          {roommate.matchPercentage > 0 && (
            <div className="bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl p-6 border-l-4 border-gold">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-gray-600 font-bold uppercase tracking-wider">
                  🎯 Compatibility Match
                </p>
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                  {roommate.matchPercentage}%
                </div>
              </div>
              <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${roommate.matchPercentage}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-gold via-gold-light to-gold rounded-full"
                />
              </div>
            </div>
          )}

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
                <span
                  key={idx}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-gold/20 to-gold/10 text-gold-dark text-sm font-bold border border-gold/40"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>

          <motion.button
            onClick={() => {
              onClose();
              onChat(roommate);
            }}
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
  ];

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, from: "user", text: text, time: "Baru saja" },
    ]);
    setInputText("");

    setTimeout(() => {
      let responseText = "Wah, pertanyaan menarik! 😊";
      if (text.toLowerCase().includes("tidur"))
        responseText = `Aku biasanya ${roommate.sleepSchedule.toLowerCase()}. Gimana dengan kamu?`;
      else if (text.toLowerCase().includes("luang"))
        responseText = `Aku suka ${roommate.hobbies
          .slice(0, 2)
          .join(" dan ")}!`;
      else if (text.toLowerCase().includes("belajar"))
        responseText = `${roommate.studyHabits}. Kalau kamu gimana?`;

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 2,
          from: "roommate",
          text: responseText,
          time: "Baru saja",
        },
      ]);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl w-full max-w-2xl h-[600px] shadow-2xl flex flex-col"
      >
        <div className="bg-gradient-to-r from-forest-main to-forest-light text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white">
              <img
                src={roommate.photoUrl}
                alt={roommate.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                className="w-full h-full bg-forest-pale flex items-center justify-center text-2xl"
                style={{ display: "none" }}
              >
                {roommate.gender === "Perempuan" ? "👩" : "👨"}
              </div>
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
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
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
            </div>
          ))}
        </div>

        <div className="p-4 bg-white border-t border-gray-200 space-y-3">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => handleSendMessage(reply)}
                className="px-4 py-2 rounded-full bg-forest-pale/30 text-forest-dark text-xs font-bold hover:bg-forest-pale/50 transition-all border border-forest-pale/40"
              >
                {reply}
              </button>
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
            <button
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
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MatchAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-forest-dark/95 via-forest-main/95 to-gold/90 backdrop-blur-xl flex items-center justify-center p-4"
    >
      <div className="text-center px-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 md:mb-8 rounded-full bg-gradient-to-br from-gold via-gold-light to-white shadow-2xl flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-forest-main via-forest-light to-forest-pale flex items-center justify-center text-3xl md:text-5xl"
          >
            🤝
          </motion.div>
        </motion.div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-black text-gold drop-shadow-2xl mb-2 md:mb-4 leading-tight">
          Mencari Kecocokan...
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-bold drop-shadow-lg">
          Tunggu sebentar, ya! ✨
        </p>
      </div>
    </motion.div>
  );
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

  const currentQuestion = surveyQuestions[surveyStep];

  const handleSurveyAnswer = (value) => {
    const newAnswers = { ...surveyAnswers, [currentQuestion.id]: value };
    setSurveyAnswers(newAnswers);

    if (surveyStep < surveyQuestions.length - 1) {
      setSurveyStep((s) => s + 1);
    } else {
      setShowLoading(true);
      setTimeout(() => {
        const matched = roommates
          .map((r) => ({
            ...r,
            matchPercentage: calculateCompatibility(newAnswers, r),
          }))
          .sort((a, b) => b.matchPercentage - a.matchPercentage);
        setMatchedRoommates(matched);
        setShowLoading(false);
        setShowResults(true);
      }, 3000);
    }
  };

  const filteredRoommates = useMemo(() => {
    let list =
      matchedRoommates.length > 0
        ? matchedRoommates
        : roommates.map((r) => ({ ...r, matchPercentage: 0 }));
    if (filterGender !== "Semua")
      list = list.filter((r) => r.gender === filterGender);
    return list;
  }, [matchedRoommates, filterGender]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-pale/20 via-white to-gold/5">
      {!surveyMode && !showLoading && !showResults && (
        <>
          <section className="border-b border-forest-pale/20 bg-white/95">
            <div className="max-w-7xl mx-auto px-4 sm:px-12 py-12 md:py-20">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto text-center"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-forest-dark mb-6 leading-tight">
                  Temukan roommate yang{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-main via-forest-light to-gold">
                    bener-bener cocok
                  </span>{" "}
                  sama kamu
                </h1>
                <p className="text-base sm:text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
                  Nggak perlu khawatir salah pilih roommate. Jawab 10 pertanyaan
                  personal, dan algoritma RANTAU akan carikan kandidat dengan
                  tingkat kecocokan terbaik buat kamu.
                </p>
                <motion.button
                  onClick={() => setSurveyMode(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-forest-main via-forest-light to-gold text-white text-lg sm:text-xl font-black rounded-2xl shadow-2xl hover:shadow-gold/50 transition-all"
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

          <section className="max-w-7xl mx-auto px-4 sm:px-12 py-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-forest-dark mb-2">
                  Jelajahi Profil Roommate
                </h2>
                <p className="text-sm text-gray-600">
                  {filteredRoommates.length} kandidat tersedia
                </p>
              </div>
              <select
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value)}
                className="px-4 py-2 rounded-xl border-2 border-forest-pale/30 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none font-bold text-sm bg-white"
              >
                <option value="Semua">Semua Gender</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRoommates.slice(0, 12).map((person, idx) => (
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => setSelectedRoommate(person)}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer border border-forest-pale/20 hover:border-gold/40 transition-all group"
                >
                  <div className="relative h-48 bg-gradient-to-br from-forest-main via-forest-light to-gold overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={person.photoUrl}
                        alt={person.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-forest-main/20 to-gold/20 flex items-center justify-center text-8xl"
                        style={{ display: "none" }}
                      >
                        {person.gender === "Perempuan" ? "👩" : "👨"}
                      </div>
                    </div>
                    {person.verified && (
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gold text-forest-dark text-xs font-black flex items-center gap-1">
                        ✓ Verified
                      </span>
                    )}
                    {person.matchPercentage > 0 && (
                      <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                        {person.matchPercentage}% Match
                      </div>
                    )}
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-lg font-black text-forest-dark line-clamp-1 mb-1">
                        {person.name}
                      </h3>
                      <p className="text-xs text-gray-600 font-semibold line-clamp-1">
                        {person.major}
                      </p>
                      <p className="text-xs text-gray-500 font-medium mt-1">
                        📍 {person.preferredArea}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded-lg bg-forest-pale/30 text-xs font-bold text-forest-dark border border-forest-pale/40">
                        {person.gender === "Perempuan"
                          ? "👩 Putri"
                          : "👨 Putra"}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-gold/10 text-xs font-bold text-gold border border-gold/30">
                        Semester {person.semester}
                      </span>
                    </div>

                    <p className="text-xs text-gray-700 line-clamp-2 leading-relaxed">
                      {person.bio}
                    </p>

                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRoommate(person);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-3 py-2 rounded-xl bg-gradient-to-r from-forest-main to-forest-light text-white text-xs font-black hover:shadow-lg transition-all"
                    >
                      Lihat Profil Lengkap →
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </>
      )}

      {surveyMode && surveyStep < surveyQuestions.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[9000] bg-gradient-to-br from-forest-main/95 via-forest-light/95 to-gold/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="max-w-2xl w-full my-auto">
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

            <div className="bg-white/98 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl sm:text-5xl md:text-6xl">
                    {currentQuestion.emoji}
                  </div>
                  <div>
                    <p className="text-xs font-black text-gold uppercase tracking-wider">
                      Pertanyaan {surveyStep + 1} dari {surveyQuestions.length}
                    </p>
                    <p className="text-xs text-gray-600 font-semibold mt-1">
                      {Math.round(
                        ((surveyStep + 1) / surveyQuestions.length) * 100
                      )}
                      % selesai
                    </p>
                  </div>
                </div>

                <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden shadow-inner">
                  <motion.div
                    animate={{
                      width: `${
                        ((surveyStep + 1) / surveyQuestions.length) * 100
                      }%`,
                    }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-gold via-gold-light to-forest-main rounded-full shadow-lg"
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
                  className="space-y-4"
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-black text-forest-dark leading-tight mb-6">
                    {currentQuestion.question}
                  </h2>

                  <div className="space-y-3">
                    {currentQuestion.options.map((opt) => (
                      <motion.button
                        key={opt.value}
                        onClick={() => handleSurveyAnswer(opt.value)}
                        whileHover={{ scale: 1.02, x: 8 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full text-left px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 rounded-2xl text-sm md:text-base font-bold transition-all bg-white border-3 border-gray-200 text-gray-700 hover:border-gold hover:shadow-xl hover:bg-gradient-to-r hover:from-gold/5 hover:to-transparent"
                      >
                        {opt.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}

      {showLoading && <MatchAnimation />}

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-gradient-to-br from-forest-dark/95 via-forest-main/95 to-gold/90 backdrop-blur-xl overflow-y-auto"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-1 h-96 bg-gradient-to-t from-transparent via-gold/30 to-transparent"
                    style={{
                      transform: `rotate(${i * 45}deg) translateY(-200px)`,
                      transformOrigin: "center",
                    }}
                  />
                ))}
              </motion.div>

              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -100 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    y: [0, 600],
                    x: Math.random() * 100 - 50,
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: "easeOut",
                  }}
                  className="absolute text-2xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: -50,
                  }}
                >
                  {["⭐", "✨", "🌟", "💫"][Math.floor(Math.random() * 4)]}
                </motion.div>
              ))}
            </div>

            <div className="min-h-screen flex items-center justify-center p-4 py-12 relative z-10">
              <div className="w-full max-w-6xl mx-auto">
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center mb-8 md:mb-12"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-block mb-4 md:mb-6"
                  >
                    <div className="relative">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-gold rounded-full blur-3xl"
                      />
                      <div className="relative text-6xl sm:text-7xl md:text-8xl lg:text-9xl filter drop-shadow-2xl">
                        🏆
                      </div>
                    </div>
                  </motion.div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-black text-gold drop-shadow-2xl leading-tight mb-3 md:mb-4 px-4">
                    Roommate Terbaik
                    <br className="sm:hidden" /> Buat Kamu!
                  </h2>

                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/95 font-bold drop-shadow-lg px-4">
                    Berdasarkan analisis kepribadian & kebiasaan
                  </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 px-4">
                  {matchedRoommates.slice(0, 6).map((person, idx) => (
                    <motion.div
                      key={person.id}
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: idx === 0 ? [1.1, 1.15, 1.1] : 1,
                      }}
                      transition={{
                        delay: 0.5 + idx * 0.1,
                        type: "spring",
                        stiffness: 200,
                        scale:
                          idx === 0 ? { duration: 2, repeat: Infinity } : {},
                      }}
                      whileHover={{ scale: idx === 0 ? 1.18 : 1.05, y: -10 }}
                      onClick={() => {
                        setSelectedRoommate(person);
                        setShowResults(false);
                      }}
                      className={`bg-white rounded-2xl overflow-hidden shadow-2xl cursor-pointer group relative ${
                        idx === 0 ? "ring-4 ring-gold/50" : ""
                      }`}
                      style={{
                        gridColumn: idx === 0 ? "span 1" : "span 1",
                        order: idx === 0 ? -1 : idx,
                      }}
                    >
                      {idx === 0 && (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="absolute -inset-2 bg-gradient-to-r from-gold via-gold-light to-gold rounded-2xl blur-xl opacity-75 -z-10"
                          />
                          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-forest-dark font-black text-xs sm:text-sm shadow-lg flex items-center gap-1 sm:gap-2">
                            <span className="text-base sm:text-lg">🏆</span>{" "}
                            Best Match
                          </div>
                        </>
                      )}

                      <div className="relative h-40 sm:h-48 bg-gradient-to-br from-forest-main via-forest-light to-gold overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            src={person.photoUrl}
                            alt={person.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                          <div
                            className="absolute inset-0 bg-gradient-to-br from-forest-main/20 to-gold/20 flex items-center justify-center text-6xl sm:text-8xl"
                            style={{ display: "none" }}
                          >
                            {person.gender === "Perempuan" ? "👩" : "👨"}
                          </div>
                        </div>

                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/95 backdrop-blur">
                          <p className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                            {person.matchPercentage}%
                          </p>
                        </div>
                      </div>

                      <div className="p-4 sm:p-5 space-y-2 sm:space-y-3 bg-white">
                        <div>
                          <h3 className="text-base sm:text-lg md:text-xl font-black text-forest-dark line-clamp-1 mb-1">
                            {person.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-700 font-semibold line-clamp-1">
                            {person.major}
                          </p>
                        </div>

                        <p className="text-xs text-gray-700 line-clamp-2 leading-relaxed">
                          {person.bio}
                        </p>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRoommate(person);
                            setShowResults(false);
                          }}
                          className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-forest-main to-forest-light text-white font-black text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-2xl transition-all"
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
                  className="text-center px-4"
                >
                  <motion.button
                    onClick={() => {
                      setShowResults(false);
                      setSurveyMode(false);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 sm:px-12 py-3 sm:py-4 md:py-5 bg-white/20 backdrop-blur-md border-2 border-white/40 text-white text-sm sm:text-base md:text-lg font-black rounded-2xl shadow-xl hover:bg-white/30 transition-all"
                  >
                    Lihat Semua Kandidat →
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {selectedRoommate && (
          <DetailModal
            roommate={selectedRoommate}
            onClose={() => setSelectedRoommate(null)}
            onChat={setChatRoommate}
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
