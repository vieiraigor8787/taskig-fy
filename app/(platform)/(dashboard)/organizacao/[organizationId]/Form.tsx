'use client'

import { createBoard } from '@/actions/create-board'
import { useAction } from '@/hooks/use-action'

import { FormInput } from '@/components/form/FormInput'
import { FormSubmit } from '@/components/form/FormButton'

export const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard)

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    console.log({ title })
    execute({ title })
  }

  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput id="title" errors={fieldErrors} />
      </div>
      <FormSubmit>Salvar</FormSubmit>
    </form>
  )
}
