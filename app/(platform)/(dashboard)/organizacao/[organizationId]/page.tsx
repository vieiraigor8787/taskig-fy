import { db } from '@/lib/db'
import { create } from '@/actions/create-board'
import { Button } from '@/components/ui/button'
import { Board } from './board'

const OrganizationIdPage = async () => {
  const boards = await db.board.findMany()

  return (
    <div>
      <form action={create}>
        <input
          id="title"
          name="title"
          required
          placeholder="Nome do board"
          className="border-black border p-1"
        />
        <Button>Criar</Button>
      </form>
      <div className="space-y-2">
        {boards.map((board) => (
          <Board title={board.title} id={board.id} />
        ))}
      </div>
    </div>
  )
}

export default OrganizationIdPage
