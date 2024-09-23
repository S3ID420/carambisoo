"use client";
import React from "react";
import Link from "next/link";
import "./AdminLayout.css";



const AdminLayout = ({ children }) => {
  return (
    <div className="admin-container">
      <nav className="admin-sidebar">
        <ul>
          <li>
            <Link href="/admin">Dashboard</Link>
          </li>
          <li>
            <Link href="/admin/categories">Manage Categories</Link>
          </li>
          <li>
            <Link href="/admin/folders">Manage Folders</Link>
          </li>
          <li>
            <Link href="/admin/flashcards">Manage Flashcards</Link>
          </li>
          <li>
            <Link href="/admin/users">Manage Users</Link>
          </li>
        </ul>
      </nav>
      <main className="admin-content">{children}</main>
    </div>
  );
};

export default AdminLayout;
