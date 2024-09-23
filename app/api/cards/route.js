import dbConnect from '@/lib/dbconnect';
import Card from '@/models/Card';
import Category from '@/models/Category';
import { NextResponse } from 'next/server';

// POST: Create a new card and associate it with a category
export async function POST(req) {
  await dbConnect();

  const { question, answer, categoryId } = await req.json();
  try {
    // Create new card
    const card = new Card({ question, answer, category: categoryId });
    await card.save();

    // Update category with the new card
    const category = await Category.findById(categoryId);
    category.cards.push(card._id);
    await category.save();

    return NextResponse.json(card, { status: 201 });
  } catch (error) {
    console.error('Error creating card:', error);
    return NextResponse.json({ message: 'Error creating card' }, { status: 500 });
  }
}

// GET: Fetch all cards for a specific category

