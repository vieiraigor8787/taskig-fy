'use client'

import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { Activity, CreditCard, Layout, Settings } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export type Organization = {
  id: string
  slug: string
  name: string
  imageUrl: string
}

interface NavItemProps {
  isExpanded: boolean
  isActive: boolean
  organization: Organization
  onExpand: (id: string) => void
}

export const NavItem = ({
  organization,
  onExpand,
  isExpanded,
  isActive,
}: NavItemProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const routes = [
    {
      label: 'Boards',
      icon: <Layout className="h-4 w-4 mr-2" />,
      href: `/organizacao/${organization.id}`,
    },
    {
      label: 'Atividade',
      icon: <Activity className="h-4 w-4 mr-2" />,
      href: `/organizacao/${organization.id}/atividade`,
    },
    {
      label: 'Configurações',
      icon: <Settings className="h-4 w-4 mr-2" />,
      href: `/organizacao/${organization.id}/configuracoes`,
    },
    {
      label: 'Informações de pagamento',
      icon: <CreditCard className="h-4 w-4 mr-2" />,
      href: `/organizacao/${organization.id}/pagamento`,
    },
  ]

  const onClick = (href: string) => {
    router.push(href)
  }

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          'flex items-center gap-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline',
          isActive && !isExpanded && 'bg-sky-500/50 text-sky-700'
        )}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 relative">
            <Image
              fill
              src={organization.imageUrl}
              alt="Organização"
              className="rounded-md object-cover"
            />
          </div>
          <span className="font-medium text-sm">{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700 ">
        {routes.map((route) => (
          <Button
            key={route.href}
            size="sm"
            onClick={() => onClick(route.href)}
            className={cn(
              'w-full font-normal justify-start pl-10 mb-1',
              pathname === route.href && 'bg-sky-500/10 text-sky-700'
            )}
            variant="ghost"
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  )
}

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 relative shrink-0">
        <Skeleton className="h-full w-full absolute" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  )
}
