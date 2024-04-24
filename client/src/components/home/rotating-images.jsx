
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import hero1 from '/home/home-hero1.png'
import hero2 from '/home/home-hero2.png'
import hero3 from '/home/home-hero3.png'

const images = [
    hero1,
    hero2,
    hero3,
];

const RotatingImages = ({ className }) => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`overflow-hidden ${className}`}>
            <AnimatePresence>
                {images.map((src, index) => (
                    <motion.img
                        className={`w-fit object-fill ${currentImage === index ? 'block' : 'hidden'}`}
                        key={index}
                        src={src}
                        alt={`Image ${index + 1}`}
                        initial={{ scale: 0.1, opacity: 0 }}
                        animate={{
                            scale: currentImage === index ? 1 : 0.1,
                            opacity: currentImage === index ? 1 : 0,
                            rotate: currentImage === index ? 0 : -360,
                        }}
                        transition={{ duration: 0.75, type: 'tween' }}
                        exit={{ scale: 0.1, opacity: 0 }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default RotatingImages;