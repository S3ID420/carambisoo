// pages/contact.js
import React from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';
import './contact.css'; // Ensure this path is correct
import NavbarComponent from '../components/NavbarComponent';

const Contact = () => {
  return (
    <>
     <NavbarComponent />

      <Head>
        <title>Contact Us - Carambisoo</title>
        <meta name="description" content="Contact Us page for Carambisoo" />
      </Head>
      <main className="main">
        <div className="box">
          <h1 className="heading">Contact Us</h1>
          <section>
            <p className="paragraph">We'd love to hear from you! If you have any questions or need support, please get in touch with us.</p>
            
            <div className="contact-info">
              <p className="paragraph">Email: <a className="link" href="mailto:support@carambisoo.com">support@carambisoo.com</a></p>
              <p className="paragraph">Phone: <a className="link" href="tel:+1234567890">+123 456 7890</a></p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
