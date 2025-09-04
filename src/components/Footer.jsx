import React, { useState, useEffect } from 'react';
import { FiChevronUp, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { FaTwitter, FaFacebookF } from 'react-icons/fa';

// Anda bisa membuat objek untuk tautan sosial agar lebih rapi
const socialLinks = {
    github: "https://github.com/BekaGensss",
    linkedin: "https://id.linkedin.com/in/bara-kusuma-707067294",
    // Tambahkan tautan sosial lainnya di sini
};

const Footer = () => {
    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false);
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
    }, [showScroll]);

    return (
        <footer className="bg-gray-800 dark:bg-gray-900 text-gray-300 py-10 transition-colors duration-300 relative">
            <div className="container mx-auto px-6 text-center">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    {/* Hak Cipta */}
                    <p className="mb-4 md:mb-0 text-sm md:text-base">
                        &copy; {new Date().getFullYear()} [Bara Kusuma]. Semua Hak Dilindungi.
                    </p>

                    {/* Tautan Media Sosial */}
                    <div className="flex space-x-6">
                        <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-400 hover:text-teal-500 transition-colors duration-300">
                            <FiGithub className="w-6 h-6" />
                        </a>
                        <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-teal-500 transition-colors duration-300">
                            <FiLinkedin className="w-6 h-6" />
                        </a>
                        {/* Tambahkan ikon lain jika perlu */}
                    </div>
                </div>

                {/* Navigasi Footer */}
                <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-8 text-sm md:text-base text-gray-400 font-semibold">
                    <a href="#home" className="hover:text-teal-500 transition-colors duration-300">Home</a>
                    <a href="#about" className="hover:text-teal-500 transition-colors duration-300">Tentang</a>
                    <a href="#projects" className="hover:text-teal-500 transition-colors duration-300">Proyek</a>
                    <a href="#contact" className="hover:text-teal-500 transition-colors duration-300">Kontak</a>
                </div>
            </div>

            {showScroll && (
                <button
                    onClick={scrollTop}
                    className="fixed bottom-6 right-6 p-3 rounded-full bg-teal-500 text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 z-50"
                    aria-label="Kembali ke atas"
                >
                    <FiChevronUp size={24} />
                </button>
            )}
        </footer>
    );
};

export default Footer;