import React, { useState } from 'react';

const Cart = () => {
    const cartItems = [
        { id: 1, name: 'Classy Modern Smart Watch', color: 'Black', size: 'XL', qty: 1, price: 99.0 },
        { id: 2, name: 'Classy Modern Smart Watch', color: 'Purple', size: 'L', qty: 2, price: 178.0 },
        { id: 3, name: 'Classy Modern Smart Watch', color: 'Cyan', size: 'M', qty: 1, price: 79.0 },
    ];

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    
    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="border-b pb-2">Item</th>
                        <th className="border-b pb-2">Color</th>
                        <th className="border-b pb-2">Size</th>
                        <th className="border-b pb-2">Qnt</th>
                        <th className="border-b pb-2">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.id} className="border-b">
                            <td className="py-2">{item.name}</td>
                            <td className="py-2">{item.color}</td>
                            <td className="py-2">{item.size}</td>
                            <td className="py-2">{item.qty}</td>
                            <td className="py-2">${item.price.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-semibold">Total</p>
                <p className="text-lg font-semibold">${total.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mt-6">
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                    Continue Shopping
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
