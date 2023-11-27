'use client'

import { AuditLog } from '@prisma/client'

import { Skeleton } from '@/components/ui/skeleton'

interface ActivityProps {
  items: AuditLog[]
}

export const Activity = ({ items }: ActivityProps) => {
  return <div>activii</div>
}

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex items-center gap-3 w-full">
      <Skeleton className="bg-neutral-200 h-6 w-6" />
      <div className="w-full">
        <Skeleton className="bg-neutral-200 h-6 w-24 mb-2" />
        <Skeleton className="bg-neutral-200 h-10 w-full" />
      </div>
    </div>
  )
}
