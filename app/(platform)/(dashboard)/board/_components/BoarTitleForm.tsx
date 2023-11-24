'use client'

import { Board } from '@prisma/client'
import { Button } from '@/components/ui/button'

interface BoardTitleFormProps {
  data: Board
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  return (
    <Button
      variant="transparent"
      className="font-bold text-lg h-auto bg-black/50 fixed top-14 flex items-center px-6 gap-4 text-white"
    >
      {data.title}
    </Button>
  )
}
