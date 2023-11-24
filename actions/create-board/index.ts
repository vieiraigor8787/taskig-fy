'use server'
import { revalidatePath } from 'next/cache'

import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db'
import { CreateSafeAction } from '@/lib/create-safe-action'

import { InputType, ReturnType } from './types'
import { CreateBoard } from './schema'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Usuário não autorizado',
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
