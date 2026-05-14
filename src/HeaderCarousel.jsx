import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './HeaderCarousel.css';

const HeaderCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const slides = [
    {
      id: 1,
      title: 'Summer Collection 2026',
      subtitle: 'Discover the latest trends',
      image: '🌞',
      gradient: 'linear-gradient(135deg, #FEF3C7 0%, #FECACA 100%)',
      ctaText: 'Shop Now',
      ctaLink: '/shop',
    },
    {
      id: 2,
      title: 'Exclusive Deal',
      subtitle: 'Get 50% off on selected items',
      image: '🎁',
      gradient: 'linear-gradient(135deg, #F3E8FF 0%, #DDD6FE 100%)',
      ctaText: 'Limited Time',
      ctaLink: '/shop',
    },
    {
      id: 3,
      title: 'New Arrivals',
      subtitle: 'Fresh designs just dropped',
      image: '⭐',
      gradient: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
      ctaText: 'Explore',
      ctaLink: '/shop',
    },
    {
      id: 4,
      title: 'Flash Sale',
      subtitle: 'Today only - up to 70% off',
      image: '⚡',
      gradient: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
      ctaText: 'Shop Sale',
      ctaLink: '/shop',
    },
  ];

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index % slides.length);
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, [autoPlay, nextSlide]);

  return (
    <div className="header-carousel" onMouseEnter={() => setAutoPlay(false)} onMouseLeave={() => setAutoPlay(true)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="carousel-slide"
          style={{ background: slides[currentSlide].gradient }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="carousel-container">
            {/* Left Side - Content */}
            <motion.div
              className="carousel-content"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="carousel-title">{slides[currentSlide].title}</h1>
              <p className="carousel-subtitle">{slides[currentSlide].subtitle}</p>

              <motion.a
                href={slides[currentSlide].ctaLink}
                className="carousel-cta"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {slides[currentSlide].ctaText}
                <FiChevronRight />
              </motion.a>
            </motion.div>

            {/* Right Side - Image/Icon */}
            <motion.div
              className="carousel-image"
              initial={{ x: 50, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="image-container">{slides[currentSlide].image}</div>
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <button className="carousel-nav carousel-prev" onClick={prevSlide}>
            <FiChevronLeft />
          </button>
          <button className="carousel-nav carousel-next" onClick={nextSlide}>
            <FiChevronRight />
          </button>

          {/* Indicators */}
          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{ scale: index === currentSlide ? 1.2 : 1 }}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeaderCarousel;
