import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function GET(
    request: Request
){

    const comments = await prisma.comment.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    return NextResponse.json(comments);
}