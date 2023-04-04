import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";



export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { 
    id,
    title,
    description,
    imageSrc,
    imageSrcQRCode,
    category,
    location,
   } : any = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
      id,
      title,
      description,
      imageSrc,
      imageSrcQRCode: '',
      category,
      locationValue: location.value,
      userId: currentUser.id
    }
  });

  return NextResponse.json(listing);
}