import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbconnect';
import User from '@/models/User';

export async function GET(req) {
  await dbConnect();
  
  try {
    const users = await User.find({}); // Fetch all users
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response('Error fetching users', { status: 500 });
  }
}
