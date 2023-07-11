import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const incrementQuantity = (itemId) => {
    const updatedCart = cartItems.map((cartItem) =>
      cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
    setCartItems(updatedCart);
  };

  const decrementQuantity = (itemId) => {
    const updatedCart = cartItems.map((cartItem) =>
      cartItem.id === itemId && cartItem.quantity > 1 ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    );
    setCartItems(updatedCart);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== itemId);
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addToWishlist = (product) => {
    const existingItem = wishlistItems.find((item) => item.id === product.id);

    if (existingItem) {
      return;
    }

    setWishlistItems((prevItems) => [...prevItems, product]);
  };

  const removeFromWishlist = (itemId) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== itemId);
    setWishlistItems(updatedWishlist);
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase().trim());
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        clearCart,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        searchQuery,
        handleSearch,
        clearSearch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
