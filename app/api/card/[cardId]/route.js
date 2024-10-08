import dbConnect from '@/lib/dbconnect';
import Card from '@/models/Card';

// DELETE method
export async function DELETE(req, { params }) {
  const { cardId } = params;

  await dbConnect();

  try {
    const deletedCard = await Card.findByIdAndDelete(cardId);
    if (!deletedCard) {
      return new Response('Card not found', { status: 404 });
    }

    return new Response('Card deleted successfully', { status: 200 });
  } catch (error) {
    console.error(`Error deleting card ${cardId}:`, error);
    return new Response('Error deleting card', { status: 500 });
  }
}

// PUT method
export async function PUT(req, { params }) {
  const { cardId } = params;
  const { question, answer } = await req.json(); // Extract question and answer from body

  await dbConnect();

  try {
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { question, answer },
      { new: true } // Ensures the updated document is returned
    );

    if (!updatedCard) {
      return new Response('Card not found', { status: 404 });
    }

    return new Response(JSON.stringify(updatedCard), { status: 200 });
  } catch (error) {
    console.error(`Error updating card ${cardId}:`, error);
    return new Response('Error updating card', { status: 500 });
  }
}
