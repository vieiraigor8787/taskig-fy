'use client'

import { Plus, X } from 'lucide-react'
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from 'react'
import { useParams } from 'next/navigation'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { useAction } from '@/hooks/use-action'
import { createCard } from '@/actions/create-card'

import { Button } from '@/components/ui/button'
import { FormTextarea } from '@/components/form-textarea'
import { FormSubmit } from '@/components/form/FormButton'
import { toast } from 'sonner'

interface CardFormProps {
  listId: string
  enableEditing: () => void
  disableEditing: () => void
  isEditing: boolean
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, isEditing, enableEditing, disableEditing }, ref) => {
    const params = useParams()
    const formRef = useRef<ElementRef<'form'>>(null)

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`Cartão "${data.title}" criado.`)
        formRef.current?.focus()
      },
      onError: (err) => {
        toast.error(err)
      },
    })

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') disableEditing()
    }

    useOnClickOutside(formRef, disableEditing)
    useEventListener('keydown', onKeyDown)

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      event
    ) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        formRef.current?.requestSubmit()
      }
    }

    const onSubmit = (formData: FormData) => {
      const title = formData.get('title') as string
      const listId = formData.get('listId') as string
      const boardId = params.boardId as string

      execute({ title, listId, boardId })
    }

    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={onSubmit}
          className="m-1 py-0.5 px-1 space-y-4"
        >
          <FormTextarea
            onKeyDown={onTextareaKeyDown}
            errors={fieldErrors}
            id="title"
            ref={ref}
            placeholder="Adicionar um título para o cartão"
          />
          <input hidden id="listId" name="listId" value={listId} />
          <div className="flex items-center gap-1">
            <FormSubmit>Adicionar cartão</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </form>
      )
    }

    return (
      <div className="pt-2 px-2">
        <Button
          onClick={enableEditing}
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
          variant="ghost"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar um cartão
        </Button>
      </div>
    )
  }
)

CardForm.displayName = 'CardForm'
