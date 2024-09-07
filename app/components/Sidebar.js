'use client';
import React, { useState } from 'react';
import { FaFolder, FaFolderOpen, FaFileAlt, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import './sidebar.css';

const Sidebar = () => {
  const [folders, setFolders] = useState([
    { name: 'Folder 1', categories: [{ name: 'Category 1', cards: ['Card 1', 'Card 2'] }] }
  ]);
  const [openFolders, setOpenFolders] = useState({});
  const [openCategories, setOpenCategories] = useState({});

  // Toggle Folder Open/Close
  const toggleFolder = (folderIndex) => {
    setOpenFolders((prevState) => ({
      ...prevState,
      [folderIndex]: !prevState[folderIndex],
    }));
  };

  // Toggle Category Open/Close
  const toggleCategory = (folderIndex, categoryIndex) => {
    setOpenCategories((prevState) => ({
      ...prevState,
      [`${folderIndex}-${categoryIndex}`]: !prevState[`${folderIndex}-${categoryIndex}`],
    }));
  };

  // Add Folder
  const addFolder = () => {
    const folderName = prompt("Enter new folder name");
    if (folderName) {
      setFolders([...folders, { name: folderName, categories: [] }]);
    }
  };

  // Add Category
  const addCategory = (folderIndex) => {
    const categoryName = prompt("Enter new category name");
    if (categoryName) {
      const newFolders = [...folders];
      newFolders[folderIndex].categories.push({ name: categoryName, cards: [] });
      setFolders(newFolders);
    }
  };

  // Add Card
  const addCard = (folderIndex, categoryIndex) => {
    const cardName = prompt("Enter new card name");
    if (cardName) {
      const newFolders = [...folders];
      newFolders[folderIndex].categories[categoryIndex].cards.push(cardName);
      setFolders(newFolders);
    }
  };

  // Rename Folder
  const renameFolder = (folderIndex) => {
    const newName = prompt("Enter new folder name");
    if (newName) {
      const newFolders = [...folders];
      newFolders[folderIndex].name = newName;
      setFolders(newFolders);
    }
  };

  // Rename Category
  const renameCategory = (folderIndex, categoryIndex) => {
    const newName = prompt("Enter new category name");
    if (newName) {
      const newFolders = [...folders];
      newFolders[folderIndex].categories[categoryIndex].name = newName;
      setFolders(newFolders);
    }
  };

  // Delete Folder
  const deleteFolder = (folderIndex) => {
    const confirmed = window.confirm("Are you sure you want to delete this folder?");
    if (confirmed) {
      setFolders(folders.filter((_, index) => index !== folderIndex));
    }
  };

  // Delete Category
  const deleteCategory = (folderIndex, categoryIndex) => {
    const confirmed = window.confirm("Are you sure you want to delete this category?");
    if (confirmed) {
      const newFolders = [...folders];
      newFolders[folderIndex].categories = newFolders[folderIndex].categories.filter(
        (_, index) => index !== categoryIndex
      );
      setFolders(newFolders);
    }
  };

  // Delete Card
  const deleteCard = (folderIndex, categoryIndex, cardIndex) => {
    const confirmed = window.confirm("Are you sure you want to delete this card?");
    if (confirmed) {
      const newFolders = [...folders];
      newFolders[folderIndex].categories[categoryIndex].cards = newFolders[folderIndex].categories[
        categoryIndex
      ].cards.filter((_, index) => index !== cardIndex);
      setFolders(newFolders);
    }
  };

  return (
    <div className="sidebar">
      <button className="add-button" onClick={addFolder}>
        <FaPlus /> Add Folder
      </button>
      {folders.map((folder, folderIndex) => (
        <div key={folderIndex}>
          {/* Folder */}
          <div className="folder">
            <span className="folder-icon" onClick={() => toggleFolder(folderIndex)}>
              {openFolders[folderIndex] ? <FaFolderOpen /> : <FaFolder />} {folder.name}
            </span>
            <div className="folder-actions">
              <FaPlus onClick={() => addCategory(folderIndex)} title="Add Category" />
              <FaEdit onClick={() => renameFolder(folderIndex)} title="Rename Folder" />
              <FaTrash onClick={() => deleteFolder(folderIndex)} title="Delete Folder" />
            </div>
          </div>
          {openFolders[folderIndex] && (
            <div className="categories">
              {folder.categories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  {/* Category */}
                  <div className="category">
                    <span className="category-icon" onClick={() => toggleCategory(folderIndex, categoryIndex)}>
                      {openCategories[`${folderIndex}-${categoryIndex}`] ? '-' : '+'} {category.name}
                    </span>
                    <div className="category-actions">
                      <FaPlus onClick={() => addCard(folderIndex, categoryIndex)} title="Add Card" />
                      <FaEdit onClick={() => renameCategory(folderIndex, categoryIndex)} title="Rename Category" />
                      <FaTrash onClick={() => deleteCategory(folderIndex, categoryIndex)} title="Delete Category" />
                    </div>
                  </div>
                  {openCategories[`${folderIndex}-${categoryIndex}`] && (
                    <div className="cards">
                      {category.cards.map((card, cardIndex) => (
                        <div className="card" key={cardIndex}>
                          <FaFileAlt /> {card}
                          <FaTrash
                            className="card-delete"
                            onClick={() => deleteCard(folderIndex, categoryIndex, cardIndex)}
                            title="Delete Card"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
