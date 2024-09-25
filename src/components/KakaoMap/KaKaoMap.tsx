'use client'

import React, { useEffect, useRef, useState } from 'react'

import styles from './KakaoMap.module.scss'

interface Location {
  address: string
  name: string
}

interface KakaoMapProps {
  location: Location
}

declare global {
  interface Window {
    kakao: any
  }
}

const KakaoMap: React.FC<KakaoMapProps> = ({ location }) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapError, setMapError] = useState<string | null>(null)
  const apiKey = process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY

  useEffect(() => {
    const script = document.createElement('script')
    script.async = true
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`
    document.head.appendChild(script)

    const onLoadKakaoMap = () => {
      if (!window.kakao) {
        setMapError('카카오맵 에러')
        return
      }
      window.kakao.maps.load(() => {
        if (!mapRef.current) return

        try {
          const { Map, LatLng, Marker, CustomOverlay, services } =
            window.kakao.maps
          const options = {
            center: new LatLng(37.566826, 126.9786567),
            level: 3,
          }
          const map = new Map(mapRef.current, options)
          const geocoder = new services.Geocoder()
          geocoder.addressSearch(
            location.address,
            (result: any, status: any) => {
              if (status === services.Status.OK) {
                const coords = new LatLng(result[0].y, result[0].x)

                const marker = new Marker({
                  map,
                  position: coords,
                })

                marker.setMap(map)

                const customOverlay = new CustomOverlay({
                  position: coords,
                  content: `<div class="${styles['custom-overlay']}">
                                <span class="${styles['overlay-marker-text']}">${location.name}</span>
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
