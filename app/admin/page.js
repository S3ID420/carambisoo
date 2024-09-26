'use client';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button, Spinner } from 'reactstrap';
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
        <Row>
          {users.map((user) => (
            <Col sm="12" md="6" lg="4" key={user._id} className="mb-4">
              <Card className="user-card">
                <CardBody>
                  <CardTitle tag="h5">{user.username}</CardTitle>
                  <CardText>{user.email}</CardText>
                  <Button color="danger" onClick={() => handleDeleteUser(user._id)}>
                    Delete
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
