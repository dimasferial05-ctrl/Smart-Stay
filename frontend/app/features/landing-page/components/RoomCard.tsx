import { ArrowRight, type LucideIcon } from "lucide-react";
import { type FC } from "react";

interface RoomFeature {
  label: string;
  icon: LucideIcon;
}

interface RoomCardProps {
  title: string;
  description: string;
  image: string;
  price: string;
  units: number;
  features: RoomFeature[];
  onDetailClick: () => void;
}

export const RoomCard: FC<RoomCardProps> = ({
  title,
  description,
  image,
  price,
  units,
  features,
  onDetailClick,
}) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all group">
      <div className="relative h-64 bg-slate-200 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 bg-[#1e293b]/80 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
          TERSEDIA {units} UNIT
        </span>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-[#1e293b] mb-4 leading-tight">
          {title}
        </h3>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-slate-600 font-medium mb-8">
          {features.map((feature: RoomFeature, index: number) => (
            <span
              key={index}
              className="flex items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100"
            >
              <feature.icon size={16} className="mr-2 text-teal-600" />
              {feature.label}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center mt-auto border-t border-slate-100 pt-6">
          <div>
            <span className="text-xs text-slate-500 font-bold tracking-wider uppercase block mb-1">
              Mulai Dari
            </span>
            <span className="text-3xl font-bold text-[#1e293b]">{price}</span>
            <span className="text-slate-400 text-sm"> /bln</span>
          </div>
          <button
            onClick={onDetailClick}
            className="bg-[#1e293b] text-white p-4 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
