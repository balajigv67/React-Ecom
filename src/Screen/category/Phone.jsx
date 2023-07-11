import { useEffect, useState, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { CartContext } from '../../state/context';

const Phone = () => {
    const [products, setProducts] = useState([]);
    const { addToCart, addToWishlist } = useContext(CartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const category = 'Phone';
                const categoryCollectionRef = collection(db, category);
                const querySnapshot = await getDocs(categoryCollectionRef);
                const productsData = querySnapshot.docs.map((doc) => ({
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

    const handleSaveToWishlist = (product) => {
        addToWishlist(product);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Phone Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Render the products */}
                {products.map((product) => (
                    <div key={product.name} className="border p-4">
                        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                        <div className="aspect-w-3 aspect-h-4">
                            <img src={product.imageUrl} alt={product.name} className="w-400px h-full object-cover" />
                        </div>
                        <p className="text-sm">{product.description}</p>
                        <p className="text-base">
                            <strike>Price: ₹{product.price}</strike>
                        </p>
                        <p className="text-base">Selling Price: ₹{product.sellingPrice}</p>
                        <div className="flex flex-col">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
                                onClick={() => {
                                    addToCart(product);
                                    console.log('Product ID:', product.id);
                                }}
                            >
                                Add to Cart
                            </button>
                            <button
                                className="my-3 bg-gray-800 text-white p-2 rounded-md"
                                onClick={() => handleSaveToWishlist(product)}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Phone;
