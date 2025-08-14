import { Icon } from '@iconify/react';
import WindowContent from './WindowContent';

const Window = ({ window, onMouseDown, onClose, deletedItems, setDeletedItems, onOpenWindow, isMobile }) => {
  return (
    <div
      className={`${isMobile ? 'fixed' : 'absolute'} window-container`}
      style={{ 
        left: isMobile ? 0 : `${window.x}px`, 
        top: isMobile ? 0 : `${window.y}px`, 
        width: isMobile ? '100%' : `${window.width}px`, 
        height: isMobile ? '100%' : `${window.height}px`,
        zIndex: window.zIndex 
      }}
    >
      <div className={`bg-gray-900/95 backdrop-blur-xl ${isMobile ? '' : 'rounded-xl'} shadow-2xl h-full border border-gray-700/50 animate-fadeIn flex flex-col`}>
        <div 
          className={`bg-gray-800/90 ${isMobile ? 'mt-10' : 'rounded-t-xl cursor-move'} px-4 py-3 flex items-center justify-between border-b border-gray-700/50`}
          onMouseDown={isMobile ? undefined : (e) => onMouseDown(e, window.id)}
        >
          <div className="flex items-center space-x-3">
            {window.image ? (
              <div className="w-5 h-5 rounded overflow-hidden">
                <img 
                  src={window.image} 
                  alt={window.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <Icon icon={window.icon} className="w-5 h-5 text-gray-400" />
            )}
            <span className="text-white font-medium">{window.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            {isMobile ? (
              <button 
                onClick={() => onClose(window.id)}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                <Icon icon="mdi:close" className="w-5 h-5 text-gray-400 hover:text-white" />
              </button>
            ) : (
              <>
                <button className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors"></button>
                <button className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors"></button>
                <button 
                  onClick={() => onClose(window.id)}
                  className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors"
                ></button>
              </>
            )}
          </div>
        </div>
        <div className={`flex-1 overflow-hidden ${isMobile ? 'pb-16' : ''}`}>
          <WindowContent window={window} deletedItems={deletedItems} setDeletedItems={setDeletedItems} onOpenWindow={onOpenWindow} />
        </div>
      </div>
    </div>
  );
};

export default Window;