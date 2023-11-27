'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useCardModal } from '@/hooks/use-card-modal'

export const CardModal = () => {
  const cardModal = useCardModal()
  const isOpen = useCardModal((state) => state.isOpen)
  const onClose = useCardModal((state) => state.onClose)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent></DialogContent>
    </Dialog>
  )
}
