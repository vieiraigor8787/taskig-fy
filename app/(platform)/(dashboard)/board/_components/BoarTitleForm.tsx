'use client'

import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'

import { Board } from '@prisma/client'
import { updateBoard } from '@/actions/update-board'
import { useAction } from '@/hooks/use-action'
import { FormInput } from '@/components/form/FormInput'
import { Button } from '@/components/ui/button'

interface BoardTitleFormProps {
  data: Board
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" atualizado.`)
      setTitle(data.title)
      disabledEditing()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const [title, setTitle] = useState(data.title)
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

    if (title === data.title) {
      return disabledEditing()
    }
    execute({ title, id: data.id })
  }

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  if (isEditing) {
    return (
      <form action={onSubmit} ref={formRef} className="flex items-center gap-2">
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
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
      {title}
    </Button>
  )
}
