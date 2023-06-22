import { NextRequest, NextResponse } from "next/server";
import { client } from "../../../../sanity/lib/client"

export async function POST(req: NextRequest) {
    const body = await req.json();
    let res = await client.fetch(`
      *[_type=="product"&&_id=='${body.product_id}'][0] {
          title,
          price,
          image_thumbnail,
          }`);
    return NextResponse.json(res);
}