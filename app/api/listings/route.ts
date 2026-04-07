import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();

  const brand = formData.get("brand") as string;
  const size = formData.get("size") as string;
  const condition = formData.get("condition") as string;
  const notes = formData.get("notes") as string;
  const purchasePrice = parseFloat(formData.get("purchasePrice") as string);
  const image = formData.get("image") as File;

  let imageUrl: string | undefined;

  if (image && image.size > 0) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const base64 = `data:${image.type};base64,${buffer.toString("base64")}`;

    const uploaded = await cloudinary.uploader.upload(base64, {
      folder: "revora",
    });

    imageUrl = uploaded.secure_url;
  }

  const listing = await prisma.listing.create({
    data: {
      brand,
      size,
      condition,
      notes,
      purchasePrice,
      imageUrl,
    },
  });

  return NextResponse.json(listing, { status: 201 });
}
