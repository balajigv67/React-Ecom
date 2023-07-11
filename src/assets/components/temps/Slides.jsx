import { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const Slides = () => {
    const [slides, setSlides] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        // Fetch slides data from the server
        axios
            .get('http://localhost:5000/api/slides')
            .then((response) => {
                setSlides(response.data);
                console.log(response);
            })
            .catch((error) => {
                console.error('Error fetching slides:', error);
            });
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

    if (slides.length === 0) {
        // Return a loading state or placeholder if slides are not yet loaded
        return <div>Loading...</div>;
    }

    return (
        <div style={{ height: '500px', position: 'relative' }}>
            <Carousel
                selectedItem={currentSlide}
                onChange={setCurrentSlide}
                autoPlay={true}
                interval={3000}
                infiniteLoop={true}
                showThumbs={false} // Remove the bottom navigation images
                style={{ height: '500px' }}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                        <button
                            type="button"
                            onClick={onClickHandler}
                            title={label}
                            style={{
                                position: 'absolute',
                                top: '200px',
                                left: '0',
                                zIndex: '2',
                            }}
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
                            style={{
                                position: 'absolute',
                                top: '200px',
                                right: '0',
                                zIndex: '2',
                            }}
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    )
                }
            >
                {slides.map((slide, index) => (
                    <div key={slide._id || index}>
                        <img src={slide.imgURL} alt={`Slide ${index}`} />
                    </div>
                ))}
            </Carousel>
            <div className="grid grid-cols-3 gap-4 absolute top-[500px] left-0 right-0 bottom-0">
                <Link to="/category/laptop">
                    <div className="bg-gray-300 h-[300px] w-[400px] flex items-center justify-center mx-auto">
                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Electronics/Clearance/Clearance_store_Desktop_CC_1x._SY304_CB628315133_.jpg" alt="" className='h-full w-full' />
                    </div>
                </Link>
                <Link to="/category/phone">
                    <div className="bg-gray-300 h-[300px] w-[400px] flex items-center justify-center mx-auto">
                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/katariy/Category_page/Nov_revamp/1_770x450-2.jpg" alt="" className='h-full w-full' />
                    </div>
                </Link>
                <Link to="/category/tv">
                    <div className="bg-gray-300 h-[300px] w-[400px] flex items-center justify-center mx-auto">
                        <img src="https://i.ytimg.com/vi/IOlwMlwHsH0/maxresdefault.jpg" alt="" className='h-full w-full' />
                    </div>
                </Link>

            </div>
        </div>
    );
};

export default Slides;
