import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-linear-to-br from-red-50 to-rose-100 flex items-center justify-center py-12 px-4">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-red-200 p-12 text-center">
            <AlertCircle className="mx-auto h-24 w-24 text-red-500 mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-8 max-w-sm mx-auto">
              We're sorry, but something unexpected happened. Please try again.
            </p>
            <div className="space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl"
              >
                <RefreshCw className="animate-spin h-5 w-5" />
                Reload Page
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="inline-flex items-center gap-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-300 transition-all"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;