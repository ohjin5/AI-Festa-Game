import type { Question } from './types';

// ✅ 단계별 문제 리스트
export const QUIZ_QUESTIONS: Question[] = [
  // -------------------
  // 🥇 1단계 (O / X 문제)
  // -------------------
  { question: "나는 교직원이니까, 내가 보고 싶은 환자의 기록을 마음대로 열람해도 괜찮다.", answer: "X", stage: "stage1", type: "yesno" },
  { question: "가족의 진료 기록이라도, 나의 업무 목적이 아니라면 열람해서는 안 된다.", answer: "O", stage: "stage1", type: "yesno" },
  { question: "SNS에 사무실 책상이나 모니터가 찍힌 사진을 올려도 된다.", answer: "X", stage: "stage1", type: "yesno" },
  { question: "환자 정보를 보내야 할 때, 이름만 가리면 다른 모든 정보를 써도 괜찮다.", answer: "X", stage: "stage1", type: "yesno" },
  { question: "환자의 '입원 여부'는 개인정보가 아니므로 외부에 말해도 괜찮다.", answer: "X", stage: "stage1", type: "yesno" },
  { question: "출력된 문서에 내 사번이 찍혀 나오는 것은 필요 시 '누가 뽑았는지' 확인하기 위한 용도이다..", answer: "O", stage: "stage1", type: "yesno" },
  { question: "환자 정보가 적힌 종이는 뒤집어서 이면지로 재사용해도 괜찮다.", answer: "X", stage: "stage1", type: "yesno" },
  { question: "잠깐 화장실이나 커피를 마시러 갈 때, 내 PC 화면 잠금을 하지 않아도 괜찮다.", answer: "X", stage: "stage1", type: "yesno" },
  { question: "ChatGPT 같은 인공지능 서비스에 환자 정보나 병원 기밀 문서를 입력해도 보안상 문제가 없다.", answer: "X", stage: "stage1", type: "yesno" },
  { question: "개인적으로 쓰는 USB나 외장하드는 아무거나 병원 PC에 연결해도 괜찮다.", answer: "X", stage: "stage1", type: "yesno" },
  { question: "퇴근 후 집에서 심심해서 내가 치료받았던 진료기록을 확인하는 것은 문제가 없다.", answer: "X", stage: "stage1", type: "yesno" },
  { question: "다른 직원이 잠시 자리를 비웠을 때, 급한 업무를 위해 그 직원의 EMR 계정으로 로그인해도 괜찮다.", answer: "X", stage: "stage1", type: "yesno" },
  { question: "사원증 없이 출입 금지 구역에 들어가기 위해 다른 사람의 도움을 받아 대신 출입해도 괜찮다.", answer: "X", stage: "stage1", type: "yesno" },
  { question: "자리 비울 때 PC 화면 잠금을 하는 단축키는 'Ctrl + L'이다.", answer: "X", stage: "stage1", type: "yesno" },
  { question: "내 비밀번호를 팀원 모두가 공유해서 함께 사용하면 업무 효율이 높아진다.", answer: "X", stage: "stage1", type: "yesno" },
  { question: "출처가 불분명한 이메일이라도, '정보보호팀'에서 보낸 제목이라면 믿고 열어봐야 한다.", answer: "X", stage: "stage1", type: "yesno" },
  { question: "개인 휴대폰으로 환자의 상처 부위를 촬영하여 동료 의사에게 메신저로 전송해도 괜찮다.", answer: "X", stage: "stage1", type: "yesno" },
  { question: "환자의 이름과 주민등록번호 앞자리만 안다면, 나머지 정보는 개인정보가 아니다.", answer: "X", stage: "stage1", type: "yesno" },
  { question: "비밀번호를 주기적으로 바꾸는 것도 중요하지만, 길고 복잡하게 설정하는 것이 더 중요하다.", answer: "O", stage: "stage1", type: "yesno" },
  { question: "환자의 '진료 예약 일자'는 개인정보가 아니므로 외부에 말해도 괜찮다.", answer: "X", stage: "stage1", type: "yesno" },
  { question: "'개인정보'에는 환자의 신체적, 사회적 정보뿐만 아니라 사상, 신념 등 정신적인 정보도 포함된다.", answer: "O", stage: "stage1", type: "yesno" },
  { question: "퇴근 시, 내가 사용한 모든 종이 문서(환자 정보 포함)는 책상 위에 두고 퇴근해도 된다.", answer: "X", stage: "stage1", type: "yesno" },

  // -------------------
  // 🥈 2단계 
  // -------------------
  { question: "병원에서 환자 이름, 주민번호, 연락처는 모두 어디에 해당하나요?", answer: "개인정보", stage: "stage2", type: "short_answer" },
  { question: "환자 정보를 다룰 때, '꼭 필요한 내용만 최소한으로 확인하자'는 원칙을 무엇이라고 하나요?", answer: "최소열람", stage: "stage2", type: "short_answer" },
  { question: "집 등 외부에서 안전하게 병원 시스템에 접속하기 위해 꼭 연결해야 하는 보안 수단은 무엇인가요? (영문 3글자)", answer: "VPN", stage: "stage2", type: "short_answer" },
  { question: "출력된 환자정보 문서를 폐기할 때 사용해야 하는 것은 무엇인가요?", answer: "파쇄기", stage: "stage2", type: "short_answer" },
  { question: "자리를 잠시 비울 때, PC에 아무도 접근하지 못하게 반드시 해야 하는 행동은 무엇인가요?", answer: "화면잠금", stage: "stage2", type: "short_answer" },
  { question: "업무 종료 시  내가 사용한 병원 프로그램(시스템)에서 반드시 해야 하는 마지막 행동은 무엇인가요?", answer: "로그아웃", stage: "stage2", type: "short_answer" },
  { question: "우리 병원에서 환자 정보를 안전하게 지키기 위한 가장 기본이 되는 법은 무엇인가요?", answer: "개인정보보호법", stage: "stage2", type: "short_answer" },
  { question: "모든 교직원이 개인정보 보호 인식을 높이기 위해 매년 필수로 이수해야 하는 교육은 무엇인가요?", answer: "정보보호교육", stage: "stage2", type: "short_answer" },
  { question: "보안이 강력한 비밀번호를 만들기 위해 영어와 숫자 외에 꼭 포함해야 하는 문자는 무엇인가요?", answer: "특수문자", stage: "stage2", type: "short_answer" },
  { question: "출처가 불분명한 이메일 첨부파일은 어떻게 해야 하나요?", answer: "삭제", stage: "stage2", type: "short_answer" },
  { question: "보안상 허가되지 않은 개인 USB를 병원 PC에 연결하는 행위는 무엇으로 간주되나요?", answer: "보안규정위반", stage: "stage2", type: "short_answer" },
  { question: "병원 자료가 외부로 나갔을 때도 열리지 않도록 파일을 잠가주는 보안 기술은 무엇인가요? ", answer: "DRM", stage: "stage2", type: "short_answer" },
  { question: "업무용 PC의 비밀번호는 보안 강화를 위해 최소 몇 개월마다 바꾸는 것이 좋을까요?", answer: "3개월", stage: "stage2", type: "short_answer" },
  { question: "업무와 관련 없는 환자의 개인정보를 열람하는 것은 ○○○○○○○ 위반입니다.", answer: "개인정보보호법", stage: "stage2", type: "short_answer" },
  { question: "동료 교직원의 아이디와 비밀번호를 빌려 EMR에 접속하는 행위는 ○○○○에 해당합니다.", answer: "계정 공유", stage: "stage2", type: "short_answer" },
  { question: "자리를 잠시 비울 때 PC를 잠그기 위해 사용하는 가장 기본적인 보안 조치는 무엇인가요?", answer: "화면잠금", stage: "stage2", type: "short_answer" },
  { question: "누가 언제 접속했고, 어떤 정보를 처리했는지에 대한 모든 활동 이력이 담겨있는 병원 시스템에 반드시 남아있어야 하는 기록은 무엇인가요?", answer: "접속기록", stage: "stage2", type: "short_answer" },
  { question: "외부로 유출되면 안 되는 병원 자료를 암호화하고 통제하는 보안 기술은 무엇인가요? ", answer: "DRM", stage: "stage2", type: "short_answer" },
  { question: "개인 휴대폰으로 환자 정보를 촬영하여 외부에 유출하여 문제가 될 경우, 병원과 교직원 모두가 지게 되는 것은 무엇인가요?", answer: "법적책임", stage: "stage2", type: "short_answer" },
  { question: "허가받지 않은 개인 USB나 외장하드를 병원 PC에 연결하는 행위는 ○○○○○○으로 간주됩니다.", answer: "보안 규정 위반", stage: "stage2", type: "short_answer" },
  { question: "의무기록을 포함한 문서 보안을 위해 반드시 사용해야 하는 폐기 도구는 무엇인가요?", answer: "파쇄기", stage: "stage2", type: "short_answer" },
  { question: "병원 시스템의 비밀번호는 영문, 숫자 외에 ○○○○를 포함하여 8자리 이상으로 설정해야 합니다.", answer: "특수문자", stage: "stage2", type: "short_answer" },
  { question: "병원 내에서 개인 휴대폰으로 환자의 상태나 진료 정보를 촬영하여 전송하는 행위는 ○○○○○○에 해당합니다.", answer: "보안 규정 위반", stage: "stage2", type: "short_answer" },

  // -------------------
  // 🥉 3단계
  // -------------------
  { question: "환자 정보 외에도, 병원의 회의 자료나 연구 계획 등을 외부로 유출되지 않도록 파일을 잠가주는 보안 장치는 무엇인가요?.", answer: "DRM", stage: "stage3", type: "short_answer" },
  { question: "교직원이 '환자'로서 본인의 의무 기록을 확인하려면 병원 내 어느 창구를 방문해야 할까요?", answer: "의무기록 창구", stage: "stage3", type: "short_answer" },
  { question: "업무 목적 없이 EMR을 열람하는 행위는 법적으로 ○○○○○○○ 위반입니다.", answer: "개인정보보호법", stage: "stage3", type: "short_answer" },
  { question: "우리 병원의 정보보호를 위한 '가장 기본적인 물리적 보호조치'이자 근무 중 교직원이 반드시 착용해야 하는 것은 무엇인가요?.", answer: "사원증", stage: "stage3", type: "short_answer" },
  { question: "환자 정보가 포함된 종이 출력물을 안전하게 처리하는 '가장 올바른 방법'은 무엇인가요?", answer: "파쇄기 사용", stage: "stage3", type: "short_answer" },
  { question: "PC에서 자리를 비울 때, 화면을 즉시 잠그는 단축키는 'Win' 키와 무슨 알파벳 키를 함께 누르는 것인가요?", answer: "L", stage: "stage3", type: "short_answer" },
  { question: "자리를 오래 비울 때나 퇴근 시, nU 등 사용 중인 시스템에서 반드시 해야 하는 조치는 무엇인가요?", answer: "로그아웃", stage: "stage3", type: "short_answer" },
  { question: "보안 강화된 비밀번호는 영어, 숫자 외에 이 기호를 반드시 포함해야 합니다.", answer: "특수문자", stage: "stage3", type: "short_answer" },
  { question: "보안 강화된 비밀번호는 특수문자, 숫자 외에 이 문자를 반드시 포함해야 합니다.", answer: "영어", stage: "stage3", type: "short_answer" },
  { question: "병원 내에서 USB 등 이동식 저장 매체의 사용을 통제하기 위해, 사용을 허가받은 기기만 PC에 연결되도록 막는 보안 기술을 무엇이라고 하나요?", answer: "매체제어", stage: "stage3", type: "short_answer" },
  { question: "해커가 병원 시스템에 침입해 중요한 데이터를 암호화하고 돈을 요구하는 악성코드 공격을 무엇이라고 하나요?", answer: "랜섬웨어", stage: "stage3", type: "short_answer" },
  { question: "병원 내 모든 교직원이 의무적으로 개인정보보호 교육을 이수해야 하는 법적 근거는 ○○○○○○○ 제28조입니다.", answer: "개인정보보호법", stage: "stage3", type: "short_answer" },
  { question: "병원 외부에서 환자의 진료 기록을 확인하기 위해 안전하게 접속하는 방식은 ○○○을 통해서만 허용됩니다.", answer: "VPN", stage: "stage3", type: "short_answer" },
  { question: "병원 내 EMR 시스템 접속 시 사용자가 누구인지 확인하는 보안 절차를 ○○이라고 합니다", answer: "인증", stage: "stage3", type: "short_answer" },
  { question: "환자의 병력이나 유전 정보와 같이 사생활을 현저히 침해할 우려가 있는 정보를 법적으로 무엇이라고 하나요?", answer: "민감정보", stage: "stage3", type: "short_answer" },
  { question: "비밀번호의 노출 위험을 줄이기 위해 로그인을 할 때마다 새로운 코드를 요구하는 인증 방식을 무엇이라고 하나요?", answer: "OTP", stage: "stage3", type: "short_answer" },
  { question: "업무를 위한 필수 열람이 아닌데도 습관적으로 환자 기록을 열람하는 행위는 ○○○○○○ 사고로 이어질 수 있습니다.", answer: "개인정보 유출", stage: "stage3", type: "short_answer" },
  { question: "외부에서 병원 시스템에 접속할 때, 허가된 IP 주소를 통해서만 접속을 허용하는 통제 기술은 무엇인가요?", answer: "접근통제", stage: "stage3", type: "short_answer" },
  { question: "개인 휴대폰에 저장된 환자 정보가 본인도 모르게 외부 클라우드 서버에 자동 저장되는 행위를 무엇이라고 하나요", answer: "자동백업", stage: "stage3", type: "short_answer" },
  { question: "해커가 이메일 등을 통해 사용자를 속여 정보를 탈취하는 행위를 무엇이라고 하나요?.", answer: "피싱", stage: "stage3", type: "short_answer" },
];


// ✅ 보기 후보군
const STAGE2_ALL_ANSWERS = [
"개인정보", "최소열람", "VPN", "파쇄기", "화면잠금", "로그아웃", "개인정보보호법", "정보보호교육", "특수문자", "삭제", "DRM", "3개월", "계정 공유", "OTP", "접속기록", "법적책임", "보안 규정 위반",
];

const STAGE3_ALL_ANSWERS = [
"DRM", "의무기록 창구", "개인정보보호법", "사원증", "파쇄기 사용", "L", "로그아웃", "특수문자", "영어", "매체제어", "랜섬웨어", "VPN", "인증", "민감정보", "OTP", "개인정보 유출", "접근통제", "자동백업", "피싱"
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
    return ['O', 'X'];
  } 
  
  if (question.stage === 'stage2') {
    answerPool = STAGE2_ALL_ANSWERS;
  } else if (question.stage === 'stage3') {
    answerPool = STAGE3_ALL_ANSWERS;
  }

  // Ensure the pool of potential answers is unique.
  const uniqueAnswerPool = [...new Set(answerPool)];

  // Create a pool of distractors by filtering out the correct answer.
  const distractors = uniqueAnswerPool.filter(ans => ans !== question.answer);
  
  // Shuffle the unique distractors and select up to 9.
  const selectedDistractors = shuffleArray(distractors).slice(0, 9);
  
  // Combine the correct answer with the distractors.
  const options = [question.answer, ...selectedDistractors];

  // Shuffle the final list of options before returning.
  return shuffleArray(options);
};
