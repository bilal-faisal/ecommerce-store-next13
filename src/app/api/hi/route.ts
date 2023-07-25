import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
    const { userId: user_id } = getAuth(req);

    return NextResponse.json(user_id);
}