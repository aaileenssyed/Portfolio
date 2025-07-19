import { Icon } from '@iconify/react';

const ContextMenu = ({ contextMenu, onCreateFolder, onOpenIcon, onDeleteIcon }) => {
  return (
    <div 
      className="context-menu absolute bg-gray-800/95 backdrop-blur-xl rounded-lg shadow-2xl border border-gray-700/50 py-2 z-50"
      style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}
    >
      {contextMenu.type === 'desktop' ? (
        <>
          <button 
            onClick={onCreateFolder}
            className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-700/50 text-white text-sm"
          >
            <Icon icon="mdi:folder-plus" className="w-4 h-4" />
            <span>New Folder</span>
          </button>
        </>
      ) : (
        <>
          <button 
            onClick={() => onOpenIcon(contextMenu.icon)}
            className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-700/50 text-white text-sm"
          >
            <Icon icon="mdi:folder-open" className="w-4 h-4" />
            <span>Open</span>
          </button>
          <button 
            onClick={() => onDeleteIcon(contextMenu.icon)}
            className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-700/50 text-white text-sm"
          >
            <Icon icon="mdi:trash-can" className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </>
      )}
    </div>
  );
};

export default ContextMenu;