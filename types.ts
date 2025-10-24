export type QuestionStage = 'stage1' | 'stage2' | 'stage3';

export type QuestionType = 'yesno' | 'short_answer';

export interface Question {
  question: string;
  answer: string;
  stage: QuestionStage;
  type: QuestionType;
}

export enum GameState {
  START,
  QUIZ,
  RESULT,
}

export type AnswerStatus = 'idle' | 'correct' | 'incorrect';