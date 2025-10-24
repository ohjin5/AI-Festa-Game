import type { Question } from './types';

// ✅ 단계별 문제 리스트
export const QUIZ_QUESTIONS: Question[] = [
  // -------------------
  // 🥇 1단계 (O / X 문제)
  // -------------------
  { question: "직원이면 환자 기록 아무나 열람해도 된다.", answer: "X", stage: "stage1", type: "yesno" },
  { question: "가족이 환자여도 진료 안 받았으면 기록 보면 안 된다.", answer: "X", stage: "stage1", type: "yesno" },
  { question: "SNS에 사무실 책상이나 모니터가 찍힌 사진을 올려도 된다.", answer: "O", stage: "stage1", type: "yesno" },
  { question: "환자 이름은 전부 다 써도 괜찮다.", answer: "X", stage: "stage1", type: "yesno" },
  { question: "입원 여부도 환자 정보에 해당한다.", answer: "O", stage: "stage1", type: "yesno" },
  { question: "출력물에 사번이 적히는 건 출력기 추적용이다.", answer: "O", stage: "stage1", type: "yesno" },
  { question: "환자정보가 있는 문서를 이면지로 써도 된다.", answer: "X", stage: "stage1", type: "yesno" },
  { question: "잠깐 자리를 비울 땐 PC 화면 잠금 안 해도 된다.", answer: "X", stage: "stage1", type: "yesno" },
  { question: "ChatGPT에 환자정보를 입력해도 괜찮다.", answer: "X", stage: "stage1", type: "yesno" },
  { question: "USB나 외장하드는 아무거나 병원 PC에 꽂아도 된다.", answer: "X", stage: "stage1", type: "yesno" },

  // -------------------
  // 🥈 2단계 (단답형)
  // -------------------
  { question: "병원에서 환자 이름, 주민번호, 연락처는 모두 어디에 해당하나요?", answer: "개인정보", stage: "stage2", type: "short_answer" },
  { question: "업무 목적이 없는 EMR 열람은 어떤 행위로 간주되나요?", answer: "위반", stage: "stage2", type: "short_answer" },
  { question: "병원 내부에서 환자정보를 보호하기 위한 가장 기본적인 원칙은 무엇인가요?", answer: "최소열람", stage: "stage2", type: "short_answer" },
  { question: "외부에서 병원 시스템에 접속할 때 필요한 보안 수단은 무엇인가요?", answer: "VPN", stage: "stage2", type: "short_answer" },
  { question: "출력된 환자정보 문서를 폐기할 때 사용해야 하는 것은 무엇인가요?", answer: "파쇄기", stage: "stage2", type: "short_answer" },
  { question: "자리를 비울 때 반드시 해야 하는 행위는 무엇인가요?", answer: "화면잠금", stage: "stage2", type: "short_answer" },
  { question: "업무 종료 후 반드시 해야 하는 것은 무엇인가요?", answer: "로그아웃", stage: "stage2", type: "short_answer" },
  { question: "보안사고 발생 시 가장 먼저 보고해야 하는 부서는 어디인가요?", answer: "정보보호팀", stage: "stage2", type: "short_answer" },
  { question: "병원 내 개인정보 보호를 담당하는 법은 무엇인가요?", answer: "개인정보보호법", stage: "stage2", type: "short_answer" },
  { question: "병원 내 모든 직원이 정기적으로 받아야 하는 것은 무엇인가요?", answer: "정보보호교육", stage: "stage2", type: "short_answer" },
  { question: "비밀번호에 영어와 숫자 외에 포함되어야 하는 것은 무엇인가요?", answer: "특수문자", stage: "stage2", type: "short_answer" },
  { question: "이메일을 통해 개인정보를 전송할 때 반드시 해야 하는 것은 무엇인가요?", answer: "암호화", stage: "stage2", type: "short_answer" },
  { question: "출처가 불분명한 이메일 첨부파일은 어떻게 해야 하나요?", answer: "삭제", stage: "stage2", type: "short_answer" },
  { question: "개인 USB나 외장하드를 병원 PC에 연결하는 것은 어떤 행위인가요?", answer: "보안위반", stage: "stage2", type: "short_answer" },
  { question: "병원 문서나 데이터가 외부로 유출되지 않도록 보호하는 기술은 무엇인가요?", answer: "DRM", stage: "stage2", type: "short_answer" },
  { question: "업무용 PC 비밀번호는 최소 몇 개월마다 변경하는 것이 좋을까요?", answer: "3개월", stage: "stage2", type: "short_answer" },

  // -------------------
  // 🥉 3단계 (부서 관련)
  // -------------------
  { question: "병원의 회의자료, 연구 계획, 계약정보 등 외부로 유출되면 민감한 내용의 문서를 막는 보안장치는 ○○○이다.", answer: "DRM", stage: "stage3", type: "short_answer" },
  { question: "‘모든 환자 정보는 동일한 기준으로 보호된다’는 원칙을 지키기 위한 장치로 교직원들은 의무기록을 어디서 확인할 수 있는가? (○○○○ 창구)", answer: "의무기록 창구", stage: "stage3", type: "short_answer" },
  { question: "업무 목적이 없는 의무기록 열람은 ○○○○○○○ 위반이다.", answer: "개인정보보호법", stage: "stage3", type: "short_answer" },
  { question: "다음 중 정보보호를 위한 ‘물리적 보호조치’에 해당하는 것은 ○○○○ ○○이다.", answer: "사원증 착용", stage: "stage3", type: "short_answer" },
  { question: "환자 정보가 포함된 출력물을 올바르게 처리하는 방법은 ○○○○이다.", answer: "파쇄기", stage: "stage3", type: "short_answer" },
  { question: "의심스러운 이메일을 받았을 때 신고해야 하는 곳은 ○○○○○○이다.", answer: "정보보호팀", stage: "stage3", type: "short_answer" },
  { question: "자리를 비울 때 PC의 화면잠금 단축키는 Win + (  ) 이다.", answer: "L", stage: "stage3", type: "short_answer" },
  { question: "자리를 비울 때 nU 등 사용중인 프로그램은 반드시 이것을 해야 한다. (○○○○○)", answer: "로그아웃", stage: "stage3", type: "short_answer" },
  { question: "비밀번호는 영어 + 숫자 + (○○○○) 조합으로 해야 안전하다.", answer: "특수문자", stage: "stage3", type: "short_answer" },
  { question: "비밀번호는 특수문자 포함 숫자 + (○○○) 조합으로 해야 안전하다.", answer: "영어", stage: "stage3", type: "short_answer" },
];

// ✅ 보기 후보군
const STAGE2_ALL_ANSWERS = [
  "개인정보", "최소열람", "VPN", "파쇄기", "화면잠금",
  "로그아웃", "정보보호팀", "개인정보보호법", "정보보호교육",
  "특수문자", "암호화", "삭제", "DRM", "3개월",
  "동의", "보안위반", "위반", "서버", "보안"
];

const STAGE3_ALL_ANSWERS = [
  "정보보호팀", "총무팀", "의무기록팀", "원무팀", "인사팀", "법무팀",
  "DRM", "의무기록 창구", "개인정보보호법", "사원증 착용",
  "파쇄기", "L", "로그아웃", "특수문자", "영어"
];

// ✅ 보기 생성 함수
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const getRandomOptions = (question: Question): string[] => {
  let answerPool: string[] = [];

  if (question.stage === 'stage1') {
    answerPool = ['O', 'X'];
  } else if (question.stage === 'stage2') {
    answerPool = STAGE2_ALL_ANSWERS;
  } else if (question.stage === 'stage3') {
    answerPool = STAGE3_ALL_ANSWERS;
  }

  // 해당 stage 보기 풀에서만 랜덤 생성
  const distractors = answerPool.filter(ans => ans !== question.answer);
  const selectedDistractors = shuffleArray(distractors).slice(0, 9);
  const options = [question.answer, ...selectedDistractors];

  return shuffleArray(options);
};
