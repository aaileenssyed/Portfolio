import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const StartMenu = ({ desktopIcons, onIconClick, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredIcons = desktopIcons.filter(icon => 
    icon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="absolute bottom-16 left-4 w-[420px] bg-black/40 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 animate-slideUp z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl pointer-events-none"></div>
      
      <div className="relative p-6">
        <div className="mb-6">
          <div className="relative">
            <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search applications..."
              className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all"
              autoFocus
            />
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-white text-sm font-semibold uppercase tracking-wider opacity-60">Applications</h3>
          <span className="text-xs text-gray-400">{filteredIcons.length} apps</span>
        </div>

        <div className="space-y-1 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {filteredIcons.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Icon icon="mdi:application-brackets" className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No applications found</p>
            </div>
          ) : (
            filteredIcons.map((icon) => (
              <button
                key={icon.id}
                onClick={() => {
                  onIconClick(icon);
                  onClose();
                }}
                className="group w-full flex items-center space-x-4 p-3 rounded-xl hover:bg-white/10 active:bg-white/15 transition-all duration-200"
              >
                <div className="relative">
                  {icon.color ? (
                    <div className={`p-3 bg-gradient-to-br ${icon.color} rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-110`}>
                      <Icon icon={icon.icon} className="w-6 h-6" />
                    </div>
                  ) : (
                    <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl group-hover:bg-white/20 transition-all duration-200 group-hover:scale-110">
                      <Icon icon={icon.icon} className="w-6 h-6" />
                    </div>
                  )}
                  <div className="absolute inset-0 rounded-xl bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 blur-xl"></div>
                </div>
                <div className="flex-1 text-left">
                  <span className="text-white font-medium block group-hover:translate-x-1 transition-transform duration-200">{icon.name}</span>
                  <span className="text-xs text-gray-400">Click to open</span>
                </div>
                <Icon icon="mdi:chevron-right" className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-200" />
              </button>
            ))
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2"
          >
            <Icon icon="mdi:close" className="w-4 h-4" />
            Close
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thumb-white\\/10::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .scrollbar-thumb-white\\/10::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default StartMenu;