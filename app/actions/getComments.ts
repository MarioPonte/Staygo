import prisma from "@/app/libs/prismadb";

export interface ICommentsParams{
    description: string;
    userId?: string;
    listingId?: string;
}

export default async function getComments(
    params: ICommentsParams
){
    try{
        const { 
            description,
            userId,
            listingId
        } = params;

        let query: any = {};

        if(description){
            query.description = description;
        }

        if(userId){
            query.userId = userId;
        }

        if(listingId){
            query.listingId = listingId;
        }

        const comments = await prisma.comment.findMany({
            where: query,
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