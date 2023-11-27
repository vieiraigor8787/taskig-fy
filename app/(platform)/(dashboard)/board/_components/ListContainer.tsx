'use client'

import { useEffect, useState } from 'react'
import { ListWithCards } from '@/types'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'

import { ListForm } from './ListForm'
import { ListItem } from './ListItem'

interface ListContainerProps {
  data: ListWithCards[]
  boardId: string
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data)

  useEffect(() => {
    setOrderedData(data)
  }, [data])

  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-3 h-full"
          >
            {orderedData.map((list, index) => {
              return <ListItem key={list.id} data={list} index={index} />
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}
