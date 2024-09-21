import dbConnect from '@/lib/dbconnect';
import Category from '@/models/Category';
import Folder from '@/models/Folder';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await dbConnect();

  const { name, folderId } = await req.json();
  try {
    // Create new category
    const category = new Category({ name, folder: folderId });
    await category.save();

    // Update folder with the new category
    const folder = await Folder.findById(folderId);
    folder.categories.push(category._id);
    await folder.save();

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating category' }, { status: 500 });
  }
}
export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const folderId = searchParams.get('folderId');

  if (!folderId) {
    return NextResponse.json({ message: 'Folder ID is required' }, { status: 400 });
  }

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