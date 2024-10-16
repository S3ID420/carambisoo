#Carambisoo

Project Overview
Carambisoo allows users to create categories and folders that contain flashcards. Users can create, edit, delete, and organize flashcards to track their progress on different topics. The admin dashboard provides additional control for managing content.

Key Features:
Create Flashcards: Users can create flashcards with a front (question) and back (answer).
Organize by Category and Folder: Flashcards are grouped in categories and folders for better organization.
Edit & Delete: Users can modify or remove flashcards, folders, and categories as needed.
Admin Dashboard: Manage flashcards, categories, and folders with more control.
Tech Stack
The Carambisoo website is built using a modern tech stack for both the frontend and backend.

Frontend:
Nextjs CSS
Backend:
Nodejs Expressjs MongoDB
Pages and Components
Frontend:
Home Page: Displays a general overview and guides users to their flashcards.
Category & Folder Management: Users can create categories, and within them, folders that contain flashcards.
Flashcard Creation: Users can add flashcards with a question and answer, and categorize them.
Flashcard Edit & Delete: Options for editing and deleting flashcards are available to keep content updated.
Admin Dashboard: Accessible to admins to manage flashcards, categories, and folders.
Backend:
Flashcard Routes: API endpoints to create, read, update, and delete flashcards.
Category and Folder Routes: Endpoints for creating and managing categories and folders.
Authentication: Basic login and registration functionality for users and admin.

https://github.com/user-attachments/assets/17a62095-6ecf-440b-adf5-eff0e3b05e8b 


Installation
To run the project locally, follow these steps:

Clone the repository:

bash
git clone https://github.com/mayssaoueslati/carambisoo.git
Navigate to the project directory:

bash
cd carambisoo
Install the frontend dependencies:

bash
npm install
Navigate to the backend directory (if applicable):

bash
cd backend
Install the backend dependencies:

bash
npm install
Set up the environment variables:

Create a .env file in the root directory and add the necessary environment variables for MongoDB connection and JWT secret.
Start the backend server:

bash
npm run start
Start the frontend development server:

bash
npm run dev
Open your browser and go to http://localhost:3000.

Usage
Sign up for a new account or log in to an existing one.
Create categories and folders to organize your flashcards.
Add, edit, or delete flashcards as needed.
Use the study mode to review your flashcards and track your progress.
