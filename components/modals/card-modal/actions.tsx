'use client'

import { Copy, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { CardWithList } from '@/types'

interface ActionsProps {
  data: CardWithList
}

export const Actions = ({ data }: ActionsProps) => {
  return (
    <div className="space-y-2 mt-2">
      <p className="text-sm font-semibold">Ações</p>
      <Button size="inline" variant="gray" className="w-full justify-start">
        <Copy className="h-4 w-4 mr-2" />
        Copiar
      </Button>
      <Button size="inline" variant="gray" className="w-full justify-start">
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
