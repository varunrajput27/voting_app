import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  const handleGoToPortal = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate('/Login');
    }, 600);
  };

  return (
    <div
      className={`h-[300px] transition-opacity duration-700 ease-in-out ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="h-full bg-gradient-to-r from-blue-950 to-blue-900 flex items-center justify-center px-4 sm:px-6">
        <div className="text-center max-w-xl space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
            VoteNow
          </h1>
          <p className="text-blue-300 text-base md:text-lg italic leading-relaxed">
            "VoteNow is not just convenience. It’s participation, inclusion, and modernization."
          </p>
          <button
            onClick={handleGoToPortal}
            className="mt-3 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md border border-white shadow-md transition transform hover:scale-105 duration-300 cursor-pointer"
            aria-label="Navigate to vote portal"
          >
            Vote Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
