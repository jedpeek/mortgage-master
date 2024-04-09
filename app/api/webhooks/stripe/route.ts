import Stripe from "stripe";
import { NextRequest } from "next/server";

import { headers } from "next/headers";
import { addOrderToUser } from "@/lib/actions/user.action";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
  typescript: true,
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK_KEY!;
  const sig = headers().get("stripe-signature") as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return new Response(`Webhook Error: ${err}`, {
      status: 400,
    });
  }

  switch (event.type) {
    case "checkout.session.async_payment_failed":
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      break;
    case "payment_intent.payment_failed":
      const paymentIntentFailed = event.data.object;
      console.log(paymentIntentFailed);
      break;
    case "payment_intent.succeeded":
      const paymentIntentSucceeded: any = event.data.object;
      console.log(paymentIntentSucceeded);
      addOrderToUser(paymentIntentSucceeded);
      // const response1 = await db
      //   .insert(OrderTable)
      //   .values({
      //     userId: checkoutSessionCompleted?.metadata.userId,
      //     itemCount: 1,
      //     total: checkoutSessionCompleted?.amount_total as any,
      //     isComplete: true,
      //   })
      //   .returning();
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return new Response("RESPONSE EXECUTE", {
    status: 200,
  });
}
