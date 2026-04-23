const ErrorMessage = ({ message, onRetry }) => (
  <div className="flex flex-col items-center py-12">
    <div className="text-red-500 text-xl mb-4">❌ Error</div>
    <p className="text-gray-600 mb-6">{message}</p>
    <button
      onClick={onRetry}
      className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
    >
      Retry
    </button>
  </div>
);

export default ErrorMessage;