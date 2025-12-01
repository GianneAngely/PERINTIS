import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Pilih...",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3.5 rounded-xl border-2 border-forest-pale/30 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-left bg-white text-sm font-semibold text-forest-dark flex items-center justify-between hover:border-gold/50"
      >
        <span className={value ? "text-forest-dark" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border-2 border-forest-pale/30 overflow-hidden z-[9999] max-h-72"
          >
            <div className="p-3 border-b border-forest-pale/20 bg-forest-pale/5">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍 Cari kampus..."
                className="w-full px-4 py-2.5 rounded-lg border border-forest-pale/30 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-sm font-medium bg-white"
                autoFocus
              />
            </div>
            <div className="max-h-56 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <motion.button
                    key={opt}
                    onClick={() => {
                      onChange(opt);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    whileHover={{
                      backgroundColor: "rgba(45, 106, 79, 0.08)",
                      x: 4,
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full px-4 py-3 text-left text-sm font-semibold transition-all ${
                      value === opt
                        ? "bg-gradient-to-r from-gold/20 to-gold/10 text-forest-dark border-l-4 border-gold"
                        : "text-gray-700 hover:text-forest-dark border-l-4 border-transparent"
                    }`}
                  >
                    {opt}
                    {value === opt && (
                      <span className="float-right text-gold font-black">
                        ✓
                      </span>
                    )}
                  </motion.button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-sm text-gray-500 font-medium">
                  <p className="text-3xl mb-2">🔍</p>
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
