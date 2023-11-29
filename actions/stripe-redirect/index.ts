'use server'
import { revalidatePath } from 'next/cache'

import { auth, currentUser } from '@clerk/nextjs'

import { db } from '@/lib/db'
import { CreateSafeAction } from '@/lib/create-safe-action'
import { absoluteUrl } from '@/lib/utils'
import { stripe } from '@/lib/stripe'

import { InputType, ReturnType } from './types'
import { StripeRedirect } from './schema'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  const user = await currentUser()

  if (!orgId || !userId) {
    return {
      error: 'Usuário não autorizado',
    }
  }
  console.log(userId, orgId)
  const settingsUrl = absoluteUrl(`/organizacao/${orgId}`)

  let url = ''

  const orgSubs = await db.orgSubscription.findUnique({
    where: {
      orgId,
    },
  })
  console.log(orgSubs)
  if (orgSubs && orgSubs.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: orgSubs.stripeCustomerId,
      return_url: settingsUrl,
    })
    url = stripeSession.url
  } else {
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email: user?.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: 'BRL',
            product_data: {
              name: 'Taskig-Fy Pro',
              description: 'Boars ilimitados para sua organização',
            },
            unit_amount: 2000,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        orgId,
      },
    })

    url = stripeSession.url || ''
  }

  revalidatePath(`/organizacao/${orgId}`)

  return { data: url }
}
export const stripeRedirect = CreateSafeAction(StripeRedirect, handler)
