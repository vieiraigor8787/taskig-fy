'use client'

import { Card } from '@prisma/client'
import { Draggable, Droppable } from '@hello-pangea/dnd'

interface CardItemProps {
  data: Card
  index: number
}

export const CardItem = ({ index, data }: CardItemProps) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  )
}
