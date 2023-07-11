import { useEffect, useState, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { CartContext } from '../../state/context';

const Tv = () => {
    const [products, setProducts] = useState([]);
    const { addToCart, addToWishlist } = useContext(CartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const category = 'TV';
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

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const handleSaveToWishlist = (product) => {
        addToWishlist(product);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">TV Category</h2>
            <div className="grid grid-cols-3 gap-4">
                {/* Render the products */}
                {products.map((product) => (
                    <div key={product.name} className="border p-4">
                        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                        <img src={product.imageUrl} alt={product.name} className="mb-2 h-300px object-contain" />
                        <p className="text-sm">{product.description}</p>
                        <p className="text-base">
                            <strike>Price: ₹{product.price}</strike>
                        </p>
                        <p className="text-base">Selling Price: ₹{product.sellingPrice}</p>
                        <div className="flex flex-col">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
                                onClick={() => handleAddToCart(product)}
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

export default Tv;
