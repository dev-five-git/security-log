export type AccidentCategory =
  | '해킹'
  | '내부자'
  | '관리부실'
  | '기술결함'
  | '미상'

export interface AccidentTimelineStep {
  title: string
  date: string
}

export interface AccidentPrevention {
  personal: string[]
  corporate: string[]
}

export interface Accident {
  id: string
  category: AccidentCategory
  damage: number
  date: string
  companyName: string
  country: string
  tags: string[]
  leaks: string[]
  secondaryDamage: string[]
  timeline: AccidentTimelineStep[]
  rootCauses: string[]
  prevention: AccidentPrevention
}

const DEFAULT_LEAKS = ['이름', '아이디', '생년 월일', '주소', '연락처']
const DEFAULT_SECONDARY = ['이름', '아이디', '생년 월일', '주소', '연락처']
const DEFAULT_TIMELINE: AccidentTimelineStep[] = [
  { title: '비인가 접근 시작 추정', date: '2025-06-24' },
  { title: '비정상 접근 탐지 및 최초 인지', date: '2025-11-18' },
  { title: '공식 유출 발표 & 신고 접수', date: '2025-11-29' },
  { title: 'CEO 사임 및 추가 대응', date: '2025-12-09' },
  { title: '경찰·공식 조사·규제 논의 진행', date: '2026-01' },
]
const DEFAULT_ROOT_CAUSES = [
  '퇴사자 권한 회수와 토큰 관리 미흡',
  '비정상 접근 탐지 시스템 미구축',
]
const DEFAULT_PREVENTION: AccidentPrevention = {
  personal: [
    '아이디와 비밀번호 외에 일회용 비밀번호(OTP) 등 안전한 인증수단을 이용해 접속',
  ],
  corporate: [
    'MFA(다중 인증) 적용',
    '외부 접근에 대한 IP 제한 / 방화벽 설정 강화',
    '관리자 접근 로그의 실시간 모니터링 및 알람 체계',
    '보안 운영 절차 문서화 및 정기 점검',
  ],
}

export const ACCIDENTS: Accident[] = [
  {
    id: '1',
    category: '내부자',
    damage: 1200,
    date: '2026.04.07',
    companyName: '회사명',
    country: '대한민국',
    tags: ['사고 요약', '보이스피싱'],
    leaks: DEFAULT_LEAKS,
    secondaryDamage: DEFAULT_SECONDARY,
    timeline: DEFAULT_TIMELINE,
    rootCauses: DEFAULT_ROOT_CAUSES,
    prevention: DEFAULT_PREVENTION,
  },
  {
    id: '2',
    category: '해킹',
    damage: 500,
    date: '2026.04.07',
    companyName: '회사명',
    country: '대한민국',
    tags: ['사고 요약', '보이스피싱', '관리자페이지무단접속'],
    leaks: DEFAULT_LEAKS,
    secondaryDamage: DEFAULT_SECONDARY,
    timeline: DEFAULT_TIMELINE,
    rootCauses: DEFAULT_ROOT_CAUSES,
    prevention: DEFAULT_PREVENTION,
  },
  {
    id: '3',
    category: '내부자',
    damage: 1200,
    date: '2026.04.07',
    companyName: '회사명',
    country: '대한민국',
    tags: ['사고 요약', '보이스피싱'],
    leaks: DEFAULT_LEAKS,
    secondaryDamage: DEFAULT_SECONDARY,
    timeline: DEFAULT_TIMELINE,
    rootCauses: DEFAULT_ROOT_CAUSES,
    prevention: DEFAULT_PREVENTION,
  },
  {
    id: '4',
    category: '관리부실',
    damage: 1000,
    date: '2026.04.07',
    companyName: '회사명',
    country: '대한민국',
    tags: ['사고 요약', '보이스피싱', '관리자페이지무단접속'],
    leaks: DEFAULT_LEAKS,
    secondaryDamage: DEFAULT_SECONDARY,
    timeline: DEFAULT_TIMELINE,
    rootCauses: DEFAULT_ROOT_CAUSES,
    prevention: DEFAULT_PREVENTION,
  },
  {
    id: '5',
    category: '미상',
    damage: 1,
    date: '2026.04.07',
    companyName: '회사명',
    country: '대한민국',
    tags: ['사고 요약', '관리자페이지무단접속'],
    leaks: DEFAULT_LEAKS,
    secondaryDamage: DEFAULT_SECONDARY,
    timeline: DEFAULT_TIMELINE,
    rootCauses: DEFAULT_ROOT_CAUSES,
    prevention: DEFAULT_PREVENTION,
  },
  {
    id: '6',
    category: '해킹',
    damage: 1000,
    date: '2026.04.07',
    companyName: '회사명',
    country: '대한민국',
    tags: ['사고 요약', '보이스피싱', '관리자페이지무단접속'],
    leaks: DEFAULT_LEAKS,
    secondaryDamage: DEFAULT_SECONDARY,
    timeline: DEFAULT_TIMELINE,
    rootCauses: DEFAULT_ROOT_CAUSES,
    prevention: DEFAULT_PREVENTION,
  },
  {
    id: '7',
    category: '기술결함',
    damage: 1000,
    date: '2026.04.07',
    companyName: '회사명',
    country: '대한민국',
    tags: ['보이스피싱', '관리자페이지무단접속'],
    leaks: DEFAULT_LEAKS,
    secondaryDamage: DEFAULT_SECONDARY,
    timeline: DEFAULT_TIMELINE,
    rootCauses: DEFAULT_ROOT_CAUSES,
    prevention: DEFAULT_PREVENTION,
  },
  {
    id: '8',
    category: '해킹',
    damage: 1500,
    date: '2026.04.07',
    companyName: '회사명',
    country: '대한민국',
    tags: ['사고 요약', '보이스피싱', '관리자페이지무단접속'],
    leaks: DEFAULT_LEAKS,
    secondaryDamage: DEFAULT_SECONDARY,
    timeline: DEFAULT_TIMELINE,
    rootCauses: DEFAULT_ROOT_CAUSES,
    prevention: DEFAULT_PREVENTION,
  },
  {
    id: '9',
    category: '해킹',
    damage: 1000,
    date: '2026.04.07',
    companyName: '회사명',
    country: '대한민국',
    tags: ['사고 요약', '보이스피싱', '관리자페이지무단접속'],
    leaks: DEFAULT_LEAKS,
    secondaryDamage: DEFAULT_SECONDARY,
    timeline: DEFAULT_TIMELINE,
    rootCauses: DEFAULT_ROOT_CAUSES,
    prevention: DEFAULT_PREVENTION,
  },
]

export function getAccidentById(id: string): Accident | undefined {
  return ACCIDENTS.find((a) => a.id === id)
}
