import React from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';
import './terms.css'; // Regular CSS file for styling
import NavbarComponent from '../components/NavbarComponent';

const Terms = () => {
  return (
    <>
    <NavbarComponent />
      <Head>
        <title>Terms of Service - Carambisoo</title>
        <meta name="description" content="Terms of Service for Carambisoo" />
      </Head>
      <main className="main">
        <h1 className="heading">Terms of Service</h1>
        <section className="section">
          <h2 className="subheading">Introduction</h2>
          <p className="paragraph">
            Welcome to Carambisoo. These Terms of Service outline the rules and regulations for the use of our website.
          </p>
          
          <h2 className="subheading">Intellectual Property</h2>
          <p className="paragraph">
            All content and materials on this site are the property of Carambisoo or its licensors.
          </p>
          
          <h2 className="subheading">Usage Guidelines</h2>
          <p className="paragraph">
            Users agree to use the website only for lawful purposes.
          </p>
          
          <h2 className="subheading">Limitation of Liability</h2>
          <p className="paragraph">
            Carambisoo is not liable for any damages arising from the use of this website.
          </p>
          
          <h2 className="subheading">Changes to Terms</h2>
          <p className="paragraph">
            We may update these terms from time to time. Continued use of the website signifies acceptance of any changes.
          </p>
          
          <h2 className="subheading">Contact Us</h2>
          <p className="paragraph">
            If you have any questions about these Terms of Service, please contact us at{' '}
            <a className="link" href="mailto:support@carambisoo.com">support@carambisoo.com</a>.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Terms;
