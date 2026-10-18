import React, { useState } from 'react';
import {
  ExternalLink,
  Plus,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  Trash2,
  Edit2,
  Globe,
  Mail,
  Play,
  FileText,
  ShoppingBag,
  StickyNote,
  Folder,
  Calendar,
  Kanban,
  GitFork,
} from 'lucide-react';
import { GroupItem, LinkItem } from '../types';
import { extractDomain, normalizeUrl } from '../utils/urlHelper';

interface GroupCardProps {
  group: GroupItem;
  index: number;
  totalGroups: number;
  openInNewTab: boolean;
  showFavicons: boolean;
  onOpenLink: (url: string) => void;
  onAddLink: (groupId: string) => void;
  onEditLink: (link: LinkItem, groupId: string) => void;
  onDeleteLink: (linkId: string, groupId: string) => void;
  onMoveLink: (groupId: string, linkIndex: number, direction: 'up' | 'down') => void;
  onEditGroup: (group: GroupItem) => void;
  onDeleteGroup: (groupId: string) => void;
  onMoveGroup: (groupIndex: number, direction: 'up' | 'down') => void;
  searchQuery?: string;
}

// Helper to pick matching icon identical to the user's reference mockup
const getLinkItemIcon = (url: string, title: string) => {
  const text = `${url} ${title}`.toLowerCase();

  if (text.includes('mail') || text.includes('gmail') || text.includes('outlook') || text.includes('email')) {
    return <Mail className="w-5 h-5 text-slate-700" />;
  }
  if (text.includes('youtube') || text.includes('video') || text.includes('nonton')) {
    return <Play className="w-5 h-5 text-slate-700" />;
  }
  if (text.includes('news') || text.includes('berita') || text.includes('portal') || text.includes('artikel')) {
    return <FileText className="w-5 h-5 text-slate-700" />;
  }
  if (text.includes('tokopedia') || text.includes('belanja') || text.includes('shopee') || text.includes('shop')) {
    return <ShoppingBag className="w-5 h-5 text-slate-700" />;
  }
  if (text.includes('keep') || text.includes('catatan') || text.includes('note')) {
    return <StickyNote className="w-5 h-5 text-slate-700" />;
  }
  if (text.includes('drive') || text.includes('dokumen') || text.includes('docs') || text.includes('folder')) {
    return <Folder className="w-5 h-5 text-slate-700" />;
  }
  if (text.includes('calendar') || text.includes('kalender') || text.includes('jadwal') || text.includes('agenda')) {
    return <Calendar className="w-5 h-5 text-slate-700" />;
  }
  if (text.includes('trello') || text.includes('task') || text.includes('kanban') || text.includes('board')) {
    return <Kanban className="w-5 h-5 text-slate-700" />;
  }
  if (text.includes('github') || text.includes('git') || text.includes('repo')) {
    return <GitFork className="w-5 h-5 text-slate-700" />;
  }

  return <Globe className="w-5 h-5 text-slate-600" />;
};

export const GroupCard: React.FC<GroupCardProps> = ({
  group,
  index,
  totalGroups,
  openInNewTab,
  onOpenLink,
  onAddLink,
  onEditLink,
  onDeleteLink,
  onMoveLink,
  onEditGroup,
  onDeleteGroup,
  onMoveGroup,
  searchQuery = '',
}) => {
  const [activeMenuLinkId, setActiveMenuLinkId] = useState<string | null>(null);

  // Filter links if search query is provided
  const filteredLinks = group.links.filter((l) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return l.title.toLowerCase().includes(q) || l.url.toLowerCase().includes(q);
  });

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E7E2DA] shadow-xs flex flex-col overflow-hidden transition-all duration-200">
      {/* Group Header (PRIBADI / PEKERJAAN with counter badge and actions) */}
      <div className="px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between bg-white">
        {/* Left: Group Title in Serif Spaced Uppercase + Count Badge */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <h2 className="font-display-serif text-sm sm:text-base font-bold tracking-[0.25em] text-slate-800 uppercase select-none truncate">
            {group.title}
          </h2>
          <span className="w-6 h-6 rounded-full border border-slate-300 text-slate-600 text-xs font-semibold flex items-center justify-center shrink-0 tabular-nums">
            {group.links.length}
          </span>
        </div>

        {/* Right: + Tambah, Edit, Delete Group */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* + Tambah button */}
          <button
            type="button"
            onClick={() => onAddLink(group.id)}
            className="flex items-center gap-1 text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-colors shadow-2xs select-none"
            title="Tambah tautan baru ke grup ini"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah</span>
          </button>

          {/* Edit group button */}
          <button
            type="button"
            onClick={() => onEditGroup(group)}
            className="p-1.5 rounded-lg border border-slate-300 hover:border-slate-400 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-2xs"
            title="Ubah nama / warna kelompok"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>

          {/* Delete group button */}
          {totalGroups > 1 && (
            <button
              type="button"
              onClick={() => onDeleteGroup(group.id)}
              className="p-1.5 rounded-lg border border-slate-300 hover:border-slate-400 bg-white text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors shadow-2xs"
              title="Hapus kelompok ini"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Links Container */}
      <div className="border-t border-[#F0ECE4] overflow-y-auto max-h-[300px] sm:max-h-[340px] custom-scrollbar">
        {filteredLinks.length === 0 ? (
          <div className="py-8 px-4 text-center">
            <p className="text-xs sm:text-sm font-medium text-slate-500">
              {searchQuery ? 'Tidak ada tautan yang cocok.' : 'Belum ada tautan di kelompok ini.'}
            </p>
            <button
              type="button"
              onClick={() => onAddLink(group.id)}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Tautan</span>
            </button>
          </div>
        ) : (
          filteredLinks.map((link) => {
            const actualIndex = group.links.findIndex((l) => l.id === link.id);
            const domain = extractDomain(link.url);
            const isMenuOpen = activeMenuLinkId === link.id;

            return (
              <div
                key={link.id}
                className="group border-b border-[#F2ECE4] last:border-b-0 px-3.5 sm:px-4 py-3 sm:py-3.5 hover:bg-[#FAF8F5] transition-colors flex items-center justify-between gap-2.5 sm:gap-3"
              >
                {/* Left: Icon Box + Title + Domain */}
                <div
                  onClick={() => onOpenLink(link.url)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') onOpenLink(link.url);
                  }}
                  className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer select-none text-left"
                  title={`Kunjungi: ${link.url}`}
                >
                  {/* Clean rounded soft-cream icon box */}
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#F5F2EB] flex items-center justify-center shrink-0">
                    {getLinkItemIcon(link.url, link.title)}
                  </div>

                  {/* Title & Domain */}
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-xs sm:text-sm text-slate-900 truncate leading-snug">
                      {link.title}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-500 truncate font-mono mt-0.5">
                      {domain}
                    </div>
                  </div>
                </div>

                {/* Right: Chevrons, 3-Dots Menu, KUNJUNGI Button */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  {/* Stacked Reorder Chevrons (Up / Down) */}
                  <div className="flex flex-col items-center justify-center -space-y-1 text-slate-400">
                    <button
                      type="button"
                      disabled={actualIndex <= 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveLink(group.id, actualIndex, 'up');
                      }}
                      title="Pindah ke atas"
                      className="p-0.5 text-slate-400 hover:text-slate-800 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={actualIndex >= group.links.length - 1}
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveLink(group.id, actualIndex, 'down');
                      }}
                      title="Pindah ke bawah"
                      className="p-0.5 text-slate-400 hover:text-slate-800 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 3-dots Menu Button */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuLinkId(isMenuOpen ? null : link.id);
                      }}
                      className="p-1 sm:p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      title="Menu opsi tautan"
                    >
                      <MoreVertical className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-20"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuLinkId(null);
                          }}
                        />
                        <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-30 animate-in fade-in zoom-in-95 duration-100 text-left">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenuLinkId(null);
                              onEditLink(link, group.id);
                            }}
                            className="w-full text-left px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit Tautan</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenuLinkId(null);
                              onMoveLink(group.id, actualIndex, 'up');
                            }}
                            disabled={actualIndex <= 0}
                            className="w-full text-left px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                            <span>Geser Ke Atas</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenuLinkId(null);
                              onMoveLink(group.id, actualIndex, 'down');
                            }}
                            disabled={actualIndex >= group.links.length - 1}
                            className="w-full text-left px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                            <span>Geser Ke Bawah</span>
                          </button>
                          <div className="h-px bg-slate-100 my-1" />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenuLinkId(null);
                              onDeleteLink(link.id, group.id);
                            }}
                            className="w-full text-left px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Hapus Tautan</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* KUNJUNGI Button (Iconic outline button from reference) */}
                  <a
                    href={normalizeUrl(link.url)}
                    target={openInNewTab ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg border border-slate-800 hover:border-slate-900 bg-white hover:bg-slate-900 text-slate-900 hover:text-white font-bold text-[11px] sm:text-xs tracking-wider uppercase transition-colors shadow-2xs select-none"
                  >
                    <span>KUNJUNGI</span>
                    <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer hint with scroll message and + Tambah Link */}
      <div className="px-4 py-2.5 bg-white border-t border-[#F0ECE4] flex items-center justify-between text-xs select-none">
        <span className="text-slate-400 text-[11px] sm:text-xs font-normal">
          Scroll untuk melihat semua
        </span>
        <button
          type="button"
          onClick={() => onAddLink(group.id)}
          className="text-slate-800 hover:text-slate-950 font-semibold text-[11px] sm:text-xs hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>+ Tambah Link</span>
        </button>
      </div>
    </div>
  );
};
