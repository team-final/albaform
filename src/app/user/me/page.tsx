import MainButton from '@/components/Button/MainButton/MainButton'

export default function MyPage() {
  return (
    <>
      <h1>마이페이지</h1>
      <MainButton>내 정보 수정</MainButton>
      <MainButton buttonStyle={'outline'}>비밀번호 변경</MainButton>
    </>
  )
}
