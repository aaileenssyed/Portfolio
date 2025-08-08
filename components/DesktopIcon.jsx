import React from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

const DesktopIcon = ({ icon, isSelected, onMouseDown, onDoubleClick, onClick, onContextMenu }) => {
  const handleClick = (e) => {
    if (onClick) {
      e.stopPropagation();
      onClick();
    }
  };

  return (
    <motion.div
      className={`desktop-icon absolute select-none ${isSelected ? 'selected' : ''}`}
      style={{ left: `${icon.x}px`, top: `${icon.y}px` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div 
        className={`flex flex-col items-center p-3 rounded-lg hover:bg-white/10 transition-all duration-200 ${isSelected ? 'bg-white/20' : ''} cursor-pointer w-20 h-24`}
        onMouseDown={(e) => onMouseDown && onMouseDown(e, icon)}
        onClick={handleClick}
        onDoubleClick={() => onDoubleClick && onDoubleClick(icon)}
        onContextMenu={(e) => onContextMenu && onContextMenu(e, icon)}
      >
        <div className="flex items-center justify-center w-12 h-12">
          {icon.color ? (
            <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${icon.color} rounded-xl shadow-2xl transform hover:scale-110 transition-all duration-200 pointer-events-none`}>
              <Icon icon={icon.icon} className="w-12 h-12 " />
            </div>
          ) : (
            <Icon icon={icon.icon} className="w-12 h-12 text-white drop-shadow-lg transform hover:scale-110 transition-all duration-200 pointer-events-none" />
          )}
        </div>
        <span className="text-white text-xs font-medium text-center drop-shadow-lg max-w-20 break-words pointer-events-none leading-tight mt-1">
          {icon.name}
        </span>
      </div>
    </motion.div>
  );
};

export default DesktopIcon;