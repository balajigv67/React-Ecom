import React, { useState, useEffect } from 'react';
import { db } from '../config/firebaseConfig';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState('');

    // Read products from Firestore
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const snapshot = await db.collection('products').get();
                const productsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    // Create a new product
    const handleCreateProduct = async () => {
        try {
            const docRef = await db.collection('products').add({
                name: newProduct,
            });
            setProducts((prevProducts) => [
                ...prevProducts,
                { id: docRef.id, name: newProduct },
            ]);
            setNewProduct('');
            console.log('Product created successfully with ID:', docRef.id);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    // Update a product
    const handleUpdateProduct = async (productId, updatedName) => {
        try {
            await db.collection('products').doc(productId).update({ name: updatedName });
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === productId ? { ...product, name: updatedName } : product
                )
            );
            console.log('Product updated successfully:', productId);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // Delete a product
    const handleDeleteProduct = async (productId) => {
        try {
            await db.collection('products').doc(productId).delete();
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== productId)
            );
            console.log('Product deleted successfully:', productId);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <h3 className="text-xl font-bold mb-2">Products</h3>
            <ul className="space-y-2">
                {products.map((product) => (
                    <li
                        key={product.id}
                        className="flex items-center justify-between p-4 bg-gray-100 rounded"
                    >
                        <span>{product.name}</span>
                        <div>
                            <button
                                className="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => handleUpdateProduct(product.id, 'Updated Name')}
                            >
                                Update
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={() => handleDeleteProduct(product.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-4">
                <input
                    type="text"
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 mr-2"
                />
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={handleCreateProduct}
                >
                    Create Product
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
