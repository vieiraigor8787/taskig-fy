'use client'

import { useEffect, useState } from 'react'
import { CardModal } from '../modals/card-modal'

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) null

  return (
    <>
      <CardModal />
    </>
  )
}
