'use client';
import React, { useState } from 'react';
import NavbarComponent from './components/NavbarComponent'; // Assuming your Navbar component is here
import Sidebar from './components/Sidebar';
import Card from './components/Card';
import './app.css';

export default function Home() {
  const [folders, setFolders] = useState([
    { name: 'Folder 1', categories: [{ name: 'Category 1', cards: ['Card 1', 'Card 2', 'Card 3'] }] }
  ]);
  const [selectedCards, setSelectedCards] = useState([]);

  const handleCategorySelect = ({ folderIndex, categoryIndex }) => {
    const folder = folders[folderIndex];
    const category = folder.categories[categoryIndex];
    setSelectedCards(category.cards);
  };

  const handleAdd = (type, folderIndex, categoryIndex) => {
    const name = prompt(`Enter new ${type} name`);
    if (name) {
      const newFolders = [...folders];
      if (type === 'folder') {
        newFolders.push({ name, categories: [] });
      } else if (type === 'category') {
        newFolders[folderIndex].categories.push({ name, cards: [] });
      } else if (type === 'card') {
        newFolders[folderIndex].categories[categoryIndex].cards.push(name);
      }
      setFolders(newFolders);
    }
  };

  return (
    <div className="appContainer">
      <NavbarComponent /> {/* Navbar at the top */}
      <div className="mainContent">
        <Sidebar
          folders={folders}
          onCategorySelect={handleCategorySelect}
          onAddFolder={() => handleAdd('folder')}
          onAddCategory={(folderIndex) => handleAdd('category', folderIndex)}
        />
        <div className="cardsContainer">
          {selectedCards.length > 0 ? (
            selectedCards.map((card, index) => (
              <Card key={index} question={card} answer="" onDelete={() => console.log("Delete card")} />
            ))
          ) : (
            <p>Select a category to view cards</p>
          )}
        </div>
      </div>
    </div>
  );
}
