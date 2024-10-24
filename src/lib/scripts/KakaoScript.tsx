'use client'

import handleError from '@/lib/utils/errorHandler'
import Script from 'next/script'
import { useState } from 'react'

export default function KakaoScript() {
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false)

  const onLoad = () => {
    if (window.Kakao) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_SHARE_APPKEY) // 김가영 앱키
      setIsKakaoLoaded(true)
    } else {
      console.log(isKakaoLoaded)
      handleError(new Error('Kakao SDK 로드 실패'))
    }
  }

  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
      integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
      crossOrigin="anonymous"
      async
      onLoad={onLoad}
    />
  )
}
