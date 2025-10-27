import React, { useState, useCallback, useEffect } from 'react';
import { GameState, Question, QuestionStage } from './types';
import { QUIZ_QUESTIONS } from './constants';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';

const TOTAL_QUESTIONS = 3;
const GAME_DURATION_SECONDS = 30;

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wonPrize, setWonPrize] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_SECONDS);

  useEffect(() => {
    if (gameState !== GameState.QUIZ) {
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerId);
          setGameState(GameState.RESULT);
          setWonPrize(false); 
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [gameState]);

  // ✅ 게임 시작
  const startGame = useCallback(() => {
    // 1. 스테이지별로 문제 그룹화
    const questionsByStage = QUIZ_QUESTIONS.reduce((acc, q) => {
      if (!acc[q.stage]) {
        acc[q.stage] = [];
      }
      acc[q.stage].push(q);
      return acc;
    }, {} as Record<QuestionStage, Question[]>);

    // 2. 각 스테이지별 무작위 1문제 선택
    const stages: QuestionStage[] = ['stage1', 'stage2', 'stage3'];
    const selectedQuestions = stages
      .map(stage => {
        const questions = questionsByStage[stage];
        if (!questions || questions.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * questions.length);
        return questions[randomIndex];
      })
      .filter((q): q is Question => q !== null);

    // 3. 문제 순서 고정 (스테이지 1, 2, 3 순서)
    setQuizQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setWonPrize(false);
    setGameState(GameState.QUIZ);
    setTimeLeft(GAME_DURATION_SECONDS);
  }, []);

  // ✅ 정답/오답 처리
  const handleAnswer = useCallback(
    (isCorrect: boolean) => {
      // ❌ 오답이면 즉시 종료
      if (!isCorrect) {
        setGameState(GameState.RESULT);
        setWonPrize(false);
        return;
      }

      // ✅ 정답이면 점수 증가
      setScore(prev => prev + 1);

      const isLastQuestion = currentQuestionIndex === TOTAL_QUESTIONS - 1;

      if (isLastQuestion) {
        // 모든 문제 정답 시
        setWonPrize(true);
        setGameState(GameState.RESULT);
      } else {
        // 다음 문제로 이동
        setCurrentQuestionIndex(prev => prev + 1);
      }
    },
    [currentQuestionIndex]
  );

  // ✅ 다시 시작
  const restartGame = useCallback(() => {
    setGameState(GameState.START);
    setScore(0);
    setCurrentQuestionIndex(0);
    setWonPrize(false);
    setTimeLeft(GAME_DURATION_SECONDS);
  }, []);

  // ✅ 화면 렌더링
  const renderContent = () => {
    switch (gameState) {
      case GameState.QUIZ:
        const currentQuestion = quizQuestions[currentQuestionIndex];
        return currentQuestion ? (
          <QuizScreen
            key={currentQuestion.question}
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={TOTAL_QUESTIONS}
            onAnswer={handleAnswer}
            timeLeft={timeLeft}
          />
        ) : null;

      case GameState.RESULT:
        return (
          <ResultScreen
            score={score}
            totalQuestions={TOTAL_QUESTIONS}
            onRestart={restartGame}
            wonPrize={wonPrize}
          />
        );

      case GameState.START:
      default:
        return <StartScreen onStart={startGame} />;
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-sky-600 flex items-center justify-center font-sans">
      <div className="w-full h-full p-[2vmin]">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
