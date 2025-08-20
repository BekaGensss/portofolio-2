import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    // Varian untuk animasi masuk
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
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

    return (
        <section id="contact" className="py-20 lg:py-32">
            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={containerVariants}
                viewport={{ once: true, amount: 0.3 }}
                className="container mx-auto px-6 text-center"
            >
                <motion.h2
                    variants={itemVariants}
                    className="text-4xl lg:text-5xl font-extrabold text-teal-500 mb-4"
                >
                    Hubungi Saya
                </motion.h2>
                <motion.p
                    variants={itemVariants}
                    className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-12"
                >
                    kritik, saran, atau ingin berkolaborasi? Jangan ragu untuk menghubungi saya melalui formulir di bawah ini.
                </motion.p>

                {/* Ganti action dan method dengan URL Formspree Anda */}
                <motion.form
                    variants={containerVariants}
                    className="max-w-xl mx-auto text-left"
                    action="https://formspree.io/f/xldlyolz" // GANTI URL INI DENGAN URL FORMULIR ANDA
                    method="POST"
                >
                    <motion.div variants={itemVariants} className="mb-6">
                        <label htmlFor="name" className="block text-gray-300 font-semibold mb-2">Nama</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-100"
                            placeholder="Nama Lengkap Anda"
                            required
                        />
                    </motion.div>
                    <motion.div variants={itemVariants} className="mb-6">
                        <label htmlFor="email" className="block text-gray-300 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-100"
                            placeholder="Alamat Email Anda"
                            required
                        />
                    </motion.div>
                    <motion.div variants={itemVariants} className="mb-6">
                        <label htmlFor="message" className="block text-gray-300 font-semibold mb-2">Pesan</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-100"
                            placeholder="Tulis pesan Anda di sini"
                            required
                        ></textarea>
                    </motion.div>
                    <motion.div variants={itemVariants} className="text-center">
                        <button
                            type="submit"
                            className="bg-teal-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-teal-600 transform transition-all duration-300 hover:scale-105"
                        >
                            Kirim Pesan
                        </button>
                    </motion.div>
                </motion.form>
            </motion.div>
        </section>
    );
};

export default Contact;