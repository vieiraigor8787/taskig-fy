'use server'
import { revalidatePath } from 'next/cache'

import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db'
import { CreateSafeAction } from '@/lib/create-safe-action'

import { InputType, ReturnType } from './types'
import { UpdateCardOrder } from './schema'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Usuário não autorizado',
    }
  }

  const { items, boardId } = data

  let updatedCards

  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    )

    updatedCards = await db.$transaction(transaction)
  } catch (error) {
    return {
      error: 'Falha ao reordenar',
    }
  }

  revalidatePath(`/board/${boardId}`)
  return {
    data: updatedCards,
  }
}

export const updateCardOrder = CreateSafeAction(UpdateCardOrder, handler)
