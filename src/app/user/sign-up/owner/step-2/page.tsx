'use client'

import MainButton from '@/components/Button/MainButton/MainButton'
import Form from '@/components/Form/Form'
import FormStyles from '@/components/Form/Form.module.scss'

import Styles from './page.module.scss'

export default function Page() {
  const handleSubmit = (data: any) => {
    console.log({ ...data })
    // 폼 제출 로직
  }
  const laterSignup = () => {
    // 나중에하기 버튼
    //
    // 닉네임 중복되지않게 만들기
    // function generateRandomName(): string {
    //   const adjectives: string[] = [
    //     '멋있는',
    //     '희망찬',
    //     '행복한',
    //     '신나는',
    //     '귀여운',
    //     '보람찬',
    //     '즐거운',
    //     '용감한',
    //     '어여쁜',
    //     '씩씩한',
    //   ]
    //   const randomNum: number = Math.floor(Math.random() * 100000)
    //   const randomAdjective: string =
    //     adjectives[Math.floor(Math.random() * adjectives.length)]
    //   return `${randomAdjective.charAt(0).toUpperCase() + randomAdjective.slice(1)}사장님${randomNum}`
    // }
    //
    // 페이지 리다리엑트
  }

  return (
    <div className="register-page">
      <Form
        formId="signUpFormOwnerStep2"
        onSubmit={handleSubmit}
        className={FormStyles['owner-information']}
      >
        <Form.Title>사장님 정보 입력</Form.Title>
        <div className={Styles['owner-information-sub-title']}>
          추가 정보를 입력하여 회원가입을 완료해주세요.
        </div>
        <Form.Fieldset>
          <Form.Field htmlFor="nickname">
            <Form.Legend>
              닉네임
              <Form.RequiredStar />
            </Form.Legend>
            <Form.Input
              name="nickname"
              type="text"
              required
              placeholder="닉네임을 입력해주세요."
            />
          </Form.Field>
        </Form.Fieldset>
        <Form.Fieldset>
          <Form.Field htmlFor="storeName">
            <Form.Legend>
              가게 이름
              <Form.RequiredStar />
            </Form.Legend>
            <Form.Input
              name="storeName"
              type="text"
              required
              placeholder="가게 이름(상호명)을 입력해주세요"
            />
          </Form.Field>
        </Form.Fieldset>
        <Form.Fieldset>
          <Form.Field htmlFor="storePhoneNumber">
            <Form.Legend>
              가게 전화번호
              <Form.RequiredStar />
            </Form.Legend>
            <Form.Input
              name="storePhoneNumber"
              type="tel"
              required
              pattern={{
                value: /^[0-9]{10,11}$/,
                message: '잘못된 입력입니다.',
              }}
              placeholder="숫자만 입력해주세요"
            />
          </Form.Field>
        </Form.Fieldset>
        <Form.Fieldset>
          <Form.Field htmlFor="phoneNumber">
            <Form.Legend>사장님 전화번호</Form.Legend>
            <Form.Input
              name="phoneNumber"
              type="tel"
              pattern={{
                value: /^[0-9]{10,11}$/,
                message: '잘못된 입력입니다.',
              }}
              placeholder="숫자만 입력해주세요"
            />
          </Form.Field>
        </Form.Fieldset>
        <Form.Fieldset>
          <Form.Legend>
            가게 위치
            <Form.RequiredStar />
          </Form.Legend>
          <Form.Field htmlFor="location">
            <Form.KakaoSearchInput
              name="location"
              placeholder="가게 위치를 설정해주세요"
              required
            />
          </Form.Field>
        </Form.Fieldset>
        <div className={Styles['button-group']}>
          <MainButton buttonStyle="outline" type="button" onClick={laterSignup}>
            나중에하기
          </MainButton>
          <Form.SubmitButton buttonStyle="solid">시작하기</Form.SubmitButton>
        </div>
      </Form>
    </div>
  )
}
