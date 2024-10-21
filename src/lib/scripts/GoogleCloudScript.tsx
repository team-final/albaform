import Script from 'next/script'

export default function GoogleCloudScript() {
  return (
    <>
      <Script
        src={'https://www.gstatic.com/firebasejs/8.0/firebase.js'}
        crossOrigin="anonymous"
        async
      />
    </>
  )
}
