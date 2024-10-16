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
Next.js: A React-based framework for server-side rendering and static site generation.
CSS: Used for styling the components to ensure a clean and user-friendly interface.
Backend:
Node.js: JavaScript runtime used to power the server.
Express.js: Web application framework for handling routes and backend logic.
MongoDB: NoSQL database used to store user data, flashcards, categories, and folders.
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
Installation and Setup
To run this project locally, follow these steps:

Clone the repository:

bash
Copier le code
git clone https://github.com/yourusername/carambisoo-flashcards.git
Install dependencies:

bash
Copier le code
npm install
Set up environment variables by creating a .env.local file in the root directory:

bash
Copier le code
MONGODB_URI=your_mongo_database_uri
Run the development server:

bash
Copier le code
npm run dev
The website will be accessible at http://localhost:3000.

Backend Setup
The backend is managed using Express.js and MongoDB. To set it up:

Ensure MongoDB is installed and running.
Modify the backend configuration (server.js or app.js) to suit your setup.
Run the backend server:
bash
Copier le code
npm start
Usage
Adding a Flashcard: Navigate to a folder within a category, and click "Add Flashcard" to create a new card.
Managing Folders and Categories: Use the "Create Folder" and "Create Category" buttons to organize your flashcards.
Contributing
We welcome contributions to improve Carambisoo! To contribute:

Fork the repository.
Create a new branch for your feature or bugfix.
Open a pull request once your changes are tested.
Please ensure your contributions align with our coding standards and guidelines.
