import * as adminSDK from 'firebase-admin'

import serviceAccount from '../../../credentials/firebase-adminsdk-service-account.json'

// 서버 측 Firebase 인증
// 사용자 생성, 삭제 또는 사용자 정보 가져오기

adminSDK.initializeApp({
  credential: adminSDK.credential.cert(serviceAccount),
})
