import React from 'react';
import { motion } from 'framer-motion';

// Varian untuk animasi masuk item navigasi
const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

const Navbar = ({ toggleTheme, isDarkMode }) => {
    // Definisi warna yang dinamis
    const textColor = isDarkMode ? 'text-gray-200' : 'text-gray-700';
    const bgColor = isDarkMode ? 'bg-gray-900/80' : 'bg-white/80';
    const hoverColor = isDarkMode ? 'hover:text-teal-400' : 'hover:text-teal-600';

    return (
        <motion.nav
            initial="hidden"
            animate="visible"
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.5
                    }
                }
            }}
            className={`fixed top-0 left-0 w-full z-50 p-4 backdrop-blur-md shadow-md ${bgColor} transition-colors duration-500`}
        >
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo atau nama portofolio */}
                <motion.div variants={itemVariants} className="text-xl font-bold font-mono">
                    <span className={`text-teal-500 transition-colors duration-300`}>
                        Portofolio
                    </span>
                </motion.div>

                {/* Menu Navigasi */}
                <div className="flex items-center space-x-6 md:space-x-8">
                    <ul className={`flex space-x-6 md:space-x-8 ${textColor}`}>
                        <motion.li variants={itemVariants}>
                            <a href="#home" className={`font-semibold ${hoverColor} transition-colors duration-300`}>Home</a>
                        </motion.li>
                        <motion.li variants={itemVariants}>
                            <a href="#about" className={`font-semibold ${hoverColor} transition-colors duration-300`}>Tentang</a>
                        </motion.li>
                        <motion.li variants={itemVariants}>
                            <a href="#projects" className={`font-semibold ${hoverColor} transition-colors duration-300`}>Proyek</a>
                        </motion.li>
                        <motion.li variants={itemVariants}>
                            <a href="#contact" className={`font-semibold ${hoverColor} transition-colors duration-300`}>Kontak</a>
                        </motion.li>
                    </ul>

                    {/* Tombol Dark/Light Mode */}
                    <motion.button
                        variants={itemVariants}
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        aria-label="Toggle dark mode"
                    >
                        {isDarkMode ? (
                            <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 110 20A10 10 0 0112 2zm0 2a8 8 0 100 16 8 8 0 000-16zM9 13.5A1.5 1.5 0 017.5 12h-3v1.5a6 6 0 0012 0V12h-3a1.5 1.5 0 01-1.5 1.5z"/></svg>
                        ) : (
                            <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM9 13.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5V15h-6v-1.5z"/></svg>
                        )}
                    </motion.button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
