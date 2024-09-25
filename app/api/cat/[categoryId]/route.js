import dbConnect from '@/lib/dbconnect';
import Category from '@/models/Category';
export async function DELETE(req, { params }) {
    const { categoryId } = params;
  
    await dbConnect();
  
    try {
      const deletedCategory = await Category.findByIdAndDelete(categoryId);
      if (!deletedCategory) {
        return new Response('Category not found', { status: 404 });
      }
  
      return new Response('Category deleted successfully', { status: 200 });
    } catch (error) {
      console.error(`Error deleting category ${categoryId}:`, error);
      return new Response('Error deleting category', { status: 500 });
    }
  }
  export async function PUT(req, { params }) {
    const { categoryId } = params;
    const { name } = await req.json();
  
    await dbConnect();
  
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { name },
        { new: true } // This ensures the updated document is returned
      );
  
      if (!updatedCategory) {
        return new Response('Category not found', { status: 404 });
      }
  
      return new Response(JSON.stringify(updatedCategory), { status: 200 });
    } catch (error) {
      console.error(`Error renaming category ${categoryId}:`, error);
      return new Response('Error renaming category', { status: 500 });
    }
  }