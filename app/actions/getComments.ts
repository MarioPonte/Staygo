import prisma from "@/app/libs/prismadb";

export interface ICommentsParams{
    description?: string;
    userId?: string;
    listingId?: string;
}

export default async function getComments(){
    try{

        const comments = await prisma.comment.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeComments = comments.map((comment) => ({
            ...comment,
            createdAt: comment.createdAt.toISOString(),
        }));

        return safeComments;
    }catch(error: any){
        throw new Error(error);
    }
}