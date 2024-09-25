import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbconnect';
import User from '@/models/User';

export async function DELETE(req, { params }) {
  const { userId } = params;
  
  await dbConnect();
  
  try {
    const deletedUser = await User.findByIdAndDelete(userId); // Find and delete the user by ID
    
    if (!deletedUser) {
      return new Response('User not found', { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(`Error deleting user ${userId}:`, error);
    return new Response('Error deleting user', { status: 500 });
  }
}
