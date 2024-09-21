// app/api/categories/[folderId]/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbconnect';
import Category from '@/models/Category';

export async function GET(req, { params }) {
  const { folderId } = params;  // Getting folderId from URL params

  await dbConnect();

  try {
    const categories = await Category.find({ folder: folderId });

    if (!categories.length) {
      return NextResponse.json({ message: 'No categories found for this folder' }, { status: 404 });
    }

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ message: 'Error fetching categories' }, { status: 500 });
  }
}
