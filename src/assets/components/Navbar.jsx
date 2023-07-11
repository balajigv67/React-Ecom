import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser, faHeart, faMobileAlt, faLaptop, faTv, faAngleDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";//balaji

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== "") {
            navigate(`/search/${searchQuery}`);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const [isOpen, setIsOpen] = useState(false);
    const dropdownTimer = useRef(null);

    const handleMouseEnter = () => {
        clearTimeout(dropdownTimer.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        dropdownTimer.current = setTimeout(() => {
            setIsOpen(false);
        }, 100); // 100 ms delay before closing the dropdown
    };

    return (
        <nav className="flex flex-wrap justify-between items-center bg-gray-800 text-white p-4 relative z-10">
            {/* Logo */}
            <div className="flex items-center w-full sm:w-auto px-3 mb-2 sm:mb-0">
                <Link to="/" className="text-xl font-bold text-white">
                    Electronics
                </Link>
            </div>

            {/* Search Bar */}
            <div className="flex justify-center flex-grow w-full sm:w-auto mb-2 sm:mb-0">
                <form onSubmit={handleSearch} className="flex">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="px-4 py-2 w-full sm:w-64 rounded-md bg-gray-700 text-white focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-gray-700 rounded-md ml-2"
                    >
                        <FontAwesomeIcon icon={faSearch} className="text-white" />
                    </button>
                </form>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
                {/* Category */}
                <div className="relative">
                    <button
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="px-4 py-2 rounded-md hover:bg-gray-700 flex items-center text-white"
                    >
                        <span>Category</span>
                        <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
                    </button>

                    {isOpen && (
                        <div
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className="absolute right-0 mt-2 w-40 sm:w-auto bg-white text-gray-800 shadow-lg rounded-md z-20"
                        >
                            <Link
                                to="/category/phone"
                                className="flex items-center px-4 py-2 hover:bg-gray-200"
                            >
                                <FontAwesomeIcon icon={faMobileAlt} className="mr-2" />
                                <span>Phone</span>
                            </Link>
                            <Link
                                to="/category/laptop"
                                className="flex items-center px-4 py-2 hover:bg-gray-200"
                            >
                                <FontAwesomeIcon icon={faLaptop} className="mr-2" />
                                <span>Laptop</span>
                            </Link>
                            <Link
                                to="/category/tv"
                                className="flex items-center px-4 py-2 hover:bg-gray-200"
                            >
                                <FontAwesomeIcon icon={faTv} className="mr-2" />
                                <span>TV</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Wishlist */}
                <Link to="/wishlist">
                    <button className="px-4 py-2 rounded-md hover:bg-gray-700">
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                </Link>

                {/* Cart */}
                <Link to="/cart">
                    <button className="px-4 py-2 rounded-md hover:bg-gray-700">
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </button>
                </Link>

                {/* Profile */}
                <Link to="/profile">
                    <button className="px-4 py-2 rounded-md hover:bg-gray-700">
                        <FontAwesomeIcon icon={faUser} />
                    </button>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
