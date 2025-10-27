import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="w-full h-full relative bg-black/20 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 text-center text-white animate-fade-in overflow-hidden flex flex-col items-center justify-center p-[4vmin]">
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="font-extrabold text-white mb-[2vh]" style={{fontSize: 'clamp(2.5rem, 8vmin, 6rem)', textShadow: '0 0 15px rgba(0, 190, 255, 0.7)'}}>
          🎣 정보보호 낚시 퀴즈
        </h1>
        <p className="text-sky-200 mb-[2vh]" style={{fontSize: 'clamp(1rem, 3vmin, 1.5rem)'}}>
          병원 정보보호 지식을 낚아올릴 시간입니다!
        </p>

        <div 
          className="my-[4vh] w-full max-w-[85vmin] md:max-w-[600px] bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-[3vmin] shadow-[0_0_20px_rgba(0,190,255,0.2)]"
        >
          <ul className="text-left space-y-[2vmin] text-sky-100">
            {[
              { icon: '🎯', text: '<strong>총 3문제:</strong> O/X 1문제 + 심화 객관식 2문제' },
              { icon: '📚', text: '모든 문제는 병원 정보보호 리플렛을 기반으로 출제' },
              { icon: '⏱️', text: '<strong>제한 시간은 30초</strong>' },
              { icon: '🏆', text: '3문제를 모두 맞추면 <strong>1등 응모 경품권</strong> 제공' }
            ].map((rule, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-3 text-cyan-300" style={{fontSize: 'clamp(1rem, 3vmin, 1.5rem)'}}>{rule.icon}</span>
                <p 
                  style={{fontSize: 'clamp(0.8rem, 2.2vmin, 1.1rem)'}}
                  dangerouslySetInnerHTML={{ __html: rule.text }}
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={onStart}
          className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-full shadow-lg hover:shadow-cyan-500/50 focus:outline-none focus:ring-4 focus:ring-cyan-300 transform hover:scale-110 transition-all duration-300 ease-in-out"
          style={{
            fontSize: 'clamp(1rem, 4vmin, 1.75rem)',
            padding: 'clamp(1rem, 3vmin, 2rem) clamp(2rem, 6vmin, 3.5rem)',
          }}
        >
          퀴즈 시작
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
        @keyframes wave-slow {
          0% { transform: translateX(0); }
          50% { transform: translateX(-15%); }
          100% { transform: translateX(0); }
        }
        .animate-wave-slow {
          animation: wave-slow linear infinite;
        }
      `}</style>
    </div>
  );
};

export default StartScreen;
