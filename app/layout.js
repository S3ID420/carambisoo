'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { SessionProvider } from 'next-auth/react';


const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className} style={{ backgroundColor: '' }}>
        <SessionProvider>{children}</SessionProvider>
        </body>

    </html>
  );
}
