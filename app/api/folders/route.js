import dbConnect from '@/lib/dbconnect';
import Folder from '@/models/Folder';
import User from '@/models/User';
import { NextResponse } from 'next/server';

// POST Request - Create a folder
export async function POST(req) {
  await dbConnect();

  const { name, userId } = await req.json(); // Destructure name and userId from request body
  try {
    // Create a new folder
    const folder = new Folder({ name, user: userId });
    await folder.save();

    // Save the folder ID to the user's folder array in the database
    await User.findByIdAndUpdate(userId, { $push: { folders: folder._id } });

    return NextResponse.json(folder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating folder' }, { status: 500 });
  }
}

// GET Request - Fetch folders for a specific user

// GET Request - Fetch folders for a specific user
export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  console.log('User ID from query:', userId); // Debugging

  if (!userId) {
    return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
  }

  try {
    // Fetch folders for the user
    const folders = await Folder.find({ user: userId }).lean(); // `.lean()` to return plain JS objects for performance

    console.log('Fetched folders:', folders); // Debugging

    if (!folders.length) {
      return NextResponse.json({ message: 'No folders found for this user' }, { status: 200 });
    }

    return NextResponse.json(folders, { status: 200 });
  } catch (error) {
    console.error('Error fetching folders:', error); // Debugging
    return NextResponse.json({ message: 'Error fetching folders' }, { status: 500 });
  }
}


