import { db } from '@/lib/db'

import { Board } from './board'
import { Form } from './form'

const OrganizationIdPage = async () => {
  const boards = await db.board.findMany()

  return (
    <div>
      Nome do board:
      <Form />
      <div className="space-y-2">
        {boards.map((board) => (
          <Board key={board.id} title={board.title} id={board.id} />
        ))}
      </div>
    </div>
  )
}

export default OrganizationIdPage
