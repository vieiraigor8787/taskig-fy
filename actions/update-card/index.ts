'use server'
import { revalidatePath } from 'next/cache'

import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db'
import { CreateSafeAction } from '@/lib/create-safe-action'

import { InputType, ReturnType } from './types'
import { UpdateCard } from './schema'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Usuário não autorizado',
    }
  }

  const { boardId, id, ...values } = data

  let card

  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: {
        ...values,
      },
    })
  } catch (error) {
    return {
      error: 'Falha ao atualizar',
    }
  }

  revalidatePath(`/board/${boardId}`)
  return {
    data: card,
  }
}

export const updateCard = CreateSafeAction(UpdateCard, handler)
