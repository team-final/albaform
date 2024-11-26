import { useState } from 'react'

interface ModalState {
  modalName: string | null
  modalProps?: Record<string, any> | null
}

export function useModal() {
  const [modalState, setModalState] = useState<ModalState>({
    modalName: null,
    modalProps: null,
  })

  const openModal = (
    modalName: string,
    modalProps: Record<string, any> = {},
  ) => {
    setModalState({ modalName, modalProps })
  }

  const closeModal = () => {
    setModalState({ modalName: null, modalProps: null })
  }

  return {
    modalName: modalState.modalName,
    modalProps: modalState.modalProps,
    openModal,
    closeModal,
  }
}
