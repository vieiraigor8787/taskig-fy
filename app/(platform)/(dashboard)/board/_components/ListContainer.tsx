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

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data)

  useEffect(() => {
    setOrderedData(data)
  }, [data])

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result

    if (!destination) return

    //se arrastado na mesma posição
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return

    //movendo uma lista
    if (type === 'list') {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      )
      setOrderedData(items)
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
