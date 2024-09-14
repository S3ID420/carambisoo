import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbconnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    await dbConnect();
  
    try {
      const { email, password } = await req.json();
  
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
      }
  
      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
      }
  
      // If login is successful
      return NextResponse.json({ message: 'Login successful' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Error logging in' }, { status: 500 });
    }
  }
