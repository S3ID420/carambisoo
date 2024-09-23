import React from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';
import './privacy.css'; // Normal CSS for styling
import NavbarComponent from '../components/NavbarComponent';

const Privacy = () => {
  return (
    <>
        <NavbarComponent />

      <Head>
        <title>Privacy Policy - Carambisoo</title>
        <meta name="description" content="Privacy Policy for Carambisoo" />
      </Head>
      <main className="main">
        <h1 className="heading">Privacy Policy</h1>
        <section>
          <h2 className="subheading">Introduction</h2>
          <p className="paragraph">Welcome to Carambisoo. This Privacy Policy outlines how we handle and protect your personal information.</p>
          
          <h2 className="subheading">Information We Collect</h2>
          <p className="paragraph">We collect various types of information, including personal data such as your name, email address, and phone number.</p>
          
          <h2 className="subheading">How We Use Your Information</h2>
          <p className="paragraph">The information we collect is used to improve our services, provide customer support, and send you updates and promotional materials.</p>
          
          <h2 className="subheading">Data Protection</h2>
          <p className="paragraph">We implement appropriate security measures to protect your personal data from unauthorized access, disclosure, or destruction.</p>
          
          <h2 className="subheading">Third-Party Services</h2>
          <p className="paragraph">We may use third-party services to help us provide and improve our services. These services have their own privacy policies, and we encourage you to review them.</p>
          
          <h2 className="subheading">Your Rights</h2>
          <p className="paragraph">You have the right to access, correct, or delete your personal information. If you have any concerns, please contact us.</p>
          
          <h2 className="subheading">Changes to This Policy</h2>
          <p className="paragraph">We may update this Privacy Policy from time to time. Any changes will be posted on this page.</p>
          
          <h2 className="subheading">Contact Us</h2>
          <p className="paragraph">If you have any questions about this Privacy Policy, please contact us at <a className="link" href="mailto:support@carambisoo.com">support@carambisoo.com</a>.</p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Privacy;
