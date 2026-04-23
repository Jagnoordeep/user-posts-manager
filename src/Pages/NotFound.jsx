import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center py-12 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-slate-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative">
          <Search className="mx-auto h-32 w-32 text-white/20 mb-8" />
          <h1 className="text-8xl font-black text-white/95 mb-6 tracking-tight">
            404
          </h1>
          <h2 className="text-4xl font-bold text-white/90 mb-8">
            Page Not Found
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="group bg-white/20 backdrop-blur-xl text-white px-8 py-4 rounded-3xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:bg-white/30 transition-all border border-white/30 flex items-center gap-3 mx-auto sm:mx-0"
            >
              <ArrowLeft className="group-hover:-translate-x-1 transition-transform h-5 w-5" />
              Go to Dashboard
            </button>
            <button
              onClick={() => navigate(-1)}
              className="group bg-white/10 backdrop-blur-xl text-white px-8 py-4 rounded-3xl font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-white/20 transition-all border border-white/20 flex items-center gap-3 mx-auto sm:mx-0"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default NotFound;