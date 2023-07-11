import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { db } from '../../config/firebaseConfig';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';

const Slides = () => {
    const [slides, setSlides] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true);

    useEffect(() => {
        // Fetch slides data from Firestore
        const fetchSlides = async () => {
            try {
                const slidesCollectionRef = collection(db, 'slides');
                const querySnapshot = await getDocs(slidesCollectionRef);
                const data = querySnapshot.docs.map((doc) => doc.data());
                setSlides(data);
            } catch (error) {
                console.error('Error fetching slides:', error);
            }
        };

        fetchSlides();
    }, []);

    useEffect(() => {
        // Automatically transition to the next slide every 3 seconds
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [slides]);

    const uploadImageToFirestore = async (imageUrl) => {
        try {
            const slidesCollectionRef = collection(db, 'slides');

            // Check if a document with the same image URL already exists
            const q = query(slidesCollectionRef, where('imgURL', '==', imageUrl));
            const querySnapshot = await getDocs(q);
            const existingSlides = querySnapshot.docs.map((doc) => doc.data());

            if (existingSlides.length > 0) {
                console.log('Image already exists in Firestore:', imageUrl);
                return;
            }

            // Add the new document with the image URL
            await addDoc(slidesCollectionRef, { imgURL: imageUrl });
        } catch (error) {
            console.error('Error uploading image to Firestore:', error);
        }
    };

    // Example usage:
    useEffect(() => {
        // Upload image URLs to Firestore
        uploadImageToFirestore(
            'https://i.ytimg.com/vi/pQIbnkOuNoE/maxresdefault.jpg'
        );
        uploadImageToFirestore(
            'https://lgads.tv/wp-content/uploads/2022/02/LG-Ads-Enhanced-Ads-1200x628.jpg'
        );
        uploadImageToFirestore(
            'https://cdn.gsmarena.com/pics/14/12/surface-pro-3-new-ad/gsmarena_001.jpg'
        );
        uploadImageToFirestore(
            'https://techcrunch.com/wp-content/uploads/2019/03/Screen-Shot-2019-03-14-at-12.12.42-PM.png'
        );
        uploadImageToFirestore(
            'https://i0.wp.com/www.smartprix.com/bytes/wp-content/uploads/2023/01/ultra.png?fit=1920%2C960&ssl=1'
        );
        uploadImageToFirestore(
            'https://images-cdn.ispot.tv/ad/Z1JJ/default-large.jpg'
        );
    }, []);

    const handleScroll = () => {
        const scrollPosition = window.pageYOffset;
        if (scrollPosition > 50) {
            setIsNavVisible(false);
        } else {
            setIsNavVisible(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (slides.length === 0) {
        // Return a loading state or placeholder if slides are not yet loaded
        return <div>Loading...</div>;
    }

    const isMobileScreen = window.innerWidth <= 640; // Adjust the screen width breakpoint as per your requirement

    return (
        <div className="bg-gray-800 h-full">
            <Carousel
                selectedItem={currentSlide}
                onChange={setCurrentSlide}
                autoPlay={true}
                interval={3000}
                infiniteLoop={true}
                showThumbs={false} // Remove the bottom navigation images
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                        <button
                            type="button"
                            onClick={onClickHandler}
                            title={label}
                            className="absolute top-1/2 left-4 z-10 bg-gray-700 rounded-full p-2 transform -translate-y-1/2"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                    )
                }

                renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                        <button
                            type="button"
                            onClick={onClickHandler}
                            title={label}
                            className="absolute top-1/2 right-4 z-2 bg-gray-700 rounded-full p-2 transform -translate-y-1/2"
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    )
                }
                className="h-full"
            >
                {slides.map((slide, index) => (
                    <div key={index} className="h-full">
                        <img
                            src={slide.imgURL}
                            alt={`Slide ${index + 1}`}
                            className="h-full object-contain"
                        />
                    </div>
                ))}
            </Carousel>
            {!isMobileScreen && (
                <div className={`homeNav grid grid-cols-3 gap-4 absolute bottom-0 left-0 right-0 transition-opacity ${isNavVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <Link to="/category/laptop">
                        <div className="bg-gray-300 h-[300px] flex items-center justify-center">
                            <img
                                src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Electronics/Clearance/Clearance_store_Desktop_CC_1x._SY304_CB628315133_.jpg"
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </Link>
                    <Link to="/category/phone">
                        <div className="bg-gray-300 h-[300px] flex items-center justify-center">
                            <img
                                src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/katariy/Category_page/Nov_revamp/1_770x450-2.jpg"
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </Link>
                    <Link to="/category/tv">
                        <div className="bg-gray-300 h-[300px] flex items-center justify-center">
                            <img
                                src="https://i.ytimg.com/vi/IOlwMlwHsH0/maxresdefault.jpg"
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Slides;
