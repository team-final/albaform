import { FormDetailsProps } from '@/lib/types/formTypes'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import styles from './WorkScheduleInfo.module.scss'

const formatCurrency = (amount?: number) => {
  return amount !== undefined
    ? new Intl.NumberFormat('ko-KR').format(amount)
    : '0'
}

const formatDate = (dateString?: string, isResponsive: boolean = false) => {
  const date = new Date(dateString || new Date())
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }

  if (isResponsive) {
    return date.toLocaleDateString('ko-KR', {
      ...options,
      year: '2-digit', // 연도 2자리
    })
  }
  return date.toLocaleDateString('ko-KR', options)
}

export default function WorkScheduleInfo({
  formDetails,
}: {
  formDetails: FormDetailsProps
}) {
  const [isResponsive, setIsResponsive] = useState<boolean>(false)
  const wageFormatted = formatCurrency(formDetails?.hourlyWage)
  const workStartDate = formatDate(formDetails?.workStartDate, isResponsive)
  const workEndDate = formatDate(formDetails?.workEndDate, isResponsive)
  const [isNegotiableMessge, setIsNegotiableMessge] = useState<string>('')

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (formDetails?.isNegotiableWorkDays) {
      setIsNegotiableMessge('요일 협의 가능')
    } else {
      setIsNegotiableMessge('요일 협의 불가능')
    }
  }, [formDetails?.isNegotiableWorkDays])

  return (
    <section className={styles['work-schedule-info-container']}>
      <div className={styles['money-date-container']}>
        <div className={styles['work-schedule-info']}>
          <div className={styles['work-schedule-img-container']}>
            <Image
              src="/icons/ic-coins.svg"
              width={36}
              height={36}
              alt="시급 아이콘"
              className={styles['work-schedule-img']}
            />
          </div>
          <div className={styles['work-schedule-info-auth']}>
            <h3 className={styles['info-text']}>시급</h3>
            <span className={styles['info-content']}>{wageFormatted}원</span>
          </div>
        </div>

        <div className={styles['work-schedule-info']}>
          <div className={styles['work-schedule-img-container']}>
            <Image
              src="/icons/ic-calendar-clock.svg"
              width={36}
              height={36}
              alt="기간 아이콘"
              className={styles['work-schedule-img']}
            />
          </div>
          <div className={styles['work-schedule-info-auth']}>
            <h3 className={styles['info-text']}>기간</h3>
            <div className={styles['info-content-container']}>
              <span className={styles['info-content']}>{workStartDate}~</span>
              <span className={styles['info-content']}> {workEndDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles['days-time-container']}>
        <div className={styles['work-schedule-info']}>
          <div className={styles['work-schedule-img-container']}>
            <Image
              src="/icons/ic-calendar2.svg"
              width={36}
              height={36}
              alt="요일 아이콘"
              className={styles['work-schedule-img']}
            />
          </div>
          <div className={styles['work-schedule-info-auth']}>
            <h3 className={styles['info-text']}>요일</h3>
            <div className={styles['info-workday-container']}>
              <span className={styles['info-content']}>
                {formDetails?.workDays}
              </span>
              <span className={styles['info-content']}>
                {isNegotiableMessge}
              </span>
            </div>
          </div>
        </div>

        <div className={styles['work-schedule-info']}>
          <div className={styles['work-schedule-img-container']}>
            <Image
              src="/icons/ic-circle-clock.svg"
              width={36}
              height={36}
              alt="시간 아이콘"
              className={styles['work-schedule-img']}
            />
          </div>
          <div className={styles['work-schedule-info-auth']}>
            <h3 className={styles['info-text']}>시간</h3>
            <span className={styles['info-content']}>
              {formDetails?.workStartTime}~{formDetails?.workEndTime}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
