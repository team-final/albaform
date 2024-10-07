import { initializeApp } from '@firebase/app'

// import 'https://www.gstatic.com/firebasejs/10.12.3/firebase-SERVICE.js'

// SDK 설치 및 Firebase 초기화
// 클라이언트 애플리케이션에서 Firebase 인증
// 사용자 로그인, 로그아웃, 인증 상태 확인

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

export const app = initializeApp(firebaseConfig)
