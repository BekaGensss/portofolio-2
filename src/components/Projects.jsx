import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectModal from './ProjectModal'; 

// GANTI DENGAN GAMBAR PROYEK ANDA.
// PASTIkan file-file ini berada di folder src/assets/
import project1Image1 from '../assets/project1-gambar1.png';
import project1Image2 from '../assets/project1-gambar2.png';
import project2Image1 from '../assets/project2-gambar1.png';
import project2Image2 from '../assets/project2-gambar2.png';
import project3Image1 from '../assets/project3-gambar1.png';
import project3Image2 from '../assets/project3-gambar2.png';


const Projects = () => {
    // State untuk mengelola modal
    const [selectedProject, setSelectedProject] = useState(null);

    // Fungsi untuk membuka modal dengan data proyek
    const openModal = (project) => {
        setSelectedProject(project);
    };

    // Fungsi untuk menutup modal
    const closeModal = () => {
        setSelectedProject(null);
    };

    // Varian untuk animasi masuk
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const cardVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    };

    // Data proyek lebih detail
    const projects = [
        {
            title: "Proyek Pertama",
            description: "Sistem absensi sekolah ini dikembangkan menggunakan framework Laravel untuk memastikan struktur kode yang rapi dan efisien. Untuk tampilan antarmuka (front-end), kami memanfaatkan Blade, template engine bawaan Laravel, yang dipadukan dengan Tailwind CSS. Kombinasi ini memungkinkan kami membangun tampilan yang modern dan responsif dengan proses yang lebih cepat dan terstruktur.",
            longDescription: "Ini adalah deskripsi panjang dari proyek sistem absensi sekolah. Proyek ini bertujuan untuk menyelesaikan masalah manajemen kehadiran siswa menggunakan teknologi Laravel, PHP, Blade, dan Tailwind CSS. Saya bertanggung jawab sebagai pengembang utama dalam proyek ini. Proyek ini menunjukkan kemampuan saya dalam pengembangan web full-stack, perancangan struktur kode yang efisien, dan pembangunan antarmuka pengguna yang modern dan responsif.",
            githubLink: "https://github.com/BekaGensss/absensi-barcode",
            liveDemoLink: "#",
            tags: ["PHP", "CSS", "Laravel"],
            // PERUBAHAN DI SINI
            images: [
                project1Image1,
                project1Image2
            ]
        },
        {
            title: "Proyek Kedua",
            description: "Proyek ini adalah sebuah permainan catur yang saya bangun menggunakan Python. Ini menjadi cara yang efektif untuk melatih pemahaman saya dalam logika pemrograman, aturan, dan struktur data dalam membuat aplikasi berbasis permainan.",
            longDescription: "Proyek ini adalah permainan catur yang saya kembangkan menggunakan Python. Saya mengimplementasikan logika permainan yang kompleks, termasuk aturan pergerakan setiap bidak, giliran pemain, dan kondisi skak. Proyek ini menjadi bukti kemampuan saya dalam menerapkan konsep pemrograman seperti object-oriented programming (OOP) untuk membangun aplikasi yang membutuhkan logika kuat..",
            githubLink: "https://github.com/BekaGensss/game_catur",
            liveDemoLink: "#",
            tags: ["Python"],
            // PERUBAHAN DI SINI
            images: [
                project2Image1,
                project2Image2
            ]
        },
        {
            title: "Proyek Ketiga",
            description: "Proyek my-portfolio ini adalah website yang saya buat untuk menunjukkan hasil kerja saya. Saya berfokus pada pengalaman pengguna yang interaktif dan menyenangkan, bukan sekadar menampilkan informasi, sehingga pengunjung bisa menjelajahi portofolio saya dengan cara yang menarik.",
            longDescription: "Portfolio web pribadi yang saya kembangkan untuk menampilkan hasil kerja dan keahlian saya. Menggunakan kombinasi HTML sebagai struktur dasar, CSS untuk desain yang responsif, dan JavaScript untuk fitur interaktif, proyek ini menjadi wadah yang efektif untuk menunjukkan kemampuan saya dalam pengembangan front-end dasar. Website ini pun sudah di-deploy dan dapat diakses secara online.",
            githubLink: "https://github.com/BekaGensss/my-portfolio",
            liveDemoLink: "#",
            tags: ["HTML", "CSS", "JavaScript"],
            // PERUBAHAN DI SINI
            images: [
                project3Image1,
                project3Image2
            ]
        },
    ];

    return (
        <section id="projects" className="py-20 lg:py-32">
            <div className="container mx-auto px-6 text-center">
                <motion.h2
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl lg:text-5xl font-extrabold text-teal-500 mb-4"
                >
                    Proyek Pilihan
                </motion.h2>
                <motion.p
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-12"
                >
                    Beberapa karya terbaru yang menunjukkan keahlian dan passion saya.
                </motion.p>
                
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={containerVariants}
                    viewport={{ once: true, amount: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            onClick={() => openModal(project)}
                            className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 hover:border-teal-500 transition-colors duration-300 flex flex-col cursor-pointer"
                        >
                            <h3 className="text-2xl font-semibold text-white mb-2">{project.title}</h3>
                            <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map(tag => (
                                    <span key={tag} className="bg-teal-500/20 text-teal-300 text-xs font-semibold px-2 py-1 rounded-full">{tag}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            {/* Tampilkan modal jika ada proyek yang dipilih */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal project={selectedProject} onClose={closeModal} />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;