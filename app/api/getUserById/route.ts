import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function GET(
  request: Request
) {
  try {
    const currentUser = await prisma.user.findMany();

    return NextResponse.json(currentUser);
  } catch (error: any) {
    return null;
  }
}
