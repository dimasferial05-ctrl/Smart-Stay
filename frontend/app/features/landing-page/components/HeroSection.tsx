import { ArrowRight } from "lucide-react";
import { type FC, type MouseEvent } from "react";

interface HeroSectionProps {
  onCheckRooms: (e: MouseEvent<HTMLAnchorElement>, id: string) => void;
}

export const HeroSection: FC<HeroSectionProps> = ({ onCheckRooms }) => {
  return (
    <div
      id="home"
      className="relative bg-[#1e293b] h-[600px] flex items-center scroll-mt-20 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1522771731470-8a3ce544a8b2?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/20 text-[#5eead4] font-medium text-sm mb-6 backdrop-blur-sm border border-teal-500/30">
            #SmartStayExperience
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Smart-Stay: Masa Depan Hunian Nyaman & Aman
          </h1>
          <p className="text-lg text-slate-300 mb-10 leading-relaxed">
            Nikmati ekosistem tempat tinggal yang terintegrasi dengan teknologi
            AIoT terkini untuk kenyamanan maksimal Anda. Listrik, Air, dan WiFi
            sudah termasuk!
          </p>
          <a
            href="#kamar"
            onClick={(e: MouseEvent<HTMLAnchorElement>) =>
              onCheckRooms(e, "kamar")
            }
            className="bg-[#5eead4] text-[#1e293b] px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center hover:bg-teal-300 transition-colors shadow-lg shadow-teal-500/30 cursor-pointer"
          >
            Cek Ketersediaan Kamar
            <ArrowRight className="ml-2" size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};
