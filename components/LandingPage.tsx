import { useState } from 'react';
import { useNavigate } from 'react-router';
import loveImage from 'figma:asset/e1c402279669a63f1b500a6b554fc1ada29e27ae.png';

export function LandingPage() {
  const navigate = useNavigate();
  const [noButtonIndex, setNoButtonIndex] = useState(0);
  
  const noButtonTexts = [
    'SORRY NO',
    'Pleasee',
    'I love youu jaan',
    'YESS BOLO NAA',
    'YOU HATE MEE?!',
    'IK YES BUT',
    'YES BOLO'
  ];

  const handleNoClick = () => {
    setNoButtonIndex((prev) => (prev + 1) % noButtonTexts.length);
  };

  const handleYesClick = () => {
    navigate('/planner');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl">
        {/* Browser Window Mockup */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl overflow-hidden border-2 md:border-4 border-gray-200">
          {/* Browser Header */}
          <div className="bg-gray-100 px-2 md:px-4 py-2 md:py-3 flex items-center gap-1 md:gap-2 border-b border-gray-200">
            <div className="flex gap-1 md:gap-2">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-400"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-400"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 mx-2 md:mx-4">
              <div className="bg-white rounded-full px-2 md:px-4 py-1 md:py-1.5 text-xs md:text-sm text-gray-500 border border-gray-300">
                www.valentinesdayIshaa.com
              </div>
            </div>
            <button className="text-gray-600 hover:text-gray-800 text-lg md:text-xl">×</button>
          </div>
          
          {/* Browser Content */}
          <div className="bg-gradient-to-br from-pink-50 via-white to-pink-50 p-6 md:p-12">
            <div className="text-center space-y-4 md:space-y-6">
              <h1 className="text-3xl md:text-5xl tracking-wide leading-tight" style={{ color: '#E24990' }}>
                WILL YOU BE MY VALENTINE?
              </h1>
              
              <div className="flex justify-center my-6 md:my-8">
                <img 
                  src={loveImage} 
                  alt="Love" 
                  className="w-32 h-32 md:w-64 md:h-64 object-contain animate-bounce"
                  style={{ animationDuration: '2s' }}
                />
              </div>
              
              <div className="flex items-center justify-center gap-3 md:gap-6 mt-6 md:mt-8">
                <button
                  onClick={handleYesClick}
                  className="px-6 md:px-8 py-2 md:py-3 rounded-full text-white text-lg md:text-xl tracking-wide transition-all transform hover:scale-110 hover:shadow-xl"
                  style={{ 
                    backgroundColor: '#E24990',
                    border: '2px md:border-3 solid #E24990'
                  }}
                >
                  YES
                </button>
                
                <button
                  onClick={handleNoClick}
                  className="px-6 md:px-8 py-2 md:py-3 rounded-full text-lg md:text-xl tracking-wide transition-all transform hover:scale-105"
                  style={{ 
                    backgroundColor: 'white',
                    color: '#E24990',
                    border: '2px md:border-3 solid #E24990'
                  }}
                >
                  {noButtonTexts[noButtonIndex]}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}