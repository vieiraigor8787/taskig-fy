import { auth, currentUser } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

import { db } from './db'

interface Props {
  entityId: string
  entityType: ENTITY_TYPE
  entityTitle: string
  action: ACTION
}

export const createAuditLog = async (props: Props) => {
  try {
    const { orgId } = auth()
    const user = await currentUser()

    if (!orgId || !user) throw new Error('Usuário não encontrado')

    const { entityTitle, entityType, entityId, action } = props

    await db.auditLog.create({
      data: {
        orgId,
        entityTitle,
        entityType,
        entityId,
        action,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: user?.firstName + ' ' + user?.lastName,
      },
    })
  } catch (error) {}
}
