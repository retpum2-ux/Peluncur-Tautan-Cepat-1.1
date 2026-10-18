import React from 'react';
import { Plus, Search, LayoutGrid, SlidersHorizontal, X } from 'lucide-react';
import { BaseThemeConfig } from '../data/defaultData';

interface HeaderMenuProps {
  themeConfig: BaseThemeConfig;
  totalLinks: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddNewLink: () => void;
  onAddNewGroup: () => void;
  onOpenSettings: () => void;
}

export const HeaderMenu: React.FC<HeaderMenuProps> = ({
  themeConfig,
  totalLinks,
  searchQuery,
  onSearchChange,
  onAddNewLink,
  onAddNewGroup,
  onOpenSettings,
}) => {
  return (
    <header className="space-y-3.5 sm:space-y-4">
      {/* Top Navy Card (Persis dengan gambar referensi Menu Utama) */}
      <div
        className={`w-full p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm text-white ${
          themeConfig.id === 'navy-krem' ? 'bg-[#1B2537]' : themeConfig.headerBarBg
        }`}
      >
        {/* Top Row: Title & Total Links */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display-serif text-2xl sm:text-3xl font-medium tracking-tight text-white select-none">
              Menu Utama
            </h1>
            {/* Elegant horizontal accent underline under Menu */}
            <div className="w-14 sm:w-16 h-[3px] bg-[#E2B774] mt-2 rounded-full" />
          </div>

          <div className="pt-1">
            <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-[#E2B774] tabular-nums select-none">
              {totalLinks} TAUTAN
            </span>
          </div>
        </div>

        {/* Bottom Row: 3 Action Buttons */}
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5 mt-5">
          {/* 1. + Tautan */}
          <button
            type="button"
            onClick={onAddNewLink}
            className="flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-2 rounded-xl border border-slate-600/80 hover:border-slate-400 bg-white/5 hover:bg-white/10 active:scale-95 text-xs font-semibold text-white transition-all shadow-2xs cursor-pointer select-none"
            title="Tambah tautan baru"
          >
            <Plus className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Tautan</span>
          </button>

          {/* 2. ⊞ Grup Baru */}
          <button
            type="button"
            onClick={onAddNewGroup}
            className="flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-2 rounded-xl border border-slate-600/80 hover:border-slate-400 bg-white/5 hover:bg-white/10 active:scale-95 text-xs font-semibold text-white transition-all shadow-2xs cursor-pointer select-none"
            title="Tambah grup atau kelompok baru"
          >
            <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Grup Baru</span>
          </button>

          {/* 3. ⚙ Atur */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-2 rounded-xl border border-slate-600/80 hover:border-slate-400 bg-white/5 hover:bg-white/10 active:scale-95 text-xs font-semibold text-white transition-all shadow-2xs cursor-pointer select-none"
            title="Pengaturan aplikasi"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Atur</span>
          </button>
        </div>
      </div>

      {/* Search Input Bar (Identik dengan bar pencarian pada gambar referensi) */}
      <div className="relative bg-white rounded-xl sm:rounded-2xl border border-[#E5E0D6] shadow-2xs px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2.5 transition-all focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-200">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari tautan (nama situs atau URL)..."
          className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 font-normal focus:outline-hidden"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            title="Reset pencarian"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </header>
  );
};
