import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { cart } from "@/db/schema/cart";
import { eq, and } from "drizzle-orm";
import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";

export async function GET(req: NextRequest) {
    const url = req.nextUrl;
    let user_id;
    if (!url.searchParams.has("user_id")) {
        user_id = cookies().get("user_id")?.value as string;
        if (!user_id) {
            return NextResponse.json({ "error": "user_id not provided" });
        }
    } else {
        user_id = url.searchParams.get("user_id") as string;
    }
    try {
        const res = await db.select().from(cart).where(eq(cart.user_id, user_id));
        return NextResponse.json(res);
    } catch (e) {
        console.log(e);
        return NextResponse.json({ "error": e });
    }
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    let user_id = cookies().get("user_id")?.value;
    if (!user_id) {
        cookies().set("user_id", uuid());
        user_id = cookies().get("user_id")?.value as string;
    }
    try {
        const productExists = await db.select().from(cart).where(and(eq(cart.product_id, body.product_id), (eq(cart.user_id, user_id))));
        if (productExists[0] == undefined) {
            const res = await db.insert(cart).values({ product_id: body.product_id, user_id: user_id, quantity: body.quantity }).returning();
            return NextResponse.json(res);
        } else {
            let updatedQuantity = Number(productExists[0].quantity) + Number(body.quantity);
            const res = await db.update(cart).set({ quantity: updatedQuantity }).where(eq(cart.product_id, body.product_id))
            return NextResponse.json(res);
        }
    } catch (e) {
        console.log(e);
    }
}

export async function DELETE(req: NextRequest) {
    const url = req.nextUrl;
    let user_id;
    if (!url.searchParams.has("user_id")) {
        user_id = cookies().get("user_id")?.value as string;
        if (!user_id) {
            return NextResponse.json({ "error": "user_id not provided" });
        }
    } else {
        user_id = url.searchParams.get("user_id") as string;
        const res = await db.delete(cart).where(eq(cart.user_id, user_id)).returning();
        return NextResponse.json(res);
    }
}
