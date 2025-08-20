import React from 'react';
import { motion } from 'framer-motion';

// Definisi varian untuk animasi
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

const skillVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
        },
    },
};

const skills = [
    { name: "React", icon: "https://cdn.svgporn.com/logos/react.svg" },
    { name: "Tailwind CSS", icon: "https://cdn.svgporn.com/logos/tailwindcss-icon.svg" },
    { name: "JavaScript", icon: "https://cdn.svgporn.com/logos/javascript.svg" },
    { name: "Node.js", icon: "https://cdn.svgporn.com/logos/nodejs-icon.svg" },
    { name: "HTML", icon: "https://cdn.svgporn.com/logos/html-5.svg" },
    { name: "Laravel", icon: "https://cdn.svgporn.com/logos/laravel.svg" },
    { name: "MySQL", icon: "https://cdn.svgporn.com/logos/mysql.svg" },
    { name: "PHP", icon: "https://cdn.svgporn.com/logos/php.svg" },
];

const About = () => {
    return (
        <section id="about" className="py-20 lg:py-32">
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
                    Tentang Saya
                </motion.h2>
                <motion.p
                    variants={itemVariants}
                    className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-12"
                >
                    Seorang pengembang web yang bersemangat dengan keahlian dalam membangun aplikasi modern dan responsif menggunakan teknologi terbaru.
                </motion.p>
                
                {/* Bagian Ikon Keterampilan */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={containerVariants}
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex flex-wrap justify-center gap-8 mb-16"
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            variants={skillVariants}
                            className="text-center p-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 transform hover:scale-110"
                        >
                            <img src={skill.icon} alt={skill.name} className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2" />
                            <span className="block text-sm md:text-base font-semibold text-gray-300">{skill.name}</span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bagian Keahlian & Filosofi (yang sudah ada sebelumnya) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                    {/* Blok Keahlian 1 */}
                    <motion.div
                        variants={itemVariants}
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        className="p-6 rounded-lg shadow-lg bg-gray-800 border border-gray-700 hover:border-teal-500 transition-colors duration-300"
                    >
                        <h3 className="text-2xl font-semibold text-teal-400 mb-2">Keahlian Teknis</h3>
                        <p className="text-gray-300">
                            Saya adalah seorang pengembang web yang berfokus pada pembangunan aplikasi modern dan responsif. Untuk bagian front-end, saya menguasai React, HTML, dan JavaScript, yang dipercantik dengan Tailwind CSS. Di sisi back-end, saya menggunakan Node.js dan PHP dengan framework Laravel. Semua data aplikasi saya kelola menggunakan database MySQL.
                        </p>
                    </motion.div>

                    {/* Blok Keahlian 2 */}
                    <motion.div
                        variants={itemVariants}
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        className="p-6 rounded-lg shadow-lg bg-gray-800 border border-gray-700 hover:border-teal-500 transition-colors duration-300"
                    >
                        <h3 className="text-2xl font-semibold text-teal-400 mb-2">Filosofi Desain</h3>
                        <p className="text-gray-300">
                            Saya percaya bahwa desain yang baik adalah perpaduan antara estetika visual yang menarik dan pengalaman pengguna yang intuitif dan fungsional.
                        </p>
                    </motion.div>

                    {/* Blok Keahlian 3 */}
                    <motion.div
                        variants={itemVariants}
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        className="p-6 rounded-lg shadow-lg bg-gray-800 border border-gray-700 hover:border-teal-500 transition-colors duration-300"
                    >
                        <h3 className="text-2xl font-semibold text-teal-400 mb-2">Proyek & Kolaborasi</h3>
                        <p className="text-gray-300">
                            Saya senang bekerja dalam tim dan berkontribusi pada proyek open-source. Saya terus belajar dan mengeksplorasi teknologi baru.
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;