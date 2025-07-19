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
    <div className="absolute top-0 left-0 right-0 bg-black/90 backdrop-blur-sm z-50">
      <div className="flex items-center justify-between px-4 py-1">
        <div className="flex-1"></div>
        
        <div className="text-white text-sm font-medium">
          {formatDate(currentTime)} {formatTime(currentTime)}
        </div>
        
        <div className="flex-1 flex justify-end">
          <div className="flex items-center space-x-3">
            <button 
              onClick={onControlCenterToggle}
              className="system-tray-button p-1 rounded hover:bg-gray-800/50 transition-all cursor-pointer"
            >
              <Icon icon="mdi:wifi" className="w-4 h-4 text-white" />
            </button>
            <button 
              onClick={onControlCenterToggle}
              className="system-tray-button p-1 rounded hover:bg-gray-800/50 transition-all cursor-pointer"
            >
              <Icon icon="mdi:battery" className="w-4 h-4 text-white" />
            </button>
            <button 
              onClick={onControlCenterToggle}
              className="system-tray-button p-1 rounded hover:bg-gray-800/50 transition-all cursor-pointer"
            >
              <Icon icon="mdi:volume-high" className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMenuBar;