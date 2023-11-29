import Link from 'next/link'
import { HelpCircle, User2 } from 'lucide-react'
import { redirect } from 'next/navigation'

import { auth } from '@clerk/nextjs'

import { db } from '@/lib/db'
import { getAvailableCount } from '@/lib/org-limit'
import { checkSubscription } from '@/lib/subscription'
import { MAX_FREE_BOARDS } from '@/constants/boards'

import { FormPopover } from '@/components/form/FormPopover'
import { Skeleton } from '@/components/ui/skeleton'
import { Hint } from '@/components/hint'

export const BoardList = async () => {
  const { orgId } = auth()

  if (!orgId) return redirect('/select-org')

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const availableCount = await getAvailableCount()
  const isPro = await checkSubscription()

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Seus boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full p-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}
        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-1 items-center justify-center hover:opacity-75 transition p-2"
          >
            <p className="text-sm">Criar novo board</p>
            <span className="text-xs">
              {isPro
                ? 'Ilimitado'
                : `${MAX_FREE_BOARDS - availableCount} restantes`}
            </span>
            <Hint
              sideOffset={40}
              description={`Áreas de trabalho podem ter até 5 boards de forma gratuita`}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  )
}

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  )
}
