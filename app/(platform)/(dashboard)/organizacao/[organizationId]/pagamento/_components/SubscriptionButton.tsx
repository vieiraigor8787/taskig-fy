'use client'

import { stripeRedirect } from '@/actions/stripe-redirect'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { useProModal } from '@/hooks/use-pro-modal'
import { toast } from 'sonner'

interface SubscriptionButtonProps {
  isPro: boolean
}

export const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const promodal = useProModal()

  const { isLoading, execute } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onClick = () => {
    if (isPro) execute({})

    promodal.onOpen()
  }

  return (
    <Button onClick={onClick} disabled={isLoading} variant="primary">
      {isPro ? 'Gerencia sua assinatura' : 'Upgrade para Pró'}
    </Button>
  )
}
