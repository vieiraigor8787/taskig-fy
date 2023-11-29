import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    return new NextResponse('webhook error', { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session
  if (event.type === 'checkout.session.completed') {
    const subs = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    if (!session?.metadata?.orgId) {
      return new NextResponse('Org ID é obrigatório', { status: 400 })
    }

    await db.orgSubscription.create({
      data: {
        orgId: session?.metadata?.orgId,
        stripeSubscriptionId: subs.id,
        stripeCustomerId: subs.customer as string,
        stripePriceId: subs.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subs.current_period_end * 1000),
      },
    })
  }

  if (event.type === 'invoice.payment_succeeded') {
    const sub = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    await db.orgSubscription.update({
      where: {
        stripeSubscriptionId: sub.id,
      },
      data: {
        stripePriceId: sub.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(sub.current_period_end * 1000),
      },
    })
  }

  return new NextResponse(null, { status: 200 })
}
