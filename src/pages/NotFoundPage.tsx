import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

type ContextType = {
  enterLink: (text?: string) => void;
  leaveLink: () => void;
};

const NotFoundPage: React.FC = () => {
  const { enterLink, leaveLink } = useOutletContext<ContextType>();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/"
          className="inline-flex items-center bg-black text-white px-6 py-3 hover:bg-yellow-400 hover:text-black transition-colors"
          onMouseEnter={() => enterLink('BACK HOME')}
          onMouseLeave={leaveLink}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;