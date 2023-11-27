'use client'

import { ElementRef, useRef, useState } from 'react'
import { LayoutIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

import { useQueryClient } from '@tanstack/react-query'

import { CardWithList } from '@/types'
import { useAction } from '@/hooks/use-action'
import { updateCard } from '@/actions/update-card'
import { FormInput } from '@/components/form/FormInput'
import { Skeleton } from '@/components/ui/skeleton'

interface HeaderProps {
  data: CardWithList
}

export const Header = ({ data }: HeaderProps) => {
  const queryClient = useQueryClient()
  const params = useParams()

  const inputRef = useRef<ElementRef<'input'>>(null)

  const [title, setTitle] = useState(data.title)

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['card', data.id],
      })
      toast.success(`Renomeado para "${data.title}".`)
      setTitle(data.title)
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit()
  }

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const boardId = params.boardId as string

    if (title === data.title) return

    execute({ title, boardId, id: data.id })
  }

  return (
    <div className="flex items-center gap-3 mb-6 w-full">
      <LayoutIcon className="w-5 h-5 mt-1 text-neutral-700" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            defaultValue={title}
            className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
          />
        </form>
        <span className="text-sm text-muted-foreground underline">
          {data.list.title}
        </span>
      </div>
    </div>
  )
}

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-3 mb-6 w-full">
      <Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />
      <div className="">
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-12 h-4 bg-neutral-200" />
      </div>
    </div>
  )
}
