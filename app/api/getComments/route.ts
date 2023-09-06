import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(
    request: Request
){
    const currentUser = await getCurrentUser();

    const comments = await prisma.comment.findMany();

    return NextResponse.json(comments);
}