import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchableSelect({
  options,
  value,
  onChange,
  placeholder,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-2xl border-2 border-forest-pale/50 px-4 py-3.5 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-gold/30 focus:border-gold transition-all bg-white/50 text-left flex items-center justify-between"
      >
        <span className={value ? "text-forest-dark" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gold font-bold"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl border-2 border-forest-pale/30 overflow-hidden"
          >
            <div className="p-3 border-b border-forest-pale/20">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍 Cari kampus..."
                className="w-full px-4 py-2.5 rounded-xl border-2 border-forest-pale/30 focus:outline-none focus:ring-2 focus:ring-gold/50 text-sm font-medium"
                autoFocus
              />
            </div>
            <div className="max-h-64 overflow-y-auto custom-scrollbar">
              {filtered.length > 0 ? (
                filtered.map((opt, idx) => (
                  <motion.button
                    key={opt}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    onClick={() => {
                      onChange(opt);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all ${
                      value === opt
                        ? "bg-gradient-to-r from-forest-main to-forest-light text-white"
                        : "hover:bg-forest-pale/20 text-gray-700"
                    }`}
                  >
                    {opt}
                  </motion.button>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-sm text-gray-500">
                  Kampus tidak ditemukan
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
