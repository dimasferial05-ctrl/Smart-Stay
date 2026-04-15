import { type FC } from "react";

export const Footer: FC = () => {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <span className="font-bold text-xl text-[#1e293b] mb-2 block">
              Bumi Rafka Kost
            </span>
            <p className="text-slate-500 text-sm">
              © {currentYear} Bumi Rafka Kost. Powered by Smart-Stay IoT System
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            <a
              href="#privacy"
              className="hover:text-[#1e293b] transition-colors"
            >
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-[#1e293b] transition-colors">
              Terms of Service
            </a>
            <a
              href="https://instagram.com/bumirafkakost"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1e293b] transition-colors"
            >
              Instagram
            </a>
            <a
              href="mailto:support@bumirafkakost.com"
              className="hover:text-[#1e293b] transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
