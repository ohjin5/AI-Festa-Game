import React, { useState, useCallback, useMemo, useEffect } from 'react';
import type { Question, AnswerStatus } from '../types';
import FishingAnimation from './FishingAnimation';
import { QUIZ_QUESTIONS, getRandomOptions } from '../constants';

// Helper to shuffle (사용하지 않으므로 유지 또는 제거 가능)
const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[i], newArray[j]];
    }
    return newArray;
};

interface QuizScreenProps {
    question: Question;
    questionNumber: number;
    totalQuestions: number;
    onAnswer: (isCorrect: boolean) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({
    question,
    questionNumber,
    totalQuestions,
    onAnswer,
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('idle');
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [targetPosition, setTargetPosition] = useState<{ left: string; top: string } | null>(null);
    const [initialDrop, setInitialDrop] = useState(true);

    const LINE_TRANSITION_DURATION_MS = 1200;

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitialDrop(false);
        }, 100); 

        return () => clearTimeout(timer);
    }, []);

    // ✅ 보기 생성 (버튼 크기/간격 유지)
    const options = useMemo(() => {
        const allOptions = getRandomOptions(question);
        return allOptions.map((opt, index) => {
            if (question.type === 'yesno') {
                const isLeft = opt === 'O';
                return {
                    text: opt,
                    style: {
                        left: isLeft ? '35%' : '65%', 
                        top: '75%', // 버튼 위치 유지
                        transform: 'translate(-50%, -50%)',
                        fontSize: '5.5rem', 
                        padding: '2rem 4.5rem', 
                        borderRadius: '9999px',
                        background: isLeft
                            ? 'linear-gradient(to bottom right, #22c55e, #16a34a)' 
                            : 'linear-gradient(to bottom right, #ef4444, #b91c1c)', 
                        color: 'white',
                        boxShadow: '0 0 25px rgba(255,255,255,0.4)',
                    },
                };
            } else {
                const numCols = 4;
                const col = index % numCols;
                const row = Math.floor(index / numCols);
                const x = 12 + col * 22;
                const y = 60 + row * 12;

                return {
                    text: opt,
                    style: {
                        left: `${x + (Math.random() * 1.5 - 0.75)}%`,
                        top: `${y + (Math.random() * 1.5 - 0.75)}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${3 + Math.random() * 2}s`,
                    },
                };
            }
        });
    }, [question]);

    // ✅ 보기 클릭 (변경 없음)
    const handleOptionClick = useCallback(
        (option: typeof options[0], element: HTMLButtonElement) => {
            if (isSubmitting) return;

            const rect = element.getBoundingClientRect();
            const parentRect = element.parentElement?.parentElement?.getBoundingClientRect();
            if (!parentRect) return;

            setIsSubmitting(true);
            setSelectedAnswer(option.text);

            const left = `${((rect.left - parentRect.left + rect.width / 2) / parentRect.width) * 100}%`;
            const top = `${((rect.top - parentRect.top) / parentRect.height) * 100}%`;
            setTargetPosition({ left, top });

            setTimeout(() => {
                const isCorrect =
                    option.text.trim().toLowerCase().replace(/\s/g, '') ===
                    question.answer.toLowerCase().replace(/\s/g, '');
                setAnswerStatus(isCorrect ? 'correct' : 'incorrect');

                const reelDuration = 2500;
                let finalDelay = reelDuration;

                setTimeout(() => {
                    onAnswer(isCorrect);
                }, finalDelay);
            }, LINE_TRANSITION_DURATION_MS + 100); 

        },
        [isSubmitting, onAnswer, question.answer, LINE_TRANSITION_DURATION_MS]
    );

    // ✅ 오답 시 최상위 컨테이너에 흔들림 클래스 추가 (변경 없음)
    const quizContainerClass = useMemo(() => {
        let className = "relative w-full h-[800px] bg-gradient-to-b from-sky-600 to-blue-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col"; 
        if (answerStatus === 'incorrect') {
            className += ` animate-shake-strong`;
        }
        return className;
    }, [answerStatus]);

    // 거품을 생성하기 위한 배열 (10개)
    const bubbles = Array.from({ length: 10 }, (_, i) => ({
        key: i,
        size: `${2 + Math.random() * 8}px`, // 2px ~ 10px
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${5 + Math.random() * 10}s`, // 5s ~ 15s
    }));

    return (
        <div className={quizContainerClass}> 
            <FishingAnimation
                status={answerStatus}
                isSubmitting={isSubmitting}
                caughtItemText={selectedAnswer}
                targetPosition={targetPosition}
                initialDrop={initialDrop} 
            />

            {/* 정답/오답 플래시 (변경 없음) */}
            {(answerStatus === 'correct' || answerStatus === 'incorrect') && (
                <div
                    key={answerStatus}
                    className={`absolute inset-0 z-30 pointer-events-none animate-flash ${
                        answerStatus === 'correct' ? 'bg-green-500/40' : 'bg-red-500/40'
                    }`}
                />
            )}

            {/* 피드백 텍스트 (변경 없음) */}
            {(answerStatus === 'correct' || answerStatus === 'incorrect') && (
                <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                    <div
                        key={answerStatus}
                        className={`text-4xl font-extrabold tracking-wide text-white drop-shadow-2xl animate-feedback ${
                            answerStatus === 'correct' ? 'text-green-300' : 'text-red-300'
                        }`}
                    >
                        {answerStatus === 'correct' ? '🎯 정답입니다!' : '💥 오답입니다!'}
                    </div>
                </div>
            )}

            {/* 물 애니메이션 강화: Caustics 효과 (변경 없음) */}
            <div className='absolute inset-0 z-10 pointer-events-none'>
                <div className='absolute top-[40%] left-0 w-full h-[60%] overflow-hidden'>
                    <div className='absolute inset-0 opacity-20 animate-caustics-effect'>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.2)_0%,_transparent_50%)]" style={{ backgroundSize: '200% 200%' }} />
                    </div>
                </div>
            </div>
            
            {/* 거품(Bubbles) 효과 추가 (변경 없음) */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {bubbles.map((bubble) => (
                    <div
                        key={bubble.key}
                        className="absolute bg-white/50 rounded-full animate-bubble"
                        style={{
                            width: bubble.size,
                            height: bubble.size,
                            left: bubble.left,
                            bottom: 0, 
                            animationDuration: bubble.duration,
                            animationDelay: bubble.delay,
                        }}
                    />
                ))}
            </div>

            {/* ✅ 문제 표시 - 위치 수정 */}
            <div className="absolute top-[10%] left-0 right-0 z-50 p-6"> 
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-[0_4px_30px_rgba(0,0,0,0.3)] border border-white/20">
                    <p className="text-right text-sm font-semibold text-sky-200 mb-2 drop-shadow-md">
                        문제 {questionNumber} / {totalQuestions}
                    </p>
                    <h2 className="text-2xl font-extrabold text-white text-center leading-relaxed drop-shadow-md">
                        {question.question}
                    </h2>
                </div>
            </div>

            {/* 보기 버튼 (위치 고정은 옵션스에서 처리) */}
            <div className="absolute inset-0 z-40">
                {options.map((option) => {
                    const isSelected = selectedAnswer === option.text;
                    let submitEffectClass = '';

                    if (isSubmitting) {
                        if (answerStatus !== 'idle') {
                            submitEffectClass = 'opacity-0 scale-75 pointer-events-none';
                        } else {
                            if (isSelected) {
                                submitEffectClass = 'scale-[1.05] ring-4 ring-yellow-400/80 shadow-2xl z-50';
                            } else {
                                submitEffectClass = 'opacity-10 blur-sm pointer-events-none';
                            }
                        }
                    }

                    return (
                        <button
                            key={option.text}
                            onClick={(e) => handleOptionClick(option, e.currentTarget)}
                            disabled={isSubmitting} 
                            style={option.style}
                            className={`
                                absolute px-4 py-2 sm:px-5 sm:py-2 sm:text-base 
                                text-slate-800 font-extrabold rounded-full shadow-lg border-2 border-white/60
                                transition-all duration-[1200ms] ease-in-out transform blur-none 
                                hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.7)]
                                active:scale-95 active:shadow-[inset_0_0_10px_rgba(0,0,0,0.4)]
                                backdrop-blur-[2px]
                                animate-bobbing
                                ${
                                    question.type === 'yesno'
                                        ? 'text-4xl text-white border-none'
                                        : 'bg-gradient-to-br from-yellow-300 via-yellow-200 to-orange-400'
                                }
                                ${submitEffectClass}
                            `}
                        >
                            {option.text}
                        </button>
                    );
                })}
            </div>
            
            {/* CSS 애니메이션 정의 (변경 없음) */}
            <style>{`
                /* 💡 거품 애니메이션 Keyframes (변경 없음) */
                @keyframes bubble-rise {
                    0% {
                        transform: translateY(0) scale(1);
                        opacity: 0.5;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-800px) scale(0); 
                        opacity: 0;
                    }
                }
                .animate-bubble { 
                    animation-name: bubble-rise;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }

                @keyframes bobbing { 0% { transform: translateY(0px); } 50% { transform: translateY(-8px); } 100% { transform: translateY(0px); } }
                .animate-bobbing { animation: bobbing 3s ease-in-out infinite; }

                @keyframes flash { 0% { opacity: 0; } 50% { opacity: 1; } 100% { opacity: 0; } }
                .animate-flash { animation: flash 1s ease-out forwards; }

                @keyframes feedback {
                    0% { opacity: 0; transform: scale(0.5); }
                    30% { opacity: 1; transform: scale(1.05); }
                    70% { opacity: 1; transform: scale(1); }
                    100% { opacity: 0; transform: scale(0.95); }
                }
                .animate-feedback { animation: feedback 2s ease-in-out forwards; }

                /* 💥 릴링 실패 강화: 강한 흔들림 효과 (변경 없음) */
                @keyframes shake-strong {
                    0% { transform: translate(0, 0); }
                    10% { transform: translate(-10px, -10px); }
                    20% { transform: translate(10px, 10px); }
                    30% { transform: translate(-10px, 10px); }
                    40% { transform: translate(10px, -10px); }
                    50% { transform: translate(-10px, -10px); }
                    60% { transform: translate(10px, 10px); }
                    70% { transform: translate(-10px, 10px); }
                    80% { transform: translate(10px, -10px); }
                    90% { transform: translate(-10px, -10px); }
                    100% { transform: translate(0, 0); }
                }
                .animate-shake-strong { 
                    animation: shake-strong 0.5s cubic-bezier(.36,.07,.19,.97) both;
                    transform: translate3d(0, 0, 0);
                    backface-visibility: hidden;
                    perspective: 1000px;
                }

                /* ✨ 물 애니메이션 강화: Caustics 효과 개선 (변경 없음) */
                @keyframes caustics-move {
                    0% { background-position: 0% 0%; }
                    100% { background-position: 100% 100%; } 
                }
                .animate-caustics-effect { 
                    animation: caustics-move 15s linear infinite alternate;
                }

            `}</style>
        </div>
    );
};

export default QuizScreen;