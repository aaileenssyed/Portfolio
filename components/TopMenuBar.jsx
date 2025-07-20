import { Icon } from '@iconify/react';

const TopMenuBar = ({ currentTime, onControlCenterToggle }) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="absolute top-0 left-0 right-0 bg-black/70 backdrop-blur-xl z-50 border-b border-white/5">
      <div className="flex items-center justify-between px-4 py-1">
        <div className="flex-1">
          <a 
            href="https://github.com/jworse/desktop-portfolio" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors group"
          >
            <Icon icon="mdi:github" className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>jworse desktop portfolio</span>
          </a>
        </div>
        
        <div className="flex items-center gap-2 text-white text-sm">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full">
            <Icon icon="mdi:calendar-today" className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-medium">{formatDate(currentTime)}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full">
            <Icon icon="mdi:clock-outline" className="w-3.5 h-3.5 text-green-400" />
            <span className="font-bold">{formatTime(currentTime)}</span>
          </div>
        </div>
        
        <div className="flex-1 flex justify-end">
          <div className="flex items-center gap-2">
            <button 
              onClick={onControlCenterToggle}
              className="system-tray-button p-1.5 rounded-lg hover:bg-white/10 transition-all cursor-pointer group"
            >
              <Icon icon="fluent:wifi-1-24-filled" className="w-4 h-4 text-blue-400 group-hover:text-blue-300 pointer-events-none" />
            </button>
            <button 
              onClick={onControlCenterToggle}
              className="system-tray-button p-1.5 rounded-lg hover:bg-white/10 transition-all cursor-pointer group"
            >
              <Icon icon="fluent:battery-3-24-filled" className="w-4 h-4 text-green-400 group-hover:text-green-300 pointer-events-none" />
            </button>
            <button 
              onClick={onControlCenterToggle}
              className="system-tray-button p-1.5 rounded-lg hover:bg-white/10 transition-all cursor-pointer group"
            >
              <Icon icon="fluent:speaker-2-24-filled" className="w-4 h-4 text-purple-400 group-hover:text-purple-300 pointer-events-none" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMenuBar;