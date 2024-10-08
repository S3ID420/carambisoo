'use client';
import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button, Spinner, Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import axios from 'axios';
import './admin.css';

const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session || !adminEmail.includes(session.user.email)) {
      window.location.href = '/';
    }
  }, [session, status]);

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
    if (session && adminEmail.includes(session.user.email)) {
      fetchUsers();
    }
  }, [session]);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error(`Error deleting user ${userId}:`, error);
    }
  };

  return (
    <>
      {/* Navbar Section */}
      <Navbar  dark expand="md" className="admin-navbar">
   
          {/* Logo on the left */}
          <NavbarBrand href="/" className="logo-container">
            <img src="/hi.svg" alt="Logo" className="logo-img" />
          </NavbarBrand>
          
          {/* Sign Out button on the right */}
          <Nav navbar>
            <NavItem>
              <Button color="light" onClick={() => signOut()}>Sign Out</Button>
            </NavItem>
          </Nav>
        
      </Navbar>

      {/* Admin Dashboard */}
      <Container className="admin-dashboard">
        <Row className="mb-4">
          <Col>
            <h2>Admin Dashboard</h2>
            <h5>Total Users: {users.length}</h5>
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
    </>
  );
}
