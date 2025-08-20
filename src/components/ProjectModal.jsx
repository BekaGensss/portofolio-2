import React from 'react';
import { motion } from 'framer-motion';

const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            onClick={onClose}
        >
            <motion.div
                className="bg-gray-900 dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl w-full max-h-screen overflow-y-auto relative"
                variants={modalVariants}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-8">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300"
                        aria-label="Tutup modal"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    <h3 className="text-3xl font-bold text-teal-400 mb-4">{project.title}</h3>
                    <p className="text-gray-400 mb-6">{project.longDescription}</p>
                    
                    {project.images && (
                        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {project.images.map((image, index) => (
                                <img key={index} src={image} alt={`${project.title} screenshot ${index + 1}`} className="w-full h-auto rounded-lg shadow-md" />
                            ))}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map(tag => (
                            <span key={tag} className="bg-teal-500/20 text-teal-300 text-xs font-semibold px-2 py-1 rounded-full">{tag}</span>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        {project.githubLink && (
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-teal-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-teal-600 transform transition-all duration-300 hover:scale-105"
                            >
                                Lihat GitHub
                            </a>
                        )}
                        {project.liveDemoLink && (
                            <a
                                href={project.liveDemoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block border-2 border-teal-500 text-teal-500 font-bold py-2 px-6 rounded-full shadow-lg hover:bg-teal-500 hover:text-white transform transition-all duration-300 hover:scale-105"
                            >
                                Demo Langsung
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectModal;