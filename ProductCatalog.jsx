import React from "react";

const products = [
  {
    id: 1,
    name: "Men Green Solid Zippered Jacket",
    price: "₱1,499",
    image: "https://via.placeholder.com/300x400?text=Men+Jacket",
  },
  {
    id: 2,
    name: "Women Casual Denim Jacket",
    price: "₱1,299",
    image: "https://via.placeholder.com/300x400?text=Women+Jacket",
  },
  {
    id: 3,
    name: "Kids Hoodie Pullover",
    price: "₱899",
    image: "https://via.placeholder.com/300x400?text=Kids+Hoodie",
  },
  {
    id: 4,
    name: "Men Bomber Jacket",
    price: "₱1,699",
    image: "https://via.placeholder.com/300x400?text=Bomber+Jacket",
  },
  {
    id: 5,
    name: "Women Crop Top",
    price: "₱799",
    image: "https://via.placeholder.com/300x400?text=Crop+Top",
  },
  {
    id: 6,
    name: "Men Denim Shirt",
    price: "₱1,099",
    image: "https://via.placeholder.com/300x400?text=Denim+Shirt",
  },
];

export default function ProductCatalog() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function ProductCard({ item }) {
  return (
    <div className="border rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
      <img src={item.image} alt={item.name} className="w-full h-80 object-cover" />
      <div className="p-4 text-center">
        <h3 className="text-gray-800 font-semibold text-lg">{item.name}</h3>
        <p className="text-pink-600 font-bold mt-2">{item.price}</p>
        <button className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
