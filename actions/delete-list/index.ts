'use server'
import { revalidatePath } from 'next/cache'

import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db'
import { CreateSafeAction } from '@/lib/create-safe-action'

import { InputType, ReturnType } from './types'
import { DeleteList } from './schema'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { createAuditLog } from '@/lib/create-audit-log'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Usuário não autorizado',
    }
  }

  const { id, boardId } = data

  let list

  try {
    list = await db.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    })

    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.DELETE,
    })
  } catch (error) {
    return {
      error: 'Falha ao excluir.',
    }
  }

  revalidatePath(`/board/${boardId}`)

  return { data: list }
}

export const deleteList = CreateSafeAction(DeleteList, handler)
