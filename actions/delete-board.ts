'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'

export async function deleteBoard(id: string) {
  await db.board.delete({
    where: {
      id,
    },
  })

  revalidatePath('/organizacao/org_2YUqRgLCDNH1k9Qwv9QlFmeoMvI')
}
