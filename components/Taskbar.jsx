import { Icon } from '@iconify/react';

const Taskbar = ({ startMenuOpen, setStartMenuOpen, activeWindows, onBringToFront }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-xl border-t border-gray-700/50 z-40">
      <div className="flex items-center justify-between px-4 py-2">
        <button
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-all duration-200"
        >
          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded grid grid-cols-2 grid-rows-2 gap-0.5 p-1">
            <div className="bg-white/90 rounded-sm"></div>
            <div className="bg-white/90 rounded-sm"></div>
            <div className="bg-white/90 rounded-sm"></div>
            <div className="bg-white/90 rounded-sm"></div>
          </div>
          <span className="text-white font-medium">Start</span>
        </button>

        <div className="flex items-center space-x-2 flex-1 px-4">
          {activeWindows.map((window) => (
            <button
              key={window.id}
              onClick={() => onBringToFront(window.id)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-gray-800/80 rounded-lg hover:bg-gray-700/50 transition-all duration-200 min-w-[150px] max-w-[200px]"
            >
              <Icon icon={window.icon} className="w-4 h-4 text-gray-400" />
              <span className="text-white text-sm truncate">{window.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Taskbar;