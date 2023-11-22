'use client'

import { createBoard } from '@/actions/create-board'
import { useAction } from '@/hooks/use-action'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { FormInput } from './FormInput'
import { FormSubmit } from './FormButton'

interface FormPopoverProps {
  children: React.ReactNode
  side?: 'left' | 'right' | 'top' | 'bottom'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
}

export const FormPopover = ({
  sideOffset,
  side,
  align,
  children,
}: FormPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          create
        </div>
      </PopoverContent>
    </Popover>
  )
}
