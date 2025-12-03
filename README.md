````markdown
# RANTAU - Ruang Temu Anak Perantau 🌏

![RANTAU Logo](public/logo%20rantau%20baru-nobg.png)

**RANTAU** adalah platform web komprehensif yang dirancang khusus untuk mahasiswa dan pekerja perantau. Aplikasi ini mengintegrasikan pencarian tempat tinggal (kost), pencarian teman sekamar (roommate) yang cocok menggunakan algoritma kompatibilitas, manajemen tagihan bersama, serta forum komunitas untuk berbagi informasi seputar kehidupan di tanah rantau.

## ✨ Fitur Utama

### 🏠 Smart Kost Finder
Pencarian kost cerdas yang tidak hanya menampilkan daftar, tetapi membantu pengguna menemukan tempat tinggal terbaik.
- **Interactive Map:** Eksplorasi lokasi kost menggunakan peta interaktif (Leaflet).
- **Personalized Quiz:** Rekomendasi kost berdasarkan preferensi budget, lokasi kampus, dan fasilitas.
- **Detailed Filters:** Filter berdasarkan harga, fasilitas, jarak ke kampus, dan rating.
- **Direct Chat:** Fitur chat simulasi dengan pemilik kost.

### 🤝 Roommate Matcher
Temukan teman sekamar yang sefrekuensi untuk menghindari konflik di kemudian hari.
- **Compatibility Algorithm:** Mencocokkan pengguna berdasarkan gaya hidup (jam tidur, kebersihan, tingkat sosial, kebiasaan belajar).
- **Match Percentage:** Menampilkan persentase kecocokan antar pengguna.
- **Verified Profiles:** Menampilkan status verifikasi mahasiswa untuk keamanan.

### 💸 Tagihan Kost (Bill Splitter)
Kelola keuangan bersama teman sekamar tanpa drama.
- **Split Bill Otomatis:** Membagi tagihan listrik, air, internet, dll secara adil.
- **Payment Tracking:** Melacak status pembayaran (Lunas/Belum).
- **Auto Reminder:** Pengingat jatuh tempo tagihan.

### 💬 Forum Komunitas
Ruang diskusi untuk saling membantu sesama perantau.
- **Kategori Beragam:** Tips hemat, info beasiswa, lowongan part-time, review kost, dan event.
- **Trending Topics:** Lihat diskusi yang sedang hangat.

### 🏢 Kost Owner Dashboard
Fitur khusus untuk pemilik properti (UMKM).
- **Manajemen Properti:** Tambah dan edit listing kost.
- **Analytics:** Pantau performa listing dan okupansi kamar.

---

## 🛠 Teknologi yang Digunakan

Project ini dibangun menggunakan modern web stack:

- **Core:** [React](https://react.dev/) (v19)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) (untuk transisi halaman dan interaksi UI yang halus)
- **Maps:** [Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/)
- **Routing:** [React Router DOM](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 📋 Prasyarat Instalasi

Sebelum memulai, pastikan Anda telah menginstal:

- **Node.js** (Versi 18 atau lebih baru disarankan)
- **npm** (biasanya terinstall bersama Node.js)

---

## 🚀 Cara Instalasi dan Menjalankan

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di komputer lokal Anda:

1.  **Clone Repository**
    ```bash
    git clone [https://github.com/username/Prisma-Competition.git](https://github.com/username/Prisma-Competition.git)
    cd Prisma-Competition/rantau-website
    ```

2.  **Instal Dependencies**
    ```bash
    npm install
    ```

3.  **Jalankan Development Server**
    ```bash
    npm run dev
    ```

4.  **Buka Aplikasi**
    Buka browser Anda dan akses tautan yang muncul di terminal (biasanya `http://localhost:5173`).

---

## 📂 Susunan Project

Berikut adalah struktur folder utama dari proyek ini:


rantau-website/
├── public/                 \# Aset statis (Logo, favicon)
├── src/
│   ├── assets/             \# Aset gambar/svg komponen
│   ├── components/         \# Komponen UI yang dapat digunakan kembali
│   │   ├── Header.jsx      \# Navigasi atas
│   │   ├── MobileBottomNav.jsx \# Navigasi bawah (mobile)
│   │   ├── KostCard.jsx    \# Kartu listing kost
│   │   ├── RoommateCard.jsx \# Kartu profil roommate
│   │   └── ...
│   ├── data/               \# Data dummy (Mock data)
│   │   ├── kosts.js        \# Data dummy kost
│   │   ├── roommates.js    \# Data dummy profil roommate
│   │   └── forumPost.js    \# Data dummy forum
│   ├── pages/              \# Halaman utama aplikasi
│   │   ├── Home.jsx        \# Landing page
│   │   ├── SmartKostFinder.jsx \# Pencarian kost & Peta
│   │   ├── Roommate.jsx    \# Halaman pencarian teman
│   │   ├── TagihanKost.jsx \# Halaman manajemen tagihan
│   │   ├── Forum.jsx       \# Halaman forum
│   │   └── ...
│   ├── App.jsx             \# Komponen utama & Routing
│   ├── main.jsx            \# Entry point React
│   └── index.css           \# Global styles & Tailwind directives
├── eslint.config.js        \# Konfigurasi Linter
├── tailwind.config.js      \# Konfigurasi Tailwind CSS
├── vite.config.js          \# Konfigurasi Vite
└── package.json            \# Daftar dependensi & skrip



## 💡 Contoh Penggunaan

1.  **Mencari Kost:**
    * Buka menu **"Cari Kost"**.
    * Gunakan filter di sebelah kiri atau klik tombol "Mulai Survey Personal" untuk rekomendasi otomatis.
    * Klik pin pada peta untuk melihat detail singkat kost.

2.  **Mencari Roommate:**
    * Buka menu **"Roommate"**.
    * Klik "Mulai Cari Roommate" dan isi kuesioner singkat tentang kebiasaan tidur, kebersihan, dan sosial.
    * Sistem akan menampilkan daftar orang dengan persentase kecocokan tertinggi (misal: "93% Match").

3.  **Mengelola Tagihan:**
    * Masuk ke menu **"Tagihan"**.
    * Anda dapat melihat tagihan bulan ini (Listrik, WiFi, Air).
    * Tandai tagihan yang sudah dibayar atau kirim pengingat ke teman sekamar.


## 🤝 Kontribusi

Kontribusi sangat diterima! Jika Anda ingin meningkatkan fitur RANTAU:

1.  **Fork** repository ini.
2.  Buat **Branch** fitur baru (`git checkout -b fitur-keren`).
3.  **Commit** perubahan Anda (`git commit -m 'Menambahkan fitur keren'`).
4.  **Push** ke Branch (`git push origin fitur-keren`).
5.  Buat **Pull Request**.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License**.

```text
MIT License

Copyright (c) 2025 RANTAU Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
````

```
```
