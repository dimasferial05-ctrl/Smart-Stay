import { ExternalLink, MessageCircle } from "lucide-react";
import { type FC } from "react";
import { SectionContainer } from "./SectionContainer";

export const CTASection: FC = () => {
  return (
    <SectionContainer id="location" className="bg-[#1e293b] py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Siap Bergabung dengan Komunitas Kami?
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            Kunjungi lokasi kami atau hubungi admin via WhatsApp untuk
            konsultasi mengenai ketersediaan unit dan jadwal survei lokasi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-teal-500 text-[#1e293b] px-8 py-4 rounded-xl font-bold flex items-center justify-center hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/20"
            >
              <MessageCircle className="mr-2" size={20} />
              Hubungi via WhatsApp
            </a>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-bold flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              <ExternalLink className="mr-2" size={20} />
              Buka Google Maps
            </a>
          </div>
        </div>

        <div className="h-[400px] bg-slate-800 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
          <div className="absolute inset-0 flex items-center justify-center text-slate-500 flex-col p-8 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <ExternalLink size={32} />
            </div>
            <p className="font-medium">Peta Interaktif Sedang Dimuat...</p>
            <p className="text-xs text-slate-600 mt-2 italic">
              (Integrasi Google Maps Embed API)
            </p>
          </div>
          {/* Ganti dengan Iframe Google Maps jika diperlukan */}
        </div>
      </div>
    </SectionContainer>
  );
};
