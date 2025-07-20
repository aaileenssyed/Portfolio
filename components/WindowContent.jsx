import { Icon } from '@iconify/react';
import { useState, useEffect, useRef } from 'react';

const WindowContent = ({ window, deletedItems, setDeletedItems, onOpenWindow }) => {
  if (window.name === 'Trash') {
    return (
      <div className="p-8 text-white">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">
          Trash
        </h2>
        {deletedItems.length === 0 ? (
          <p className="text-gray-400">Trash is empty</p>
        ) : (
          <div className="space-y-2">
            <p className="text-gray-300 mb-4">{deletedItems.length} items deleted</p>
            {deletedItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                <Icon icon={item.icon} className="w-5 h-5 text-gray-400" />
                <span className="flex-1">{item.name}</span>
                <span className="text-xs text-gray-500">
                  {item.deletedAt.toLocaleString('en-US')}
                </span>
              </div>
            ))}
            <button 
              onClick={() => setDeletedItems([])}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Empty Trash
            </button>
          </div>
        )}
      </div>
    );
  }

  if (window.name === 'About Me') {
    return (
    <div className="p-8 text-white">
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Hi, I'm jworse
      </h2>
      <p className="text-gray-300 leading-relaxed">
        I am a self-taught full-stack web developer with a strong command of JavaScript libraries and a passionate technology enthusiast. I have a keen interest in cybersecurity and continuously advance myself in secure software development and system security.
      </p>
    </div>
    );
  }

  if (window.name === 'Contact') {
    return (
    <div className="p-8 text-white">
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        {window.name}
      </h2>
      <p className="text-gray-300 leading-relaxed">
        email: me@jworse.com
      </p>
    </div>
    );
  }

  if (window.name === 'New Folder') {
    return (
     <div className="p-8 text-white">
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        {window.name}
      </h2>
      <p className="text-gray-300 leading-relaxed">
        This folder is empty
      </p>
    </div>
    );
  }

if (window.name === 'Google Chrome') {
  const [history, setHistory] = useState([{ url: 'https://www.google.com/webhp?igu=1', display_url: 'https://www.google.com' }]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputUrl, setInputUrl] = useState(history[currentIndex].display_url);
  const iframeRef = useRef(null);

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < history.length - 1;

  const navigate = (newUrl, displayUrl) => {
    const newEntry = { url: newUrl, display_url: displayUrl || newUrl };
    const newHistory = [...history.slice(0, currentIndex + 1), newEntry];
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
    setInputUrl(displayUrl || newUrl);
  };

  const handleNavigate = (e) => {
    e.preventDefault();
    let newUrl = inputUrl;
    let finalUrl = newUrl;
    
    if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
      newUrl = 'https://' + newUrl;
    }
    
    if (newUrl.includes('google.com') && !newUrl.includes('/webhp?igu=1')) {
      finalUrl = newUrl.replace('google.com', 'google.com/webhp?igu=1');
    }
    
    navigate(finalUrl, newUrl);
  };

  const goBack = () => {
    if (canGoBack) {
      setCurrentIndex(currentIndex - 1);
      setInputUrl(history[currentIndex - 1].display_url);
    }
  };

  const goForward = () => {
    if (canGoForward) {
      setCurrentIndex(currentIndex + 1);
      setInputUrl(history[currentIndex + 1].display_url);
    }
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="bg-gray-800 border-b border-gray-700 p-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <button 
              onClick={goBack}
              className={`p-2 rounded hover:bg-gray-700 transition-colors ${!canGoBack ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!canGoBack}
            >
              <Icon icon="mdi:arrow-left" className="w-5 h-5 text-gray-300" />
            </button>
            <button 
              onClick={goForward}
              className={`p-2 rounded hover:bg-gray-700 transition-colors ${!canGoForward ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!canGoForward}
            >
              <Icon icon="mdi:arrow-right" className="w-5 h-5 text-gray-300" />
            </button>
            <button 
              onClick={handleRefresh}
              className="p-2 rounded hover:bg-gray-700 transition-colors"
            >
              <Icon icon="mdi:refresh" className="w-5 h-5 text-gray-300" />
            </button>
          </div>
          
          <form onSubmit={handleNavigate} className="flex-1 flex items-center">
            <div className="flex-1 relative">
              <Icon icon="mdi:lock" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="w-full bg-gray-900 text-white pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search or enter website"
              />
            </div>
          </form>
          
          <div className="flex items-center gap-1">
            <button className="p-2 rounded hover:bg-gray-700 transition-colors">
              <Icon icon="mdi:star-outline" className="w-5 h-5 text-gray-300" />
            </button>
            <button className="p-2 rounded hover:bg-gray-700 transition-colors">
              <Icon icon="mdi:dots-vertical" className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 bg-white relative">
        <iframe
          ref={iframeRef}
          src={history[currentIndex].url}
          className="w-full h-full"
          title="Chrome Browser"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/5 to-transparent"></div>
      </div>
    </div>
  );
}

  if (window.name === 'VS Code') {
    return (
      <div className="flex flex-col h-full bg-[#1e1e1e]">
        <div className="flex-1 relative">
          <iframe
            src="https://github1s.com/jworse/desktop-portfolio"
            className="w-full h-full"
            title="VS Code"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
      </div>
    );
  }
  if (window.name === 'Gallery') {
    const images = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
       url: `/images/gallery/image-${i + 1}.jpg`,
      title: `Image ${i + 1}`
    }));

    const handleImageClick = (image) => {
      const imageWindow = {
        name: image.title,
        icon: 'mdi:image',
        color: 'from-blue-500 to-blue-600',
        imageUrl: image.url.replace('300/200', '800/600')
      };
      onOpenWindow(imageWindow);
    };

    return (
      <div className="p-8 text-white h-full flex flex-col">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
          Gallery
        </h2>
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-3 gap-4">
            {images.map((image) => (
              <div 
                key={image.id} 
                className="group relative overflow-hidden rounded-lg bg-gray-800/50 cursor-pointer"
                onClick={() => handleImageClick(image)}
              >
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                  <span className="text-sm font-medium">{image.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (window.imageUrl) {
    return (
      <div className="p-4 flex items-center justify-center h-full bg-gray-900">
        <img 
          src={window.imageUrl} 
          alt={window.name}
          className="max-w-full max-h-full object-contain rounded-lg"
        />
      </div>
    );
  }
  
  return (
    <div className="p-8 text-white">
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        {window.name}
      </h2>
      <p className="text-gray-300 leading-relaxed">
         {window.name.toLowerCase()} 
      </p>
    </div>
  );
};

export default WindowContent;
