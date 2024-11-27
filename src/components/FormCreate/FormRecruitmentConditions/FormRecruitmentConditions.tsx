import Dropdown from '@/components/Dropdown/Dropdown'
import Form from '@/components/Form/Form'
import {
  monthsOfExperienceValidation,
  validateAge,
} from '@/lib/data/validations'
import {
  INITIAL_EDITING_FORM_DATA,
  VALUE_PRESET,
  useEditingFormStore,
} from '@/lib/stores/editingFormStore'
import { FormCreateStepProp, FormStep2 } from '@/lib/types/formTypes'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import FormCreateStep from '../FormCreateStep/FormCreateStep'

const FORM_NAME_LIST: (keyof FormStep2)[] = [
  'numberOfPositions',
  'gender',
  'education',
  'age',
  'preferred',
]

const omitCustomOption = (array: readonly string[]) =>
  array.filter((item) => item !== '직접입력')

export default function FormRecruitmentConditions({
  step,
}: FormCreateStepProp) {
  const { formData, setFormData, setInProgress } = useEditingFormStore()

  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({
    numberOfPositions:
      VALUE_PRESET.numberOfPositions[0] || formData.numberOfPositions,
    age: VALUE_PRESET.age[0] || formData.age,
    preferred: VALUE_PRESET.preferred[0] || formData.preferred,
  })

  const handleProgress = useCallback(() => {
    const isProgress = FORM_NAME_LIST.some(
      (key) => formData[key] !== INITIAL_EDITING_FORM_DATA[key],
    )
    const updateFormState = () => {
      setSelectedValues(() =>
        ['numberOfPositions', 'age', 'preferred'].reduce(
          (acc: any, key: any) => {
            // @ts-ignore
            acc[key] = omitCustomOption(VALUE_PRESET[key]).includes(
              formData[key],
            )
              ? formData[key]
              : '직접입력'
            return acc
          },
          {},
        ),
      )
    }

    setInProgress({ step, isProgress })
    updateFormState()
  }, [formData, step, setInProgress])

  useEffect(() => {
    handleProgress()
  }, [handleProgress])

  return (
    <FormCreateStep step={step}>
      <Form.Fieldset>
        <Form.Legend>모집인원</Form.Legend>
        <Dropdown>
          <Dropdown.Trigger>
            {selectedValues.numberOfPositions}
          </Dropdown.Trigger>
          <Dropdown.Menu>
            {VALUE_PRESET.numberOfPositions.map((value) => {
              const checked =
                value === selectedValues.numberOfPositions ? 'selected' : ''
              return (
                <Dropdown.Item
                  key={`numberOfPositions-${value}`}
                  className={checked}
                  onClick={() => {
                    setFormData(
                      'numberOfPositions',
                      value === '직접입력' ? 0 : value,
                    )
                  }}
                >
                  {value}
                </Dropdown.Item>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>
        <Form.Field hidden={selectedValues.numberOfPositions !== '직접입력'}>
          <Form.Wrapper>
            <Form.Input
              formRequired
              type={'number'}
              name={'numberOfPositions'}
              placeholder={'모집인원'}
              // formMinLength={2}
              // formPattern={numberOfPositionsValidation}
            />
            <Form.Unit unit={'명'} />
          </Form.Wrapper>
        </Form.Field>
      </Form.Fieldset>

      <Form.Fieldset>
        <Form.Legend>성별</Form.Legend>
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
        <Form.Legend>학력</Form.Legend>
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
        <Form.Legend>연령</Form.Legend>
        <Dropdown>
          <Dropdown.Trigger>{selectedValues.age}</Dropdown.Trigger>
          <Dropdown.Menu>
            {VALUE_PRESET.age.map((value) => {
              const checked = value === selectedValues.age ? 'selected' : ''
              return (
                <Dropdown.Item
                  key={`age-${value}`}
                  className={checked}
                  onClick={() => {
                    setFormData('age', value === '직접입력' ? '0' : value)
                  }}
                >
                  {value}
                </Dropdown.Item>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>
        <Form.Field hidden={selectedValues.age !== '직접입력'}>
          <Form.Wrapper>
            <Form.Input
              name={'age'}
              placeholder={'연령'}
              validate={validateAge}
              formPattern={monthsOfExperienceValidation}
              formMin={13}
            />
            <Form.Unit unit={'세'} />
          </Form.Wrapper>
        </Form.Field>
      </Form.Fieldset>

      <Form.Fieldset>
        <Form.Legend>우대사항</Form.Legend>
        <Dropdown>
          <Dropdown.Trigger>{selectedValues.preferred}</Dropdown.Trigger>
          <Dropdown.Menu>
            {VALUE_PRESET.preferred.map((value) => {
              const checked =
                value === selectedValues.preferred ? 'selected' : ''
              return (
                <Dropdown.Item
                  key={`preferred-${value}`}
                  className={checked}
                  onClick={() => {
                    setFormData('preferred', value === '직접입력' ? '' : value)
                  }}
                >
                  {value}
                </Dropdown.Item>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>

        <Form.Field hidden={selectedValues.preferred !== '직접입력'}>
          <Form.Wrapper>
            <Form.Input
              name={'preferred'}
              placeholder={'우대사항'}
              value={formData.preferred}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setFormData('preferred', event.target.value)
              }
            />
          </Form.Wrapper>
        </Form.Field>
      </Form.Fieldset>
    </FormCreateStep>
  )
}
