import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

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

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.name) newErrors.name = 'Nama wajib diisi.';
        if (!formData.email) {
            newErrors.email = 'Email wajib diisi.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Format email tidak valid.';
        }
        if (!formData.message) newErrors.message = 'Pesan wajib diisi.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);

            // --- PERBAIKAN: Menggunakan URL Getform baru ---
            const formUrl = "https://getform.io/f/bjjrrgrb"; 

            try {
                const response = await fetch(formUrl, {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                if (response.ok) {
                    setIsSubmitted(true);
                    setFormData({ name: '', email: '', message: '' });
                    setTimeout(() => setIsSubmitted(false), 5000);
                } else {
                    alert('Terjadi kesalahan saat mengirim pesan.');
                }
            } catch (error) {
                alert('Terjadi kesalahan jaringan.');
            } finally {
                setLoading(false);
            }
        }
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
                
                {isSubmitted && (
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg shadow-md max-w-xl mx-auto"
                        role="alert"
                    >
                        <div className="flex items-center">
                            <FiCheckCircle className="text-2xl mr-3" />
                            <p className="font-semibold">Pesan Anda berhasil dikirim!</p>
                        </div>
                        <p className="text-sm mt-1">Saya akan segera merespons Anda.</p>
                    </motion.div>
                )}

                <motion.form
                    variants={containerVariants}
                    className="max-w-xl mx-auto text-left"
                    onSubmit={handleSubmit}
                    // --- PERBAIKAN: Menggunakan URL Getform baru di sini juga ---
                    action="https://getform.io/f/bjjrrgrb" 
                    method="POST"
                >
                    <motion.div variants={itemVariants} className="mb-6">
                        <label htmlFor="name" className="block text-gray-300 font-semibold mb-2">Nama</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full p-3 rounded-lg bg-gray-700 border focus:outline-none focus:ring-2 ${
                                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-teal-500'
                            } text-gray-100 transition-colors duration-300`}
                            placeholder="Nama Lengkap Anda"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><FiAlertCircle />{errors.name}</p>}
                    </motion.div>
                    <motion.div variants={itemVariants} className="mb-6">
                        <label htmlFor="email" className="block text-gray-300 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full p-3 rounded-lg bg-gray-700 border focus:outline-none focus:ring-2 ${
                                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-teal-500'
                            } text-gray-100 transition-colors duration-300`}
                            placeholder="Alamat Email Anda"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><FiAlertCircle />{errors.email}</p>}
                    </motion.div>
                    <motion.div variants={itemVariants} className="mb-6">
                        <label htmlFor="message" className="block text-gray-300 font-semibold mb-2">Pesan</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            className={`w-full p-3 rounded-lg bg-gray-700 border focus:outline-none focus:ring-2 ${
                                errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-teal-500'
                            } text-gray-100 transition-colors duration-300`}
                            placeholder="Tulis pesan Anda di sini"
                        ></textarea>
                        {errors.message && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><FiAlertCircle />{errors.message}</p>}
                    </motion.div>
                    <motion.div variants={itemVariants} className="text-center">
                        <button
                            type="submit"
                            className={`bg-teal-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-teal-600 transform transition-all duration-300 hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Mengirim...' : 'Kirim Pesan'}
                        </button>
                    </motion.div>
                </motion.form>
            </motion.div>
        </section>
    );
};

export default Contact;