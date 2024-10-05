import { useFormCreateStore } from '@/lib/stores/formCreateStore'
import { ConfigProvider, DatePicker, DatePickerProps } from 'antd'
import ko from 'antd/es/date-picker/locale/ko_KR'
import koKR from 'antd/es/locale/ko_KR'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import styles from './DateRangePicker.module.scss'

const buddhistLocale: typeof ko = {
  ...ko,
  lang: {
    ...ko.lang,
    fieldDateFormat: 'YYYY-MM-DD',
    fieldDateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
    yearFormat: 'YYYY',
    cellYearFormat: 'YYYY',
  },
}

const globalBuddhistLocale: typeof koKR = {
  ...koKR,
  DatePicker: {
    ...koKR.DatePicker!,
    lang: buddhistLocale.lang,
  },
}

dayjs.extend(customParseFormat)

interface DateRangePickerProps {
  startDate: string
  endDate: string
  setValue: (key: string, value: string) => void
  setFocus: any
}

export default function DateRangePicker({
  startDate,
  endDate,
  setValue,
  setFocus,
}: DateRangePickerProps) {
  const { setFormData } = useFormCreateStore()

  const handleChange: DatePickerProps['onChange'] = (_, dateStr) => {
    setValue(startDate, dateStr[0])
    setValue(endDate, dateStr[1])
    setFormData(startDate, dateStr[0])
    setFormData(endDate, dateStr[1])
  }

  return (
    <ConfigProvider locale={globalBuddhistLocale}>
      <DatePicker.RangePicker
        className={styles.custom}
        onChange={(_, dateStr) => {
          handleChange(dayjs(), dateStr)
        }}
        onBlur={() => {
          if (setFocus) {
            setFocus(startDate)
            setFocus(endDate)
          }
        }}
      />
    </ConfigProvider>
  )
}
