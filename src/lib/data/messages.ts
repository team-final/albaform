import DoneIC from '/public/icons/ic-warning-bookmark.svg'
import WritingIC from '/public/icons/ic-warning-comment.svg'
import DeleteIc from '/public/icons/ic-warning-form.svg'

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

export const MODAL_MESSAGE = {
  delete: {
    title: '알바폼을 삭제할까요?',
    description: '삭제 후 정보를 복구할 수 없어요',
    buttonText: '삭제하기',
    buttonText2: '다음에 할게요',
    icon: DeleteIc,
    showSecondButton: true,
  },
  done: {
    title: '모집 마감',
    description: '모집이 종료된 알바폼입니다.',
    buttonText: '홈으로 가기',
    icon: DoneIC,
    showSecondButton: false,
  },
  writing: {
    title: '작성 중인 알바폼이 있어요!',
    description: '이어서 작성하시겠어요?',
    buttonText: '이어쓰기',
    icon: WritingIC,
    showSecondButton: false,
  },
}
