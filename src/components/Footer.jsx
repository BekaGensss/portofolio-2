import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 dark:bg-gray-900 text-gray-300 py-10">
            <div className="container mx-auto px-6 text-center">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    {/* Hak Cipta */}
                    <p className="mb-4 md:mb-0 text-sm md:text-base">
                        &copy; {new Date().getFullYear()} [Bara Kusuma]. Semua Hak Dilindungi.
                    </p>

                    {/* Tautan Media Sosial */}
                    <div className="flex space-x-6">
                        {/* Ganti # dengan URL profil Anda */}
                        <a href="https://github.com/BekaGensss" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-400 hover:text-teal-500 transition-colors duration-300">
                            {/* Ikon GitHub */}
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.373 3.43 9.946 8.204 11.23a.75.75 0 00.1.75c-.097.098-.194.195-.291.292-.294.294-.488.588-.488.98a.75.75 0 00.75.75c1.47 0 2.94-.49 4.41-.98a.75.75 0 00.75-.75.75.75 0 00-.75-.75c-.294-.294-.488-.588-.488-.98a.75.75 0 00.75-.75c.49 0 .98-.49 1.47-.98a.75.75 0 00.75-.75.75.75 0 00-.75-.75c-.49 0-.98-.49-1.47-.98a.75.75 0 00-.75-.75.75.75 0 00-.75-.75zM12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75-4.365-9.75-9.75-9.75z"/></svg>
                        </a>
                        <a href="https://id.linkedin.com/in/bara-kusuma-707067294" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-teal-500 transition-colors duration-300">
                            {/* Ikon LinkedIn */}
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16 0H8C3.58 0 0 3.58 0 8v8c0 4.42 3.58 8 8 8h8c4.42 0 8-3.58 8-8V8c0-4.42-3.58-8-8-8zM7 19H4v-8h3v8zM5.5 8.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm13.5 10.5h-3v-4.5c0-1.07-.19-1.46-.99-1.92-.6-.35-1.46-.58-2.31-.58-.85 0-1.71.23-2.31.58-.8.46-.99.85-.99 1.92V19h-3v-8h3v1.5c.42-.58.98-1.05 1.77-1.45.79-.4 1.7-.6 2.59-.6 3.12 0 5.21 2.09 5.21 5.21V19z"/></svg>
                        </a>
                        {/* Tambahkan ikon media sosial lainnya di sini */}
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
        </footer>
    );
};

export default Footer;