import FormStyles from '@/app/form/create/page.module.scss'
import Dropdown from '@/components/Dropdown/Dropdown'
import Form from '@/components/Form/Form'
import {
  VALUE_PRESET,
  hourlyWageData,
  useFormCreateStore,
} from '@/lib/stores/useFormCreate'

export default function FormWorkingConditions() {
  const { formData, setFormData } = useFormCreateStore()

  return (
    <>
      <Form.Fieldset>
        <Form.Legend>
          근무 위치<span className={'required'}>*</span>
        </Form.Legend>
        <Form.Field>
          <Form.KakaoSearchInput
            name={'location'}
            placeholder={'주소 입력'}
            required
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
          />
        </Form.Field>
      </Form.Fieldset>

      <Form.Fieldset>
        <Form.Legend>
          근무 시간<span className={'required'}>*</span>
        </Form.Legend>
        {/*
          "workStartTime": "string", // 근무 시간 시작
          "workEndTime": "string", // 근무 시간 종료
        */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ width: '210px' }}>
            <Form.Field hidden>
              <Form.Input
                type={'hidden'}
                name={'workStartTime'}
                value={formData.workStartTime}
              />
            </Form.Field>
            <Dropdown sustain>
              <Dropdown.Trigger>{formData.workStartTime}</Dropdown.Trigger>
              <Dropdown.Menu
                style={{
                  maxHeight: `${64 * 3}px`,
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
              />
            </Form.Field>
            <Dropdown>
              <Dropdown.Trigger>{formData.workEndTime}</Dropdown.Trigger>
              <Dropdown.Menu
                style={{
                  maxHeight: `${64 * 3}px`,
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
        <div className={FormStyles['form-day-of-week']}>
          {/*
           * @todo
           * checkbox 체크 될 때 리렌더링 되서 체크가 안됨..!!
           */}
          {VALUE_PRESET.workDays.map((value) => {
            return (
              <Form.Field
                htmlFor={`checkbox-workDays-${value}`}
                key={`checkbox-workDays-${value}`}
              >
                <Form.Label>{value}</Form.Label>
                <Form.Input type={'checkbox'} name={'workDays'} value={value} />
              </Form.Field>
            )
          })}
        </div>
        <Form.Field
          htmlFor={`checkbox-workDays-isNegotiableWorkDays`}
          className={FormStyles['form-checkbox']}
        >
          <Form.Input type={'checkbox'} name={'isNegotiableWorkDays'} />
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
              placeholder={`최저시급: ${hourlyWageData.min} (${hourlyWageData.as} 기준)`}
              value={hourlyWageData.min}
              min={hourlyWageData.min}
              step={10}
              // required
            ></Form.Input>
            <Form.Unit unit={'원'} />
          </Form.Wrap>
        </Form.Field>
      </Form.Fieldset>

      <Form.Fieldset>
        <Form.Legend>공개 설정</Form.Legend>
        <Form.Field
          htmlFor={'isPublic'}
          className={FormStyles['form-checkbox']}
        >
          <Form.Wrap>
            <Form.Input type={'checkbox'} name={'isPublic'} />
          </Form.Wrap>
          <Form.Label>공개</Form.Label>
        </Form.Field>
      </Form.Fieldset>
    </>
  )
}
