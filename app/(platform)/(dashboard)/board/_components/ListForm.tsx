'use client'

import { ListWrapper } from './ListWrapper'

export const ListForm = () => {
  return (
    <ListWrapper>
      <form className="w-full p-3 rounded-md bg-white space-y-4 shadow-md">
        <button className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm">
          Adicionar uma lista
        </button>
      </form>
    </ListWrapper>
  )
}
