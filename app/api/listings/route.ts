import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
/* import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
 */

export async function POST( request: Request, ) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { id, title, description, imageSrc, imageSrcQRCode, category, location } : any = body;

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
      imageSrcQRCode,
      category,
      locationValue: location.value,
      userId: currentUser.id
    }
  });

  return NextResponse.json(listing);
}