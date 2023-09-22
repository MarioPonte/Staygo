import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    commentId?: string;
};

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
){
    const currentUser = await getCurrentUser();

    if(!currentUser) return NextResponse.error();

    const { commentId } = params;

    if(!commentId || typeof commentId !== 'string') throw new Error('Invalid Id');

    const comment = await prisma.comment.deleteMany({
        where: {
            id: commentId
        }
    });

    return NextResponse.json(comment);
}