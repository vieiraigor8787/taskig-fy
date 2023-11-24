'use server'
import { revalidatePath } from 'next/cache'

import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db'
import { CreateSafeAction } from '@/lib/create-safe-action'

import { InputType, ReturnType } from './types'
import { UpdateBoard } from './schema'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Usuário não autorizado',
    }
  }

  const { title, id } = data

  let board

  try {
    board = await db.board.update({
      where: {
        id,
        orgId,
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

  revalidatePath(`/board/${id}`)
  return {
    data: board,
  }
}

export const updateBoard = CreateSafeAction(UpdateBoard, handler)
