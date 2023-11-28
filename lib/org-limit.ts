import { auth } from '@clerk/nextjs'

import { MAX_FREE_BOARDS } from '@/constants/boards'
import { db } from './db'

export const incrementAvailableCount = async () => {
  const { orgId } = auth()

  if (!orgId) throw new Error('Não autorizado')

  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId,
    },
  })

  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count + 1 },
    })
  } else {
    await db.orgLimit.create({
      data: { orgId, count: 1 },
    })
  }
}

export const decrementAvailableCount = async () => {
  const { orgId } = auth()

  if (!orgId) throw new Error('Não autorizado')

  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId,
    },
  })

  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count > 0 ? orgLimit.count - 1 : 0 },
    })
  } else {
    await db.orgLimit.create({
      data: { orgId, count: 1 },
    })
  }
}

export const hasAvailableCount = async () => {
  const { orgId } = auth()

  if (!orgId) throw new Error('Não autorizado')

  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId,
    },
  })

  if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
    return true
  } else {
    return false
  }
}

export const getAvailabelCount = async () => {
  const { orgId } = auth()

  if (!orgId) return 0

  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId,
    },
  })
  if (!orgLimit) {
    return 0
  } else {
    return orgLimit.count
  }
}
