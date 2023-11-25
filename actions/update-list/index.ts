'use server'
import { revalidatePath } from 'next/cache'

import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db'
import { CreateSafeAction } from '@/lib/create-safe-action'

import { InputType, ReturnType } from './types'
import { UpdateList } from './schema'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Usuário não autorizado',
    }
  }

  const { title, id, boardId } = data

  let list

  try {
    list = await db.list.update({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      data: {
        title,
      },
    })
  } catch (error) {
    return {
      error: 'Falha ao atualizar',
    }
  }

  revalidatePath(`/board/${boardId}`)
  return {
    data: list,
  }
}

export const updateList = CreateSafeAction(UpdateList, handler)
