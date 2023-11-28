'use server'
import { revalidatePath } from 'next/cache'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { auth } from '@clerk/nextjs'

import { db } from '@/lib/db'
import { CreateSafeAction } from '@/lib/create-safe-action'
import { createAuditLog } from '@/lib/create-audit-log'

import { InputType, ReturnType } from './types'
import { CreateCard } from './schema'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Usuário não autorizado',
    }
  }

  const { title, boardId, listId } = data

  let card

  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,
        board: {
          orgId,
        },
      },
    })

    if (!list) {
      return {
        error: 'Lista não encontrada',
      }
    }

    const lastCard = await db.card.findFirst({
      where: {
        listId,
      },
      orderBy: {
        order: 'desc',
      },
      select: {
        order: true,
      },
    })

    const newOrder = lastCard ? lastCard.order + 1 : 1

    card = await db.card.create({
      data: {
        title,
        listId,
        order: newOrder,
      },
    })

    console.log({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
    })
  } catch (error) {
    return {
      error: 'Falha ao criar cartão',
    }
  }

  revalidatePath(`/board/${boardId}`)
  return {
    data: card,
  }
}

export const createCard = CreateSafeAction(CreateCard, handler)
