import dbConnect from '@/lib/dbconnect';
import Folder from '@/models/Folder';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
  const { folderId } = params;

  await dbConnect();

  try {
    await Folder.findByIdAndDelete(folderId);
    return new Response('Folder deleted', { status: 200 });
  } catch (error) {
    console.error(`Error deleting folder ${folderId}:`, error);
    return new Response('Error deleting folder', { status: 500 });
  }
}
export async function PUT(req, { params }) {
    const { folderId } = params;
    const { name } = await req.json();
  
    await dbConnect();  // Connect to the database
  
    // Ensure the `folderId` is a valid MongoDB ObjectId
    if (!ObjectId.isValid(folderId)) {
      return new NextResponse('Invalid folder ID', { status: 400 });
    }
  
    try {
      // Update the folder name by ID and return the updated document
      const updatedFolder = await Folder.findByIdAndUpdate(folderId, { name }, { new: true });
  
      if (!updatedFolder) {
        // If the folder is not found, return a 404 response
        return new NextResponse('Folder not found', { status: 404 });
      }
  
      // Return the updated folder in JSON format with a 200 status code
      return NextResponse.json(updatedFolder, { status: 200 });
    } catch (error) {
      console.error(`Error renaming folder ${folderId}:`, error);
      // Return a more detailed error message with a 500 status code
      return new NextResponse('Error renaming folder', { status: 500 });
    }
  }