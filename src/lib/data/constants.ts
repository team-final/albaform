import {
  MyContentMenu,
  PublicSortCondition,
  RecrutingSortCondition,
  ScrapListSortCondition,
} from '../types/types'

export const DEFAULT_ERROR_MESSAGE = {
  title: '오류',
}

export const SIGN_IN_ERROR_MESSAGE = {
  title: '로그인 실패',
}

export const AUTH_USER_ERROR_MESSAGE = {
  title: '사용자 로드 실패',
}

export const SIGN_UP_ERROR_MESSAGE = {
  title: '회원 가입 실패',
}

export const SAVE_ERROR_MESSAGE = {
  title: '저장 실패',
}

export const TEST_ID_APPLICANT = {
  email: 'testApplicant@email.com',
  password: '00000000', // 35
}

export const TEST_ID_OWNER = {
  email: 'testOwner@email.com',
  password: '00000000', // 36
}

export const TEST_ACOUNT: Record<string, Record<string, string>[]> = {
  APPLICANT: [
    { email: 'example29@email.com', password: '00000000', role: 'APPLICANT' }, // 75
    { email: 'example95@email.com', password: '00000000', role: 'APPLICANT' }, // 79
    { email: 'example27@email.com', password: '00000000', role: 'APPLICANT' }, // 76
    { email: 'example6759@email.com', password: '00000000', role: 'APPLICANT' }, // 81
    { email: 'example9451@email.com', password: '00000000', role: 'APPLICANT' }, // 82
    { email: 'example7779@email.com', password: '00000000', role: 'APPLICANT' }, // 83
    { email: 'example4611@email.com', password: '00000000', role: 'APPLICANT' }, // 84
    { email: 'example7827@email.com', password: '00000000', role: 'APPLICANT' }, // 86
    { email: 'example6951@email.com', password: '00000000', role: 'APPLICANT' }, // 89
    { email: 'example5767@email.com', password: '00000000', role: 'APPLICANT' }, // 91
    { email: 'example6243@email.com', password: '00000000', role: 'APPLICANT' }, // 92
    { email: 'example3407@email.com', password: '00000000', role: 'APPLICANT' }, // 93
    { email: 'example8205@email.com', password: '00000000', role: 'APPLICANT' }, // 94
    { email: 'example4269@email.com', password: '00000000', role: 'APPLICANT' }, // 99
    { email: 'example2977@email.com', password: '00000000', role: 'APPLICANT' }, // 100
  ],
  OWNER: [
    { email: 'example68@email.com', password: '00000000', role: 'OWNER' }, // 77
    { email: 'example48@email.com', password: '00000000', role: 'OWNER' }, // 78
    { email: 'example96@email.com', password: '00000000', role: 'OWNER' }, // 80
    { email: 'example68@email.com', password: '00000000', role: 'OWNER' }, // 77
    { email: 'example8800@email.com', password: '00000000', role: 'OWNER' }, // 85
    { email: 'example1198@email.com', password: '00000000', role: 'OWNER' }, // 87
    { email: 'example8882@email.com', password: '00000000', role: 'OWNER' }, // 88
    { email: 'example4698@email.com', password: '00000000', role: 'OWNER' }, // 90
    { email: 'example5282@email.com', password: '00000000', role: 'OWNER' }, // 95
    { email: 'example1862@email.com', password: '00000000', role: 'OWNER' }, // 96
    { email: 'example368@email.com', password: '00000000', role: 'OWNER' }, // 97
    { email: 'example8984@email.com', password: '00000000', role: 'OWNER' }, // 98
  ],
}

/** 알바폼 만들기 임시 저장 */
export const TEMP_CREATE_FORM = 'albaform_create_temporary_save'

/** 최저시급정보 */
export const HOURLY_WAGE_DATA: {
  min: number
  as: number
} = {
  min: 9860,
  as: 2024,
}

export const MY_CONTENT_MENUS: MyContentMenu[] = [
  // { value: 'posts', label: '내가 쓴 글' },
  // { value: 'comments', label: '내가 쓴 댓글' },
  { value: 'scrap', label: '스크랩' },
]

export const SCRAP_LIST_SORT_CONDITION: ScrapListSortCondition[] = [
  { value: 'mostRecent', label: '최근' },
  { value: 'highestWage', label: '높은 임금' },
  { value: 'mostApplied', label: '지원자' },
  { value: 'mostScrapped', label: '스크랩' },
]

export const RECRUTING_SORT_CONDITION: RecrutingSortCondition[] = [
  { value: null, label: '모두' },
  { value: true, label: '모집 중' },
  { value: false, label: '모집 완료' },
]

export const PUBLIC_SORT_CONDITION: PublicSortCondition[] = [
  { value: true, label: '공개' },
  { value: false, label: '비공개' },
]

export const USER_ROLE_CONFIG = {
  APPLICANT: {
    title: '지원자',
    myFormUrl: '/applications',
  },
  OWNER: {
    title: '사장님',
    myFormUrl: '/forms/created',
  },
  '': {
    title: '',
    myFormUrl: '/user/sign-in',
  },
}

export const LIST_ALBATALK_ORDER_BY = {
  mostRecent: '최신순',
  mostCommented: '댓글 많은순',
  mostLiked: '좋아요 많은순',
} as const

export const ALBATALK_LIST_PATH_NAME = 'albatalks'
export const ALBATALK_POST_PATH_NAME = 'albatalk'
export const ALBATALK_EDIT_PATH_NAME = 'addtalk'
