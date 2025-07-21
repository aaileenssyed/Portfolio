import { Icon } from '@iconify/react';
import { useState, useEffect, useRef } from 'react';

const WindowContent = ({ window, deletedItems, setDeletedItems, onOpenWindow }) => {
  if (window.name === 'Trash') {
    return (
      <div className="relative p-8 text-white min-h-[400px] flex flex-col">
        {deletedItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center mt-32">
            <Icon icon="mdi:trash-can-outline" className="w-20 h-20 text-gray-600 mb-4 animate-fade-in" />
            <p className="text-gray-400 text-lg font-medium">Trash is empty</p>
            <p className="text-gray-500 text-sm mt-2">Deleted files will appear here</p>
          </div>
        ) : (
          <div className="w-full max-w-xl flex flex-col gap-4 mt-2 animate-fade-in">
            <p className="text-gray-300 mb-2 text-center">{deletedItems.length} item{deletedItems.length > 1 ? 's' : ''} deleted</p>
            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 pb-24">
              {deletedItems.slice().reverse().map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-800/70 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-700/40">
                  <div className="bg-gray-700/60 rounded-lg p-2 flex items-center justify-center">
                    <Icon icon={item.icon} className="w-6 h-6 text-gray-300" />
                  </div>
                  <div className="flex-1">
                    <span className="block text-white font-medium text-base">{item.name}</span>
                    <span className="block text-xs text-gray-500 mt-1">Deleted: {item.deletedAt.toLocaleString('en-US')}</span>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setDeletedItems([])}
              className="fixed bottom-8 right-8 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg transition-all text-base z-10"
            >
              <Icon icon="mdi:trash-can-empty" className="inline w-5 h-5 mr-2 align-middle" />
              Empty Trash
            </button>
          </div>
        )}
      </div>
    );
  }

  if (window.name === 'About Me') {
    return (
      <div className="p-8 text-white h-full">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full p-1">
                <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center">
                  <Icon icon="mdi:account" className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent p-1">
                jworse
              </h2>
              <p className="text-gray-400 text-sm mt-1">Full-Stack Developer</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <Icon icon="mdi:account-details" className="text-blue-400" />
                About
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                I am a self-taught full-stack web developer with a strong command of JavaScript libraries and a passionate technology enthusiast. I have a keen interest in cybersecurity and continuously advance myself in secure software development and system security.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50 hover:border-blue-500/50 transition-all">
                <Icon icon="mdi:code-tags" className="text-blue-400 w-6 h-6 mb-1" />
                <h4 className="text-white font-medium text-sm">Technologies</h4>
                <p className="text-gray-400 text-xs">React.js, Next.js, Tailwind.css, ...</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50 hover:border-purple-500/50 transition-all">
                <Icon icon="mdi:shield-check" className="text-purple-400 w-6 h-6 mb-1" />
                <h4 className="text-white font-medium text-sm">Security Focus</h4>
                <p className="text-gray-400 text-xs">Secure Development</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (window.name === 'Contact') {
    return (
      <div className="p-8 text-white h-full">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Get in Touch
            </h2>
            <p className="text-gray-400">Feel free to contact me.</p>
          </div>

          <div className="space-y-4">
            <a href="mailto:me@jworse.com" className="group block bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-purple-500/50 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                  <Icon icon="mdi:email" className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-1">Email</h3>
                  <p className="text-gray-400 text-sm">me@jworse.com</p>
                </div>
                <Icon icon="mdi:arrow-right" className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
              </div>
            </a>

            <a href="https://jworse.com" target="_blank" rel="noopener noreferrer" className="group block bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-blue-500/50 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                  <Icon icon="mdi:web" className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-1">Website</h3>
                  <p className="text-gray-400 text-sm">jworse.com</p>
                </div>
                <Icon icon="mdi:arrow-right" className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
              </div>
            </a>

            <a href="https://github.com/jworse" target="_blank" rel="noopener noreferrer" className="group block bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-gray-400/50 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-600/20 rounded-lg group-hover:bg-gray-600/30 transition-colors">
                  <Icon icon="mdi:github" className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-1">GitHub</h3>
                  <p className="text-gray-400 text-sm">@jworse</p>
                </div>
                <Icon icon="mdi:arrow-right" className="w-5 h-5 text-gray-500 group-hover:text-gray-300 transition-colors" />
              </div>
            </a>
          </div>
        </div>
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

  if (window.name === 'Spin Wheel') {
    return (
      <div className="flex flex-col h-full bg-[#1e1e1e]">
        <div className="flex-1 relative">
          <iframe
            src="https://jworse.com/tools/spin-wheel"
            className="w-full h-full"
            title="Spin Wheel"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
      </div>
    );
  }
    if (window.name === 'Paint') {
    return (
      <div className="flex flex-col h-full bg-[#1e1e1e]">
        <div className="flex-1 relative">
          <iframe
            src="https://jworse.com/tools/paint"
            className="w-full h-full"
            title="Paint"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
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

if (window.name === 'Calculator') {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const percentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const toggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  return (
    <div className="h-full bg-black flex flex-col">
      <div className="flex-1 p-4 flex flex-col">
        <div className="bg-gray-900 rounded-lg p-4 mb-4 text-right">
          <div className="text-3xl text-white font-light tracking-wider overflow-hidden">
            {display}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2 flex-1">
          <button onClick={clear} className="col-span-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 active:scale-95">
            AC
          </button>
          <button onClick={toggleSign} className="bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 active:scale-95">
            +/-
          </button>
          <button onClick={percentage} className="bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 active:scale-95">
            %
          </button>
          
          <button onClick={() => inputNumber(7)} className="bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-200 active:scale-95">
            7
          </button>
          <button onClick={() => inputNumber(8)} className="bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-200 active:scale-95">
            8
          </button>
          <button onClick={() => inputNumber(9)} className="bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-200 active:scale-95">
            9
          </button>
          <button onClick={() => performOperation('/')} className="bg-orange-600 hover:bg-orange-500 text-white font-medium rounded-lg transition-all duration-200 active:scale-95">
            ÷
          </button>
          
          <button onClick={() => inputNumber(4)} className="bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-200 active:scale-95">
            4
          </button>
          <button onClick={() => inputNumber(5)} className="bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-200 active:scale-95">
            5
          </button>
          <button onClick={() => inputNumber(6)} className="bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-200 active:scale-95">
            6
          </button>
          <button onClick={() => performOperation('*')} className="bg-orange-600 hover:bg-orange-500 text-white font-medium rounded-lg transition-all duration-200 active:scale-95">
            ×
          </button>
          
          <button onClick={() => inputNumber(1)} className="bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-200 active:scale-95">
            1
          </button>
          <button onClick={() => inputNumber(2)} className="bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-200 active:scale-95">
            2
          </button>
          <button onClick={() => inputNumber(3)} className="bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-200 active:scale-95">
            3
          </button>
          <button onClick={() => performOperation('-')} className="bg-orange-600 hover:bg-orange-500 text-white font-medium rounded-lg transition-all duration-200 active:scale-95">
            −
          </button>
          
          <button onClick={() => inputNumber(0)} className="col-span-2 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-200 active:scale-95">
            0
          </button>
          <button onClick={inputDecimal} className="bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-200 active:scale-95">
            .
          </button>
          <button onClick={() => performOperation('+')} className="bg-orange-600 hover:bg-orange-500 text-white font-medium rounded-lg transition-all duration-200 active:scale-95">
            +
          </button>
          
          <button onClick={() => performOperation('=')} className="col-span-4 bg-orange-600 hover:bg-orange-500 text-white font-medium rounded-lg transition-all duration-200 active:scale-95">
            =
          </button>
        </div>
      </div>
    </div>
  );
}
  
if (window.name === 'Spotify') {
  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      <div className="flex-1 relative">
        <iframe
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M"
          className="w-full h-full"
          title="Spotify"
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
