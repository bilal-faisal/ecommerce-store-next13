import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(key, {
    apiVersion: "2022-11-15"
})

export async function POST(req: NextRequest) {
    const body = await req.json();
    if (body.length == 0) {
        return NextResponse.json({ error: "Data not found" });
    }
    try {
        console.log(body)
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            submit_type: "pay",
            mode: 'payment',
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            shipping_options: [{ shipping_rate: "shr_1NLCwMK6xLozB4i7t4rpfKX8" }, { shipping_rate: "shr_1NLCvVK6xLozB4i7fZ0BA4EW" }],
            invoice_creation: {
                enabled: true
            },
            line_items: body.map((item: any) => {
                return {
                    price_data: {
                        currency: "pkr",
                        product_data: {
                            name: item.title
                        },
                        unit_amount: item.price * 100,
                        // image: item.image
                    },
                    quantity: item.quantity,
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                        maximum: 99,
                    },

                }
            }),
            phone_number_collection: {
                enabled: true
            },
            success_url: `${req.headers.get("origin")}/success`,
            cancel_url: `${req.headers.get("origin")}/cart`,
        });
        return NextResponse.json({ session });
    } catch (err: any) {
        console.log(err.message)
        return NextResponse.json({ error: err.message });
    }
}