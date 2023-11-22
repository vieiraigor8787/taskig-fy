'use client'

import { useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/button'

export const FormDelete = () => {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending} variant="destructive" size="sm" type="submit">
      Excluir
    </Button>
  )
}
