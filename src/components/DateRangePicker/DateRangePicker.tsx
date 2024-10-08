import { useEditingFormStore } from '@/lib/stores/editingFormStore'
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
  startDate: string | any
  endDate: string | any
  setFocus: any
  startDateVal?: any
  endDateVal?: any
}

export default function DateRangePicker({
  startDate,
  endDate,
  setFocus,
  startDateVal,
  endDateVal,
}: DateRangePickerProps) {
  const { setFormData } = useEditingFormStore()

  const handleChange: DatePickerProps['onChange'] = (_, dateStr) => {
    setFormData(startDate, dateStr[0])
    setFormData(endDate, dateStr[1])
  }

  const valueArr: any = startDateVal &&
    endDateVal && [
      dayjs(startDateVal, 'YYYY-MM-DD'),
      dayjs(endDateVal, 'YYYY-MM-DD'),
    ]

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
        value={valueArr}
      />
    </ConfigProvider>
  )
}
