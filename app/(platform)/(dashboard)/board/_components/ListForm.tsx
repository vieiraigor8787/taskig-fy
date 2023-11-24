'use client'

import { ElementRef, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { Plus, X } from 'lucide-react'

import { FormInput } from '@/components/form/FormInput'
import { FormSubmit } from '@/components/form/FormButton'
import { Button } from '@/components/ui/button'

import { ListWrapper } from './ListWrapper'

export const ListForm = () => {
  const params = useParams()

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

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') disableEditing()
  }

  useEventListener('keydown', onKeyDown)
  useOnClickOutside(formRef, disableEditing)

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          ref={formRef}
          className="w-full p-3 rounded-mdf bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
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
