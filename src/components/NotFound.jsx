import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gray-900 text-gray-100"
        >
            <motion.h1
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="text-6xl md:text-8xl font-extrabold text-teal-500 mb-4"
            >
                404
            </motion.h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-200 mb-4">Halaman Tidak Ditemukan</h2>
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-md">
                Maaf, halaman yang Anda cari tidak ada. Mungkin Anda salah mengetik URL, atau halaman telah dipindahkan.
            </p>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <Link
                    to="/"
                    className="inline-block bg-teal-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-teal-600 transform transition-all duration-300 hover:scale-105"
                >
                    Kembali ke Beranda
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default NotFound;