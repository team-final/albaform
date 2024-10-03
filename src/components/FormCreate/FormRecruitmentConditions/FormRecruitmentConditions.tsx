import Dropdown from '@/components/Dropdown/Dropdown'
import Form from '@/components/Form/Form'
import { VALUE_PRESET, useFormCreateStore } from '@/lib/stores/useFormCreate'
import {
  AgeType,
  NumberOfPositionsType,
  PreferredType,
} from '@/lib/types/types'
import { useState } from 'react'

export default function FormRecruitmentConditions() {
  const { formData, setFormData } = useFormCreateStore()

  const [numberOfPositions, setNumberOfPositions] =
    useState<NumberOfPositionsType>('00명 (인원미정)')
  const [age, setAge] = useState<AgeType>('20세 ~ 29세')
  const [preferred, setPreferred] = useState<PreferredType>('없음')

  return (
    <>
      <Form.Fieldset>
        <Form.Legend>
          모집인원<span className={'required'}>*</span>
        </Form.Legend>
        <Dropdown>
          <Dropdown.Trigger>{numberOfPositions}</Dropdown.Trigger>
          <Dropdown.Menu>
            {VALUE_PRESET.numberOfPositions.map((value) => {
              const checked = value === numberOfPositions ? 'selected' : ''
              return (
                <Dropdown.Item
                  key={`numberOfPositions-${value}`}
                  className={checked}
                  onClick={() => {
                    setNumberOfPositions(value)
                    setFormData(
                      'numberOfPositions',
                      value === '직접입력' ? '' : value,
                    )
                  }}
                >
                  {value}
                </Dropdown.Item>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>
        <Form.Field hidden={numberOfPositions !== '직접입력'}>
          <Form.Wrap>
            <Form.Input
              name={'numberOfPositions'}
              placeholder={'모집인원'}
              value={formData.numberOfPositions}
              onChange={(event) =>
                setFormData('numberOfPositions', event.target.value)
              }
            />
            <Form.Unit unit={'명'} />
          </Form.Wrap>
        </Form.Field>
      </Form.Fieldset>

      <Form.Fieldset>
        <Form.Legend>
          성별<span className={'required'}>*</span>
        </Form.Legend>
        {/* gender: string */}
        <Dropdown>
          <Dropdown.Trigger>{formData.gender}</Dropdown.Trigger>
          <Dropdown.Menu>
            {VALUE_PRESET.gender.map((value) => {
              const checked = value === formData.gender ? 'selected' : ''
              return (
                <Dropdown.Item
                  key={`gender-${value}`}
                  className={checked}
                  onClick={() => {
                    setFormData('gender', value)
                  }}
                >
                  {value}
                </Dropdown.Item>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>
        <Form.Field hidden>
          <Form.Input type={'hidden'} name={'gender'} value={formData.gender} />
        </Form.Field>
      </Form.Fieldset>

      <Form.Fieldset>
        <Form.Legend>
          학력<span className={'required'}>*</span>
        </Form.Legend>
        <Dropdown>
          <Dropdown.Trigger>{formData.education}</Dropdown.Trigger>
          <Dropdown.Menu>
            {VALUE_PRESET.education.map((value) => {
              const checked = value === formData.education ? 'selected' : ''
              return (
                <Dropdown.Item
                  key={`education-${value}`}
                  className={checked}
                  onClick={() => {
                    setFormData('education', value)
                  }}
                >
                  {value}
                </Dropdown.Item>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>
        <Form.Field hidden>
          <Form.Input
            type={'hidden'}
            name={'education'}
            value={formData.education}
          />
        </Form.Field>
      </Form.Fieldset>

      <Form.Fieldset>
        <Form.Legend>
          연령<span className={'required'}>*</span>
        </Form.Legend>
        <Dropdown>
          <Dropdown.Trigger>{age}</Dropdown.Trigger>
          <Dropdown.Menu>
            {VALUE_PRESET.age.map((value) => {
              const checked = value === age ? 'selected' : ''
              return (
                <Dropdown.Item
                  key={`age-${value}`}
                  className={checked}
                  onClick={() => {
                    setAge(value)
                    setFormData('age', value === '직접입력' ? '' : value)
                  }}
                >
                  {value}
                </Dropdown.Item>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>
        <Form.Field hidden={age !== '직접입력'}>
          <Form.Wrap>
            <Form.Input
              name={'age'}
              placeholder={'연령'}
              value={formData.age}
              onChange={(event) => setFormData('age', event.target.value)}
            />
            <Form.Unit unit={'세'} />
          </Form.Wrap>
        </Form.Field>
      </Form.Fieldset>

      <Form.Fieldset>
        <Form.Legend>
          우대사항<span className={'required'}>*</span>
        </Form.Legend>
        <Dropdown>
          <Dropdown.Trigger>{preferred}</Dropdown.Trigger>
          <Dropdown.Menu>
            {VALUE_PRESET.preferred.map((value) => {
              const checked = value === preferred ? 'selected' : ''
              return (
                <Dropdown.Item
                  key={`preferred-${value}`}
                  className={checked}
                  onClick={() => {
                    setPreferred(value)
                    setFormData('preferred', value === '직접입력' ? '' : value)
                  }}
                >
                  {value}
                </Dropdown.Item>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>
        <Form.Field hidden={preferred !== '직접입력'}>
          <Form.Wrap>
            <Form.Input
              name={'preferred'}
              placeholder={'우대사항'}
              value={formData.preferred}
              onChange={(event) => setFormData('preferred', event.target.value)}
            />
          </Form.Wrap>
        </Form.Field>
      </Form.Fieldset>
    </>
  )
}
