"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    categories: 0,
    folders: 0,
    flashcards: 0,
    users: 0,
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/admin/api/users');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <AdminLayout>
      <h1>Admin Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Categories</h3>
          <p>{stats.categories}</p>
        </div>
        <div className="stat-card">
          <h3>Folders</h3>
          <p>{stats.folders}</p>
        </div>
        <div className="stat-card">
          <h3>Flashcards</h3>
          <p>{stats.flashcards}</p>
        </div>
        <div className="stat-card">
          <h3>Users</h3>
          <p>{stats.users}</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
