import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '알바폼',
  description: '한 곳에서 관리하는 알바 구인 플랫폼',
}

export const PAGE_TITLES = {
  SignInPage: '로그인',
  SignUpPage: '회원가입',
}

// export const Routes = {
//   알바폼_전체: '/forms',
//   알바폼_상세: (formId: string) => `/form/${formId}`,
//   알바폼_지원: (formId: string) => `/form/${formId}/apply`,
//   알바폼_지원내역_상세: (formId: string, applicationId: string) =>
//     `/form/${formId}/application/${applicationId}`,
//   내가_지원한_알바폼: '/applications',
//   알바폼_작성: '/form/create',
//   알바폼_수정: (formId: string) => `/form/${formId}/edit`,
//   내가_만든_알바폼: '/forms/created',
//   마이_페이지: '/user/me',
//   로그인: '/user/sign-in',
//   회원가입: '/user/sign-up',
//   회원정보입력: '/user/sign-up/complete',
//   에러_404: '/not-found',
//   랜딩_페이지: '/',
// } as const
//
// type RouteKeys = keyof typeof Routes
//
// type RouteInfoItem = {
//   component: string
//   title: string
// }
//
// export const RouteInfo: { [K in RouteKeys]: RouteInfoItem } = {
//   [Routes.알바폼_전체]: {
//     component: 'FormsPage',
//     title: '알바폼 전체보기',
//   },
//   [Routes.알바폼_상세]: {
//     component: 'FormDetailsPage',
//     title: '알바폼 상세보기',
//   },
//   [Routes.알바폼_지원]: {
//     component: 'ApplyToFormPage',
//     title: '알바폼 지원하기',
//   },
//   [Routes.알바폼_지원내역_상세]: {
//     component: 'ApplicationDetailsPage',
//     title: '내가 지원한 알바폼',
//   },
//   [Routes.내가_지원한_알바폼]: {
//     component: 'MyApplicationsPage',
//     title: '내가 지원한 알바폼',
//   },
//   [Routes.알바폼_작성]: {
//     component: 'CreateFormPage',
//     title: '알바폼 만들기',
//   },
//   [Routes.알바폼_수정]: {
//     component: 'EditFormPage',
//     title: '알바폼 수정하기',
//   },
//   [Routes.내가_만든_알바폼]: {
//     component: 'CreatedFormsPage',
//     title: '내가 만든 알바폼',
//   },
//   [Routes.마이_페이지]: {
//     component: 'MyPage',
//     title: '마이 페이지',
//   },
//   [Routes.로그인]: {
//     component: 'SignInPage',
//     title: '로그인',
//   },
//   [Routes.회원가입]: {
//     component: 'SignUpPage',
//     title: '회원가입',
//   },
//   [Routes.회원정보입력]: {
//     component: 'CompleteSignUpPage',
//     title: '알바폼 시작하기',
//   },
//   [Routes.에러_404]: {
//     component: 'NotFoundPage',
//     title: '페이지를 찾을 수 없습니다',
//   },
//   [Routes.랜딩_페이지]: {
//     component: 'Home',
//     title: '알바폼',
//   },
// }
