import { create } from '@/actions/create-board'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'

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
          <div className="" key={board.id}>
            {board.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrganizationIdPage
