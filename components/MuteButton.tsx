import React from 'react';

interface MuteButtonProps {
  isMuted: boolean;
  onToggle: () => void;
}

const MuteIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
    </svg>
);

const MutedIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
    </svg>
);

const MuteButton: React.FC<MuteButtonProps> = ({ isMuted, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      aria-label={isMuted ? 'Unmute' : 'Mute'}
      className="absolute top-[2vmin] right-[2vmin] z-[100] w-[8vmin] h-[8vmin] max-w-[60px] max-h-[60px] min-w-[40px] min-h-[40px] bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
    >
      {isMuted ? <MutedIcon className="w-3/5 h-3/5" /> : <MuteIcon className="w-3/5 h-3/5" />}
    </button>
  );
};

export default MuteButton;