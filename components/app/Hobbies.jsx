import { Icon } from '@iconify/react';

const Hobbies = () => {
  return (
    <div className="p-8 text-white h-full">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Hobbies
          </h2>
          <p className="text-gray-400">Things I love to do in my free time.</p>
        </div>

        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-green-500/50 transition-all group">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                <Icon icon="mdi:tent" className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Camping</h3>
                <p className="text-green-400 text-sm">Nature Explorer</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              I love spending time in nature, setting up camp under the stars, and disconnecting from the digital world. 
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-amber-500/50 transition-all group">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-amber-500/20 rounded-lg group-hover:bg-amber-500/30 transition-colors">
                <Icon icon="mdi:chess-king" className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Chess</h3>
                <p className="text-amber-400 text-sm">Strategic Thinking</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              I enjoy analyzing positions, studying famous games, and the mental challenge each match brings.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-cyan-500/50 transition-all group">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
                <Icon icon="mdi:desktop-tower" className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Hardware Customization</h3>
                <p className="text-cyan-400 text-sm">Tech Enthusiast</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Building and customizing PC setups is my passion. I love everything from selecting the perfect components to perfecting cable management, ensuring both performance and aesthetics are on point.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hobbies;