'use client'

import Image from 'next/image'

import { useProModal } from '@/hooks/use-pro-modal'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '../ui/button'

export const ProModal = () => {
  const proModal = useProModal()

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image src="/hero.svg" alt="hero" className="object-cover" fill />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">
            Faça um upgrade para o Takig-Fy Pro hoje!
          </h2>
          <p className="text-xs font-smibold text-neutral-600">
            Explore o melhor do Taskig-Fy
          </p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li className="">Lorem ipsum dolor sit </li>
              <li className="">amet consectetur adipisicing elit</li>
              <li className="">
                Optio deleniti voluptates fugit ex facere culpa praesentium
                dolores
              </li>
              <li className="">
                voluptas blanditiis tempora consequatur possimus maxime at
                excepturi id nulla!
              </li>
            </ul>
          </div>
          <Button className="w-full" variant="primary">
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
