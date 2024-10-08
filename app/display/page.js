'use client';
import React, { useState, useEffect } from 'react';
import NavbarComponent from '../components/NavbarComponent';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import './app.css';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function Display() {
  const { data: session } = useSession();
  const [folders, setFolders] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [modalData, setModalData] = useState({ type: '', folderIndex: null, categoryIndex: null });
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch folders and categories for the user
  const fetchFolders = async (userId) => {
    try {
      const response = await axios.get(`/api/folders?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching folders:', error);
      return [];
    }
  };

  const fetchCategoriesForFolder = async (folderId) => {
    try {
      const response = await axios.get(`/api/categories?folderId=${folderId}`);
      const categories = response.data;

      // Fetch cards for each category
      const categoriesWithCards = await Promise.all(
        categories.map(async (category) => {
          const cardsResponse = await axios.get(`/api/cards/${category._id}`);
          return {
            ...category,
            cards: cardsResponse.data, // This will be an empty array if no cards are found
          };
        })
      );

      return categoriesWithCards; // Return all categories, including those without cards
    } catch (error) {
      console.error(`Error fetching categories for folder ${folderId}:`, error);
      return [];
    }
  };

  // Fetch Cards
  const fetchCardsForCategory = async (categoryId) => {
    try {
      const response = await axios.get(`/api/cards/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching cards for category ${categoryId}:`, error);
      return [];
    }
  };


  // Combined function to fetch both folders and their respective categories
  const fetchFoldersAndCategories = async (userId) => {
    const foldersData = await fetchFolders(userId);

    const foldersWithCategoriesAndCards = await Promise.all(
      foldersData.map(async (folder) => {
        const categories = await fetchCategoriesForFolder(folder._id);

        const categoriesWithCards = await Promise.all(
          categories.map(async (category) => {
            const cards = await fetchCardsForCategory(category._id);
            return {
              ...category,
              cards,
            };
          })
        );

        return {
          ...folder,
          categories: categoriesWithCards,
        };
      })
    );

    setFolders(foldersWithCategoriesAndCards);
  };


  useEffect(() => {
    if (session?.user?.id) {
      setLoading(true); // Set loader to true before fetching
      fetchFoldersAndCategories(session.user.id).then(() => {
        setLoading(false); // Set loader to false after fetching completes
      }).catch((error) => {
        setLoading(false); // Handle any errors by stopping the loader
        console.error(error);
      });
    }
  }, [session]);
  const handleCategorySelect = ({ folderIndex, categoryIndex }) => {
    const folder = folders[folderIndex];
    const category = folder.categories[categoryIndex];
    setSelectedCards(category.cards || [],folderIndex, categoryIndex );
  };

  const handleAdd = (type, folderIndex = null, categoryIndex = null) => {
    setModalTitle(`Add New ${type.charAt(0).toUpperCase() + type.slice(1)}`);
    setModalData({ type, folderIndex, categoryIndex });
    setOpenModal(true);
    if (type === 'card') {
      setQuestion('');
      setAnswer('');
    } else {
      setNewItemName('');
    }
  };

  const handleClose = () => {
    setOpenModal(false);
    setNewItemName('');
    setQuestion('');
    setAnswer('');
  };

  const handleSave = async () => {
    const { type, folderIndex, categoryIndex } = modalData;

    if (type === 'folder' && newItemName) {
      try {
        const response = await axios.post('/api/folders', { name: newItemName, userId: session.user.id });
        setFolders((prev) => [...prev, response.data]);
        handleClose();
      } catch (error) {
        console.error('Error creating folder:', error);
      }
    } else if (type === 'rename-folder' && newItemName) {
      const folderId = folders[folderIndex]._id;
      try {
        await axios.put(`/api/folders/${folderId}`, { name: newItemName });
        const updatedFolders = [...folders];
        updatedFolders[folderIndex].name = newItemName; // Update the folder name in the state
        setFolders(updatedFolders);
        handleClose();
      } catch (error) {
        console.error(`Error renaming folder ${folderId}:`, error);
      }
    } else if (type === 'rename-category' && newItemName) {
      const categoryId = folders[folderIndex].categories[categoryIndex]._id;
      try {
        await axios.put(`/api/cat/${categoryId}`, { name: newItemName });
        const updatedFolders = [...folders];
        updatedFolders[folderIndex].categories[categoryIndex].name = newItemName; // Update the category name in the state
        setFolders(updatedFolders);
        handleClose();
      } catch (error) {
        console.error(`Error renaming category ${categoryId}:`, error);
      }
    }
    else if (type === 'category' && newItemName) {
      const folderId = folders[folderIndex]._id;
      try {
        const response = await axios.post('/api/categories', { name: newItemName, folderId });
        const updatedFolders = [...folders];
        updatedFolders[folderIndex].categories.push(response.data);
        setFolders(updatedFolders);
        handleClose();
      } catch (error) {
        console.error('Error creating category:', error);
      }
    } else if (type === 'card' && question && answer) {
      const categoryId = folders[folderIndex].categories[categoryIndex]._id;
      try {
        const response = await axios.post('/api/cards', { question, answer, categoryId });
        const updatedFolders = [...folders];
        updatedFolders[folderIndex].categories[categoryIndex].cards.push(response.data);
        setFolders(updatedFolders);
        handleClose();
      } catch (error) {
        console.error('Error creating card:', error);
      }
    } if (type === 'edit-card' && question && answer) {
      const cardId = folders[folderIndex].categories[categoryIndex].cards[cardIndex]._id;

      try {
        const response = await axios.put(`/api/card/${cardId}`, { question, answer });
        const updatedFolders = [...folders];
        updatedFolders[folderIndex].categories[categoryIndex].cards[cardIndex] = response.data; // Update card
        setFolders(updatedFolders);
        handleClose();
      } catch (error) {
        console.error('Error updating card:', error);
      }
    }
  };
  // Handle folder deletion
  const handleDeleteFolder = async (folderIndex) => {
    const folderId = folders[folderIndex]._id;
    try {
      await axios.delete(`/api/folders/${folderId}`);
      const updatedFolders = folders.filter((_, index) => index !== folderIndex);
      setFolders(updatedFolders); // Update folders state after deletion
    } catch (error) {
      console.error(`Error deleting folder ${folderId}:`, error);
    }
  };

  // Handle folder renaming
  const handleRenameFolder = (folderIndex) => {
    setModalTitle('Rename Folder');
    setModalData({ type: 'rename-folder', folderIndex });
    setNewItemName(folders[folderIndex].name); // Prepopulate current folder name
    setOpenModal(true);
  };
  const handleDeleteCategory = async (folderIndex, categoryIndex) => {
    const categoryId = folders[folderIndex].categories[categoryIndex]._id;
    try {
      await axios.delete(`/api/cat/${categoryId}`);
      const updatedFolders = [...folders];
      updatedFolders[folderIndex].categories.splice(categoryIndex, 1); // Remove the category from the array
      setFolders(updatedFolders); // Update state after deletion
    } catch (error) {
      console.error(`Error deleting category ${categoryId}:`, error);
    }
  };
  const handleRenameCategory = (folderIndex, categoryIndex) => {
    setModalTitle('Rename Category');
    setModalData({ type: 'rename-category', folderIndex, categoryIndex });
    setNewItemName(folders[folderIndex].categories[categoryIndex].name); // Prepopulate current category name
    setOpenModal(true);
  };
  const handleDeleteCard = async (folderIndex, categoryIndex, cardIndex) => {
    // Ensure folder, category, and card exist
    const folder = folders[folderIndex];
    const category = folder?.categories?.[categoryIndex];
    const card = category?.cards?.[cardIndex];
  
    if (!card) {
      console.error('Invalid folder, category, or card index');
      return; // Exit the function if any of them are invalid
    }
  
    const cardId = card._id;
  
    try {
      await axios.delete(`/api/card/${cardId}`);
  
      // Make a copy of folders to update the state immutably
      const updatedFolders = [...folders];
      updatedFolders[folderIndex].categories[categoryIndex].cards.splice(cardIndex, 1); // Remove the card
  
      setFolders(updatedFolders); // Update state after deletion
    } catch (error) {
      console.error(`Error deleting card ${cardId}:`, error);
    }
  };
  
  const handleEditCard = (folderIndex, categoryIndex, cardIndex) => {
    const card = folders[folderIndex].categories[categoryIndex].cards[cardIndex];
    setModalTitle('Edit Card');
    setModalData({ type: 'edit-card', folderIndex, categoryIndex, cardIndex });
    setQuestion(card.question); // Pre-fill question
    setAnswer(card.answer); // Pre-fill answer
    setOpenModal(true);
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

  return (
    
    <>
    {/* Full-page loader */}
    {loading ? (
      <span className="loader"></span> // Show loader when loading is true
    ) : (<div className="appContainer">
      <NavbarComponent />
      <div className="mainContent">
        <Sidebar
          folders={folders}
          onCategorySelect={handleCategorySelect}
          onAddFolder={() => handleAdd('folder')}
          onAddCategory={(folderIndex) => handleAdd('category', folderIndex)}
          onAddCard={(folderIndex, categoryIndex) => handleAdd('card', folderIndex, categoryIndex)}
          onDeleteFolder={(folderIndex) => handleDeleteFolder(folderIndex)} // Add delete folder handler
          onRenameFolder={(folderIndex) => handleRenameFolder(folderIndex)}
          onDeleteCategory={(folderIndex, categoryIndex) => handleDeleteCategory(folderIndex, categoryIndex)}
          onRenameCategory={(folderIndex, categoryIndex) => handleRenameCategory(folderIndex, categoryIndex)} // Add rename folder handler
        />

        <div className="cardsContainer">
          {selectedCards.length > 0 ? (
            selectedCards.map((card, index) => (
              <Card key={index} question={card.question} answer={card.answer} 
                onDelete={() => handleDeleteCard(selectedCards.folderIndex, selectedCards.categoryIndex, index)} // Pass folderIndex, categoryIndex, and cardIndex
                onEdit={() => handleEditCard(selectedCards.folderIndex, selectedCards.categoryIndex, index)} // Pass folderIndex, categoryIndex, and cardIndex
              />
            ))
          ) : (
            <p>Select a category to view cards</p>
          )}
        </div>
      </div>

      {/* Modal for Adding Items */}
      {openModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h2>{modalTitle}</h2>
            {/* Input for renaming folder */}
            {modalData.type === 'rename-folder' && (
              <input
                style={inputStyle}
                type="text"
                value={newItemName} // Pre-filled folder name
                onChange={(e) => setNewItemName(e.target.value)} // Update state as user types
                placeholder="New Folder Name"
              />
            )}
            {modalData.type === 'rename-category' && (
              <input
                style={inputStyle}
                type="text"
                value={newItemName} // Pre-filled folder name
                onChange={(e) => setNewItemName(e.target.value)} // Update state as user types
                placeholder="New Category Name"
              />
            )}

            {modalData.type === 'card' && (
              <>
                <input
                  style={inputStyle}
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Question"
                />
                <input
                  style={inputStyle}
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Answer"
                />
              </>
            )}
            {modalData.type === 'edit-card' && (
              <>
                <input
                  style={inputStyle}
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Question"
                />
                <input
                  style={inputStyle}
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Answer"
                />
              </>
            )}
            {modalData.type === 'folder' && (
              <input
                style={inputStyle}
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Folder Name"
              />
            )}
            {modalData.type === 'category' && (
              <input
                style={inputStyle}
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Category Name"
              />
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
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
  )}
  </>);
}
