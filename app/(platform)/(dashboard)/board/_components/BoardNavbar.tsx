import { Board } from '@prisma/client'
import { BoardTitleForm } from './BoarTitleForm'

interface BoardNavbarProps {
  data: Board
}

export const BoardNavbar = ({ data }: BoardNavbarProps) => {
  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-4 text-white">
      <BoardTitleForm data={data} />
    </div>
  )
}
