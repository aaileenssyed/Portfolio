import { Icon } from '@iconify/react';

const WindowContent = ({ window, deletedItems, setDeletedItems }) => {
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