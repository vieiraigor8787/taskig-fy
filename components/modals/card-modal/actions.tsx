'use client'

import { Copy, Trash } from 'lucide-react'
import { useParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { CardWithList } from '@/types'
import { useAction } from '@/hooks/use-action'
import { copyCard } from '@/actions/copy-card'
import { deleteCard } from '@/actions/delete-card'
import { useCardModal } from '@/hooks/use-card-modal'
import { toast } from 'sonner'

interface ActionsProps {
  data: CardWithList
}

export const Actions = ({ data }: ActionsProps) => {
  const params = useParams()
  const cardModal = useCardModal()

  const { execute: executeCopy, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Cartão "${data.title}" copiado.`)
        cardModal.onClose()
      },
      onError: (error) => {
        toast.error(error)
      },
    }
  )

  const { execute: executeDelete, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Cartão "${data.title}" excluído.`)
        cardModal.onClose()
      },
      onError: (error) => {
        toast.error(error)
      },
    }
  )

  const onCopy = () => {
    const boardId = params.boardId as string

    executeCopy({ boardId, id: data.id })
  }

  const onDelete = () => {
    const boardId = params.boardId as string

    executeDelete({ boardId, id: data.id })
  }

  return (
    <div className="space-y-2 mt-2">
      <p className="text-sm font-semibold">Ações</p>
      <Button
        onClick={onCopy}
        disabled={isLoadingCopy}
        size="inline"
        variant="gray"
        className="w-full justify-start"
      >
        <Copy className="h-4 w-4 mr-2" />
        Copiar
      </Button>
      <Button
        onClick={onDelete}
        disabled={isLoadingDelete}
        size="inline"
        variant="gray"
        className="w-full justify-start"
      >
        <Trash className="h-4 w-4 mr-2" />
        Excluir
      </Button>
    </div>
  )
}

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  )
}
