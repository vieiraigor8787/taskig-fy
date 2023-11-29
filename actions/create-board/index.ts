'use server'
import { revalidatePath } from 'next/cache'

import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

import { db } from '@/lib/db'
import { CreateSafeAction } from '@/lib/create-safe-action'
import { InputType, ReturnType } from './types'
import { CreateBoard } from './schema'
import { createAuditLog } from '@/lib/create-audit-log'
import { checkSubscription } from '@/lib/subscription'
import { hasAvailableCount, incrementAvailableCount } from '@/lib/org-limit'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Usuário não autorizado',
    }
  }
  const canCreate = await hasAvailableCount()
  const isPro = await checkSubscription()

  if (!canCreate && !isPro) {
    return {
      error: 'Você precisa assinar o plano pró para criar mais boards.',
    }
  }
  const { title, image } = data

  const [imageId, imageThumbUrl, imageFullUrl, imageUserName, imageLinkHTML] =
    image.split('|')

  if (
    !imageId ||
    !imageFullUrl ||
    !imageUserName ||
    !imageLinkHTML ||
    !imageThumbUrl
  ) {
    return {
      error: 'Campos não preenchidos.',
    }
  }

  let board

  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageFullUrl,
        imageLinkHTML,
        imageThumbUrl,
        imageUserName,
      },
    })

    if (isPro) {
      await incrementAvailableCount()
    }

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    })
  } catch (error) {
    return {
      error: 'Falha ao criar',
    }
  }

  revalidatePath(`/board/${board.id}`)
  return {
    data: board,
  }
}

export const createBoard = CreateSafeAction(CreateBoard, handler)
