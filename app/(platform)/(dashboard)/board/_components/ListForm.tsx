'use client'

import { ElementRef, useRef, useState } from 'react'
import { PlusIcon } from 'lucide-react'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { FormInput } from '@/components/form/FormInput'

import { ListWrapper } from './ListWrapper'

export const ListForm = () => {
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
          />
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
          <PlusIcon className="w-4 h-4 mr-2" />
          Adicionar uma lista
        </button>
      </form>
    </ListWrapper>
  )
}
