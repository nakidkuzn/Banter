import React from 'react';
import {
  Flame,
  PlusCircle,
  BarChart3,
  Sparkles,
  Share2,
  DollarSign,
  PenTool,
  Search,
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  viewMode: 'reader' | 'creator';
  setViewMode: (mode: 'reader' | 'creator') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenCreatorStudio: (defaultType?: 'review' | 'commentary' | 'banter') => void;
  onOpenAnalytics: () => void;
  totalRevenue: number;
  totalClicks: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  onOpenCreatorStudio,
  onOpenAnalytics,
  totalRevenue,
  totalClicks
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10 text-white select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo & Name - Artistic Flair Style */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setViewMode('reader')}>
            <div className="w-10 h-10 rounded-full border border-white/20 bg-gradient-to-tr from-[#FF4D00] to-[#FF0080] p-[2px] shrink-0">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#FF4D00]" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tighter leading-none italic text-white">
                  BANTER<span className="text-[#FF4D00]">.</span>
                </h1>
                <span className="hidden sm:inline-block text-[9px] font-bold px-2 py-0.5 bg-white text-black uppercase tracking-wider">
                  COLLECTIVE
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#FF4D00] hidden sm:block mt-0.5">
                Vinyl • Hip Hop • Pop Culture • Gear
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vinyl drops, hip hop reviews, pop culture, consumer gear..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-[#0F0F0F] border border-white/10 rounded-none text-white placeholder-white/30 focus:outline-none focus:border-[#FF4D00] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white/40 hover:text-white uppercase"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Monetization Quick Stats & Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Revenue Badge */}
            <button
              onClick={onOpenAnalytics}
              className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 bg-white/5 border border-white/10 hover:border-[#FF4D00] transition-all text-left group"
              title="Click to view Monetization & Affiliate Link Analytics"
            >
              <div className="w-7 h-7 bg-[#FF4D00]/20 border border-[#FF4D00]/40 flex items-center justify-center text-[#FF4D00]">
                <DollarSign className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="text-[9px] uppercase tracking-widest text-[#FF4D00] font-bold">Revenue</div>
                <div className="font-mono font-bold text-[#00FF88] text-sm leading-tight">${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>
            </button>

            {/* Analytics Toggle */}
            <button
              onClick={onOpenAnalytics}
              className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              title="Affiliate & Monetization Dashboard"
            >
              <BarChart3 className="w-4 h-4 text-[#FF4D00]" />
              <span className="hidden sm:inline">Monetization</span>
            </button>

            {/* View Mode Switcher (Reader vs Creator Studio) */}
            <div className="flex p-0.5 bg-black border border-white/10">
              <button
                onClick={() => setViewMode('reader')}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  viewMode === 'reader'
                    ? 'bg-white text-black'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Feed</span>
              </button>
              <button
                onClick={() => {
                  setViewMode('creator');
                  onOpenCreatorStudio();
                }}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  viewMode === 'creator'
                    ? 'bg-[#FF4D00] text-black'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Studio</span>
              </button>
            </div>

            {/* Dump Banter / New Post Button */}
            <button
              onClick={() => onOpenCreatorStudio('review')}
              className="px-4 py-2 bg-[#FF4D00] text-black font-black italic text-xs hover:bg-white transition-colors flex items-center gap-1.5 uppercase tracking-tight shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">DUMP BANTER</span>
            </button>

          </div>

        </div>

        {/* Mobile Search Input */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hot takes, reviews, affiliate links..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-[#0F0F0F] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#FF4D00]"
            />
          </div>
        </div>

      </div>
    </header>
  );
};

