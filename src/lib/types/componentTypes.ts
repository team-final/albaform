import { ReactNode } from 'react'

export interface AlertModalProps {
  contentType: 'delete' | 'done' | 'writing'
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  onOpen?: () => void
  content?: {
    title: string
    description: string
    buttonText: string
    buttonText2?: string
    icon: ReactNode
    showSecondButton: boolean
  }
}
