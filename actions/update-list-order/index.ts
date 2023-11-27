'use server'
import { revalidatePath } from 'next/cache'

import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db'
import { CreateSafeAction } from '@/lib/create-safe-action'

import { InputType, ReturnType } from './types'
import { UpdateListOrder } from './schema'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Usuário não autorizado',
    }
  }

  const { items, boardId } = data

  let lists

  try {
    const transaction = items.map((list) =>
      db.list.update({
        where: {
          id: list.id,
          board: {
            orgId,
          },
        },
        data: {
          order: list.order,
        },
      })
    )

    lists = await db.$transaction(transaction)
  } catch (error) {
    return {
      error: 'Falha ao reordenar',
    }
  }

  revalidatePath(`/board/${boardId}`)
  return {
    data: lists,
  }
}

export const updateListOrder = CreateSafeAction(UpdateListOrder, handler)
