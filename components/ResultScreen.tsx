import React from 'react';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  wonPrize: boolean;
}

const TicketIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 12.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 12.5v-1a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 20 11.5v1ZM21.5 7h-19A1.5 1.5 0 0 0 1 8.5v10A1.5 1.5 0 0 0 2.5 20h19a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 21.5 7ZM2.5 4A1.5 1.5 0 0 1 4 2.5h16A1.5 1.5 0 0 1 21.5 4H20a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2H2.5Z"/>
    </svg>
);


const ResultScreen: React.FC<ResultScreenProps> = ({ score, totalQuestions, onRestart, wonPrize }) => {
  const isPerfect = score === totalQuestions;

  return (
    <div className="w-full h-full relative bg-black/20 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 text-center text-white animate-fade-in overflow-hidden flex flex-col items-center justify-center p-[4vmin]">
      <div className="relative z-10">
        <h1 className="font-extrabold mb-[2vh]" style={{fontSize: 'clamp(2.5rem, 7vmin, 5rem)', textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'}}>
          퀴즈 결과
        </h1>
        {isPerfect && <p className="text-2xl font-bold text-yellow-300 animate-pulse mb-[1vh]" style={{fontSize: 'clamp(1.2rem, 4vmin, 2rem)'}}>PERFECT!</p>}
        <p className="text-sky-200 mb-[3vh]" style={{fontSize: 'clamp(1rem, 3.5vmin, 1.75rem)'}}>
          총 {totalQuestions}문제 중 <span className="font-bold text-cyan-300 animate-pop-in" style={{fontSize: 'clamp(2rem, 6vmin, 4rem)'}}>{score}</span>문제를 맞혔습니다!
        </p>
        
        <div className="my-[4vh] h-[25vh] flex flex-col justify-center items-center">
          <h3 className="font-semibold text-sky-100 mb-[2vh]" style={{fontSize: 'clamp(1rem, 3vmin, 1.5rem)'}}>획득한 상품 🎁</h3>
          {wonPrize ? (
            <div className="relative bg-yellow-500/10 border-2 border-yellow-400 rounded-lg p-4 animate-pop-in flex flex-col items-center justify-center gap-2 shadow-lg" style={{width: 'clamp(150px, 25vmin, 200px)', height: 'clamp(120px, 20vmin, 160px)'}}>
               <div className="absolute inset-0 bg-yellow-400/50 rounded-lg animate-glow-slow blur-2xl"></div>
               <div className="relative z-10 flex flex-col items-center gap-2">
                <TicketIcon className="text-yellow-300" style={{width: 'clamp(40px, 8vmin, 64px)', height: 'clamp(40px, 8vmin, 64px)', filter: 'drop-shadow(0 0 10px #facc15)'}} />
                <span className="font-bold text-white" style={{fontSize: 'clamp(1.2rem, 4vmin, 2rem)'}}>응모권</span>
               </div>
            </div>
          ) : (
            <p className="text-gray-400" style={{fontSize: 'clamp(1rem, 3vmin, 1.5rem)'}}>아쉽지만 다음 기회에!</p>
          )}
        </div>

        <button
          onClick={onRestart}
          className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-full shadow-lg hover:shadow-cyan-500/50 focus:outline-none focus:ring-4 focus:ring-cyan-300 transform hover:scale-110 transition-all duration-300 ease-in-out"
          style={{
            fontSize: 'clamp(1rem, 4vmin, 1.75rem)',
            padding: 'clamp(0.75rem, 2.5vmin, 1.5rem) clamp(1.5rem, 5vmin, 3rem)',
          }}
        >
          다시하기
        </button>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-1/4 opacity-40 pointer-events-none">
         <svg className="absolute bottom-0 animate-wave-slow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ animationDuration: '25s' }}>
            <path fill="#3b82f6" fillOpacity="0.5" d="M0,256L48,250.7C96,245,192,235,288,202.7C384,171,480,117,576,117.3C672,117,768,171,864,197.3C960,224,1056,224,1152,208C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
         <svg className="absolute bottom-0 animate-wave-slow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ animationDuration: '20s' }}>
            <path fill="#3b82f6" fillOpacity="1" d="M0,224L40,234.7C80,245,160,267,240,250.7C320,235,400,181,480,176C560,171,640,213,720,224C800,235,880,213,960,186.7C1040,160,1120,128,1200,133.3C1280,139,1360,181,1400,202.7L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
        </svg>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        
        @keyframes pop-in {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in { 
          display: inline-block;
          animation: pop-in 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
        }

        @keyframes wave-slow {
          0% { transform: translateX(0); }
          50% { transform: translateX(-15%); }
          100% { transform: translateX(0); }
        }
        .animate-wave-slow {
          animation: wave-slow linear infinite;
        }

        @keyframes glow-slow {
          0% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 0.5; transform: scale(1); }
        }
        .animate-glow-slow {
          animation: glow-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ResultScreen;