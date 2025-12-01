import { useState } from "react";
import { Link } from "react-router-dom";
import {
  DollarSign,
  Users,
  Clock,
  Plus,
  Check,
  X,
  Bell,
  Calendar,
  CreditCard,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  Edit,
  Trash2,
  Share2,
  Smartphone,
  Building2,
  Wallet,
  QrCode,
} from "lucide-react";

export default function SplitReminder() {
  const [showAddBill, setShowAddBill] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [activeTab, setActiveTab] = useState("current");

  const paymentMethods = [
    {
      id: "gopay",
      name: "GoPay",
      color: "from-green-500 to-green-600",
      description: "Bayar dengan GoPay Balance",
    },
    {
      id: "dana",
      name: "DANA",
      color: "from-blue-500 to-blue-600",
      description: "Bayar dengan DANA Balance",
    },
    {
      id: "ovo",
      name: "OVO",
      color: "from-purple-500 to-purple-600",
      description: "Bayar dengan OVO Points/Cash",
    },
    {
      id: "qris",
      name: "QRIS",
      color: "from-red-500 to-red-600",
      description: "Scan QR Code",
    },
    {
      id: "transfer",
      name: "Transfer Bank",
      color: "from-gray-600 to-gray-700",
      description: "Transfer ke rekening bank",
    },
  ];

  const stats = [
    {
      label: "Total Tagihan Bulan Ini",
      value: "Rp 2.4jt",
      icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-forest-main to-forest-light",
      change: "+3 tagihan baru",
    },
    {
      label: "Bagian Kamu",
      value: "Rp 600rb",
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-gold to-gold-light",
      change: "Split 4 orang",
    },
    {
      label: "Belum Dibayar",
      value: "2 Tagihan",
      icon: <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-red-500 to-red-600",
      change: "Jatuh tempo 3 hari",
    },
    {
      label: "Total Terbayar",
      value: "Rp 18.5jt",
      icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-green-500 to-green-600",
      change: "Sepanjang tahun",
    },
  ];

  const currentBills = [
    {
      id: 1,
      name: "Listrik",
      icon: "⚡",
      totalAmount: 600000,
      splitCount: 4,
      yourShare: 150000,
      dueDate: "2025-12-05",
      status: "pending",
      paidBy: ["Andi", "Budi"],
      unpaidBy: ["You", "Siti"],
    },
    {
      id: 2,
      name: "Air",
      icon: "💧",
      totalAmount: 300000,
      splitCount: 4,
      yourShare: 75000,
      dueDate: "2025-12-05",
      status: "pending",
      paidBy: ["Andi"],
      unpaidBy: ["You", "Budi", "Siti"],
    },
    {
      id: 3,
      name: "WiFi",
      icon: "📡",
      totalAmount: 400000,
      splitCount: 4,
      yourShare: 100000,
      dueDate: "2025-12-10",
      status: "paid",
      paidBy: ["You", "Andi", "Budi", "Siti"],
      unpaidBy: [],
    },
    {
      id: 4,
      name: "Gas",
      icon: "🔥",
      totalAmount: 200000,
      splitCount: 4,
      yourShare: 50000,
      dueDate: "2025-12-08",
      status: "paid",
      paidBy: ["You", "Andi", "Budi", "Siti"],
      unpaidBy: [],
    },
  ];

  const upcomingReminders = [
    {
      id: 1,
      title: "Listrik jatuh tempo",
      date: "2025-12-05",
      time: "09:00",
      amount: 150000,
      type: "urgent",
    },
    {
      id: 2,
      title: "Air jatuh tempo",
      date: "2025-12-05",
      time: "09:00",
      amount: 75000,
      type: "urgent",
    },
    {
      id: 3,
      title: "Gas jatuh tempo",
      date: "2025-12-08",
      time: "09:00",
      amount: 50000,
      type: "normal",
    },
  ];

  const roommates = [
    { name: "You", avatar: "YO", color: "bg-gold" },
    { name: "Andi", avatar: "AN", color: "bg-forest-main" },
    { name: "Budi", avatar: "BU", color: "bg-blue-500" },
    { name: "Siti", avatar: "SI", color: "bg-purple-500" },
  ];

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handlePayNow = (bill) => {
    setSelectedBill(bill);
    setShowPayment(true);
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleConfirmPayment = () => {
    alert(`Pembayaran berhasil via ${selectedPaymentMethod.name}!`);
    setShowPayment(false);
    setSelectedPaymentMethod(null);
    setSelectedBill(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-forest-dark via-forest-main to-forest-light py-12 sm:py-16 lg:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Split Bills & <span className="text-gold">Never Forget</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto px-4">
              Kelola tagihan bersama dengan mudah dan dapatkan reminder otomatis
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}
                  >
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mb-2">
                  {stat.label}
                </div>
                <div className="text-xs text-green-600 font-medium">
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    Tagihan Bulanan
                  </h2>
                  <p className="text-gray-600">November 2025</p>
                </div>
                <button
                  onClick={() => setShowAddBill(true)}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-forest-main to-forest-light hover:from-forest-dark hover:to-forest-main text-white px-4 sm:px-6 py-3 rounded-xl font-bold shadow-xl transition-all w-full sm:w-auto"
                >
                  <Plus className="w-5 h-5" />
                  Tambah Tagihan
                </button>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <button
                  onClick={() => setActiveTab("current")}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                    activeTab === "current"
                      ? "bg-forest-main text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Tagihan Aktif (4)
                </button>
                <button
                  onClick={() => setActiveTab("pending")}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                    activeTab === "pending"
                      ? "bg-forest-main text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Belum Bayar (2)
                </button>
                <button
                  onClick={() => setActiveTab("paid")}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                    activeTab === "paid"
                      ? "bg-forest-main text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Sudah Bayar (2)
                </button>
              </div>

              <div className="space-y-4">
                {currentBills
                  .filter((bill) => {
                    if (activeTab === "pending")
                      return bill.status === "pending";
                    if (activeTab === "paid") return bill.status === "paid";
                    return true;
                  })
                  .map((bill) => {
                    const daysUntil = getDaysUntil(bill.dueDate);
                    const isUrgent =
                      daysUntil <= 3 && bill.status === "pending";

                    return (
                      <div
                        key={bill.id}
                        className={`bg-white rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all border-2 ${
                          isUrgent
                            ? "border-red-300 bg-red-50"
                            : bill.status === "paid"
                              ? "border-green-200 bg-green-50"
                              : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className="text-3xl sm:text-4xl lg:text-5xl">
                              {bill.icon}
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 text-base sm:text-lg lg:text-xl mb-1">
                                {bill.name}
                              </h3>
                              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                                <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>Split {bill.splitCount} orang</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-1 sm:gap-2">
                            <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-all">
                              <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                            </button>
                            <button className="p-1.5 sm:p-2 hover:bg-red-50 rounded-lg transition-all">
                              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                          <div>
                            <div className="text-[10px] sm:text-xs text-gray-600 mb-1">
                              Total Tagihan
                            </div>
                            <div className="font-bold text-gray-900 text-sm sm:text-base">
                              Rp {(bill.totalAmount / 1000).toFixed(0)}rb
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] sm:text-xs text-gray-600 mb-1">
                              Bagian Kamu
                            </div>
                            <div className="font-bold text-gold text-sm sm:text-base">
                              Rp {(bill.yourShare / 1000).toFixed(0)}rb
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] sm:text-xs text-gray-600 mb-1">
                              Jatuh Tempo
                            </div>
                            <div
                              className={`font-bold text-sm sm:text-base ${
                                isUrgent ? "text-red-600" : "text-gray-900"
                              }`}
                            >
                              {daysUntil > 0
                                ? `${daysUntil} hari`
                                : daysUntil === 0
                                  ? "Hari ini"
                                  : "Terlambat"}
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs sm:text-sm text-gray-600">
                              Status Pembayaran
                            </span>
                            <span className="text-xs sm:text-sm font-semibold text-gray-900">
                              {bill.paidBy.length}/{bill.splitCount} sudah bayar
                            </span>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            {roommates.map((roommate) => {
                              const hasPaid = bill.paidBy.includes(
                                roommate.name,
                              );
                              return (
                                <div
                                  key={roommate.name}
                                  className={`text-center p-2 rounded-lg ${
                                    hasPaid
                                      ? "bg-green-100 border-2 border-green-400"
                                      : "bg-gray-100 border-2 border-gray-300"
                                  }`}
                                >
                                  <div
                                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${roommate.color} text-white flex items-center justify-center text-[10px] sm:text-xs font-bold mx-auto mb-1`}
                                  >
                                    {roommate.avatar}
                                  </div>
                                  <div className="text-[10px] sm:text-xs font-medium text-gray-700 truncate">
                                    {roommate.name}
                                  </div>
                                  {hasPaid && (
                                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 mx-auto mt-1" />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {bill.status === "pending" &&
                          bill.unpaidBy.includes("You") && (
                            <button
                              onClick={() => handlePayNow(bill)}
                              className="w-full bg-gradient-to-r from-forest-main to-forest-light hover:from-forest-dark hover:to-forest-main text-white py-2.5 sm:py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                            >
                              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                              Bayar Sekarang - Rp{" "}
                              {(bill.yourShare / 1000).toFixed(0)}rb
                            </button>
                          )}

                        {bill.status === "paid" && (
                          <div className="w-full bg-green-100 border-2 border-green-400 text-green-700 py-2.5 sm:py-3 rounded-xl font-bold text-center flex items-center justify-center gap-2 text-sm sm:text-base">
                            <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                            Lunas - Dibayar semua
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border-2 border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg flex items-center gap-2">
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                    Reminder Aktif
                  </h3>
                  <span className="bg-red-100 text-red-600 px-2 sm:px-3 py-1 rounded-full text-xs font-bold">
                    {upcomingReminders.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {upcomingReminders.map((reminder) => (
                    <div
                      key={reminder.id}
                      className={`p-3 sm:p-4 rounded-xl border-2 ${
                        reminder.type === "urgent"
                          ? "bg-red-50 border-red-300"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-xs sm:text-sm mb-1">
                            {reminder.title}
                          </h4>
                          <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-600">
                            <Calendar className="w-3 h-3" />
                            <span>{reminder.date}</span>
                            <Clock className="w-3 h-3" />
                            <span>{reminder.time}</span>
                          </div>
                        </div>
                        {reminder.type === "urgent" && (
                          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                        )}
                      </div>
                      <div className="font-bold text-gold text-xs sm:text-sm">
                        Rp {(reminder.amount / 1000).toFixed(0)}rb
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all">
                  Lihat Semua Reminder
                </button>
              </div>

              <div className="bg-gradient-to-br from-forest-main to-forest-light rounded-2xl p-4 sm:p-6 text-white shadow-xl">
                <h3 className="font-bold text-lg sm:text-xl mb-4">
                  Kelola Grup
                </h3>
                <div className="flex -space-x-2 mb-4">
                  {roommates.map((roommate) => (
                    <div
                      key={roommate.name}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${roommate.color} border-2 border-white flex items-center justify-center text-xs sm:text-sm font-bold`}
                    >
                      {roommate.avatar}
                    </div>
                  ))}
                </div>
                <p className="text-white/90 text-xs sm:text-sm mb-4">
                  {roommates.length} anggota dalam grup
                </p>
                <button className="w-full bg-white text-forest-main py-2 rounded-lg font-bold text-xs sm:text-sm hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                  <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  Undang Anggota
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showPayment && selectedBill && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Pilih Metode Pembayaran
              </h3>
              <button
                onClick={() => {
                  setShowPayment(false);
                  setSelectedPaymentMethod(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">
                    Total Pembayaran
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gold">
                    Rp {selectedBill.yourShare.toLocaleString("id-ID")}
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl">{selectedBill.icon}</div>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Tagihan {selectedBill.name} - Split {selectedBill.splitCount}{" "}
                orang
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => handlePaymentMethodSelect(method)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedPaymentMethod?.id === method.id
                      ? "border-forest-main bg-forest-main/5"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}
                    >
                      {method.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900 mb-1">
                        {method.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {method.description}
                      </div>
                    </div>
                    {selectedPaymentMethod?.id === method.id && (
                      <Check className="w-6 h-6 text-forest-main flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleConfirmPayment}
              disabled={!selectedPaymentMethod}
              className={`w-full py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all ${
                selectedPaymentMethod
                  ? "bg-gradient-to-r from-forest-main to-forest-light text-white hover:shadow-xl"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {selectedPaymentMethod
                ? `Bayar dengan ${selectedPaymentMethod.name}`
                : "Pilih Metode Pembayaran"}
            </button>
          </div>
        </div>
      )}

      {showAddBill && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Tambah Tagihan Baru
              </h3>
              <button
                onClick={() => setShowAddBill(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Tagihan
                </label>
                <input
                  type="text"
                  placeholder="e.g. Listrik, Air, WiFi"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-forest-main text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Amount
                </label>
                <input
                  type="number"
                  placeholder="500000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-forest-main text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Jumlah Orang
                </label>
                <input
                  type="number"
                  placeholder="4"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-forest-main text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Jatuh Tempo
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-forest-main text-sm sm:text-base"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-forest-main to-forest-light text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all text-sm sm:text-base"
              >
                Tambah Tagihan
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="h-16 sm:h-0"></div>
    </div>
  );
}
