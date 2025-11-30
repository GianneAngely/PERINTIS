import { motion } from "framer-motion";

function KostCard({ kost, onSelectBest }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDistance = (meters) => {
    if (meters < 1000) return `${meters}m`;
    return `${(meters / 1000).toFixed(1)}km`;
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(0,0,0,0.08)" }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="card overflow-hidden"
    >
      <div className="relative h-40 bg-gradient-to-br from-forest-light to-forest-main flex items-center justify-center">
        <span className="text-5xl opacity-30">🏠</span>
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white text-xs font-semibold text-forest-dark">
          {kost.category}
        </span>
        <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/30 text-xs text-white">
          ⭐ {kost.rating}
        </span>
      </div>
      <div className="pt-4 space-y-3">
        <div>
          <h3 className="text-forest-dark text-base font-semibold line-clamp-1">
            {kost.name}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-1">
            📍 {kost.address}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            🎓 {kost.campusNearby} • {formatDistance(kost.distanceMeters)} dari
            kampus
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {kost.facilities.slice(0, 3).map((f) => (
            <span
              key={f}
              className="px-2 py-1 rounded-full bg-gray-100 text-[10px] font-medium text-gray-700"
            >
              {f}
            </span>
          ))}
          {kost.facilities.length > 3 && (
            <span className="px-2 py-1 rounded-full bg-gray-100 text-[10px] font-medium text-gray-700">
              +{kost.facilities.length - 3}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <div>
            <p className="text-lg font-bold text-forest-dark">
              {formatPrice(kost.pricePerMonth)}
            </p>
            <p className="text-[11px] text-gray-600">per bulan</p>
          </div>
          <button
            onClick={onSelectBest}
            className="text-xs font-semibold text-gold hover:text-gold-light transition-colors"
          >
            Cocok banget buat aku ✨
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default KostCard;
