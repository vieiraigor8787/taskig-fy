'use server'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'

export type State = {
  errors?: {
    title?: string[]
  }
  message?: string | null
}

const CreateBoard = z.object({
  title: z.string().min(3, {
    message: 'Mínimo de 3 letras',
  }),
})

export async function create(prevState: State, formData: FormData) {
  const validatedFields = CreateBoard.safeParse({
    title: formData.get('title'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos não preenchidos',
    }
  }

  const { title } = validatedFields.data

  try {
    await db.board.create({
      data: {
        title,
      },
    })
  } catch (error) {
    return {
      message: 'Database error',
    }
  }

  revalidatePath('/organizacao/org_2YUqRgLCDNH1k9Qwv9QlFmeoMvI')
  redirect('/organizacao/org_2YUqRgLCDNH1k9Qwv9QlFmeoMvI')
}
