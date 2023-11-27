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

    //movendo um card
    if (type === 'card') {
      let newOrderedData = [...orderedData]

      //lista do remetente
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      )

      //lista de destino
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      )

      if (!sourceList || !destList) return

      //verifica se existem cartões na lista de remetente
      if (!sourceList.cards) sourceList.cards = []

      //verifica se existem cartões na lista de destino
      if (!destList.cards) destList.cards = []

      //movendo cartões na mesma lista
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        )

        reorderedCards.forEach((card, idx) => {
          card.order = idx
        })

        sourceList.cards = reorderedCards

        setOrderedData(newOrderedData)

        //movendo card para outra lista
      } else {
        //removendo card da lista remetente
        const [movedCard] = sourceList.cards.splice(source.index, 1)

        //gravando novo id lista para o cartão de destino
        movedCard.listId = destination.droppableId
        //adiciona cartao na lista de destino
        destList.cards.splice(destination.index, 0, movedCard)

        sourceList.cards.forEach((card, indx) => {
          card.order = indx
        })

        //atualizando orderm para cada card na lista de destino
        destList.cards.forEach((card, i) => {
          card.order = i
        })

        setOrderedData(newOrderedData)
      }
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
