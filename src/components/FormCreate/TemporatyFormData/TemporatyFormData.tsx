import { TEMP_CREATE_FORM } from '@/lib/data/constants'
import { useEditingFormStore } from '@/lib/stores/editingFormStore'
import { useUserStore } from '@/lib/stores/userStore'
import { EditingFormData, TempEditingFormType } from '@/lib/types/formTypes'
import type { DropdownProps, MenuProps } from 'antd'
import { Button, Dropdown, Flex } from 'antd'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { FieldValues } from 'react-hook-form'

import styles from './TemporatyFormData.module.scss'

export default function TemporatyFormData() {
  const { user } = useUserStore()
  const {
    setFormData,
    temporaryFormDatas,
    setTemporaryFormData,
    delTemporaryFormData,
  } = useEditingFormStore()

  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<MenuProps['items']>()

  const handleTempCreateFormList = useCallback(() => {
    const getTempCreateFormList: TempEditingFormType[] = JSON.parse(
      localStorage[TEMP_CREATE_FORM] ?? '[]',
    )
    setTemporaryFormData(getTempCreateFormList)
  }, [setTemporaryFormData])

  const deleteTempCreateFormList = useCallback(
    (tempFormData: TempEditingFormType) => {
      delTemporaryFormData(tempFormData)
    },
    [delTemporaryFormData],
  )

  const injectFormData = useCallback(
    (formData: EditingFormData | FieldValues | any) => {
      for (const key in formData) {
        if (key === 'imageUrls') {
          setFormData(
            key,
            typeof formData[key] === 'string'
              ? JSON.parse(formData[key])
              : formData[key],
          )
        } else {
          setFormData(key, formData[key])
        }
      }
    },
    [setFormData],
  )

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpen(nextOpen)
    }
  }

  useEffect(() => {
    if (user === null) return
    const { id } = user

    const temporaryFormDatasById = temporaryFormDatas.filter(
      (item) => item.id === id,
    )

    setItems(
      temporaryFormDatasById.map((item, index) => ({
        key: String(index),
        label: (
          <Flex
            className={styles['temporary-form-data-list']}
            onClick={() => {
              injectFormData(item.formData)
            }}
            justify={'space-between'}
            align={'center'}
            gap={8}
            style={{ width: '100%' }}
          >
            <Flex vertical>
              <p>{item.formData.title}</p>
              <p>{item.createAt}</p>
            </Flex>
            <Button
              color={'danger'}
              variant={'text'}
              onClick={() => {
                deleteTempCreateFormList(item)
              }}
              icon={
                <Image
                  src={'/icons/ic-trash-can.svg'}
                  alt={'임시저장 삭제 아이콘'}
                  fill
                />
              }
              style={{
                minWidth: 'auto',
                minHeight: 'auto',
              }}
            />
          </Flex>
        ),
      })),
    )
  }, [deleteTempCreateFormList, injectFormData, user, temporaryFormDatas])

  useEffect(() => {
    handleTempCreateFormList()
  }, [handleTempCreateFormList])

  return (
    <Flex justify={'flex-end'}>
      {items && items.length > 0 && (
        <Dropdown
          className={styles.button}
          placement={'top'}
          menu={{ items, selectable: true }}
          open={open}
          onOpenChange={handleOpenChange}
        >
          <Button color={'primary'} variant={'text'} size={'large'}>
            저장된 폼이 있어요! ( {items.length} )
          </Button>
        </Dropdown>
      )}
    </Flex>
  )
}
