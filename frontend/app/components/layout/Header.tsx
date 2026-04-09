import { AlignJustify, Bell, ChevronDown } from "lucide-react";
import { type FC } from "react";

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

export const Header: FC<HeaderProps> = ({ title, onMenuClick }) => {
  return (
    <header className="bg-white shadow-[0_-1px_4px_0_rgba(0,0,0,0.25)] h-[90px] px-6 lg:px-10 flex items-center justify-between flex-shrink-0 z-10">
      <div className="flex items-center gap-3">
        <button
          className="text-[#1E1E1E] hover:text-[#4A9174] lg:hidden"
          onClick={onMenuClick}
        >
          <AlignJustify size={28} />
        </button>
        <h2 className="text-[#1D293D] font-['Inter'] font-bold text-2xl lg:text-[30px]">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/cb60ae3d9d0e7049a2a73cf5884c09bdc2604009?width=56"
            alt="Avatar"
            className="w-7 h-7 rounded-full object-cover"
          />
          <span className="hidden sm:block font-['Kumbh_Sans'] font-semibold text-sm text-[#574242]">
            John Deo
          </span>
          <ChevronDown size={16} className="text-black hidden sm:block" />
        </div>

        <div className="relative cursor-pointer p-1">
          <Bell size={20} className="text-[#282828]" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#F3797E] rounded-full border-2 border-white" />
        </div>
      </div>
    </header>
  );
};
