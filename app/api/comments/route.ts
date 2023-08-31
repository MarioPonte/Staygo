import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
){
    const currentUser = await getCurrentUser();

    if(!currentUser) return NextResponse.error();

    const body = await request.json();

    const {
        listingId,
        description
    } = body;

    if(!listingId) return NextResponse.error();

    const comments = await prisma.comment.create({
        data: {
            description,
            userId: currentUser.id,
            listingId
        }
    });

    return NextResponse.json(comments);
}