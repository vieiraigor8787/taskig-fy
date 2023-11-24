'use client'

import { useEffect, useState } from 'react'
import { ListWithCards } from '@/types'

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
    <ol className="flex gap-3 h-full">
      {orderedData.map((list, index) => {
        return <ListItem key={list.id} data={list} index={index} />
      })}
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  )
}
