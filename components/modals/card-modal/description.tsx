'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { CardWithList } from '@/types'
import { AlignLeft } from 'lucide-react'

interface DescriptionProps {
  data: CardWithList
}

export const Description = ({ data }: DescriptionProps) => {
  return (
    <div className="flex items-start gap-3 w-full">
      <AlignLeft className="w-5 h-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Descrição</p>
        <div
          role="button"
          className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
        >
          {data.description || 'Adicione mais detalhes sobre este cartão'}
        </div>
      </div>
      {data.description}
    </div>
  )
}

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex items-start gap-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="h-24 w-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-[78px] bg-neutral-200" />
      </div>
    </div>
  )
}
