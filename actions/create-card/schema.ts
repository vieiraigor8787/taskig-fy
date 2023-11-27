import { z } from 'zod'

export const CreateCard = z.object({
  title: z
    .string({
      required_error: 'Titulo é obrigatório',
      invalid_type_error: 'Titulo é obrigatório',
    })
    .min(3, {
      message: 'Titulo é muito pequeno',
    }),
  boardId: z.string(),
  listId: z.string(),
})
