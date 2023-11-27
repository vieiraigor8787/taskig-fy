'use client'

import { ElementRef, useRef, useState } from 'react'
import { AlignLeft } from 'lucide-react'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'

import { CardWithList } from '@/types'
import { useAction } from '@/hooks/use-action'
import { updateCard } from '@/actions/update-card'
import { Skeleton } from '@/components/ui/skeleton'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { FormTextarea } from '@/components/form-textarea'
import { FormSubmit } from '@/components/form/FormButton'
import { Button } from '@/components/ui/button'

interface DescriptionProps {
  data: CardWithList
}

export const Description = ({ data }: DescriptionProps) => {
  const queryClient = useQueryClient()
  const params = useParams()

  const [isEditing, setIsEditing] = useState(false)

  const texteareaRef = useRef<ElementRef<'textarea'>>(null)
  const formRef = useRef<ElementRef<'form'>>(null)

  const { execute } = useAction(updateCard, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['card', data.id],
      })
      toast.success(`Cartão "${data.title}" atualizado.`)
      disableEditing()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      texteareaRef.current?.focus()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') disableEditing()
  }

  useEventListener('keydown', onKeyDown)
  useOnClickOutside(formRef, disableEditing)

  const onSubmit = (formData: FormData) => {
    const description = formData.get('description') as string
    const boardId = params.boardId as string

    execute({ id: data.id, description, boardId })
  }

  return (
    <div className="flex items-start gap-3 w-full">
      <AlignLeft className="w-5 h-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Descrição</p>
        {isEditing ? (
          <form action={onSubmit} ref={formRef} className="">
            <FormTextarea
              ref={texteareaRef}
              id="description"
              className="w-full mt-2 mb-1"
              placeholder="Insira mais detalhes sobre este cartão..."
              defaultValue={data.description || undefined}
            />
            <div className="flex items-center gap-2">
              <FormSubmit>Salvar</FormSubmit>
              <Button
                type="button"
                onClick={disableEditing}
                size="sm"
                variant="ghost"
              >
                Cancelar
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role="button"
            className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
          >
            {data.description || 'Insira mais detalhes sobre este cartão...'}
          </div>
        )}
      </div>
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
