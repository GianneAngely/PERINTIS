import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function BillCard({ bill }) {
  const [localBill, setLocalBill] = useState(bill);
  const isPaid = localBill.status === "Sudah Dibayar";

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  const handleMarkPaid = () => {
    setLocalBill({
      ...localBill,
      status: "Sudah Dibayar",
      roommates: localBill.roommates.map((r) => ({ ...r, isPaid: true })),
    });
  };

  const statusClass =
    localBill.status === "Sudah Dibayar"
      ? "bg-emerald-100 text-emerald-700"
      : localBill.status === "Sebagian"
      ? "bg-amber-100 text-amber-700"
      : "bg-rose-100 text-rose-700";

  const dueClass =
    localBill.dueInDays <= 2
      ? "ring-2 ring-rose-300"
      : localBill.dueInDays <= 5
      ? "ring-2 ring-amber-200"
      : "";

  return (
    <motion.div
      layout
      whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(0,0,0,0.08)" }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`card flex flex-col gap-3 ${dueClass}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-forest-dark">
            {localBill.title}
          </h3>
          <p className="text-[11px] text-gray-600">{localBill.billType}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-[11px] font-semibold ${statusClass}`}
        >
          {localBill.status}
        </span>
      </div>
      <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
        <div>
          <p className="text-xs text-gray-500">Total tagihan</p>
          <p className="text-lg font-bold text-forest-dark">
            {formatPrice(localBill.totalAmount)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Jatuh tempo</p>
          <p className="text-sm font-semibold text-gray-700">
            H-{localBill.dueInDays}
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-600">Pembagian tagihan</p>
        {localBill.roommates.map((r) => (
          <div
            key={r.roommateId}
            className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-forest-light to-forest-main flex items-center justify-center text-xs">
                👤
              </div>
              <div>
                <p className="text-xs font-semibold text-forest-dark">
                  {r.name}
                </p>
                <p className="text-[11px] text-gray-600">
                  {formatPrice(r.shareAmount)}
                </p>
              </div>
            </div>
            <span className="text-lg">{r.isPaid ? "✅" : "⏳"}</span>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {!isPaid && (
          <motion.button
            onClick={handleMarkPaid}
            className="btn-primary w-full text-sm py-2.5 flex items-center justify-center gap-2"
            whileTap={{ scale: 0.96 }}
          >
            Tandai sebagai lunas
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              ✅
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default BillCard;
