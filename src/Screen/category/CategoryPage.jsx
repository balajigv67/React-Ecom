// import PropTypes from 'prop-types'
// import { useState, useEffect } from 'react';
// import { collection, query, getDocs } from 'firebase/firestore';
// import { db } from '../../config/firebaseConfig';

// const CategoryPage = ({ match }) => {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const category = match.params.category;
//                 const categoryProductsQuery = query(collection(db, category));
//                 const querySnapshot = await getDocs(categoryProductsQuery);
//                 const categoryProducts = querySnapshot.docs.map((doc) => doc.data());
//                 setProducts(categoryProducts);
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             }
//         };

//         fetchProducts();
//     }, [match.params.category]);

//     return (
//         <div>
//             <h2>{match.params.category} Category</h2>
//             {products.map((product) => (
//                 <div key={product.name}>
//                     <h3>{product.name}</h3>
//                     <img src={product.imageUrl} alt={product.name} />
//                     <p>Price: {product.price}</p>
//                     <p>Selling Price: {product.sellingPrice}</p>
//                     <p>Description: {product.description}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };



// CategoryPage.propTypes = {
//     match: PropTypes.shape({
//         params: PropTypes.shape({
//             category: PropTypes.string.isRequired
//         }).isRequired
//     }).isRequired
// };


// export default CategoryPage;
