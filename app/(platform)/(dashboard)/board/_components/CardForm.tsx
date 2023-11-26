'use client'

import { Plus, X } from 'lucide-react'
import { forwardRef } from 'react'

import { Button } from '@/components/ui/button'
import { FormTextarea } from '@/components/form-textarea'
import { FormSubmit } from '@/components/form/FormButton'

interface CardFormProps {
  listId: string
  enableEditing: () => void
  disableEditing: () => void
  isEditing: boolean
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, isEditing, enableEditing, disableEditing }, ref) => {
    if (isEditing) {
      return (
        <form className="m-1 py-0.5 px-1 space-y-4">
          <FormTextarea
            id="title"
            ref={ref}
            placeholder="Adicionar um título para o cartão"
          />
          <input hidden id="listId" name="listId" value={listId} />
          <div className="flex items-center gap-1">
            <FormSubmit>Adicionar cartão</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </form>
      )
    }

    return (
      <div className="pt-2 px-2">
        <Button
          onClick={enableEditing}
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
          variant="ghost"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar um cartão
        </Button>
      </div>
    )
  }
)

CardForm.displayName = 'CardForm'
