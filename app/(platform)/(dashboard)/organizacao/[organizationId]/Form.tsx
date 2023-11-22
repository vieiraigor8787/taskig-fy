'use client'

import { createBoard } from '@/actions/create-board'
import { useAction } from '@/hooks/use-action'

import { FormInput } from './form-input'
import { FormButton } from './form-button'

export const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard)

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string

    execute({ title })
  }

  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput errors={fieldErrors} />
      </div>
      <FormButton />
    </form>
  )
}
