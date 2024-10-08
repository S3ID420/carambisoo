// app/api/categories/[folderId]/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbconnect';
import Category from '@/models/Category';

export async function GET(req, { params }) {
  const { folderId } = params;  // Getting folderId from URL params

  await dbConnect();

  try {
    // Fetch categories for the folder
    const categories = await Category.find({ folder: folderId });

    // Directly return the categories (will return an empty array if none exist)
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ message: 'Error fetching categories' }, { status: 500 });
  }
}
