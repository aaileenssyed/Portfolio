export const SpinWheel = () => {
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
  };
  
  export const Paint = () => {
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
  };
  
  export const VSCode = () => {
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
  };
  
  export const Spotify = () => {
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
  };