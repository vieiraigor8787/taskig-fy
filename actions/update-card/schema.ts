import { z } from 'zod'

export const UpdateCard = z.object({
  boardId: z.string(),
  description: z.optional(
    z
      .string({
        required_error: 'Descrição é obrigatória',
        invalid_type_error: 'Descrição é obrigatória',
      })
      .min(3, {
        message: 'Descrição é muito pequena',
      })
  ),
  title: z
    .string({
      required_error: 'Titulo é obrigatório',
      invalid_type_error: 'Titulo é obrigatório',
    })
    .min(3, {
      message: 'Titulo é muito pequeno',
    }),
  id: z.string(),
})
