import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { BaseThemeConfig } from '../data/defaultData';

interface FooterSettingsButtonProps {
  themeConfig: BaseThemeConfig;
  onClick: () => void;
}

export const FooterSettingsButton: React.FC<FooterSettingsButtonProps> = ({
  themeConfig,
  onClick,
}) => {
  return (
    <footer className="pt-1">
      {/* Bottom Button (Identik dengan tombol PENGATURAN di bagian bawah gambar referensi) */}
      <button
        type="button"
        onClick={onClick}
        className={`w-full py-3.5 sm:py-4 px-6 rounded-2xl shadow-sm hover:shadow-md hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer select-none ${
          themeConfig.id === 'navy-krem' ? 'bg-[#1B2537] text-white' : `${themeConfig.bottomBarBg} ${themeConfig.bottomBarText}`
        }`}
      >
        <SlidersHorizontal className="w-4 h-4 shrink-0" />
        <span className="font-bold text-xs sm:text-sm tracking-[0.25em] uppercase">
          P E N G A T U R A N
        </span>
      </button>
    </footer>
  );
};
