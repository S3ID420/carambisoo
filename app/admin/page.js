'use client';
import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col, Spinner } from 'reactstrap';
import axios from 'axios';
import './admin.css';  // Import the CSS file

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId)); // Use _id here
    } catch (error) {
      console.error(`Error deleting user ${userId}:`, error);
    }
  };

  return (
    <Container className="admin-dashboard">
      <Row className="mb-4">
        <Col>
          <h2>Admin Dashboard</h2>
        </Col>
      </Row>

      {loading ? (
        <Spinner color="primary" className="spinner" />
      ) : (
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>UserName</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th scope="row">{index + 1}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Button color="secondary" onClick={() => handleDeleteUser(user._id)} className="ml-2">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
