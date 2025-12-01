import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
} from "lucide-react";

export default function KostOwnerRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    businessType: "",
    numberOfRooms: "",
    facilities: [],
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const facilityOptions = [
    "WiFi",
    "AC",
    "Laundry",
    "Parking",
    "24h Security",
    "Dapur Bersama",
    "Kamar Mandi Dalam",
    "TV Kabel",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const toggleFacility = (facility) => {
    const updated = formData.facilities.includes(facility)
      ? formData.facilities.filter((f) => f !== facility)
      : [...formData.facilities, facility];
    setFormData({ ...formData, facilities: updated });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.businessName.trim())
      newErrors.businessName = "Nama usaha wajib diisi";
    if (!formData.ownerName.trim())
      newErrors.ownerName = "Nama pemilik wajib diisi";
    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor HP wajib diisi";
    } else if (!/^[0-9]{10,13}$/.test(formData.phone)) {
      newErrors.phone = "Nomor HP harus 10-13 digit";
    }
    if (!formData.address.trim()) newErrors.address = "Alamat wajib diisi";
    if (!formData.city) newErrors.city = "Kota wajib dipilih";
    if (!formData.businessType)
      newErrors.businessType = "Tipe bisnis wajib dipilih";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Form submitted:", formData);
      alert(
        "Pendaftaran berhasil! Tim kami akan menghubungi Anda dalam 1-2 hari kerja.",
      );
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-forest-pale/10 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-forest-main hover:text-forest-dark mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Home
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-forest-main to-forest-light p-8 text-center">
            <Building2 className="w-16 h-16 text-gold mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Daftar UMKM Kost Anda
            </h1>
            <p className="text-forest-pale text-lg">
              Bergabunglah dengan 2,500+ pemilik kost di platform RANTAU
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 sm:p-12 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Nama Usaha/Kost <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Kost Melati Putih"
                    className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.businessName
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-forest-main focus:ring-forest-main/20"
                    }`}
                  />
                </div>
                {errors.businessName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.businessName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Nama Pemilik <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    placeholder="Ibu Siti"
                    className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.ownerName
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-forest-main focus:ring-forest-main/20"
                    }`}
                  />
                </div>
                {errors.ownerName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.ownerName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="owner@kostmelati.com"
                    className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-forest-main focus:ring-forest-main/20"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Nomor HP/WhatsApp <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="08123456789"
                    className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.phone
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-forest-main focus:ring-forest-main/20"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Alamat Lengkap <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Jl. Sudirman No. 123, RT 01/RW 05"
                  rows="3"
                  className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.address
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-forest-main focus:ring-forest-main/20"
                  }`}
                />
              </div>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Kota <span className="text-red-500">*</span>
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.city
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-forest-main focus:ring-forest-main/20"
                  }`}
                >
                  <option value="">Pilih Kota</option>
                  <option value="jakarta">Jakarta</option>
                  <option value="bandung">Bandung</option>
                  <option value="yogyakarta">Yogyakarta</option>
                  <option value="surabaya">Surabaya</option>
                  <option value="semarang">Semarang</option>
                </select>
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Tipe Bisnis <span className="text-red-500">*</span>
                </label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.businessType
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-forest-main focus:ring-forest-main/20"
                  }`}
                >
                  <option value="">Pilih Tipe</option>
                  <option value="kost-putra">Kost Putra</option>
                  <option value="kost-putri">Kost Putri</option>
                  <option value="kost-campur">Kost Campur</option>
                  <option value="umkm-lain">UMKM Lainnya</option>
                </select>
                {errors.businessType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.businessType}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Jumlah Kamar
                </label>
                <input
                  type="number"
                  name="numberOfRooms"
                  value={formData.numberOfRooms}
                  onChange={handleChange}
                  placeholder="10"
                  min="1"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-forest-main focus:ring-2 focus:ring-forest-main/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                Fasilitas yang Tersedia
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {facilityOptions.map((facility) => (
                  <button
                    key={facility}
                    type="button"
                    onClick={() => toggleFacility(facility)}
                    className={`px-4 py-2.5 rounded-lg font-medium transition-all border-2 ${
                      formData.facilities.includes(facility)
                        ? "bg-gold border-gold text-forest-dark"
                        : "bg-white border-gray-200 text-gray-700 hover:border-gold/50"
                    }`}
                  >
                    {facility}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Deskripsi Usaha
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Ceritakan tentang kost Anda, lokasi strategis, fasilitas unggulan, dll."
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-forest-main focus:ring-2 focus:ring-forest-main/20 transition-all resize-none"
              />
            </div>

            <div className="bg-forest-pale/20 border-2 border-forest-main/20 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-forest-main flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700 leading-relaxed">
                  Dengan mendaftar, Anda setuju bahwa tim RANTAU akan
                  memverifikasi informasi bisnis Anda. Kami akan menghubungi
                  Anda dalam 1-2 hari kerja untuk proses verifikasi.
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-forest-main to-forest-light hover:from-forest-dark hover:to-forest-main text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-forest-main/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Mengirim..." : "Daftar Sekarang"}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="text-forest-main hover:text-forest-dark font-semibold"
            >
              Login di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
