import React from 'react';
import { PostType, Category } from '../types';
import { Flame, Star, MessageSquare, DollarSign, Filter, Sparkles } from 'lucide-react';

interface CategoryFilterProps {
  selectedType: PostType | 'all';
  setSelectedType: (type: PostType | 'all') => void;
  selectedCategory: Category | 'all';
  setSelectedCategory: (cat: Category | 'all') => void;
  monetizedOnly: boolean;
  setMonetizedOnly: (val: boolean) => void;
}

const CATEGORIES: (Category | 'all')[] = [
  'all',
  'Music & Vinyl Releases',
  'Hip Hop Reviews',
  'Pop Culture & Media',
  'Consumer Gear & Products',
  'Culture & Opinions',
  'Tech & Gadgets',
  'Hot Takes & Memes'
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedType,
  setSelectedType,
  selectedCategory,
  setSelectedCategory,
  monetizedOnly,
  setMonetizedOnly
}) => {
  return (
    <div className="bg-[#0A0A0A] border-b border-white/10 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Post Type Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedType === 'all'
                ? 'bg-white text-black'
                : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF4D00]" />
            All Content
          </button>

          <button
            onClick={() => setSelectedType('review')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedType === 'review'
                ? 'bg-[#FF4D00] text-black font-black'
                : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            Reviews
          </button>

          <button
            onClick={() => setSelectedType('commentary')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedType === 'commentary'
                ? 'bg-[#FF0080] text-white font-black'
                : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Editorials
          </button>

          <button
            onClick={() => setSelectedType('banter')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedType === 'banter'
                ? 'bg-[#FF4D00] text-black font-black'
                : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Hot Takes
          </button>
        </div>

        {/* Category & Monetization Filter Pill */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-[#FF4D00]" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Category | 'all')}
              className="bg-transparent text-white text-xs font-medium focus:outline-none cursor-pointer pr-1 uppercase tracking-wider"
            >
              <option value="all" className="bg-[#0A0A0A] text-white">All Categories</option>
              {CATEGORIES.filter((c) => c !== 'all').map((cat) => (
                <option key={cat} value={cat} className="bg-[#0A0A0A] text-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Monetized Toggle */}
          <button
            onClick={() => setMonetizedOnly(!monetizedOnly)}
            className={`px-3 py-1 text-xs font-bold uppercase tracking-wider border transition-all flex items-center gap-1.5 ${
              monetizedOnly
                ? 'bg-[#00FF88]/20 text-[#00FF88] border-[#00FF88]/50'
                : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
            }`}
            title="Toggle to show only posts with tracked affiliate buy links"
          >
            <DollarSign className="w-3.5 h-3.5 text-[#00FF88]" />
            Monetized Only
          </button>
        </div>

      </div>
    </div>
  );
};

