
export const Loader = () => (
  <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
    <div className="flex items-center space-x-2">
      <div className="flex space-x-1">
        <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
      </div>
      <span className="text-gray-300 font-medium ml-4">Loading...</span>
    </div>
  </div>
)