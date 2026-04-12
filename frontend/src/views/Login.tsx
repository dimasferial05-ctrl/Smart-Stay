import { ArrowLeft, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Di sini nantinya Anda akan memanggil API Backend (FastAPI/PostgreSQL)
    // Untuk sementara, kita langsung arahkan ke Dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800">
      {/* Tombol Kembali ke Beranda (Absolute di pojok kiri atas) */}
      <Link
        to="/"
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center text-slate-500 hover:text-brand-dark transition-colors font-medium bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 z-10"
      >
        <ArrowLeft size={18} className="mr-2" />
        Kembali ke Beranda
      </Link>

      <div className="bg-white w-full max-w-5xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-0">
        {/* SISI KIRI: Branding & Visual */}
        <div className="w-full md:w-5/12 bg-brand-dark relative overflow-hidden hidden md:flex flex-col justify-between p-12">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=2070&auto=format&fit=crop')",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent"></div>

          <div className="relative z-10">
            <span className="font-bold text-3xl text-white block mb-2">
              Bumi Rafka
            </span>
            <span className="font-bold text-3xl text-brand-accent block">
              Kost.
            </span>
          </div>

          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <ShieldCheck className="text-teal-400 mr-3" size={32} />
              <h2 className="text-2xl font-bold text-white">
                Secure Admin Portal
              </h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Sistem manajemen kost terintegrasi AIoT. Pastikan kredensial Anda
              tersimpan dengan aman dan tidak dibagikan kepada pihak yang tidak
              berkepentingan.
            </p>
          </div>

          {/* Ornamen Dekoratif */}
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 -right-24 w-48 h-48 bg-brand-accent/20 rounded-full blur-3xl"></div>
        </div>

        {/* SISI KANAN: Form Login */}
        <div className="w-full md:w-7/12 p-10 sm:p-16 lg:p-20 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-10 text-center md:text-left">
              <h1 className="text-3xl font-bold text-brand-dark mb-3">
                Selamat Datang
              </h1>
              <p className="text-slate-500">
                Silakan masuk ke akun administrator Anda untuk mengelola data
                penghuni dan memonitor aktivitas.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Input Email / Username */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Email atau Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    required
                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-dark focus:border-brand-dark transition-all outline-none"
                    placeholder="admin@bumirafka.com"
                  />
                </div>
              </div>

              {/* Input Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-slate-700">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors"
                  >
                    Lupa Password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="block w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-dark focus:border-brand-dark transition-all outline-none"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-brand-dark transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Tombol Login */}
              <button
                type="submit"
                className="w-full bg-brand-dark text-white font-bold rounded-xl py-4 hover:bg-slate-800 transition-colors shadow-lg shadow-brand-dark/20 mt-4 flex justify-center items-center"
              >
                Masuk ke Dashboard
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400">
                Dilindungi oleh standar keamanan enkripsi.
                <br />© 2026 Bumi Rafka Kost.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
