import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopMenuBar from './TopMenuBar';
import ControlCenter from './ControlCenter';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import ContextMenu from './ContextMenu';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import WallpaperSelector from './WallpaperSelector';

const OSHeroSection = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeWindows, setActiveWindows] = useState([]);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(50);
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [deletedItems, setDeletedItems] = useState([]);
  const [draggingWindow, setDraggingWindow] = useState(null);
  const [windowDragOffset, setWindowDragOffset] = useState({ x: 0, y: 0 });
  const [wallpaperSelectorOpen, setWallpaperSelectorOpen] = useState(false);
  const [wallpaper, setWallpaper] = useState('/images/wallpaper/wallpaper.jpg');
  const [desktopIcons, setDesktopIcons] = useState([
    { id: 1, name: 'About Me', icon: 'hugeicons:user-sharing', x: 15, y: 60, defaultWidth: 900, defaultHeight: 600 },
    { id: 2, name: 'Contact', icon: 'fluent-color:mail-48', x: 110, y: 60, defaultWidth: 700, defaultHeight: 500 },
    { id: 3, name: 'VS Code', icon: 'material-icon-theme:vscode', x: 280, y: 60, defaultWidth: 1200, defaultHeight: 800 },
    { id: 4, name: 'Gallery', icon: 'fluent-color:image-48', x: 20, y: 160, defaultWidth: 1000, defaultHeight: 700 },
    { id: 5, name: 'Trash', icon: 'flat-color-icons:full-trash', x: 20, y: 360, defaultWidth: 600, defaultHeight: 620 },
    { id: 6, name: 'Google Chrome', icon: 'logos:chrome', x: 180, y: 60, defaultWidth: 1100, defaultHeight: 700 },
    { id: 7, name: 'Calculator', icon: 'flat-color-icons:calculator', x: 100, y: 160, defaultWidth: 400, defaultHeight: 500 },
    { id: 8, name: 'Spin Wheel', icon: 'noto:wheel', x: 10, y: 260, defaultWidth: 800, defaultHeight: 800 },
    { id: 9, name: 'Paint', icon: 'fluent-color:paint-brush-16', x: 100, y: 260, defaultWidth: 700, defaultHeight: 680 },
    { id: 10, name: 'Spotify', icon: 'logos:spotify-icon', x: 360, y: 60, defaultWidth: 700, defaultHeight: 680 },
  ]);
  const [draggingIcon, setDraggingIcon] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedIcons, setSelectedIcons] = useState([]);
  const [selectionBox, setSelectionBox] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const desktopRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contextMenu && !e.target.closest('.context-menu')) {
        setContextMenu(null);
      }
      if (!e.target.closest('.desktop-icon') && !isSelecting) {
        setSelectedIcon(null);
        setSelectedIcons([]);
      }
      if (controlCenterOpen && !e.target.closest('.control-center') && !e.target.closest('.system-tray-button')) {
        setControlCenterOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [contextMenu, controlCenterOpen, isSelecting]);

  const handleIconDoubleClick = (icon) => {
    const existingWindow = activeWindows.find(w => w.name === icon.name);
    if (existingWindow) {
      bringToFront(existingWindow.id);
      return;
    }

    const newWindow = {
      id: Date.now(),
      ...icon,
      width: icon.defaultWidth || 800,
      height: icon.defaultHeight || 500,
      x: 100 + (activeWindows.length * 30),
      y: 80 + (activeWindows.length * 30),
      zIndex: activeWindows.length + 1
    };
    setActiveWindows([...activeWindows, newWindow]);
    setStartMenuOpen(false);
  };

  const handleMouseDown = (e, icon) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setDraggingIcon(icon.id);
    setSelectedIcon(icon.id);
    setSelectedIcons([icon.id]);
  };

  const handleDesktopMouseDown = (e) => {
    const isClickOnWindow = e.target.closest('.window-container');
    const isClickOnIcon = e.target.closest('.desktop-icon');
    const isClickOnDesktop = e.target === desktopRef.current || e.target.classList.contains('desktop-area');
    
    if (isClickOnDesktop && !isClickOnWindow && !isClickOnIcon && e.button === 0) {
      const rect = desktopRef.current.getBoundingClientRect();
      const startX = e.clientX - rect.left;
      const startY = e.clientY - rect.top;
      
      setIsSelecting(true);
      setSelectionBox({
        startX,
        startY,
        currentX: startX,
        currentY: startY
      });
      setSelectedIcons([]);
      setSelectedIcon(null);
      e.preventDefault();
    }
  };

  const handleWindowMouseDown = (e, windowId) => {
    const window = activeWindows.find(w => w.id === windowId);
    setWindowDragOffset({
      x: e.clientX - window.x,
      y: e.clientY - window.y
    });
    setDraggingWindow(windowId);
    bringToFront(windowId);
  };

  const handleMouseMove = (e) => {
    if (draggingIcon && desktopRef.current) {
      const desktopRect = desktopRef.current.getBoundingClientRect();
      const newX = e.clientX - desktopRect.left - dragOffset.x;
      const newY = e.clientY - desktopRect.top - dragOffset.y;
      
      setDesktopIcons(icons => 
        icons.map(icon => 
          icon.id === draggingIcon 
            ? { ...icon, x: Math.max(0, newX), y: Math.max(0, newY) }
            : icon
        )
      );
    }

    if (draggingWindow) {
      const newX = e.clientX - windowDragOffset.x;
      const newY = e.clientY - windowDragOffset.y;
      
      setActiveWindows(windows => 
        windows.map(window => 
          window.id === draggingWindow 
            ? { ...window, x: Math.max(0, newX), y: Math.max(30, newY) }
            : window
        )
      );
    }

    if (isSelecting && selectionBox && desktopRef.current) {
      const rect = desktopRef.current.getBoundingClientRect();
      const currentX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const currentY = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
      
      setSelectionBox({
        ...selectionBox,
        currentX,
        currentY
      });

      const minX = Math.min(selectionBox.startX, currentX);
      const minY = Math.min(selectionBox.startY, currentY);
      const maxX = Math.max(selectionBox.startX, currentX);
      const maxY = Math.max(selectionBox.startY, currentY);

      const selectedIds = desktopIcons
        .filter(icon => {
          const iconCenterX = icon.x + 40;
          const iconCenterY = icon.y + 40;
          return iconCenterX >= minX && iconCenterX <= maxX && 
                 iconCenterY >= minY && iconCenterY <= maxY;
        })
        .map(icon => icon.id);

      setSelectedIcons(selectedIds);
    }
  };

  const handleMouseUp = (e) => {
    setDraggingIcon(null);
    setDraggingWindow(null);
    if (isSelecting) {
      setIsSelecting(false);
      setSelectionBox(null);
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      type: 'desktop'
    });
  };

  const handleIconContextMenu = (e, icon) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!selectedIcons.includes(icon.id)) {
      setSelectedIcons([icon.id]);
    }
    
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      type: 'icon',
      icon: icon,
      multipleSelected: selectedIcons.length > 1
    });
  };

  const createNewFolder = () => {
    const newFolder = {
      id: Date.now(),
      name: 'New Folder',
      icon: 'fxemoji:folder',
      x: contextMenu.x - 40,
      y: contextMenu.y - 40,
      defaultWidth: 700,
      defaultHeight: 500
    };
    setDesktopIcons([...desktopIcons, newFolder]);
    setContextMenu(null);
  };

  const deleteIcon = (icon) => {
    if (selectedIcons.length > 1) {
      const itemsToDelete = desktopIcons.filter(i => selectedIcons.includes(i.id));
      setDesktopIcons(desktopIcons.filter(i => !selectedIcons.includes(i.id)));
      setDeletedItems([...deletedItems, ...itemsToDelete.map(item => ({ ...item, deletedAt: new Date() }))]);
      setSelectedIcons([]);
    } else {
      setDesktopIcons(desktopIcons.filter(i => i.id !== icon.id));
      setDeletedItems([...deletedItems, { ...icon, deletedAt: new Date() }]);
    }
    setContextMenu(null);
  };

  const closeWindow = (windowId) => {
    setActiveWindows(activeWindows.filter(w => w.id !== windowId));
  };

  const bringToFront = (windowId) => {
    const maxZ = Math.max(...activeWindows.map(w => w.zIndex));
    setActiveWindows(activeWindows.map(w => 
      w.id === windowId ? { ...w, zIndex: maxZ + 1 } : w
    ));
  };

  const handleChangeWallpaper = () => {
    setWallpaperSelectorOpen(true);
    setContextMenu(null);
  };

  const handleSelectWallpaper = (wallpaperUrl) => {
    setWallpaper(wallpaperUrl);
  };

  return (
    <div 
      className="h-screen relative overflow-hidden bg-black"
      style={{ filter: `brightness(${brightness}%)` }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={wallpaper}
          className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ 
            duration: 0.6,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
          style={{
            backgroundImage: `url(${wallpaper})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </AnimatePresence>

      <TopMenuBar 
        currentTime={currentTime}
        onControlCenterToggle={() => setControlCenterOpen(!controlCenterOpen)}
      />

      {controlCenterOpen && (
        <ControlCenter 
          brightness={brightness}
          setBrightness={setBrightness}
          volume={volume}
          setVolume={setVolume}
        />
      )}

      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div 
        ref={desktopRef}
        className="absolute inset-0 pt-8 pb-12 desktop-area"
        onContextMenu={handleContextMenu}
        onMouseDown={handleDesktopMouseDown}
      >
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon}
            isSelected={selectedIcons.includes(icon.id)}
            onMouseDown={handleMouseDown}
            onDoubleClick={handleIconDoubleClick}
            onContextMenu={handleIconContextMenu}
          />
        ))}

        {selectionBox && isSelecting && (
          <motion.div
            className="absolute border border-blue-400 bg-blue-400/20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            style={{
              left: Math.min(selectionBox.startX, selectionBox.currentX),
              top: Math.min(selectionBox.startY, selectionBox.currentY),
              width: Math.abs(selectionBox.currentX - selectionBox.startX),
              height: Math.abs(selectionBox.currentY - selectionBox.startY),
            }}
          />
        )}

        {activeWindows.map((window) => (
          <Window
            key={window.id}
            window={window}
            onMouseDown={handleWindowMouseDown}
            onClose={closeWindow}
            deletedItems={deletedItems}
            setDeletedItems={setDeletedItems}
            onOpenWindow={handleIconDoubleClick}
          />
        ))}
      </div>

      {contextMenu && (
        <ContextMenu
          contextMenu={contextMenu}
          onCreateFolder={createNewFolder}
          onOpenIcon={(icon) => {
            handleIconDoubleClick(icon);
            setContextMenu(null);
          }}
          onDeleteIcon={deleteIcon}
          onChangeWallpaper={handleChangeWallpaper}
        />
      )}

      {wallpaperSelectorOpen && (
        <WallpaperSelector
          onSelectWallpaper={handleSelectWallpaper}
          onClose={() => setWallpaperSelectorOpen(false)}
        />
      )}

      <Taskbar
        startMenuOpen={startMenuOpen}
        setStartMenuOpen={setStartMenuOpen}
        activeWindows={activeWindows}
        onBringToFront={bringToFront}
      />

      {startMenuOpen && (
        <StartMenu
          desktopIcons={desktopIcons}
          onIconClick={handleIconDoubleClick}
          onClose={() => setStartMenuOpen(false)}
        />
      )}

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.2s ease-out;
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: white;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 0 4px rgba(0,0,0,0.3);
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: white;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 0 4px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
};

export default OSHeroSection;