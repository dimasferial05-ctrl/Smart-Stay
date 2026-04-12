import { cn } from "@/lib/utils";
import {
  AlignJustify,
  ChevronDown,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Data Penghuni",
    path: "/data-penghuni",
    icon: Users,
  },
  {
    label: "Log aktivitas",
    path: "/log-aktivitas",
    icon: ClipboardList,
  },
];

export function AppLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F6F6]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-30 w-60 bg-[#4A9174] flex flex-col h-full transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Logo area */}
        <div className="px-6 pt-6 pb-5 border-b border-[#009951] flex items-start justify-between">
          <div>
            <h1 className="text-white text-xl font-bold font-['Inter'] leading-7">
              Bumi Rafka Kost
            </h1>
            <p className="text-[#BEDBFF] text-sm font-['Inter'] leading-5 mt-1">
              Smart Gate Access Control
            </p>
          </div>
          {/* Close - mobile */}
          <button
            className="lg:hidden text-white/70 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-5 pt-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-[10px] py-[5px] rounded h-[35px] transition-colors",
                  active ? "bg-[#545454]" : "hover:bg-white/10",
                )}
              >
                <Icon size={25} className="text-white flex-shrink-0" />
                <span
                  className={cn(
                    "font-['Kumbh_Sans'] font-semibold text-base text-white leading-normal",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-5 pb-6">
          <button className="w-full flex items-center justify-center gap-3 px-[24px] py-[8px] border border-[#F8F1F1] rounded-[5px] h-[41px] hover:bg-white/10 transition-colors">
            <LogOut size={25} className="text-white" />
            <span className="font-['Kumbh_Sans'] font-semibold text-[15px] text-white leading-normal">
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-[0_-1px_4px_0_rgba(0,0,0,0.25)] h-[90px] px-6 lg:px-10 flex items-center justify-between flex-shrink-0 z-10">
          <div className="flex items-center gap-3">
            <button
              className="text-[#1E1E1E] hover:text-[#4A9174] transition-colors lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <AlignJustify size={28} />
            </button>
            <h2 className="text-[#1D293D] font-['Inter'] font-bold text-2xl lg:text-[30px] leading-9">
              {navItems.find((item) => isActive(item.path))?.label ||
                "Dashboard"}
            </h2>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* User profile */}
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/cb60ae3d9d0e7049a2a73cf5884c09bdc2604009?width=56"
                alt="User avatar"
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="hidden sm:block font-['Kumbh_Sans'] font-semibold text-sm text-[#574242]">
                Admin
              </span>
              <ChevronDown size={16} className="text-black hidden sm:block" />
            </div>

            {/* Bell notification */}
            <div className="relative cursor-pointer">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.07349 2.86259C7.10905 1.75898 8.52118 1.13095 9.99999 1.13095C10.3126 1.13095 10.624 1.15877 10.9297 1.2147C11.0845 1.243 11.219 1.3379 11.2975 1.47421L12.7988 4.07979C12.821 3.30618 13.1379 2.56889 13.6867 2.02009C14.2561 1.45078 15.0282 1.13095 15.8333 1.13095C16.6384 1.13095 17.4106 1.45078 17.9799 2.02009C18.5492 2.5894 18.869 3.36154 18.869 4.16667C18.869 4.97179 18.5492 5.74393 17.9799 6.31324C17.4106 6.88255 16.6384 7.20238 15.8333 7.20238C15.3235 7.20238 14.827 7.07415 14.3867 6.83556L15.5758 8.89921C15.613 8.96366 15.6363 9.03514 15.6443 9.10909C15.8787 11.2779 16.4533 12.6611 16.9473 13.4883C17.1949 13.9028 17.4241 14.181 17.5843 14.3505C17.6645 14.4354 17.7276 14.4933 17.7673 14.5276C17.7872 14.5448 17.8013 14.5561 17.8087 14.5619L17.8146 14.5664C18.0016 14.702 18.0807 14.9425 18.0103 15.163C17.9394 15.385 17.7331 15.5357 17.5 15.5357H2.49999C2.26689 15.5357 2.06054 15.385 1.98965 15.1629C1.91926 14.9425 1.99844 14.7019 2.18551 14.5663M2.18572 14.5662L2.18719 14.5651L2.18572 14.5662ZM2.18572 14.5662L2.19495 14.559C2.20567 14.5505 2.22492 14.5347 2.25152 14.511C2.30471 14.4638 2.38738 14.3849 2.49008 14.2693C2.69521 14.0383 2.98174 13.6591 3.27302 13.0895C3.85453 11.9524 4.46427 10.0378 4.46427 7C4.46427 5.45455 5.0395 3.96552 6.07333 2.86277L6.07349 2.86259M8.28991 17.0364C8.54597 16.8881 8.87371 16.9755 9.02194 17.2316C9.12122 17.4031 9.26384 17.5454 9.43551 17.6444C9.60717 17.7434 9.80184 17.7955 9.99999 17.7955C10.1981 17.7955 10.3928 17.7434 10.5645 17.6444C10.7361 17.5454 10.8787 17.4031 10.978 17.2316C11.1263 16.9755 11.454 16.8881 11.7101 17.0364C11.9661 17.1846 12.0535 17.5124 11.9053 17.7684C11.7119 18.1025 11.434 18.3798 11.0996 18.5726C10.7652 18.7654 10.386 18.8669 9.99999 18.8669C9.61398 18.8669 9.23475 18.7654 8.90034 18.5726C8.56593 18.3798 8.2881 18.1025 8.09469 17.7684C7.94646 17.5124 8.03386 17.1846 8.28991 17.0364Z"
                  fill="#282828"
                />
              </svg>
              {/* Notification dot */}
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#F3797E] rounded-full" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
