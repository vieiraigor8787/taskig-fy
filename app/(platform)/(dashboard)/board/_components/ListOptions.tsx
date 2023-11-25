'use client'

import { MoreHorizontal, X } from 'lucide-react'

import { List } from '@prisma/client'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { FormSubmit } from '@/components/form/FormButton'
import { Separator } from '@/components/ui/separator'

interface ListOptionsProps {
  data: List
  onAddCard: () => void
}

export const ListOptions = ({ onAddCard, data }: ListOptionsProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" side="bottom" className="px-0 pt-3 pb-3">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Ações da lista
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm ml-2"
          variant="ghost"
        >
          Adicionar cartão...
        </Button>
        <Separator />
        <form>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm ml-2"
          >
            Copiar lista
          </FormSubmit>
        </form>
        <Separator />
        <form>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm ml-2"
          >
            Deletar lista
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}
