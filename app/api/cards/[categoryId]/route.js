// app/api/cards/[categoryId]/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbconnect';
import Card from '@/models/Card';

export async function GET(req, { params }) {
  const { categoryId } = params;  // Getting categoryId from URL params

  await dbConnect();

  try {
    const cards = await Card.find({ category: categoryId });

    if (!cards.length) {
      return NextResponse.json({ message: 'No cards found for this category' }, { status: 404 });
    }

    return NextResponse.json(cards, { status: 200 });
  } catch (error) {
    console.error('Error fetching cards:', error);
    return NextResponse.json({ message: 'Error fetching cards' }, { status: 500 });
  }
}
