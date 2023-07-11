import { useContext } from 'react';
import { CartContext } from '../state/context';

const Wishlist = () => {
    const { wishlistItems, addToCart, removeFromWishlist } = useContext(CartContext);

    const handleAddToCart = (product) => {
        addToCart(product);
        removeFromWishlist(product.id); // Remove the item from wishlist based on its ID
    };

    const handleRemoveFromWishlist = (itemId) => {
        removeFromWishlist(itemId); // Remove the item from wishlist based on its ID
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
            {wishlistItems.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <ul className="space-y-4">
                    {wishlistItems.map((item) => (
                        <li key={item.id} className="flex items-center space-x-4">
                            <img src={item.imageUrl} alt={item.name} className="w-24" />
                            <div>
                                <p className="font-bold">{item.name}</p>
                                <p>
                                    <strike>Price:  ₹{item.price}</strike>
                                </p>
                                <p>Selling Price:  ₹{item.sellingPrice}</p>
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleAddToCart(item)}
                                >
                                    Add to Cart
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded ml-4"
                                    onClick={() => handleRemoveFromWishlist(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Wishlist;
