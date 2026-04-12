import {
  ArrowRight,
  CheckCircle2,
  Droplets,
  ExternalLink,
  Home,
  Info,
  MapPin,
  Menu,
  MessageCircle,
  ScanFace,
  ShieldCheck,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "fitur", "kamar", "location"];
      const scrollPosition = window.scrollY + 100;

      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + height
          ) {
            setActiveSection(id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      setActiveSection(id);
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const getNavLinkClass = (section: string) => {
    return `cursor-pointer transition-colors ${
      activeSection === section
        ? "text-brand-dark font-semibold border-b-2 border-brand-accent pb-1"
        : "text-slate-500 hover:text-brand-dark"
    }`;
  };

  useEffect(() => {
    if (isRoomModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isRoomModalOpen]);

  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen relative">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-bold text-2xl text-brand-dark">
                Bumi Rafka Kost
              </span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a
                href="#home"
                onClick={(e) => scrollToSection(e, "home")}
                className={getNavLinkClass("home")}
              >
                Home
              </a>
              <a
                href="#fitur"
                onClick={(e) => scrollToSection(e, "fitur")}
                className={getNavLinkClass("fitur")}
              >
                Fitur Canggih
              </a>
              <a
                href="#kamar"
                onClick={(e) => scrollToSection(e, "kamar")}
                className={getNavLinkClass("kamar")}
              >
                Kamar Pilihan
              </a>
              <a
                href="#location"
                onClick={(e) => scrollToSection(e, "location")}
                className={getNavLinkClass("location")}
              >
                Location
              </a>
              <Link
                to="/login"
                className="bg-brand-dark text-white px-6 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-colors"
              >
                Login Admin
              </Link>
            </div>
            <div className="md:hidden flex items-center">
              <button className="text-slate-500 hover:text-brand-dark">
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div
        id="home"
        className="relative bg-hero-pattern h-[600px] flex items-center scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/20 text-teal-300 font-medium text-sm mb-6 backdrop-blur-sm border border-teal-500/30">
              #SmartStayExperience
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Smart-Stay: Masa Depan Hunian Nyaman & Aman
            </h1>
            <p className="text-lg text-slate-300 mb-10 leading-relaxed">
              Nikmati ekosistem tempat tinggal yang terintegrasi dengan
              teknologi AIoT terkini untuk kenyamanan maksimal Anda. Listrik,
              Air, dan WiFi sudah termasuk!
            </p>
            <a
              href="#kamar"
              onClick={(e) => scrollToSection(e, "kamar")}
              className="bg-brand-accent text-brand-dark px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center hover:bg-teal-300 transition-colors shadow-lg shadow-teal-500/30 cursor-pointer"
            >
              Cek Ketersediaan Kamar
              <ArrowRight className="ml-2" size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* FITUR SECTION */}
      <div id="fitur" className="py-24 bg-slate-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">
              Fitur Canggih
            </h2>
            <p className="text-slate-500">
              Teknologi premium yang kami hadirkan untuk menjamin keamanan dan
              kenyamanan gaya hidup modern Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-brand-dark hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-brand-dark">
                <ScanFace size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-brand-dark">
                AI Face Recognition
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Akses gerbang utama tanpa kunci fisik. Sistem AI kami mengenali
                wajah Anda dalam 0.5 detik untuk keamanan total.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-teal-500 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-brand-dark">
                <Wifi size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-brand-dark">
                IoT Monitoring & Free WiFi
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Kontrol penggunaan listrik dan air langsung dari smartphone
                Anda. Ditambah koneksi internet cepat gratis untuk semua
                penghuni.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-indigo-500 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-brand-dark">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-brand-dark">
                Smart Security
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                CCTV 24/7 yang terhubung dengan sistem alert pintar untuk
                deteksi anomali di area kost.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI LOGGER SECTION */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl font-bold text-brand-dark mb-6 leading-tight">
                AI Facial Access Logger:
                <br />
                Keamanan Tanpa Kontak
              </h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Lupakan repotnya membawa kunci atau kartu akses. Sistem
                identifikasi biometrik kami mencatat setiap akses dengan presisi
                tinggi, memberikan ketenangan pikiran bagi seluruh penghuni.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="text-teal-500" size={24} />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-brand-dark">
                      Logging Real-time
                    </h4>
                    <p className="text-slate-500 text-sm">
                      Riwayat akses yang dapat dipantau oleh admin secara
                      langsung.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="text-teal-500" size={24} />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-brand-dark">
                      Privasi Terjamin
                    </h4>
                    <p className="text-slate-500 text-sm">
                      Data wajah dienkripsi dengan standar keamanan perbankan.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mockup UI Dashboard */}
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute inset-0 bg-teal-400/10 blur-3xl rounded-full"></div>
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-2xl relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-bold text-brand-dark">
                    Access Activity Monitor
                  </h4>
                  <span className="bg-teal-400 text-teal-900 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                    LIVE FEED
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
                        <img
                          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                          alt="Budi"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-brand-dark">
                          Budi Santoso (R-204)
                        </p>
                        <p className="text-teal-600 text-xs font-medium">
                          Identified: 99.8% Match
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">
                      Today, 09:14 AM
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
                        <img
                          src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                          alt="Siti"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-brand-dark">
                          Siti Aminah (R-102)
                        </p>
                        <p className="text-teal-600 text-xs font-medium">
                          Identified: 99.2% Match
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">
                      Today, 07:15 AM
                    </span>
                  </div>
                </div>

                <div className="bg-brand-dark rounded-xl p-6 text-center border border-slate-700 flex flex-col items-center justify-center">
                  <ScanFace
                    className="text-teal-400 mb-2 animate-bounce"
                    size={28}
                  />
                  <p className="text-teal-400 text-xs tracking-widest uppercase font-mono">
                    Encrypting Data...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KAMAR PILIHAN SECTION */}
      <div id="kamar" className="py-24 bg-slate-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-brand-dark mb-2">
                Kamar Pilihan
              </h2>
              <p className="text-slate-500">
                Pilih kenyamanan sesuai kebutuhan Anda. Total tersedia 8 kamar
                eksklusif dengan fasilitas{" "}
                <span className="font-bold text-brand-dark">All-in</span>.
              </p>
            </div>
            <button
              onClick={() => setIsRoomModalOpen(true)}
              className="text-teal-600 font-semibold flex items-center hover:text-teal-700 hidden md:flex cursor-pointer transition-colors"
            >
              Lihat Detail & Fasilitas{" "}
              <ExternalLink className="ml-1" size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Room 1 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all group">
              <div className="relative h-64 bg-slate-200 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522771731470-8a3ce544a8b2?q=80&w=2070&auto=format&fit=crop"
                  alt="Tipe Paviliun"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-brand-dark/80 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  TERSEDIA 6 UNIT
                </span>
                <span className="absolute top-4 right-4 bg-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  FAVORIT
                </span>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-brand-dark leading-tight">
                    Tipe Paviliun Lengkap
                  </h3>
                </div>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                  Hunian luas dengan pembagian ruangan layaknya rumah mungil.
                  Ideal untuk yang mengutamakan ruang gerak ekstra dan membawa
                  mesin cuci sendiri.
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600 font-medium mb-8">
                  <span className="flex items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <Home size={16} className="mr-2 text-teal-600" /> Ruang Tamu
                  </span>
                  <span className="flex items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <CheckCircle2 size={16} className="mr-2 text-teal-600" />{" "}
                    Dapur & R. Cuci
                  </span>
                  <span className="flex items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <CheckCircle2 size={16} className="mr-2 text-teal-600" />{" "}
                    Teras Berperabot
                  </span>
                </div>
                <div className="flex justify-between items-center mt-auto border-t border-slate-100 pt-6">
                  <div>
                    <span className="text-xs text-slate-500 font-bold tracking-wider uppercase block mb-1">
                      Mulai Dari
                    </span>
                    <span className="text-3xl font-bold text-brand-dark">
                      Rp 850.000
                    </span>
                    <span className="text-slate-400 text-sm"> /bln</span>
                  </div>
                  <button
                    onClick={() => setIsRoomModalOpen(true)}
                    className="bg-brand-dark text-white p-4 rounded-xl hover:bg-slate-800 transition-colors shadow-md"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Room 2 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all group">
              <div className="relative h-64 bg-slate-200 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1631049552057-403b87397320?q=80&w=2070&auto=format&fit=crop"
                  alt="Tipe Studio"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-brand-dark/80 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  TERSEDIA 2 UNIT
                </span>
                <span className="absolute top-4 right-4 bg-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full">
                  TERBATAS
                </span>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-brand-dark leading-tight">
                    Tipe Studio Ekstra Luas
                  </h3>
                </div>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                  Didesain khusus bagi Anda yang menyukai ruangan menyatu tanpa
                  sekat. Kamar tidur berukuran ekstra luas yang menjamin
                  kebebasan dan kenyamanan beristirahat.
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600 font-medium mb-8">
                  <span className="flex items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <CheckCircle2 size={16} className="mr-2 text-teal-600" />{" "}
                    Kamar Ekstra Luas
                  </span>
                  <span className="flex items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <CheckCircle2 size={16} className="mr-2 text-teal-600" />{" "}
                    Kamar Mandi Dalam
                  </span>
                </div>
                <div className="flex justify-between items-center mt-auto border-t border-slate-100 pt-6">
                  <div>
                    <span className="text-xs text-slate-500 font-bold tracking-wider uppercase block mb-1">
                      Mulai Dari
                    </span>
                    <span className="text-3xl font-bold text-brand-dark">
                      Rp 850.000
                    </span>
                    <span className="text-slate-400 text-sm"> /bln</span>
                  </div>
                  <button
                    onClick={() => setIsRoomModalOpen(true)}
                    className="bg-brand-dark text-white p-4 rounded-xl hover:bg-slate-800 transition-colors shadow-md"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 md:hidden">
            <button
              onClick={() => setIsRoomModalOpen(true)}
              className="text-teal-600 font-semibold flex items-center justify-center w-full hover:text-teal-700 cursor-pointer transition-colors"
            >
              Lihat Detail & Fasilitas{" "}
              <ExternalLink className="ml-1" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* CALL TO ACTION */}
      <div id="location" className="py-12 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-dark rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
            <div className="mb-8 md:mb-0 max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Siap Pindah ke Hunian Masa Depan?
              </h2>
              <p className="text-slate-300">
                Hubungi tim kami hari ini untuk konsultasi, cek ketersediaan
                dari 8 unit kamar kami, dan tour virtual eksklusif.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              {/* Tombol WhatsApp Menggunakan Tag <a> */}
              <a
                href="https://wa.me/6281315132327?text=Halo%20Admin%20Bumi%20Rafka%20Kost,%20saya%20ingin%20bertanya%20tentang%20ketersediaan%20kamar."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-brand-dark px-8 py-4 rounded-xl font-bold flex items-center justify-center hover:bg-slate-100 transition-colors"
              >
                <MessageCircle className="mr-2" size={20} />
                Hubungi via WhatsApp
              </a>
              {/* Tombol Lokasi Maps Menggunakan Tag <a> */}
              <a
                href="https://maps.app.goo.gl/tntD5Shw4i24DEtj9"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border border-slate-600 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center hover:bg-slate-800 transition-colors"
              >
                <MapPin className="mr-2" size={20} />
                Lihat Lokasi Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="font-bold text-xl text-brand-dark mb-2 block">
                Bumi Rafka Kost
              </span>
              <p className="text-slate-500 text-sm">
                © 2026 Bumi Rafka Kost. Powered by Smart-Stay IoT System
              </p>
            </div>
            <div className="flex gap-6 text-sm text-slate-500">
              <a
                href="#privacy"
                className="hover:text-brand-dark transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="hover:text-brand-dark transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="https://instagram.com/bumirafkakost"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-dark transition-colors"
              >
                Instagram
              </a>
              <a
                href="mailto:support@bumirafkakost.com"
                className="hover:text-brand-dark transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL LIHAT SEMUA KAMAR / DETAIL FASILITAS */}
      {isRoomModalOpen && (
        <div className="fixed inset-0 z-[100] bg-brand-dark/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-100 p-6 flex justify-between items-center z-10">
              <div>
                <h3 className="text-2xl font-bold text-brand-dark">
                  Informasi Kamar & Fasilitas
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  Total 8 Unit Tersedia dengan Fasilitas Lengkap
                </p>
              </div>
              <button
                onClick={() => setIsRoomModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-500 hover:text-brand-dark transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Konten Modal */}
            <div className="p-6 md:p-8 space-y-8">
              {/* Box Fasilitas Umum (All-in) */}
              <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Info className="text-teal-600" size={24} />
                  <h4 className="text-lg font-bold text-teal-900">
                    Fasilitas Gratis (Termasuk dalam Harga)
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center bg-white p-3 rounded-xl border border-teal-100/50">
                    <Zap className="text-amber-500 mr-3" size={20} />
                    <span className="font-medium text-slate-700">Listrik</span>
                  </div>
                  <div className="flex items-center bg-white p-3 rounded-xl border border-teal-100/50">
                    <Droplets className="text-blue-500 mr-3" size={20} />
                    <span className="font-medium text-slate-700">
                      Air Bersih
                    </span>
                  </div>
                  <div className="flex items-center bg-white p-3 rounded-xl border border-teal-100/50">
                    <Wifi className="text-teal-500 mr-3" size={20} />
                    <span className="font-medium text-slate-700">
                      Koneksi WiFi
                    </span>
                  </div>
                </div>
              </div>

              {/* Detail Tipe Kamar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Tipe Paviliun */}
                <div className="border border-slate-200 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-brand-dark text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
                    6 UNIT
                  </div>
                  <h4 className="text-xl font-bold text-brand-dark mb-4">
                    Tipe Paviliun Lengkap
                  </h4>
                  <ul className="space-y-3 text-sm text-slate-600 mb-6">
                    <li className="flex items-start">
                      <CheckCircle2
                        className="text-teal-500 mr-2 shrink-0"
                        size={18}
                      />{" "}
                      <span>
                        <strong>Ruang Tamu:</strong> Cukup luas, dapat digunakan
                        untuk memarkir hingga 2 motor di dalam.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2
                        className="text-teal-500 mr-2 shrink-0"
                        size={18}
                      />{" "}
                      <span>
                        <strong>Kamar Tidur:</strong> Terpisah dari ruang tamu
                        untuk privasi.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2
                        className="text-teal-500 mr-2 shrink-0"
                        size={18}
                      />{" "}
                      <span>
                        <strong>Dapur & Kamar Mandi:</strong> Fasilitas pribadi
                        di dalam unit.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2
                        className="text-teal-500 mr-2 shrink-0"
                        size={18}
                      />{" "}
                      <span>
                        <strong>Area Belakang:</strong> Ruang khusus untuk
                        mencuci (mendukung mesin cuci pribadi).
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2
                        className="text-teal-500 mr-2 shrink-0"
                        size={18}
                      />{" "}
                      <span>
                        <strong>Teras Depan:</strong> Dilengkapi fasilitas 1
                        meja berlaci dan 2 kursi bersantai.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Tipe Studio */}
                <div className="border border-slate-200 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-brand-dark text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
                    2 UNIT
                  </div>
                  <h4 className="text-xl font-bold text-brand-dark mb-4">
                    Tipe Studio Ekstra Luas
                  </h4>
                  <ul className="space-y-3 text-sm text-slate-600 mb-6">
                    <li className="flex items-start">
                      <CheckCircle2
                        className="text-teal-500 mr-2 shrink-0"
                        size={18}
                      />{" "}
                      <span>
                        <strong>Kamar Tidur Ekstra:</strong> Ruangan menyatu
                        tanpa sekat dengan ukuran yang sangat lega dan
                        memuaskan.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2
                        className="text-teal-500 mr-2 shrink-0"
                        size={18}
                      />{" "}
                      <span>
                        <strong>Kamar Mandi:</strong> Terletak di dalam unit
                        kamar.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2
                        className="text-teal-500 mr-2 shrink-0"
                        size={18}
                      />{" "}
                      <span>
                        <strong>Sirkulasi Udara:</strong> Desain tata ruang yang
                        memaksimalkan pencahayaan dan udara.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Informasi Harga */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <h4 className="text-lg font-bold text-brand-dark mb-2">
                    Skema Harga
                  </h4>
                  <p className="text-sm text-slate-600">
                    Harga sewa kost dimulai dari{" "}
                    <span className="font-bold text-brand-dark">
                      Rp 850.000 / bulan
                    </span>
                    .
                    <br className="hidden md:block" /> Apabila Anda membawa alat
                    elektronik berdaya tinggi (seperti Kulkas, dsb), harga sewa
                    akan menyesuaikan hingga maksimal{" "}
                    <span className="font-bold text-brand-dark">
                      Rp 950.000 / bulan
                    </span>
                    .
                  </p>
                </div>
                <div className="shrink-0 w-full md:w-auto">
                  <button
                    onClick={() => setIsRoomModalOpen(false)}
                    className="w-full bg-brand-dark text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors"
                  >
                    Tutup Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
