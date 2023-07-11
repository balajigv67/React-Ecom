import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ItemData from '../../Data/ItemData';

const TopSelling = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? ItemData.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === ItemData.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="bg-gray-200 py-4">
            <h1 className="text-center">Top Sales</h1>
            <div className="flex items-center justify-center">
                <button onClick={handlePrev} className="p-2 rounded-full bg-gray-300 mr-4">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>

                <div className="flex overflow-x-auto space-x-4 max-w-full">
                    {ItemData.map((item, index) => (
                        <div
                            key={index}
                            className={`w-64 bg-white p-4 flex flex-col items-center border ${index === currentIndex ? 'border-blue-500' : ''
                                }`}
                        >
                            <img src={item.imgURL} alt={item.name} className="w-full h-40 object-contain" />
                            <h3 className="text-lg font-bold mt-2">{item.name}</h3>
                            {/* <p className="text-gray-500">${item.price.toFixed(2)}</p> */}
                            {/* <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
                                View
                            </button> */}
                        </div>
                    ))}
                </div>

                <button onClick={handleNext} className="p-2 rounded-full bg-gray-300 ml-4">
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    );
};

export default TopSelling;
