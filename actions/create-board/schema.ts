import { z } from 'zod'

export const CreateBoard = z.object({
  title: z
    .string({
      required_error: '´Titulo é obrigatório',
      invalid_type_error: 'Titulo é obrigatório',
    })
    .min(3, {
      message: 'Titulo é muito pequeno',
    }),

  image: z.string({
    required_error: 'Imagem é obrigatória',
    invalid_type_error: 'Imagem é obrigatória',
  }),
})
