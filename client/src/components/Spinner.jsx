import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => prevValue - 1);
    }, 1000);

    if (count === 0) {
      navigate(`/${path}`, {
        state: location.pathname,
      });
    }

    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full space-y-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Animated spinner */}
          <div className="relative">
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-semibold text-blue-600">{count}</span>
            </div>
          </div>
          
          {/* Text content */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-800">
              Redirecting you...
            </h1>
            <p className="text-gray-600">
              You'll be taken to the {path} page in {count} second{count !== 1 ? 's' : ''}
            </p>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-blue-500 h-full transition-all duration-1000 ease-linear"
              style={{ width: `${(count / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;