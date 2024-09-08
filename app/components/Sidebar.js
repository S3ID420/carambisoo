"use client";
import React, { useState } from "react";
import { FaFolder, FaFolderOpen, FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import "./sidebar.css"; // Ensure the CSS file is present in the same directory

const Sidebar = ({ folders, onCategorySelect, onAddFolder, onAddCategory }) => {
  const [openFolders, setOpenFolders] = useState({});

  const toggleFolder = (folderIndex) => {
    setOpenFolders((prevState) => ({
      ...prevState,
      [folderIndex]: !prevState[folderIndex],
    }));
  };

  return (
    <div className="sidebar">
      <button className="add-button" onClick={onAddFolder}>
        <FaPlus /> Add Folder
      </button>
      {folders.map((folder, folderIndex) => (
        <div key={folderIndex}>
          <div className="folder">
            <span className="folder-icon" onClick={() => toggleFolder(folderIndex)}>
              {openFolders[folderIndex] ? <FaFolderOpen /> : <FaFolder />} {folder.name}
            </span>
            <div className="folder-actions">
              <FaPlus onClick={() => onAddCategory(folderIndex)} title="Add Category" />
              <FaEdit title="Rename Folder" />
              <FaTrashAlt title="Delete Folder" />
            </div>
          </div>
          {openFolders[folderIndex] && (
            <div className="categories">
              {folder.categories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <div className="category" onClick={() => onCategorySelect({ folderIndex, categoryIndex })}>
                    + {category.name}
                  </div>
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
