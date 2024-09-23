import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbconnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    await dbConnect();

    try {
        const { username, email, password } = await req.json();

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        // Hash the password
        
        // Create a new user
        const user = new User({ username, email, password });
        await user.save();

        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error registering user' }, { status: 500 });
    }
}
