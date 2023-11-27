'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useCardMobile } from '@/hooks/use-card-modal'

export const CardModal = () => {
  const cardModal = useCardMobile()
  const isOpen = useCardMobile((state) => state.isOpen)
  const onClose = useCardMobile((state) => state.onClose)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent></DialogContent>
    </Dialog>
  )
}
