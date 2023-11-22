'use server'
import { deleteBoard } from '@/actions/delete-board'
import { Button } from '@/components/ui/button'

interface BoardProps {
  title: string
  id: string
}

export const Board = ({ title, id }: BoardProps) => {
  const deleteBoardWithId = deleteBoard.bind(null, id)

  return (
    <form className="flex items-center gap-2" action={deleteBoardWithId}>
      <p className="">{title}</p>
      <Button type="submit" variant="destructive" size="sm">
        Excluir
      </Button>
    </form>
  )
}
