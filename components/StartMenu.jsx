import React from 'react';
import { Icon } from '@iconify/react';

const StartMenu = ({ desktopIcons, onIconClick, onClose }) => {
  return (
    <div className="absolute bottom-16 left-4 w-96 bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 animate-slideUp z-50">
      <div className="p-6">
        <h3 className="text-white text-xl font-bold mb-4">All Applications</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {desktopIcons.map((icon) => (
            <button
              key={icon.id}
              onClick={() => {
                onIconClick(icon);
                onClose();
              }}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200"
            >
              <div className={`p-2 bg-gradient-to-br ${icon.color} rounded-lg`}>
                <Icon icon={icon.icon} className="w-5 h-5" />
              </div>
              <span className="text-white font-medium">{icon.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartMenu;