import { useState } from 'react';
import { collection, addDoc, getDocs, where, query } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../config/firebaseConfig';

const UploadProduct = () => {
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [productName, setProductName] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({
        category: '',
        image: '',
        productName: '',
        sellingPrice: '',
        price: '',
        description: '',
    });

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    };

    const handleSellingPriceChange = (event) => {
        setSellingPrice(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleUpload = async () => {
        const validationErrors = {};

        if (!category) {
            validationErrors.category = 'Please select a category';
        }

        if (!image) {
            validationErrors.image = 'Please select an image';
        }

        if (!productName) {
            validationErrors.productName = 'Please enter a product name';
        }

        if (!sellingPrice) {
            validationErrors.sellingPrice = 'Please enter a selling price';
        }

        if (!price) {
            validationErrors.price = 'Please enter a price';
        }

        if (!description) {
            validationErrors.description = 'Please enter a description';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const categoryCollectionRef = collection(db, category);
            const querySnapshot = await getDocs(
                query(categoryCollectionRef, where('name', '==', productName))
            );

            if (!querySnapshot.empty) {
                validationErrors.productName = 'Product with the same name already exists in this category';
                setErrors(validationErrors);
                return;
            }

            const storageRef = ref(storage, `images/${category}/${image.name}`);
            await uploadBytes(storageRef, image);
            const imageUrl = await getDownloadURL(storageRef);

            await addDoc(categoryCollectionRef, {
                name: productName,
                imageUrl: imageUrl,
                price: price,
                sellingPrice: sellingPrice,
                description: description,
            });

            setCategory('');
            setImage(null);
            setProductName('');
            setSellingPrice('');
            setPrice('');
            setDescription('');
            setErrors({});

            console.log('Product uploaded successfully!');
        } catch (error) {
            console.error('Error uploading product:', error);
            console.log('Product upload failed.');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-md shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Upload Product</h2>
            <div className="mb-4">
                <label className="block mb-2">
                    Category:
                    <select
                        className="border border-gray-300 rounded-md w-full py-2 px-3 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={category}
                        onChange={handleCategoryChange}
                    >
                        <option value="">Select Category</option>
                        <option value="Phone">Phone</option>
                        <option value="Laptop">Laptop</option>
                        <option value="TV">TV</option>
                    </select>
                    {errors.category && <span className="text-red-500">{errors.category}</span>}
                </label>
            </div>
            <div className="mb-4">
                <label className="block mb-2">
                    Image:
                    <input
                        type="file"
                        className="border border-gray-300 rounded-md w-full py-2 px-3 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        onChange={handleImageChange}
                    />
                    {errors.image && <span className="text-red-500">{errors.image}</span>}
                </label>
            </div>
            <div className="mb-4">
                <label className="block mb-2">
                    Product Name:
                    <input
                        type="text"
                        className="border border-gray-300 rounded-md w-full py-2 px-3 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={productName}
                        onChange={handleProductNameChange}
                    />
                    {errors.productName && <span className="text-red-500">{errors.productName}</span>}
                </label>
            </div>
            <div className="mb-4">
                <label className="block mb-2">
                    Selling Price:
                    <input
                        type="number"
                        className="border border-gray-300 rounded-md w-full py-2 px-3 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={sellingPrice}
                        onChange={handleSellingPriceChange}
                    />
                    {errors.sellingPrice && <span className="text-red-500">{errors.sellingPrice}</span>}
                </label>
            </div>
            <div className="mb-4">
                <label className="block mb-2">
                    Price:
                    <input
                        type="number"
                        className="border border-gray-300 rounded-md w-full py-2 px-3 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={price}
                        onChange={handlePriceChange}
                    />
                    {errors.price && <span className="text-red-500">{errors.price}</span>}
                </label>
            </div>
            <div className="mb-4">
                <label className="block mb-2">
                    Description:
                    <textarea
                        className="border border-gray-300 rounded-md w-full py-2 px-3 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={description}
                        onChange={handleDescriptionChange}
                    ></textarea>
                    {errors.description && <span className="text-red-500">{errors.description}</span>}
                </label>
            </div>
            <button
                onClick={handleUpload}
                className="bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none hover:bg-blue-600"
            >
                Upload
            </button>
        </div>
    );
};

export default UploadProduct;
