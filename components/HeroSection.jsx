import React, { useState, useEffect, useRef } from 'react';
import TopMenuBar from './TopMenuBar';
import ControlCenter from './ControlCenter';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import ContextMenu from './ContextMenu';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';

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
  const [desktopIcons, setDesktopIcons] = useState([
    { id: 1, name: 'About Me', icon: 'mdi:account', color: 'from-blue-500 to-blue-600', x: 20, y: 60 },
    { id: 2, name: 'Contact', icon: 'mdi:email', color: 'from-purple-500 to-purple-600', x: 20, y: 160 },
    { id: 3, name: 'Gallery', icon: 'mdi:image-multiple', color: 'from-green-500 to-green-600', x: 20, y: 260 },
    { id: 4, name: 'Trash', icon: 'mdi:trash-can', color: 'from-gray-600 to-gray-700', x: 20, y: 360 },
  ]);
  const [draggingIcon, setDraggingIcon] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedIcon, setSelectedIcon] = useState(null);
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
      if (!e.target.closest('.desktop-icon')) {
        setSelectedIcon(null);
      }
      if (controlCenterOpen && !e.target.closest('.control-center') && !e.target.closest('.system-tray-button')) {
        setControlCenterOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [contextMenu, controlCenterOpen]);

  const handleIconDoubleClick = (icon) => {
    const existingWindow = activeWindows.find(w => w.name === icon.name);
    if (existingWindow) {
      bringToFront(existingWindow.id);
      return;
    }

    const newWindow = {
      id: Date.now(),
      ...icon,
      width: 800,
      height: 500,
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
  };

  const handleMouseUp = () => {
    setDraggingIcon(null);
    setDraggingWindow(null);
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
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      type: 'icon',
      icon: icon
    });
  };

  const createNewFolder = () => {
    const newFolder = {
      id: Date.now(),
      name: 'New Folder',
      icon: 'mdi:folder',
      color: 'from-yellow-500 to-yellow-600',
      x: contextMenu.x - 40,
      y: contextMenu.y - 40
    };
    setDesktopIcons([...desktopIcons, newFolder]);
    setContextMenu(null);
  };

  const deleteIcon = (icon) => {
    setDesktopIcons(desktopIcons.filter(i => i.id !== icon.id));
    setDeletedItems([...deletedItems, { ...icon, deletedAt: new Date() }]);
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

  return (
    <div 
      className="h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden"
      style={{ filter: `brightness(${brightness}%)` }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
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
        className="absolute inset-0 pt-8 pb-12"
        onContextMenu={handleContextMenu}
      >
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon}
            isSelected={selectedIcon === icon.id}
            onMouseDown={handleMouseDown}
            onDoubleClick={handleIconDoubleClick}
            onContextMenu={handleIconContextMenu}
          />
        ))}

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