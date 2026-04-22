import { ScanFace } from "lucide-react";
import { type FC } from "react";

interface AccessLog {
  name: string;
  room: string;
  match: string;
  time: string;
  avatar: string;
}

const MOCK_LOGS: AccessLog[] = [
  {
    name: "Budi Santoso",
    room: "R-204",
    match: "99.8%",
    time: "Today, 09:14 AM",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    name: "Siti Aminah",
    room: "R-102",
    match: "99.2%",
    time: "Today, 07:15 AM",
    avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
  },
];

export const AccessMonitorMockup: FC = () => {
  return (
    <div className="w-full relative">
      <div className="absolute inset-0 bg-teal-400/10 blur-3xl rounded-full" />
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-2xl relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-bold text-[#1e293b]">Access Activity Monitor</h4>
          <span className="bg-teal-400 text-teal-900 text-[10px] font-bold px-3 py-1 rounded-full animate-pulse">
            LIVE FEED
          </span>
        </div>

        <div className="space-y-4 mb-6">
          {MOCK_LOGS.map((log: AccessLog, index: number) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between border border-slate-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
                  <img src={log.avatar} alt={log.name} />
                </div>
                <div>
                  <p className="font-bold text-sm text-[#1e293b]">
                    {log.name} ({log.room})
                  </p>
                  <p className="text-teal-600 text-[10px] font-medium">
                    Identified: {log.match} Match
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-slate-400">{log.time}</span>
            </div>
          ))}
        </div>

        <div className="bg-[#1e293b] rounded-xl p-6 text-center border border-slate-700 flex flex-col items-center justify-center">
          <ScanFace className="text-teal-400 mb-2 animate-bounce" size={28} />
          <p className="text-teal-400 text-[10px] tracking-widest uppercase font-mono">
            Encrypting Data...
          </p>
        </div>
      </div>
    </div>
  );
};
