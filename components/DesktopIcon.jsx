import React from 'react';
import { Icon } from '@iconify/react';

const DesktopIcon = ({ icon, isSelected, onMouseDown, onDoubleClick, onContextMenu }) => {
  return (
    <div
      className={`desktop-icon absolute select-none ${isSelected ? 'selected' : ''}`}
      style={{ left: `${icon.x}px`, top: `${icon.y}px` }}
    >
      <div 
        className={`flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 ${isSelected ? 'bg-white/20' : ''} cursor-pointer`}
        onMouseDown={(e) => onMouseDown(e, icon)}
        onDoubleClick={() => onDoubleClick(icon)}
        onContextMenu={(e) => onContextMenu(e, icon)}
      >
        {icon.color ? (
          <div className={`p-4 bg-gradient-to-br ${icon.color} rounded-xl shadow-2xl transform hover:scale-110 transition-all duration-200 pointer-events-none`}>
            <Icon icon={icon.icon} className="w-8 h-8" />
          </div>
        ) : (
          <Icon icon={icon.icon} className="w-12 h-12 text-white drop-shadow-lg transform hover:scale-110 transition-all duration-200 pointer-events-none" />
        )}
        <span className="text-white text-sm font-medium text-center drop-shadow-lg max-w-20 break-words pointer-events-none">
          {icon.name}
        </span>
      </div>
    </div>
  );
};

export default DesktopIcon;