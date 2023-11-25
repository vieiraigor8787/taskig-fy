import { z } from 'zod'

export const UpdateList = z.object({
  title: z
    .string({
      required_error: '´Titulo é obrigatório',
      invalid_type_error: 'Titulo é obrigatório',
    })
    .min(3, {
      message: 'Titulo é muito pequeno',
    }),
  id: z.string(),
  boardId: z.string(),
})
