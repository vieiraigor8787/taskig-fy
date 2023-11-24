'use client'

import { ElementRef, useRef, useState } from 'react'

import { Board } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/form/FormInput'

interface BoardTitleFormProps {
  data: Board
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const [isEditing, setIsEditing] = useState(false)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }
  const disabledEditing = () => {
    setIsEditing(false)
  }

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
  }

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  if (!isEditing) {
    return (
      <form action={onSubmit} ref={formRef} className="flex items-center gap-2">
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={() => {}}
          defaultValue={data.title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    )
  }

  return (
    <Button
      onClick={enableEditing}
      variant="transparent"
      className="font-bold text-lg h-auto bg-black/50 fixed top-14 flex items-center px-6 gap-4 text-white"
    >
      {data.title}
    </Button>
  )
}
