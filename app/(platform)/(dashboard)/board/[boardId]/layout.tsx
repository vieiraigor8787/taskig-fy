import { notFound, redirect } from 'next/navigation'

import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db'

export async function generateMetadata({
  params,
}: {
  params: { boardId: string }
}) {
  const { orgId } = auth()

  if (!orgId) {
    return {
      title: 'Board',
    }
  }

  const board = await db.board.findUnique({
    where: {
      orgId,
      id: params.boardId,
    },
  })

  return {
    title: board?.title || 'Board',
  }
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { boardId: string }
}) => {
  const { orgId } = auth()

  if (!orgId) redirect('/select-org')

  const board = await db.board.findUnique({
    where: {
      orgId,
      id: params.boardId,
    },
  })

  if (!board) notFound()

  return (
    <div
      className="relative h-full bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  )
}

export default BoardIdLayout
