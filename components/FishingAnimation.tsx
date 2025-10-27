import React from 'react';
import type { AnswerStatus } from '../types';

interface FishingAnimationProps {
  status: AnswerStatus;
  isSubmitting: boolean;
  caughtItemText: string | null;
  targetPosition: { left: string; top: string } | null;
  // FIX: Add `initialDrop` to props to fix the TypeScript error. This prop will control the initial animation state.
  initialDrop: boolean;
}

const Splash: React.FC = () => (
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[15vmin] h-[15vmin]">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="10" className="fill-white/80 animate-splash-1" />
      <circle cx="50" cy="50" r="15" className="fill-blue-300/60 animate-splash-2" />
      <circle cx="50" cy="50" r="20" className="fill-blue-200/40 animate-splash-3" />
    </svg>
  </div>
);

const CatchItem: React.FC<{ status: AnswerStatus; caughtItemText: string }> = ({
  status,
  caughtItemText,
}) => (
  <div
    className={`
      absolute whitespace-nowrap
      ${
        status === 'correct'
          ? 'animate-reel-in-success'
          : 'animate-reel-and-fall-item'
      }
    `}
  >
    <div
      className={`
        px-4 py-2 text-lg sm:text-xl text-slate-800 font-extrabold rounded-full shadow-2xl border-2
        ${
          status === 'incorrect'
            ? 'animate-fail-color-change bg-slate-800 border-slate-500 text-white'
            : 'bg-gradient-to-br from-yellow-300 to-orange-400 border-white/50'
        }
      `}
      style={{fontSize: 'clamp(1rem, 3vmin, 1.5rem)'}}
    >
      {caughtItemText}
    </div>

    {status === 'incorrect' && (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 animate-snap-spark">
        <div className="w-full h-full bg-white rounded-full shadow-spark"></div>
      </div>
    )}
  </div>
);

const FishingAnimation: React.FC<FishingAnimationProps> = ({
  status,
  isSubmitting,
  caughtItemText,
  targetPosition,
  initialDrop,
}) => {
  const isReeling = status === 'correct' || status === 'incorrect';
  const hasBite = isSubmitting && status === 'idle';
  const lineTopPercent = 8; // Top position as a percentage of viewport height
  
  // Approximate rod tip position based on responsive values
  // Base position + fisherman offset + projected rod length
  const rodTipLeft = `calc(58% + 1.5vmin + (25vmin * 0.57))`; // cos(55deg) ≈ 0.57

  // Calculate line height based on target position or default drop
  const targetTopPercent = targetPosition ? parseFloat(targetPosition.top) : 45; // Default drop to 45% of height
  const targetHeight = `${targetTopPercent - lineTopPercent}%`;
  const targetLeft = targetPosition ? targetPosition.left : rodTipLeft;

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center pointer-events-none z-10">
        <div className="relative w-full max-w-4xl h-full">
          {/* Pier (using vh for height) */}
          <div className="absolute top-0 left-0 w-full h-[6vh] bg-amber-800 shadow-lg" />
          <div className="absolute top-[6vh] left-0 w-full h-[0.5vh] bg-amber-900/50" />
          {/* Water surface (using vh for position) */}
          <div className="absolute left-0 w-full h-0.5 bg-blue-500/80 shadow-ripple" style={{ top: '7vh' }} />

          {/* Fisherman Silhouette (using vmin for size) */}
          <div
            className={`
              absolute left-[58%]
              transition-transform duration-1000 ease-in-out
              ${isReeling ? '-rotate-[8deg]' : hasBite ? 'animate-fisherman-jiggle' : ''}
              shadow-lg shadow-black/50 rounded-full
            `}
            style={{ top: '1.5vh' }}
          >
            <svg viewBox="0 0 100 100" className="fill-slate-900" style={{ width: '8vmin', height: '8vmin' }}>
              <path d="M20,90 Q25,50 40,20 Q60,0 80,20 Q95,40 80,90 Z" />
            </svg>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-3/4 h-1/4 bg-black/30 rounded-full blur-sm" />
          </div>

          {/* Fishing Rod (using vmin for size, vh for position) */}
          <div
            className={`
              absolute h-[0.75vmin] bg-gray-800 origin-top-left rounded-full shadow-2xl shadow-black/50
              transform transition-transform duration-1000 ease-in-out
              ${isReeling ? '-rotate-[75deg]' : hasBite ? 'animate-rod-jiggle' : '-rotate-[55deg]'}
            `}
            style={{
              top: '5.5vh',
              left: 'calc(58% + 1.5vmin)',
              width: '25vmin',
            }}
          >
            <div className="absolute right-0 top-0 w-2 h-full bg-white/20 rounded-r-full" />
          </div>

          {/* Fishing Line */}
          <div
            className="absolute w-0.5 bg-gray-400/90 origin-top"
            style={{
              top: `${lineTopPercent}%`,
              left: targetLeft,
              height: targetHeight,
              transition:
                initialDrop ? 'none' : 'left 1.2s cubic-bezier(0.45, 0, 0.55, 1), height 1.2s cubic-bezier(0.45, 0, 0.55, 1)',
            }}
          >
            <div
              className={`
                w-full bg-gray-400/90 origin-top
                ${!isReeling ? 'h-full' : 'relative'}
                ${isReeling && status === 'correct' ? 'h-0 transition-all duration-[2000ms] ease-in' : ''}
                ${isReeling && status === 'incorrect' ? 'animate-reel-and-snap-line' : ''}
              `}
            >
              <div
                className={`
                  absolute bottom-0 -left-1.5 w-[2vmin] h-[2vmin] transition-transform duration-300
                  ${hasBite ? 'animate-bite' : 'animate-float'}
                `}
              >
                <div className="w-full h-1/2 bg-white rounded-t-full shadow-inner"></div>
                <div className="w-full h-1/2 bg-red-600 rounded-b-full shadow-inner"></div>
              </div>

              <div
                className={`
                  absolute bottom-0 -left-1/2 transform -translate-x-1/2 transition-opacity duration-300
                  ${isReeling ? 'opacity-100' : 'opacity-0'}
                `}
              >
                <div className="relative w-auto h-24 flex items-center justify-center">
                  {isReeling && <Splash />}

                  {status === 'correct' && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1 animate-burst-up">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-[1.5vmin] h-[1.5vmin] rounded-full shadow-lg opacity-80`}
                          style={{
                            backgroundColor:
                              i % 2 === 0 ? '#fde047' : '#fb923c',
                            animationDelay: `${i * 0.1}s`,
                          }}
                        ></div>
                      ))}
                    </div>
                  )}

                  {caughtItemText && isReeling && (
                    <CatchItem
                      status={status}
                      caughtItemText={caughtItemText}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(2px) rotate(1deg); }
            100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float { animation: float 2s ease-in-out infinite; }

        @keyframes bite {
          0% { transform: translateY(0) rotate(0deg); }
          40% { transform: translateY(28px) rotate(15deg); }
          70% { transform: translateY(20px) rotate(-10deg); }
          100% { transform: translateY(24px) rotate(0deg); }
        }
        .animate-bite { animation: bite 0.5s ease-in-out forwards; }

        @keyframes rod-jiggle {
            0%, 100% { transform: rotate(-55deg); }
            25% { transform: rotate(-58deg); }
            75% { transform: rotate(-53deg); }
        }
        .animate-rod-jiggle { animation: rod-jiggle 0.4s ease-in-out infinite; }

        @keyframes fisherman-jiggle {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-1deg); }
        }
        .animate-fisherman-jiggle { animation: fisherman-jiggle 0.4s ease-in-out infinite; }


        @keyframes splash-1 { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }
        .animate-splash-1 { animation: splash-1 0.6s ease-out forwards; }

        @keyframes splash-2 { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }
        .animate-splash-2 { animation: splash-2 0.7s ease-out forwards; animation-delay: 0.1s; }

        @keyframes splash-3 { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(2.5); opacity: 0; } }
        .animate-splash-3 { animation: splash-3 0.8s ease-out forwards; animation-delay: 0.2s; }

        .shadow-ripple {
            box-shadow: 0 1px 10px rgba(0, 160, 255, 0.4);
        }

        @keyframes reel-in-success {
          0% {
            transform: translateY(20px) scale(0.8);
            opacity: 0;
          }
          15% {
             transform: translateY(-5vh) scale(1.1) rotate(-5deg);
             opacity: 1;
          }
          30% {
             transform: translateY(-4vh) scale(1.0) rotate(3deg);
          }
          50% {
            transform: translateY(-4.5vh) scale(1.0) rotate(-2deg);
          }
          100% {
            transform: translateY(-5vh) scale(1.0) rotate(0deg);
          }
        }
        .animate-reel-in-success {
          animation: reel-in-success 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes burst-up {
            0% { transform: scale(0.5) translateY(0); opacity: 0.8; }
            100% { transform: scale(1.2) translateY(-8vh); opacity: 0; }
        }
        .animate-burst-up { animation: burst-up 1.5s ease-out forwards; animation-delay: 0.1s; }

        @keyframes reel-and-snap-line {
          0% { height: 100%; }
          60% { height: 50%; }
          61% { height: 5%; }
          100% { height: 10%; }
        }
        .animate-reel-and-snap-line {
          animation: reel-and-snap-line 2.3s cubic-bezier(0.55, 0, 0.75, 0.5) forwards;
        }

        @keyframes reel-and-fall-item {
          0% { transform: translateY(0) scale(0.8) rotate(-10deg); opacity: 0; }
          10% { transform: translateY(-3vh) scale(1) rotate(5deg); opacity: 1; }
          50% { transform: translateY(-3vh) scale(1) rotate(-4deg); }
          60% { transform: translateY(-3vh) scale(1) rotate(4deg); opacity: 1; }
          62% { transform: translateY(-6vh) scale(1.05) rotate(20deg); }
          100% { transform: translateY(110vh) scale(0.3) rotate(720deg); opacity: 0; }
        }
        .animate-reel-and-fall-item {
          animation: reel-and-fall-item 2.3s cubic-bezier(0.45, 0, 0.55, -0.2) forwards;
        }

        .animate-reel-and-fall-item::before {
          content: '';
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 40px; 
          background: linear-gradient(to top, rgba(156, 163, 175, 0.9), transparent);
          opacity: 0;
          animation: show-broken-line 2.5s ease-out forwards;
        }

        @keyframes show-broken-line {
          0%, 60% { opacity: 0; }
          61%, 100% { opacity: 1; }
        }

        @keyframes fail-color-change {
          0%, 59% { background-image: linear-gradient(to bottom right, var(--tw-gradient-stops)); border-color: #f87171; color: #1e293b; }
          60%, 100% { background-color: #dc2626; border-color: #f87171; color: #fff; }
        }
        .animate-fail-color-change { animation: fail-color-change 2.5s ease-out forwards; }

        .shadow-spark {
          box-shadow: 0 0 15px 5px white, 0 0 30px 10px #ef4444, 0 0 40px 15px white;
        }

        @keyframes snap-spark {
          0%, 60% { opacity: 0; transform: scale(0); }
          61% { opacity: 1; transform: scale(30); }
          75% { opacity: 0; transform: scale(0); }
          100% { opacity: 0; }
        }
        .animate-snap-spark { animation: snap-spark 2.5s ease-in-out forwards; }
      `}</style>
    </>
  );
};

export default FishingAnimation;