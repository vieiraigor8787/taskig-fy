'use client'

import { useState } from 'react'
import { LayoutIcon } from 'lucide-react'

import { CardWithList } from '@/types'
import { FormInput } from '@/components/form/FormInput'
import { Skeleton } from '@/components/ui/skeleton'

interface HeaderProps {
  data: CardWithList
}

export const Header = ({ data }: HeaderProps) => {
  const [title, setTitle] = useState(data.title)

  return (
    <div className="flex items-center gap-3 mb-6 w-full">
      <LayoutIcon className="w-5 h-5 mt-1 text-neutral-700" />
      <div className="w-full">
        <form>
          <FormInput
            id="title"
            defaultValue={title}
            className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
          />
        </form>
      </div>
    </div>
  )
}

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-3 mb-6 w-full">
      <Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />
      <div className="">
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-12 h-4 bg-neutral-200" />
      </div>
    </div>
  )
}
