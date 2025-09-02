import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Typed } from 'react-typed';

const Hero = ({ isDarkMode }) => {
const el = useRef(null);

useEffect(() => {
    const options = {
        strings: ['Bara Kusuma', 'Pengembang Web', 'Kreator Digital'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
    };

    const typed = new Typed(el.current, options);

    return () => {
        typed.destroy();
    };
}, []);

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.5,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
        },
    },
};

const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-900';
const highlightColor = isDarkMode ? 'text-teal-400' : 'text-teal-600';

return (
    <section id="home" className="hero min-h-screen flex items-center justify-center pt-24 pb-12 text-center relative z-10 overflow-hidden">
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="container mx-auto px-6 max-w-4xl"
        >
            <motion.div variants={itemVariants} className="mb-8">
                <img
                    src={process.env.PUBLIC_URL + "/profile.jpg"}
                    alt="Foto Profil"
                    className="w-48 h-48 object-cover rounded-full mx-auto shadow-lg border-4 border-teal-500"
                />
            </motion.div>

            <motion.h1
                variants={itemVariants}
                // PERUBAHAN DI SINI: ukuran font lebih kecil di mobile dan tanpa whitespace-nowrap
                className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold font-sans mb-4 leading-tight ${textColor}`}
            >
                Hai, saya <span className={highlightColor}>
                    <span ref={el} />
                </span>
            </motion.h1>
            <motion.p
                variants={itemVariants}
                className={`text-xl lg:text-2xl font-light mb-8 ${textColor} opacity-80`}
            >
                Seorang Pengembang Web Kreatif yang Mengubah Ide Menjadi Pengalaman Digital Interaktif dan Menarik.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <a
                    href="#contact"
                    className="inline-block bg-teal-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-teal-600 transform transition-all duration-300 hover:scale-105"
                >
                    Hubungi Saya
                </a>
                <a
                    href={process.env.PUBLIC_URL + "/CV - Bara Kusuma.pdf"}
                    download
                    className="inline-block bg-transparent border-2 border-teal-500 text-teal-500 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-teal-500 hover:text-white transform transition-all duration-300 hover:scale-105"
                >
                    Unduh CV
                </a>
            </motion.div>
        </motion.div>
    </section>
);
};

export default Hero;