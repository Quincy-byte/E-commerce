// src/App.jsx
import React from "react";
import ProductCatalog from "./components/ProductCatalog";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="py-10 px-6 md:px-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          New Collections For Everyone
        </h1>
        <ProductCatalog />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-pink-100 shadow-md">
      <h1 className="text-2xl font-bold text-pink-600">SHOPPER</h1>
      <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
        <li>Home</li>
        <li>Men</li>
        <li>Women</li>
        <li>Kids</li>
        <li>About</li>
      </ul>
      <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full">
        Login
      </button>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-pink-100 py-6 mt-10 text-center text-gray-700">
      <p>© 2025 SHOPPER. All rights reserved.</p>
    </footer>
  );
}
