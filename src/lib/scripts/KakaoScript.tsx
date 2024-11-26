'use client'

import handleError from '@/lib/utils/errorHandler'
import Script from 'next/script'
import { useState } from 'react'

export default function KakaoScript() {
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false)

  const onLoad = () => {
    // console.log(
    //   'KAKAO SDK 초기화 with app key:',
    //   process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_APPKEY,
    // ),
    if (window.kakao) {
      window.kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_APPKEY)
      setIsKakaoLoaded(true)
      console.log('KAKAO SDK 초기화:', isKakaoLoaded)
    } else {
      handleError(new Error('KAKAO SDK 초기화 실패'))
    }
  }

  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
      integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
      // crossOrigin="anonymous"
      async
      onLoad={onLoad}
    />
  )
}
