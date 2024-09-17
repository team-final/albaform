import React, { useEffect, useRef, useState } from 'react'

import styles from './KakaoMap.module.scss'

interface Location {
  address: string
  name: string
}

interface KakaoMapProps {
  apiKey: string
  location: Location
}

declare global {
  interface Window {
    kakao: any
  }
}

const KakaoMap: React.FC<KakaoMapProps> = ({ apiKey, location }) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.async = true
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`
    document.head.appendChild(script)

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current) return

        try {
          const options = {
            center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
            level: 3,
          }
          const map = new window.kakao.maps.Map(mapRef.current, options)

          const geocoder = new window.kakao.maps.services.Geocoder()
          geocoder.addressSearch(
            location.address,
            (result: any, status: any) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const coords = new window.kakao.maps.LatLng(
                  result[0].y,
                  result[0].x,
                )

                const marker = new window.kakao.maps.Marker({
                  map,
                  position: coords,
                })

                marker.setMap(map)

                const customOverlay = new window.kakao.maps.CustomOverlay({
                  position: coords,
                  content: `<div class="${styles['custom-overlay']}">
                                <span class="${styles['marker-text']}">${location.name}</span>
                              </div>`,
                  yAnchor: 1,
                })

                customOverlay.setMap(map)

                map.setCenter(coords)
              } else {
                setMapError('주소를 찾을 수 없습니다.')
              }
            },
          )
        } catch (error) {
          console.error('카카오맵 초기화 중 오류 발생:', error)
        }
      })
    }

    script.addEventListener('load', onLoadKakaoMap)

    return () => {
      script.removeEventListener('load', onLoadKakaoMap)
      document.head.removeChild(script)
    }
  }, [apiKey, location])

  if (mapError) {
    return <div>Error: {mapError}</div>
  }

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
}

export default KakaoMap
