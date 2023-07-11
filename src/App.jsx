import Cart from "./Screen/Cart";
import Home from "./Screen/Home";
import Profile from "./Screen/Profile";
import Wishlist from "./Screen/Wishlist";
import Laptop from "./Screen/category/Laptop";
import Phone from "./Screen/category/Phone";
import Tv from "./Screen/category/TV";
import Navbar from "./assets/components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";
import { db } from "./config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import SearchPage from "./assets/components/SearchPage";

import LoginPage from "./assets/components/LoginPage";
import SignupPage from "./assets/components/SignupPage";
import PaymentScccess from "./Screen/PaymentScccess";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categories = ["Phone", "Laptop", "TV"];
        const productsData = [];

        for (const category of categories) {
          const categoryCollectionRef = collection(db, category);
          const querySnapshot = await getDocs(categoryCollectionRef);
          const categoryProducts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          productsData.push(...categoryProducts);
        }

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Router>
        <Navbar products={products} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/phone" element={<Phone />} />
          <Route path="/category/laptop" element={<Laptop />} />
          <Route path="/category/tv" element={<Tv />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search/:searchQuery" element={<SearchPage products={products} />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/payment-success" element={<PaymentScccess />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
