import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e1e] z-10">
    <div className="flex flex-col items-center">
      <Icon 
        icon="eos-icons:loading" 
        className="w-12 h-12 text-blue-500 animate-spin" 
      />
      <div className="mt-4 text-gray-400 text-sm animate-pulse">Loading...</div>
    </div>
  </div>
);

export const SpinWheel = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] relative">
      {!isLoaded && <LoadingSpinner />}
      <div className="flex-1 relative">
        <iframe
          src="https://jworse.com/tools/spin-wheel"
          className={`w-full h-full transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          title="Spin Wheel"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </div>
  );
};

export const Paint = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] relative">
      {!isLoaded && <LoadingSpinner />}
      <div className="flex-1 relative">
        <iframe
          src="https://jworse.com/tools/paint"
          className={`w-full h-full transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          title="Paint"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </div>
  );
};

export const VSCode = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] relative">
      {!isLoaded && <LoadingSpinner />}
      <div className="flex-1 relative">
        <iframe
          src="https://github1s.com/jworse/desktop-portfolio"
          className={`w-full h-full transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          title="VS Code"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </div>
  );
};

export const Spotify = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] relative">
      {!isLoaded && <LoadingSpinner />}
      <div className="flex-1 relative">
        <iframe
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M"
          className={`w-full h-full transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          title="Spotify"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </div>
  );
};