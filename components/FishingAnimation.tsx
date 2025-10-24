import React from 'react';
import type { AnswerStatus } from '../types';

interface FishingAnimationProps {
  status: AnswerStatus;
  isSubmitting: boolean;
  caughtItemText: string | null;
  targetPosition: { left: string; top: string } | null;
}

// 물 튀김 (Splash) 컴포넌트
const Splash: React.FC = () => (
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="10" className="fill-white/80 animate-splash-1" />
      <circle cx="50" cy="50" r="15" className="fill-blue-300/60 animate-splash-2" />
      <circle cx="50" cy="50" r="20" className="fill-blue-200/40 animate-splash-3" />
    </svg>
  </div>
);

// 잡힌 아이템 (Catch Item) 컴포넌트 - 애니메이션 적용을 위해 분리
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
    >
      {caughtItemText}
    </div>

    {/* Spark for incorrect (낚싯줄 끊어짐 스파크) */}
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
}) => {
  const isReeling = status === 'correct' || status === 'incorrect';
  const hasBite = isSubmitting && status === 'idle';
  const lineTop = 70; // 낚싯줄 시작 Y 좌표 (px)
  const defaultLineHeight = 530; // 낚싯줄의 기본 길이 (px)

  // 낚싯대 끝의 X 좌표를 CSS 변수로 정의 (Tailwind calc 사용)
  // 낚싯대 위치를 일관되게 관리
  const rodTipLeft = 'calc(58% + 10px + 250px * cos(55deg))'; // 근사치

  // 낚싯줄의 목표 높이 및 위치 계산
  const targetHeight = targetPosition
    ? `${parseFloat(targetPosition.top) - lineTop}px`
    : `${defaultLineHeight}px`;

  const targetLeft = targetPosition ? targetPosition.left : rodTipLeft;

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center pointer-events-none z-10">
        <div className="relative w-full max-w-4xl h-full">
          {/* Pier (부두) */}
          <div className="absolute top-0 left-0 w-full h-12 bg-amber-800 shadow-lg" />
          <div className="absolute top-12 left-0 w-full h-2 bg-amber-900/50" />
          {/* 물 표면 효과 */}
          <div className="absolute top-[56px] left-0 w-full h-0.5 bg-blue-500/80 shadow-ripple" />

          {/* Fisherman Silhouette (어부 실루엣) */}
          <div
            className={`
              absolute top-[10px] left-[58%]
              transition-transform duration-1000 ease-in-out
              ${isReeling ? '-rotate-[8deg]' : hasBite ? 'animate-fisherman-jiggle' : ''}
              shadow-lg shadow-black/50 rounded-full
            `}
          >
            <svg viewBox="0 0 100 100" className="w-16 h-16 fill-slate-900">
              <path d="M20,90 Q25,50 40,20 Q60,0 80,20 Q95,40 80,90 Z" />
            </svg>
            {/* 어부의 그림자 */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-8 h-4 bg-black/30 rounded-full blur-sm" />
          </div>

          {/* Fishing Rod (낚싯대) */}
          <div
            className={`
              absolute top-[48px] left-[calc(58%+10px)] w-[250px] h-1.5 bg-gray-800 origin-top-left rounded-full shadow-2xl shadow-black/50
              transform transition-transform duration-1000 ease-in-out
              ${isReeling ? '-rotate-[75deg]' : hasBite ? 'animate-rod-jiggle' : '-rotate-[55deg]'}
            `}
            style={{
              '--rod-tip-x': rodTipLeft, // CSS 변수 설정 (사용되지는 않지만, 개념을 위해 남김)
            } as React.CSSProperties}
          >
            {/* 낚싯대 끝 부분의 흰색 하이라이트 */}
            <div className="absolute right-0 top-0 w-2 h-full bg-white/20 rounded-r-full" />
          </div>

          {/* Fishing Line (낚싯줄) */}
          <div
            className="absolute w-0.5 bg-gray-400/90 origin-top"
            style={{
              position: 'absolute',
              top: `${lineTop}px`,
              left: targetLeft, // 목표 위치로 이동
              height: targetHeight, // 목표 높이로 조정
              transition:
                'left 1.2s cubic-bezier(0.45, 0, 0.55, 1), height 1.2s cubic-bezier(0.45, 0, 0.55, 1)',
            }}
          >
            {/* Line Body (릴링 애니메이션 적용) */}
            <div
              className={`
                w-full bg-gray-400/90 origin-top
                ${!isReeling ? 'h-full' : 'relative'}
                ${isReeling && status === 'correct' ? 'h-0 transition-all duration-[2000ms] ease-in' : ''}
                ${isReeling && status === 'incorrect' ? 'animate-reel-and-snap-line' : ''}
              `}
            >
              {/* Bobber (찌) */}
              <div
                className={`
                  absolute bottom-0 -left-1.5 w-4 h-4 transition-transform duration-300
                  ${hasBite ? 'animate-bite' : 'animate-float'}
                `}
              >
                <div className="w-full h-1/2 bg-white rounded-t-full shadow-inner"></div>
                <div className="w-full h-1/2 bg-red-600 rounded-b-full shadow-inner"></div>
              </div>

              {/* Catch Animation (물 튀김 및 아이템 표시) */}
              <div
                className={`
                  absolute bottom-0 -left-1/2 transform -translate-x-1/2 transition-opacity duration-300
                  ${isReeling ? 'opacity-100' : 'opacity-0'}
                `}
              >
                <div className="relative w-auto h-24 flex items-center justify-center">
                  {isReeling && <Splash />}

                  {/* 정답일 때 (성공 폭발 효과 고도화) */}
                  {status === 'correct' && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1 animate-burst-up">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full shadow-lg opacity-80`}
                          style={{
                            backgroundColor:
                              i % 2 === 0 ? '#fde047' : '#fb923c',
                            animationDelay: `${i * 0.1}s`,
                          }}
                        ></div>
                      ))}
                    </div>
                  )}

                  {/* 잡힌 보기 텍스트 */}
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

      {/* 🎬 Keyframes */}
      <style>{`
        /* 찌의 미세한 상하 움직임 */
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(2px) rotate(1deg); }
            100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float { animation: float 2s ease-in-out infinite; }

        /* 미끼가 물렸을 때 (Bite) */
        @keyframes bite {
          0% { transform: translateY(0) rotate(0deg); }
          40% { transform: translateY(28px) rotate(15deg); } /* 더 깊게 당겨짐 */
          70% { transform: translateY(20px) rotate(-10deg); }
          100% { transform: translateY(24px) rotate(0deg); }
        }
        .animate-bite { animation: bite 0.5s ease-in-out forwards; }

        /* 낚싯대 긴장감 (Jiggle) */
        @keyframes rod-jiggle {
            0%, 100% { transform: rotate(-45deg); }
            25% { transform: rotate(-48deg); }
            75% { transform: rotate(-43deg); }
        }
        .animate-rod-jiggle { animation: rod-jiggle 0.4s ease-in-out infinite; }

        /* 어부 실루엣 긴장감 */
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

        /* 물결 그림자 */
        .shadow-ripple {
            box-shadow: 0 1px 10px rgba(0, 160, 255, 0.4);
        }

        /* ✅ 성공: 자연스러운 들어올림 & 팝-아웃 효과 */
        @keyframes reel-in-success {
          0% {
            transform: translateY(20px) scale(0.8);
            opacity: 0;
          }
          15% {
             transform: translateY(-40px) scale(1.1) rotate(-5deg); /* 물 밖으로 튀어오름 */
             opacity: 1;
          }
          30% {
             transform: translateY(-30px) scale(1.0) rotate(3deg);
          }
          50% {
            transform: translateY(-35px) scale(1.0) rotate(-2deg);
          }
          100% {
            transform: translateY(-40px) scale(1.0) rotate(0deg); /* 최종 위치 조정 */
          }
        }
        .animate-reel-in-success {
          animation: reel-in-success 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* 성공 시 반짝임 (Burst Up) */
        @keyframes burst-up {
            0% { transform: scale(0.5) translateY(0); opacity: 0.8; }
            100% { transform: scale(1.2) translateY(-60px); opacity: 0; } /* 더 높이 튀어오름 */
        }
        .animate-burst-up { animation: burst-up 1.5s ease-out forwards; animation-delay: 0.1s; }

        /* ❌ 실패: 낚싯줄 끊어짐 */
        @keyframes reel-and-snap-line {
          0% { height: 100%; }
          60% { height: 50%; }
          61% { height: 5%; }
          100% { height: 10%; }
        }
        .animate-reel-and-snap-line {
          animation: reel-and-snap-line 2.3s cubic-bezier(0.55, 0, 0.75, 0.5) forwards;
        }

        /* ❌ 실패: 아이템 역동적으로 물속으로 추락 */
        @keyframes reel-and-fall-item {
          0% { transform: translateY(0) scale(0.8) rotate(-10deg); opacity: 0; }
          10% { transform: translateY(-20px) scale(1) rotate(5deg); opacity: 1; }
          50% { transform: translateY(-20px) scale(1) rotate(-4deg); }
          60% { transform: translateY(-20px) scale(1) rotate(4deg); opacity: 1; }
          62% { transform: translateY(-40px) scale(1.05) rotate(20deg); }
          100% { transform: translateY(1000px) scale(0.3) rotate(720deg); opacity: 0; } /* 더 멀리 회전하며 추락 */
        }
        .animate-reel-and-fall-item {
          animation: reel-and-fall-item 2.3s cubic-bezier(0.45, 0, 0.55, -0.2) forwards;
        }

        /* ❌ 실패: 끊어진 낚싯줄 잔여물 */
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

        /* ❌ 실패: 아이템 색상 변화 */
        @keyframes fail-color-change {
          0%, 59% { background-image: linear-gradient(to bottom right, var(--tw-gradient-stops)); border-color: #f87171; color: #1e293b; }
          60%, 100% { background-color: #dc2626; border-color: #f87171; color: #fff; } /* 빨간색으로 스냅 */
        }
        .animate-fail-color-change { animation: fail-color-change 2.5s ease-out forwards; }

        /* ❌ 실패: 스파크 효과 */
        .shadow-spark {
          box-shadow: 0 0 15px 5px white, 0 0 30px 10px #ef4444, 0 0 40px 15px white; /* 붉은빛으로 변경 */
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