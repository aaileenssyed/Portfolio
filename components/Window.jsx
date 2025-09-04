import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useState, useRef, useCallback } from 'react';
import WindowContent from './WindowContent';

const Window = ({ window, onMouseDown, onClose, deletedItems, setDeletedItems, onOpenWindow, isMobile, onResize }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  const resizeRef = useRef(null);
  const startPosRef = useRef({ x: 0, y: 0 });
  const startSizeRef = useRef({ width: 0, height: 0, x: 0, y: 0 });

  const handleResizeStart = useCallback((e, direction) => {
    if (isMobile) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    setResizeDirection(direction);
    
    startPosRef.current = { x: e.clientX, y: e.clientY };
    startSizeRef.current = {
      width: window.width,
      height: window.height,
      x: window.x,
      y: window.y
    };

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startPosRef.current.x;
      const deltaY = moveEvent.clientY - startPosRef.current.y;
      
      let newWidth = startSizeRef.current.width;
      let newHeight = startSizeRef.current.height;
      let newX = startSizeRef.current.x;
      let newY = startSizeRef.current.y;

      if (direction.includes('right')) {
        newWidth = Math.max(300, startSizeRef.current.width + deltaX);
      }
      if (direction.includes('left')) {
        const widthChange = -deltaX;
        newWidth = Math.max(300, startSizeRef.current.width + widthChange);
        if (newWidth > 300) {
          newX = startSizeRef.current.x - widthChange;
        }
      }
      if (direction.includes('bottom')) {
        newHeight = Math.max(200, startSizeRef.current.height + deltaY);
      }
      if (direction.includes('top')) {
        const heightChange = -deltaY;
        newHeight = Math.max(200, startSizeRef.current.height + heightChange);
        if (newHeight > 200) {
          newY = startSizeRef.current.y - heightChange;
        }
      }

      onResize(window.id, {
        width: newWidth,
        height: newHeight,
        x: newX,
        y: newY
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeDirection('');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [window, onResize, isMobile]);

  const getResizeCursor = (direction) => {
    const cursors = {
      'top': 'n-resize',
      'bottom': 's-resize',
      'left': 'w-resize',
      'right': 'e-resize',
      'top-left': 'nw-resize',
      'top-right': 'ne-resize',
      'bottom-left': 'sw-resize',
      'bottom-right': 'se-resize'
    };
    return cursors[direction] || 'default';
  };

  return (
    <motion.div
      ref={resizeRef}
      className={`${isMobile ? 'fixed' : 'absolute'} window-container`}
      style={{ 
        left: isMobile ? 0 : `${window.x}px`, 
        top: isMobile ? 0 : `${window.y}px`, 
        width: isMobile ? '100%' : `${window.width}px`, 
        height: isMobile ? '100%' : `${window.height}px`,
        zIndex: window.zIndex 
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ 
        duration: 0.2,
        ease: "easeOut"
      }}
    >
      <div className={`bg-gray-900/95 backdrop-blur-xl ${isMobile ? '' : 'rounded-xl'} shadow-2xl h-full border border-gray-700/50 animate-fadeIn flex flex-col relative`}>
        {!isMobile && (
          <>
            <div
              className="absolute top-0 left-0 w-full h-2 z-10"
              style={{ cursor: getResizeCursor('top') }}
              onMouseDown={(e) => handleResizeStart(e, 'top')}
            />
            <div
              className="absolute bottom-0 left-0 w-full h-2 z-10"
              style={{ cursor: getResizeCursor('bottom') }}
              onMouseDown={(e) => handleResizeStart(e, 'bottom')}
            />
            <div
              className="absolute top-0 left-0 w-2 h-full z-10"
              style={{ cursor: getResizeCursor('left') }}
              onMouseDown={(e) => handleResizeStart(e, 'left')}
            />
            <div
              className="absolute top-0 right-0 w-2 h-full z-10"
              style={{ cursor: getResizeCursor('right') }}
              onMouseDown={(e) => handleResizeStart(e, 'right')}
            />
            <div
              className="absolute top-0 left-0 w-4 h-4 z-20"
              style={{ cursor: getResizeCursor('top-left') }}
              onMouseDown={(e) => handleResizeStart(e, 'top-left')}
            />
            <div
              className="absolute top-0 right-0 w-4 h-4 z-20"
              style={{ cursor: getResizeCursor('top-right') }}
              onMouseDown={(e) => handleResizeStart(e, 'top-right')}
            />
            <div
              className="absolute bottom-0 left-0 w-4 h-4 z-20"
              style={{ cursor: getResizeCursor('bottom-left') }}
              onMouseDown={(e) => handleResizeStart(e, 'bottom-left')}
            />
            <div
              className="absolute bottom-0 right-0 w-4 h-4 z-20"
              style={{ cursor: getResizeCursor('bottom-right') }}
              onMouseDown={(e) => handleResizeStart(e, 'bottom-right')}
            />
          </>
        )}

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
    </motion.div>
  );
};

export default Window;