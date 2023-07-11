import { useContext, useState } from 'react';
import { CartContext } from '../state/context';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import Payments from './Payments';

const Cart = () => {
    const { cartItems, incrementQuantity, decrementQuantity, removeFromCart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [showPayments, setShowPayments] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        pincode: '',
        cardNumber: '',
        cvv: '',
    });

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

    const handlePayment = async (e) => {
        e.preventDefault();

        // Validate form fields
        if (
            !formData.name ||
            !formData.email ||
            !formData.phone ||
            !formData.address ||
            !formData.pincode ||
            !formData.cardNumber ||
            !formData.cvv
        ) {
            alert('Please fill in all the fields.');
            return;
        }

        // Validate card number
        if (formData.cardNumber.length !== 16 || !/^[0-9]{16}$/.test(formData.cardNumber)) {
            alert('Invalid card number. Please enter a 16-digit card number.');
            return;
        }

        // Validate CVV number
        if (formData.cvv.length !== 3 || !/^[0-9]{3}$/.test(formData.cvv)) {
            alert('Invalid CVV number. Please enter a 3-digit CVV number.');
            return;
        }

        // Process the payment here
        console.log('Payment details:', formData);

        // Save the order details to Firestore
        const user = auth.currentUser;
        if (user) {
            const order = {
                user: user.uid,
                items: cartItems,
                totalAmount: calculateGrandTotal(),
                shippingDetails: formData,
                timestamp: new Date().toISOString(),
                paymentStatus: 'paid', // Set the payment status to 'paid'
            };

            try {
                const docRef = await addDoc(collection(db, 'orders'), order);
                console.log('Order placed successfully with ID:', docRef.id);

                // Reset the cart or perform any other necessary actions
                clearCart();

                // Redirect to payment success page
                navigate('/payment-success');
            } catch (error) {
                // Handle error if necessary
                console.error('Error placing order:', error);
            }
        }
    };



    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validate and restrict input for card number and CVV fields
        if (name === 'cardNumber' || name === 'cvv') {
            if (!/^[0-9]*$/.test(value)) {
                // If non-numeric characters are entered, remove them
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value.replace(/[^0-9]/g, ''),
                }));
                return;
            }
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            <div>
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
                    <div>
                        <h1 className="text-xl font-bold">Grand Total: ₹{calculateGrandTotal()}</h1>
                        <p className="text-gray-500 text-sm">Items in Cart: {cartItems.length}</p>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                            onClick={handleClearCart}
                        >
                            Clear Cart
                        </button>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                            onClick={handleCheckout}
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
            {showPayments && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>
                    <form onSubmit={handlePayment}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                                Phone
                            </label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="address">
                                Address
                            </label>
                            <textarea
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="address"
                                name="address"
                                placeholder="Enter your address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="pincode">
                                Pin Code
                            </label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="pincode"
                                name="pincode"
                                type="text"
                                placeholder="Enter your pin code"
                                value={formData.pincode}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <p className='my-5 underline'>Card details</p>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="cardNumber">
                                Card Number
                            </label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="cardNumber"
                                name="cardNumber"
                                type="text"
                                placeholder="Enter your card number"
                                value={formData.cardNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="cvv">
                                CVV
                            </label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="cvv"
                                name="cvv"
                                type="text"
                                placeholder="Enter CVV"
                                value={formData.cvv}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded"
                            type="submit"
                        >
                            Make Payment
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Cart;
