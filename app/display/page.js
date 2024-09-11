'use client';
import React, { useState } from 'react';
import NavbarComponent from '../components/NavbarComponent'; 
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import './app.css'; 

export default function display() {
  const [folders, setFolders] = useState([
    { name: 'Folder 1', categories: [{ name: 'Category 1', cards: ['Card 1', 'Card 2', 'Card 3'] }] }
  ]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [modalData, setModalData] = useState({ type: '', folderIndex: null, categoryIndex: null });

  const handleCategorySelect = ({ folderIndex, categoryIndex }) => {
    const folder = folders[folderIndex];
    const category = folder.categories[categoryIndex];
    setSelectedCards(category.cards);
  };

  const handleAdd = (type, folderIndex = null, categoryIndex = null) => {
    setModalTitle(`Add New ${type.charAt(0).toUpperCase() + type.slice(1)}`);
    setModalData({ type, folderIndex, categoryIndex });
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setNewItemName('');
  };

  const handleSave = () => {
    if (newItemName) {
      const newFolders = [...folders];
      const { type, folderIndex, categoryIndex } = modalData;

      if (type === 'folder') {
        newFolders.push({ name: newItemName, categories: [] });
      } else if (type === 'category') {
        newFolders[folderIndex].categories.push({ name: newItemName, cards: [] });
      } else if (type === 'card') {
        newFolders[folderIndex].categories[categoryIndex].cards.push(newItemName);
      }

      setFolders(newFolders);
      handleClose();
    }
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalStyle = {
    padding: '20px',
    borderRadius: '12px',
    width: '320px',
    backgroundColor: 'white',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: `2px solid var(--color-primary)`,
    borderRadius: '8px',
    backgroundColor: 'white',
    fontSize: '1rem',
    transition: 'border-color 0.2s ease',
  };

  const inputFocusStyle = {
    border: `2px solid var(--color-accent2)`, // Change border color on focus
    outline: 'none',
  };

  const buttonStyle = {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'var(--color-accent1)',
    color: 'var(--text-color)',
  };

  const saveButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'var(--color-primary)',
    color: 'white',
  };

  const modalActionsStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  };

  return (
    <div className="appContainer">
      <NavbarComponent />
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

      {openModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h2>{modalTitle}</h2>
            <input
              style={{ ...inputStyle, ...(document.activeElement === document.querySelector('input') ? inputFocusStyle : {}) }}
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Enter name"
            />
            <div style={modalActionsStyle}>
              <button type="button" style={cancelButtonStyle} onClick={handleClose}>
                Cancel
              </button>
              <button type="submit" style={saveButtonStyle} onClick={handleSave}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
