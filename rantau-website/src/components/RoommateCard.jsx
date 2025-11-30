import { motion } from "framer-motion";

function RoommateCard({ roommate }) {
  return (
    <motion.div
      layout
      whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(0,0,0,0.08)" }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="card flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-forest-light to-forest-main flex items-center justify-center text-2xl">
            👤
          </div>
          <div>
            <h3 className="text-sm font-semibold text-forest-dark">
              {roommate.name}
            </h3>
            <p className="text-xs text-gray-600">{roommate.campus}</p>
            <p className="text-[11px] text-gray-500">{roommate.major}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold flex items-center justify-center text-xs font-bold text-gold">
            {roommate.compatibility}%
          </div>
          <p className="text-[10px] text-gold mt-1 font-semibold">Kecocokan</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-700 bg-gray-50 rounded-xl p-2.5">
        <p>😴 {roommate.sleepSchedule}</p>
        <p>✨ {roommate.cleanliness}</p>
        <p>📚 {roommate.studyStyle}</p>
        <p>🔊 {roommate.noiseTolerance}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {roommate.interests.map((interest) => (
          <span
            key={interest}
            className="px-2 py-1 rounded-full bg-forest-pale text-[10px] font-medium text-forest-dark"
          >
            {interest}
          </span>
        ))}
      </div>
      <button className="btn-primary w-full text-sm py-2.5">
        Mulai obrolan aman
      </button>
    </motion.div>
  );
}

export default RoommateCard;
