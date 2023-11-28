import { NextResponse } from 'next/server'
import { ENTITY_TYPE } from '@prisma/client'
import { auth } from '@clerk/nextjs'

import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { orgId, user } = auth()

    if (!orgId || !user) {
      return new NextResponse('Usuário não autorizado', { status: 401 })
    }

    const auditLogs = await db.auditLog.findMany({
      where: {
        orgId,
        entityId: params.cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: { createdAt: 'desc' },
      take: 3,
    })

    return NextResponse.json(auditLogs)
  } catch (error) {
    return new NextResponse('internal error', { status: 500 })
  }
}