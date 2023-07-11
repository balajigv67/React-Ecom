import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../state/context';
import { useParams } from 'react-router-dom';

const SearchPage = ({ products }) => {

    const { searchQuery } = useParams()

    const { addToCart, addToWishlist } = useContext(CartContext);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const handleAddToWishlist = (product) => {
        addToWishlist(product);
    };
    useEffect(() => {
        if (searchQuery.trim() !== '') {
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts([]);
        }
    }, [searchQuery, products]);

    return (
        <div className="search-page">
            <h1 className="text-2xl font-bold mb-4">Search Results</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="border p-4">
                        {/* Product details */}
                        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                        <div className="aspect-w-3 aspect-h-4">
                            <img src={product.imageUrl} alt={product.name} className="w-400px h-full object-cover" />
                        </div>
                        <p className="text-sm">{product.description}</p>
                        <p className="text-base">
                            <strike>Price: ₹{product.price}</strike>
                        </p>
                        <p className="text-base">Selling Price: ₹{product.sellingPrice}</p>
                        {/* Other product information */}
                        <div className="flex flex-col">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
                                onClick={() => handleAddToCart(product)}
                            >
                                Add to Cart
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 mt-2 rounded-md"
                                onClick={() => handleAddToWishlist(product)}
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

export default SearchPage;
