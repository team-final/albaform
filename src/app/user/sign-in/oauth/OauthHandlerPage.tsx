// import useOauth from '@/hooks/auth/useOauth'
// import handleError from '@/lib/utils/errorHandler'
// import { useSearchParams } from 'next/navigation'
//
// export default function OauthHandlerPage() {
//   // 카카오
//   const responseParams = useSearchParams()
//   const { oauthSignIn, getKakaoToken } = useOauth()
//
//   const authorizeCode = responseParams.get('code')
//   const errorMessage = {
//     title: responseParams.get('error') || undefined,
//     message: responseParams.get('error_description') || undefined,
//   }
//
//   const externalToken = (await getKakaoToken.mutateAsync(authorizeCode)).accessToken
//   await oauthSignIn.mutateAsync({
//     token: externalToken,
//     provider: 'kakao',
//   })
//
//   if (errorMessage) handleError(errorMessage)
//   return <>please waiting...</>
// }
