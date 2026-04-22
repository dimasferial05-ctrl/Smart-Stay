import { Menu } from "lucide-react";
import { type FC, type MouseEvent } from "react";
import { Link } from "react-router";

interface NavbarProps {
  activeSection: string;
  onScroll: (e: MouseEvent<HTMLAnchorElement>, id: string) => void;
}

export const Navbar: FC<NavbarProps> = ({ activeSection, onScroll }) => {
  const getNavLinkClass = (section: string): string => {
    return `cursor-pointer transition-colors ${
      activeSection === section
        ? "text-[#1e293b] font-semibold border-b-2 border-[#5eead4] pb-1"
        : "text-slate-500 hover:text-[#1e293b]"
    }`;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <span className="font-bold text-2xl text-[#1e293b]">
              Bumi Rafka Kost
            </span>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            {["home", "fitur", "kamar", "location"].map((id: string) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e: MouseEvent<HTMLAnchorElement>) => onScroll(e, id)}
                className={getNavLinkClass(id)}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
            <Link
              to="/login"
              className="bg-[#1e293b] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              Login Admin
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-slate-500 hover:text-[#1e293b]">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
