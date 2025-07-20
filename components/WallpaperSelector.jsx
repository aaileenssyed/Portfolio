import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const WallpaperSelector = ({ onSelectWallpaper, onClose }) => {
  const [selectedWallpaper] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const wallpapers = [
    { id: 1, url: '/images/wallpaper/wallpaper.jpg', name: 'Default Wallpaper' },
    { id: 2, url: '/images/wallpaper/wallpaper-2.jpg', name: 'Default Wallpaper 2' }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onSelectWallpaper(event.target.result);
        onClose();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onSelectWallpaper(event.target.result);
        onClose();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectWallpaper = (url) => {
    onSelectWallpaper(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center animate-fadeIn">
      <div className="bg-black/40 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 p-6 max-w-2xl w-full mx-4">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl pointer-events-none"></div>
        
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Choose Wallpaper</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Icon icon="mdi:close" className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {wallpapers.map((wallpaper) => (
              <button
                key={wallpaper.id}
                onClick={() => handleSelectWallpaper(wallpaper.url)}
                className={`relative group overflow-hidden rounded-xl border-2 transition-all ${
                  selectedWallpaper === wallpaper.id 
                    ? 'border-blue-500' 
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <img 
                  src={wallpaper.url} 
                  alt={wallpaper.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-medium">{wallpaper.name}</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-2 bg-black/50 backdrop-blur-sm rounded-lg">
                    <Icon icon="mdi:check" className="w-5 h-5 text-white" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6">
            <label 
              className="block"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className={`flex items-center justify-center gap-3 p-8 border-2 border-dashed rounded-xl transition-all cursor-pointer ${
                isDragging 
                  ? 'border-blue-400 bg-blue-500/10' 
                  : 'border-white/20 hover:border-white/40 hover:bg-white/5'
              }`}>
                <Icon icon={isDragging ? "mdi:image-plus" : "mdi:upload"} className="w-8 h-8 text-white/60" />
                <div className="text-center">
                  <p className="text-white font-medium">
                    {isDragging ? 'Drop image here' : 'Upload Custom Wallpaper'}
                  </p>
                  <p className="text-white/60 text-sm mt-1">
                    {isDragging ? 'Release to upload' : 'Click to browse or drag and drop'}
                  </p>
                </div>
              </div>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallpaperSelector;