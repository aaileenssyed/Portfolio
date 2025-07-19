import { Icon } from '@iconify/react';

const ControlCenter = ({ brightness, setBrightness, volume, setVolume }) => {
  return (
    <div className="control-center absolute top-10 right-4 w-80 bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4 z-50">
      <div className="space-y-4">
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:wifi" className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">Wi-Fi</span>
            </div>
            <span className="text-gray-400 text-sm">jworse_5G</span>
          </div>
          <div className="text-xs text-gray-500">Connected</div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:battery" className="w-5 h-5 text-green-400" />
              <span className="text-white font-medium">Battery</span>
            </div>
            <span className="text-gray-400 text-sm">69%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-green-400 h-2 rounded-full" style={{ width: '69%' }}></div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:volume-high" className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">Volume</span>
            </div>
            <span className="text-gray-400 text-sm">{volume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:brightness-6" className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">Brightness</span>
            </div>
            <span className="text-gray-400 text-sm">{brightness}%</span>
          </div>
          <input
            type="range"
            min="20"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button className="bg-gray-800/50 p-3 rounded-lg hover:bg-gray-700/50 transition-all">
            <Icon icon="mdi:bluetooth" className="w-5 h-5 text-gray-400 mx-auto" />
          </button>
          <button className="bg-gray-800/50 p-3 rounded-lg hover:bg-gray-700/50 transition-all">
            <Icon icon="mdi:airplane" className="w-5 h-5 text-gray-400 mx-auto" />
          </button>
          <button className="bg-gray-800/50 p-3 rounded-lg hover:bg-gray-700/50 transition-all">
            <Icon icon="mdi:moon-waning-crescent" className="w-5 h-5 text-gray-400 mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlCenter;