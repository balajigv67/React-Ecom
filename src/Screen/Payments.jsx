import { useContext, useState } from 'react';
import { CartContext } from '../state/context';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebaseConfig';
import Payments from './Payments';

const Cart = () => {
    const { cartItems, incrementQuantity, decrementQuantity, removeFromCart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [showPayments, setShowPayments] = useState(false);

    const handleIncrement = (itemId) => {
        incrementQuantity(itemId);
    };

    const handleDecrement = (itemId) => {
        decrementQuantity(itemId);
    };

    const handleRemove = (itemId) => {
        removeFromCart(itemId);
    };

    const handleClearCart = () => {
        clearCart();
    };

    const calculateGrandTotal = () => {
        let total = 0;
        cartItems.forEach((item) => {
            total += item.sellingPrice * item.quantity;
        });
        return total;
    };

    const handleCheckout = () => {
        const user = auth.currentUser;
        if (user) {
            setShowPayments(true);
        } else {
            navigate('/login');
        }
    };

    const handlePayment = (payment) => {
        // Process the payment here
        console.log('Payment details:', payment);
        // Reset the cart or perform any other necessary actions
        clearCart();
    };

    return (
        <div className="relative">
            <h2 className="text-2xl font-bold mb-4">Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul className="space-y-4">
                    {cartItems.map((item) => (
                        <li key={item.id} className="flex items-center space-x-4">
                            <img src={item.imageUrl} alt={item.name} className="w-24" />
                            <div>
                                <p className="font-bold">{item.name}</p>
                                <p>
                                    <strike>Price: ₹{item.price}</strike>
                                </p>
                                <p>Selling Price: ₹{item.sellingPrice}</p>
                                <div className="flex items-center space-x-2">
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleDecrement(item.id)}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleIncrement(item.id)}
                                    >
                                        +
                                    </button>
                                </div>
                                <p>Total: ₹{item.sellingPrice * item.quantity}</p>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 mt-2 rounded"
                                    onClick={() => handleRemove(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {cartItems.length > 0 && (
                <div className="fixed bottom-0 left-0 w-full bg-white p-4 flex justify-between">
                    <div>
                        <h1 className="text-xl font-bold">Grand Total: ₹{calculateGrandTotal()}</h1>
                        <p className="text-gray-500 text-sm">Items in Cart: {cartItems.length}</p>
                    </div>
                    <div>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded mr-4"
                            onClick={handleClearCart}
                        >
                            Clear Cart
                        </button>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded"
                            onClick={handleCheckout}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
            {showPayments && (
                <div className="fixed top-0 right-0 h-full w-1/2 bg-gray-100 flex items-center justify-center">
                    <Payments grandTotal={calculateGrandTotal()} handlePayment={handlePayment} />
                </div>
            )}
        </div>
    );
};

export default Cart;
