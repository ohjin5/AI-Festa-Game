import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import type { Question, AnswerStatus } from '../types';
import FishingAnimation from './FishingAnimation';
import { getRandomOptions } from '../constants';
import { audioManager } from '../audio';

interface QuizScreenProps {
    question: Question;
    questionNumber: number;
    totalQuestions: number;
    onAnswer: (isCorrect: boolean) => void;
    timeLeft: number;
}

const QuizScreen: React.FC<QuizScreenProps> = ({
    question,
    questionNumber,
    totalQuestions,
    onAnswer,
    timeLeft,
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('idle');
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [targetPosition, setTargetPosition] = useState<{ left: string; top: string } | null>(null);
    const [initialDrop, setInitialDrop] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    const LINE_TRANSITION_DURATION_MS = 1200;

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitialDrop(false);
        }, 100); 

        return () => clearTimeout(timer);
    }, []);
    
    const options = useMemo(() => getRandomOptions(question), [question]);

    const handleOptionClick = useCallback(
        (optionText: string, element: HTMLButtonElement) => {
            if (isSubmitting || !containerRef.current) return;

            const rect = element.getBoundingClientRect();
            const parentRect = containerRef.current.getBoundingClientRect();
            
            setIsSubmitting(true);
            setSelectedAnswer(optionText);

            const left = `${((rect.left - parentRect.left + rect.width / 2) / parentRect.width) * 100}%`;
            const top = `${((rect.top - parentRect.top + rect.height / 2) / parentRect.height) * 100}%`;
            setTargetPosition({ left, top });

            setTimeout(() => {
                const isCorrect =
                    optionText.trim().toLowerCase().replace(/\s/g, '') ===
                    question.answer.toLowerCase().replace(/\s/g, '');
                
                setAnswerStatus(isCorrect ? 'correct' : 'incorrect');

                if (isCorrect) {
                    audioManager.playSuccess();
                } else {
                    audioManager.playWrong();
                }

                const reelDuration = 2500;
                setTimeout(() => {
                    onAnswer(isCorrect);
                }, reelDuration);
            }, LINE_TRANSITION_DURATION_MS + 100); 
        },
        [isSubmitting, onAnswer, question.answer, LINE_TRANSITION_DURATION_MS]
    );

    const quizContainerClass = useMemo(() => {
        let className = "relative w-full h-full bg-gradient-to-b from-sky-600 to-blue-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col"; 
        if (answerStatus === 'incorrect') {
            className += ` animate-shake-strong`;
        }
        return className;
    }, [answerStatus]);

    // 거품을 생성하기 위한 배열 (10개)
    const bubbles = Array.from({ length: 10 }, (_, i) => ({
        key: i,
        size: `${0.2 + Math.random() * 1}rem`, // responsive size
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${5 + Math.random() * 10}s`, // 5s ~ 15s
    }));
    
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const progress = timeLeft / 30;
    const strokeDashoffset = circumference * (1 - progress);
    const isUrgent = timeLeft <= 10;

    return (
        <div ref={containerRef} className={quizContainerClass}> 
            <FishingAnimation
                status={answerStatus}
                isSubmitting={isSubmitting}
                caughtItemText={selectedAnswer}
                targetPosition={targetPosition}
                initialDrop={initialDrop} 
            />

            {(answerStatus === 'correct' || answerStatus === 'incorrect') && (
                <div
                    key={answerStatus}
                    className={`absolute inset-0 z-30 pointer-events-none animate-flash ${
                        answerStatus === 'correct' ? 'bg-green-500/40' : 'bg-red-500/40'
                    }`}
                />
            )}

            {(answerStatus === 'correct' || answerStatus === 'incorrect') && (
                <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                    <div
                        key={answerStatus}
                        className={`text-4xl font-extrabold tracking-wide text-white drop-shadow-2xl animate-feedback ${
                            answerStatus === 'correct' ? 'text-green-300' : 'text-red-300'
                        }`}
                        style={{fontSize: `clamp(2rem, 6vmin, 4rem)`}}
                    >
                        {answerStatus === 'correct' ? '🎯 정답입니다!' : '💥 오답입니다!'}
                    </div>
                </div>
            )}

            <div className='absolute inset-0 z-10 pointer-events-none'>
                <div className='absolute top-[40%] left-0 w-full h-[60%] overflow-hidden'>
                    <div className='absolute inset-0 opacity-20 animate-caustics-effect'>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.2)_0%,_transparent_50%)]" style={{ backgroundSize: '200% 200%' }} />
                    </div>
                </div>
            </div>
            
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
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

            <div className="absolute top-[10%] left-0 right-0 z-50 p-[2vmin]"> 
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-[2vmin] shadow-[0_4px_30px_rgba(0,0,0,0.3)] border border-white/20">
                    <p className="text-right font-semibold text-sky-200 mb-2 drop-shadow-md" style={{fontSize: `clamp(0.75rem, 2vmin, 1rem)`}}>
                        문제 {questionNumber} / {totalQuestions}
                    </p>
                    <h2 className="font-extrabold text-white text-center leading-relaxed drop-shadow-md" style={{fontSize: `clamp(1.2rem, 3.5vmin, 2.25rem)`}}>
                        {question.question}
                    </h2>
                </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 z-40" style={{ paddingBottom: '12vh' }}>
                <div className={`flex justify-center items-center gap-[4vmin] px-[4vmin] ${question.type === 'yesno' ? 'flex-row' : 'flex-row flex-wrap max-w-[90%] mx-auto'}`}>
                    {options.map((optionText) => {
                        const isSelected = selectedAnswer === optionText;
                        let submitEffectClass = '';

                        if (isSubmitting) {
                            if (answerStatus !== 'idle') {
                                submitEffectClass = 'opacity-0 scale-75 pointer-events-none';
                            } else {
                                if (isSelected) {
                                    submitEffectClass = 'scale-[1.05] ring-4 ring-yellow-400/80 shadow-2xl z-50';
                                } else {
                                    submitEffectClass = 'opacity-30 blur-sm pointer-events-none';
                                }
                            }
                        }

                        if (question.type === 'yesno') {
                            const isO = optionText === 'O';
                            return (
                                <button
                                    key={optionText}
                                    onClick={(e) => handleOptionClick(optionText, e.currentTarget)}
                                    disabled={isSubmitting}
                                    className={`font-extrabold rounded-full shadow-lg text-white border-none transition-all duration-500 ease-in-out transform hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.7)] active:scale-95 active:shadow-[inset_0_0_10px_rgba(0,0,0,0.4)] backdrop-blur-[2px] flex items-center justify-center ${isO ? 'bg-gradient-to-br from-green-500 to-green-700' : 'bg-gradient-to-br from-red-500 to-red-700'} ${submitEffectClass}`}
                                    style={{
                                        fontSize: `clamp(3rem, 14vmin, 7.5rem)`,
                                        width: `clamp(120px, 28vmin, 250px)`,
                                        height: `clamp(120px, 28vmin, 250px)`,
                                        boxShadow: '0 0 25px rgba(255,255,255,0.4)',
                                        lineHeight: 1,
                                    }}
                                >
                                    {optionText}
                                </button>
                            );
                        } else {
                            return (
                                <button
                                    key={optionText}
                                    onClick={(e) => handleOptionClick(optionText, e.currentTarget)}
                                    disabled={isSubmitting}
                                    className={`font-extrabold rounded-full shadow-lg border-2 border-white/60 transition-all duration-500 ease-in-out transform hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.7)] active:scale-95 active:shadow-[inset_0_0_10px_rgba(0,0,0,0.4)] backdrop-blur-[2px] bg-gradient-to-br from-yellow-300 via-yellow-200 to-orange-400 text-slate-800 flex items-center justify-center ${submitEffectClass}`}
                                    style={{
                                        fontSize: `clamp(1.1rem, 2.5vmin, 1.5rem)`,
                                        padding: 'clamp(1rem, 2vmin, 1.5rem) clamp(1.5rem, 3.5vmin, 2.5rem)',
                                    }}
                                >
                                    {optionText}
                                </button>
                            );
                        }
                    })}
                </div>
            </div>
            
            <div className="absolute bottom-[2vmin] right-[2vmin] z-50 w-[12vmin] h-[12vmin] max-w-[100px] max-h-[100px] min-w-[70px] min-h-[70px]">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r={radius} strokeWidth="10" fill="transparent" className="stroke-white/20"/>
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        strokeWidth="10"
                        fill="transparent"
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                        className={`transition-all duration-500 ease-linear ${isUrgent ? 'stroke-red-500' : 'stroke-white'}`}
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: strokeDashoffset,
                        }}
                    />
                </svg>
                <div 
                    className={`absolute inset-0 flex items-center justify-center font-extrabold text-white transition-colors duration-500 ${isUrgent ? 'text-red-500 animate-pulse-timer' : ''
                    }`}
                    style={{ fontSize: 'clamp(1.5rem, 4vmin, 2.5rem)' }}
                >
                    {timeLeft}
                </div>
            </div>

            <style>{`
                @keyframes bubble-rise {
                    0% {
                        transform: translateY(0) scale(1);
                        opacity: 0.5;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh) scale(0); 
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

                @keyframes caustics-move {
                    0% { background-position: 0% 0%; }
                    100% { background-position: 100% 100%; } 
                }
                .animate-caustics-effect { 
                    animation: caustics-move 15s linear infinite alternate;
                }
                
                @keyframes pulse-timer {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                .animate-pulse-timer {
                    animation: pulse-timer 1s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default QuizScreen;