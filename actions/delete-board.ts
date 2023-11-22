'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function deleteBoard(id: string) {
  await db.board.delete({
    where: {
      id,
    },
  })

  revalidatePath('/organizacao/org_2YUqRgLCDNH1k9Qwv9QlFmeoMvI')
}
