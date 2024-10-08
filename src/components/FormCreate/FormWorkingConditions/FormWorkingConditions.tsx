import Dropdown from '@/components/Dropdown/Dropdown'
import Form from '@/components/Form/Form'
import { HOURLY_WAGE_DATA } from '@/lib/data/constants'
import {
  INITIAL_EDITING_FORM_DATA,
  VALUE_PRESET,
  useEditingFormStore,
} from '@/lib/stores/editingFormStore'
import {
  FormCreateStepProp,
  FormStep3,
  WorkDaysType,
} from '@/lib/types/formTypes'
import { ChangeEvent, useCallback, useEffect } from 'react'

import FormCreateStep from '../FormCreateStep/FormCreateStep'
import styles from './FormWorkingConditions.module.scss'

const FROM_NAME_LIST: (keyof FormStep3)[] = [
  'location',
  'workStartDate',
  'workEndDate',
  'workStartTime',
  'workEndTime',
  'workDays',
  'isNegotiableWorkDays',
  'hourlyWage',
  'isPublic',
]

export default function FormWorkingConditions({ step }: FormCreateStepProp) {
  const { formData, setFormData, setInProgress } = useEditingFormStore()

  const handleProgress = useCallback(() => {
    const isProgress = FROM_NAME_LIST.some((key) => {
      if (key === 'workDays') {
        return formData[key].length > 0
      } else {
        return formData[key] !== INITIAL_EDITING_FORM_DATA[key]
      }
    })
    setInProgress({ step, isProgress })
  }, [formData, step, setInProgress])

  useEffect(() => {
    handleProgress()
  }, [handleProgress])

  return (
    <FormCreateStep step={step}>
      <Form.Fieldset>
        <Form.Legend>
          근무 위치<span className={'required'}>*</span>
        </Form.Legend>
        <Form.Field>
          <Form.KakaoSearchInput
            name={'location'}
            placeholder={'주소 입력'}
            // required
          />
        </Form.Field>
      </Form.Fieldset>

      <Form.Fieldset>
        <Form.Legend>
          근무 기간<span className={'required'}>*</span>
        </Form.Legend>
        <Form.Field>
          <Form.DateRangePickerInput
            startDate={'workStartDate'}
            endDate={'workEndDate'}
            // required
          />
        </Form.Field>
      </Form.Fieldset>

      <Form.Fieldset>
        <Form.Legend>
          근무 시간<span className={'required'}>*</span>
        </Form.Legend>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ width: '210px' }}>
            <Form.Field hidden>
              <Form.Input
                type={'hidden'}
                name={'workStartTime'}
                value={formData.workStartTime}
                // required
              />
            </Form.Field>
            <Dropdown sustain>
              <Dropdown.Trigger>{formData.workStartTime}</Dropdown.Trigger>
              <Dropdown.Menu
                style={{
                  maxHeight: `${64 * 4}px`,
                  overflow: 'auto',
                }}
              >
                {VALUE_PRESET.workTime.map((value) => {
                  const checked =
                    value === formData.workStartTime ? 'selected' : ''
                  return (
                    <Dropdown.Item
                      key={`workStartTime-${value}`}
                      className={checked}
                      onClick={() => {
                        setFormData('workStartTime', value)
                      }}
                    >
                      {value}
                    </Dropdown.Item>
                  )
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div style={{ width: '210px' }}>
            <Form.Field hidden>
              <Form.Input
                type={'hidden'}
                name={'workEndTime'}
                value={formData.workEndTime}
                // required
              />
            </Form.Field>
            <Dropdown>
              <Dropdown.Trigger>{formData.workEndTime}</Dropdown.Trigger>
              <Dropdown.Menu
                style={{
                  maxHeight: `${64 * 4}px`,
                  overflow: 'auto',
                }}
              >
                {VALUE_PRESET.workTime.map((value) => {
                  const checked =
                    value === formData.workEndTime ? 'selected' : ''
                  return (
                    <Dropdown.Item
                      key={`workEndTime-${value}`}
                      className={checked}
                      onClick={() => {
                        setFormData('workEndTime', value)
                      }}
                    >
                      {value}
                    </Dropdown.Item>
                  )
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </Form.Fieldset>

      <Form.Fieldset>
        <Form.Legend>
          근무 요일<span className={'required'}>*</span>
        </Form.Legend>
        <div className={styles['day-of-week']}>
          {VALUE_PRESET.workDays.map((value) => {
            return (
              <Form.Field
                htmlFor={`checkbox-workDays-${value}`}
                key={`checkbox-workDays-${value}`}
              >
                <Form.Label>{value}</Form.Label>
                <Form.Input
                  type={'checkbox'}
                  name={'workDays'}
                  value={value}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const { checked } = event.target
                    if (checked) {
                      setFormData('workDays', [...formData.workDays, value])
                    } else {
                      setFormData(
                        'workDays',
                        formData.workDays.filter(
                          (day: WorkDaysType) => day !== value,
                        ),
                      )
                    }
                    return formData.workDays
                  }}
                  workDaysValue={formData.workDays}
                />
              </Form.Field>
            )
          })}
        </div>
        <Form.Field
          htmlFor={`checkbox-workDays-isNegotiableWorkDays`}
          className={styles.checkbox}
          isInline
        >
          <Form.Input
            type={'checkbox'}
            name={'isNegotiableWorkDays'}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setFormData('isNegotiableWorkDays', event.target.checked)
            }
          />
          <Form.Label>요일 협의 가능</Form.Label>
        </Form.Field>
      </Form.Fieldset>

      <Form.Fieldset>
        <Form.Legend>
          시급<span className={'required'}>*</span>
        </Form.Legend>
        <Form.Field>
          <Form.Wrap>
            <Form.Input
              type={'number'}
              name={'hourlyWage'}
              placeholder={`최저시급: ${HOURLY_WAGE_DATA.min} (${HOURLY_WAGE_DATA.as} 기준)`}
              value={formData.hourlyWage}
              min={HOURLY_WAGE_DATA.min}
              step={10}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setFormData('hourlyWage', Number(event.target.value))
              }
              // required
            ></Form.Input>
            <Form.Unit unit={'원'} />
          </Form.Wrap>
        </Form.Field>
      </Form.Fieldset>

      <Form.Fieldset>
        <Form.Legend>공개 설정</Form.Legend>
        <Form.Field htmlFor={'isPublic'} className={styles.checkbox} isInline>
          <Form.Wrap>
            <Form.Input
              type={'checkbox'}
              name={'isPublic'}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setFormData('isPublic', event.target.checked)
              }
            />
          </Form.Wrap>
          <Form.Label>공개</Form.Label>
        </Form.Field>
      </Form.Fieldset>
    </FormCreateStep>
  )
}
