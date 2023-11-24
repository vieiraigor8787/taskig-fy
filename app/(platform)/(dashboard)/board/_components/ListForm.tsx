'use client'

import { ElementRef, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { Plus, X } from 'lucide-react'
import { toast } from 'sonner'

import { useAction } from '@/hooks/use-action'
import { createList } from '@/actions/create-list'
import { FormInput } from '@/components/form/FormInput'
import { FormSubmit } from '@/components/form/FormButton'
import { Button } from '@/components/ui/button'

import { ListWrapper } from './ListWrapper'

export const ListForm = () => {
  const params = useParams()
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const { fieldErrors, execute } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`Lista "${data.title}" criada.`)
      disableEditing()
      router.refresh()
    },
    onError: (err) => {
      toast.error(err)
    },
  })

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') disableEditing()
  }

  useEventListener('keydown', onKeyDown)
  useOnClickOutside(formRef, disableEditing)

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const boardId = formData.get('boardId') as string

    execute({ title, boardId })
  }

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-mdf bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            id="title"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transperent"
            placeholder="Insira um nome"
          />
          <input hidden value={params.boardId} name="boardId" />
          <div className="flex items-center justify-between gap-1">
            <FormSubmit>Adicionar lista</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    )
  }

  return (
    <ListWrapper>
      <form className="w-full p-3 rounded-md bg-white space-y-4 shadow-md">
        <button
          onClick={enableEditing}
          className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar uma lista
        </button>
      </form>
    </ListWrapper>
  )
}
