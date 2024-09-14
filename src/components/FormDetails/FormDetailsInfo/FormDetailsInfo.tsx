import Image from 'next/image'

import AnnouncementInfo from '../AnnouncementInfo/AnnouncementInfo'
import ContactInfo from '../ContactInfo/ContactInfo'
import styles from './JobDetailsInfo.module.scss'

// import WorkScheduleInfo from "../WorkScheduleInfo/WorkScheduleInfo";

const JobDetailsInfo = () => {
  return (
    <div className={styles['job-details-info']}>
      <AnnouncementInfo />

      <div className={styles['job-details-container']}>
        <div className={styles['job-details-header-container']}>
          <div className={styles['job-details-header']}>
            <span className={styles['job-details-name']}>코드잇</span>
            <div className={styles['job-details-summary']}>
              <span>서울 종로구 경력 무관</span>
            </div>
          </div>

          <h1 className={styles['job-details-title']}>
            코드잇 스터디카페관리 모집합니다
          </h1>
        </div>

        <div className={styles['job-details-status-container']}>
          <div className={styles['job-details-status-auth']}>
            <div className={styles['job-details-auth-item']}>
              <Image
                src="/icons/ic-plus.svg"
                alt="기본 이미지"
                width="36"
                height="36"
                className={styles['job-details-auth-item-img']}
              />
              <span className={styles['auth-title']}>스크랩</span>
            </div>
            <span className={styles['auth-content']}>8회</span>
          </div>

          <div className={styles['job-details-status-auth']}>
            <div className={styles['job-details-auth-item']}>
              <Image
                src="/icons/ic-plus.svg"
                alt="기본 이미지"
                width="36"
                height="36"
                className={styles['job-details-auth-item-img']}
              />
              <span className={styles['auth-title']}>지원현황</span>
            </div>
            <span className={styles['auth-content']}>
              현재까지 5명이 알바폼에 지원했어요!
            </span>
          </div>
        </div>

        <div className={styles['tablet-schedule-contact']}>
          <div className={styles['tablet-workschedule-info']}>
            {/* <WorkScheduleInfo /> */}
          </div>

          <div className={styles['tablet-contact-info']}>
            <ContactInfo />
          </div>
        </div>

        <p className={styles['job-details-description']}>
          코드잇 스터디 카페입니다. 주말 토,일 오픈 업무 하실 분 구합니다. 길이
          테스트테스트 테스트트ㅔ스ㅔㅡ테ㅡ스트세ㅡ트ㅡ세우리집 강아지는 김짜장
          나이는ㄴ 10살 생일은 7월 25일 내 생일은 9월 16일 그 다음 날 추석
          우하하하ㅏㅎ하 나는 학교 가기 싫다 지금 학교야 사실 너무 잠온다 자고
          싶다 코드잇 스터디 카페입니다. 주말 토,일 오픈 업무 하실 분 구합니다.
          길이 테스트테스트 테스트트ㅔ스ㅔㅡ테ㅡ스트세ㅡ트ㅡ세우리집 강아지는
          김짜장 나이는ㄴ 10살 생일은 7월 25일 내 생일은 9월 16일 그 다음 날
          추석 우하하하ㅏㅎ하 나는 학교 가기 싫다 지금 학교야 사실 너무 잠온다
          자고 싶다 코드잇 스터디 카페입니다. 주말 토,일 오픈 업무 하실 분
          구합니다. 길이 테스트테스트 테스트트ㅔ스ㅔㅡ테ㅡ스트세ㅡ트ㅡ세우리집
          강아지는 김짜장 나이는ㄴ 10살 생일은 7월 25일 내 생일은 9월 16일 그
          다음 날 추석 우하하하ㅏㅎ하 나는 학교 가기 싫다 지금 학교야 사실 너무
          잠온다 자고 싶다 점심으로 짜장면 먹었더니 배가 부르다 왜냐면 많이
          먹었기 때문이지 오늘 저녁에 축구한다 야구도 해 난 요새 야구가 더 좋아
          왜냐면 강인이가 연애하니까 ㅡㅡ 참나 아아아
        </p>
      </div>
    </div>
  )
}

export default JobDetailsInfo
