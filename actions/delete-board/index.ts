'use server'
import { revalidatePath } from 'next/cache'

import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db'
import { CreateSafeAction } from '@/lib/create-safe-action'

import { InputType, ReturnType } from './types'
import { DeleteBoard } from './schema'
import { redirect } from 'next/navigation'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Usuário não autorizado',
    }
  }

  const { id } = data

  let board

  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    })
  } catch (error) {
    return {
      error: 'Falha ao excluir.',
    }
  }

  revalidatePath(`/organizacao/${orgId}`)
  redirect(`/organizacao/${orgId}`)
}

export const deleteBoard = CreateSafeAction(DeleteBoard, handler)
