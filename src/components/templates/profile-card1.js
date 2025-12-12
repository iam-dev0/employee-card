import { motion } from "framer-motion";
import { QRCodeSVG } from 'qrcode.react';
import { forwardRef, useState } from 'react';

const Home = forwardRef(({ data, shareWebsite, downloadPDF, loading }, ref) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [isSharing, setIsSharing] = useState(false);

    const handleDownload = async () => {

        await downloadPDF();

    };

    const handleShare = async () => {

        await shareWebsite();

    };

    const {
        firstname: firstName = 'Linda',
        name: lastName = 'Johnson',
        role = 'Sr. Marketing Manager',
        companyName = 'Creative Studio',
        companyLogo = "",
        image = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop',
        phone = '',
        email = '',
        linkedin = '',
        website = '',
        qrCodeLink = '',
        aboutDE = '',
        aboutEN = '',
        customFields = [],
        footerCompany = "",
        footerAddress = "",
        footerEmail = "",
        footerPhone = "",
        colors = {}
    } = data;

    // Extract colors with defaults
    const {
        primaryColor = '#ffffff',
        secondaryColor = '#85c4ff',
        backgroundColor = '#1c1c1c',
        accentColor = '#A3B5A5',
        contrastColor = '#9EACEF',
        textColor = '#f5f5f5'
    } = colors;

    // Dynamic font sizing logic
    const getFontSize = (text) => {
        const length = text.length;
        const vw = Math.max(12, Math.min(30, 100 / (length * 0.8)));
        return `clamp(3rem, ${vw - 5}vw, 24rem)`;
    };
    const qrLink = qrCodeLink || (typeof window !== 'undefined' ? window.location.href : '');

    return (
        <div ref={ref} className="h-full text-foreground overflow-x-hidden font-sans" style={{ backgroundColor, color: textColor, '--accent-color': accentColor, '--bg-color': backgroundColor, '--text-color': textColor }}>
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-exclusion text-white">
                <div className="flex flex-col">
                    {companyLogo ? (
                        <div className="flex items-center gap-3">
                            <img src={companyLogo} alt="Logo" className="h-12 w-auto object-contain" />
                        </div>
                    ) : (
                        <>
                            <span className="font-medium text-sm">{companyName}</span>
                        </>
                    )}
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 text-sm font-medium tracking-widest">
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative h-[800px] md:h-[900px] lg:h-[950px] w-full overflow-hidden flex flex-col justify-end pt-24 pb-8 px-4 md:px-12" style={{ backgroundColor }}>

                {/* Image - Background / Behind Text */}
                <div className="absolute inset-0 z-0 flex items-end justify-center">
                    <motion.img
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                        src={image}
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        alt={`${firstName} ${lastName}`}
                        className="h-full sm:w-full md:w-full lg:w-auto md:object-top"
                    />
                    {/* Gradient overlay to ensure text readability if needed, though usually requested without for this specific style */}
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* First Name - Top Left - In Front */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative z-10 leading-none"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mb-4 md:mb-12 md:absolute md:top-[-20vh] md:right-0"
                    >
                        <p className="text-white/90 text-sm md:text-xl font-light tracking-wide max-w-[200px] md:max-w-xs leading-relaxed mix-blend-difference">
                            {role}
                        </p>
                    </motion.div>
                    <h1
                        className="font-display font-bold tracking-tighter uppercase leading-[0.8]"
                        style={{ fontSize: getFontSize(firstName), color: accentColor }}
                    >
                        {firstName}
                    </h1>
                </motion.div>


                {/* Role & Last Name Container - In Front */}
                <div className="relative z-10 flex flex-col items-end text-right">

                    {/* Role Text - Responsive Positioning */}


                    {/* Last Name - Bottom Right */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                        className="leading-none"
                    >
                        <h1
                            className="font-display font-bold tracking-tighter uppercase leading-[0.8]"
                            style={{ fontSize: getFontSize(lastName), color: accentColor }}
                        >
                            {lastName}
                        </h1>
                    </motion.div>
                </div>

                {/* Gradient Overlay at bottom to blend image if needed (optional) */}
                <div className="absolute bottom-0 left-0 w-full h-24 z-20 pointer-events-none md:hidden" style={{ background: `linear-gradient(to top, ${backgroundColor}, transparent)` }} />
            </section>

            {/* About Section */}
            <section id="about" className="py-24 md:py-32 relative z-20" style={{ backgroundColor, color: textColor }}>
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-12 gap-12 items-start">
                        <div className="md:col-span-4">
                            <h2 className="text-4xl md:text-6xl font-bold opacity-30 sticky top-32 font-display" style={{ color: accentColor }}>
                                ABOUT
                            </h2>
                        </div>
                        <div className="md:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <p className="[&_*]:!text-2xl [&_*]:!md:text-4xl [&_*]:!font-light [&_*]:!leading-relaxed [&_*]:!mb-12 [&_*]:!text-balance" style={{ color: textColor }}>
                                    {(aboutDE || aboutEN) && (
                                        <div
                                            className=""
                                            dangerouslySetInnerHTML={{ __html: aboutDE || aboutEN }}
                                        />
                                    )}
                                </p>
                                <div className="grid md:grid-cols-2 gap-8" style={{ color: `${textColor}99` }}>
                                    <div>
                                        <h3 className="text-lg mb-4 font-display uppercase tracking-widest border-b pb-2" style={{ color: textColor, borderColor: `${textColor}20` }}>Focus</h3>
                                        <ul className="space-y-3">
                                            {["Strategic Growth", "Digital Transformation", "Brand Strategy"].map((item) => (
                                                <li key={item} className="flex items-center gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg mb-4 font-display uppercase tracking-widest border-b pb-2" style={{ color: textColor, borderColor: `${textColor}20` }}>Expertise</h3>
                                        <ul className="space-y-3">
                                            {["Marketing Leadership", "Creative Direction", "Team Management"].map((item) => (
                                                <li key={item} className="flex items-center gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 relative z-20 border-t" style={{ backgroundColor: `${backgroundColor}dd`, borderColor: `${textColor}10` }}>
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-12 gap-12">
                        <div className="md:col-span-4">
                            <h2 className="text-4xl md:text-6xl font-bold opacity-30 font-display" style={{ color: accentColor }}>
                                CONTACT
                            </h2>
                        </div>
                        <div className="md:col-span-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                {email && <a href={`mailto:${email}`} className="group block p-8 transition-all duration-300 border" style={{ backgroundColor: `${textColor}08`, borderColor: `${textColor}10` }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${accentColor}15`; e.currentTarget.style.borderColor = `${accentColor}40`; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = `${textColor}08`; e.currentTarget.style.borderColor = `${textColor}10`; }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mb-6 group-hover:scale-110 transition-transform" style={{ color: accentColor }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                    <span className="text-xs uppercase tracking-widest block mb-2" style={{ color: `${textColor}70` }}>Email</span>
                                    <span className="text-lg md:text-xl break-all font-light" style={{ color: textColor }}>{email}</span>
                                </a>}

                                {phone && <a href={`tel:${phone.replace(/\s/g, '')}`} className="group block p-8 transition-all duration-300 border" style={{ backgroundColor: `${textColor}08`, borderColor: `${textColor}10` }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${accentColor}15`; e.currentTarget.style.borderColor = `${accentColor}40`; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = `${textColor}08`; e.currentTarget.style.borderColor = `${textColor}10`; }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mb-6 group-hover:scale-110 transition-transform" style={{ color: accentColor }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                    <span className="text-xs uppercase tracking-widest block mb-2" style={{ color: `${textColor}70` }}>Phone</span>
                                    <span className="text-lg md:text-xl font-light" style={{ color: textColor }}>{phone}</span>
                                </a>}
                                {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" className="group block p-8 transition-all duration-300 border" style={{ backgroundColor: `${textColor}08`, borderColor: `${textColor}10` }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${accentColor}15`; e.currentTarget.style.borderColor = `${accentColor}40`; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = `${textColor}08`; e.currentTarget.style.borderColor = `${textColor}10`; }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mb-6 group-hover:scale-110 transition-transform" style={{ color: accentColor }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                                    <span className="text-xs uppercase tracking-widest block mb-2" style={{ color: `${textColor}70` }}>LinkedIn</span>
                                    <span className="text-lg md:text-xl break-all font-light" style={{ color: textColor }}>{linkedin.replace(/^https?:\/\//, '')}</span>
                                </a>}

                            </div>


                        </div>
                    </div>
                </div>
            </section>
            <div className="h-[430px]" style={{ backgroundColor }}>
                <div className="flex items-end justify-center h-full">
                    <motion.img
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                        style={{
                            ...(typeof window !== 'undefined' && window.innerWidth < 540 && {
                                objectFit: "cover",
                                objectPosition: "bottom"
                            })
                        }}
                        src={image}
                        alt={`${firstName} ${lastName}`}
                        className="h-full w-auto"
                    />
                    {/* Gradient overlay to ensure text readability if needed, though usually requested without for this specific style */}
                </div>
            </div>
            {/* QR Code Feature Section */}
            {qrLink && <section className="py-20 relative z-20 border-t" style={{ background: `linear-gradient(to bottom, ${backgroundColor}dd, ${backgroundColor})`, borderColor: `${textColor}10` }}>
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center text-center space-y-8 max-w-2xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 rounded-3xl blur-xl opacity-50" style={{ backgroundColor: `${accentColor}30` }} />
                            <QRCodeSVG
                                value={qrLink}
                                size={200}
                                bgColor="transparent"
                                className="mx-auto group-hover:scale-105 transition-transform duration-500"
                                fgColor={accentColor}
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-4"
                        >
                            <p className="text-sm uppercase tracking-widest" style={{ color: `${textColor}70` }}>
                                Point your camera here
                            </p>
                        </motion.div>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-8 max-w-2xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative mt-8 flex items-center justify-center gap-4"
                        >
                            {(shareWebsite || downloadPDF) && (
                                <div className="mt-8 flex items-center justify-center gap-4">
                                    {downloadPDF && (
                                        <div className="group relative">
                                            <button
                                                onClick={handleDownload}
                                                disabled={loading}
                                                className="cursor-pointer flex items-center justify-center w-14 h-14 backdrop-blur-sm transition-all duration-300 border hover:scale-110 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                                                style={{ backgroundColor: `${accentColor}30`, color: accentColor, borderColor: `${accentColor}50` }}
                                            >
                                                {loading ? (
                                                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                ) : (

                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15V3" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /></svg>

                                                )}
                                            </button>
                                            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                                                {loading ? 'Downloading...' : 'Download PDF'}
                                            </div>
                                        </div>
                                    )}

                                    {shareWebsite && (
                                        <div className="group relative">
                                            <button
                                                onClick={handleShare}
                                                disabled={isSharing}
                                                className="cursor-pointer flex items-center justify-center w-14 h-14 backdrop-blur-sm transition-all duration-300 border hover:scale-110 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                                                style={{ backgroundColor: `${textColor}08`, color: textColor, borderColor: `${textColor}20` }}
                                            >
                                                {isSharing ? (
                                                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                ) : (
                                                    <svg className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                                    </svg>
                                                )}
                                            </button>
                                            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                                                {isSharing ? 'Sharing...' : 'Share'}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </div>

                </div>
            </section>}

            {/* Footer */}
            <footer className="py-16 border-t relative z-20" style={{ backgroundColor: `${backgroundColor}`, color: textColor, borderColor: `${textColor}20` }}>
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">

                        <div className="space-y-8">
                            <div>
                                <p className="text-lg font-bold mb-2 font-display tracking-wide" style={{ color: textColor }}>{footerCompany}</p>
                                <p style={{ color: `${textColor}70` }}>{footerAddress}</p>
                            </div>

                            <div className="space-y-2 text-sm" style={{ color: `${textColor}99` }}>
                                <p>E-Mail: <a href={`mailto:${footerEmail}`} className="transition-colors" style={{ color: textColor }} onMouseEnter={(e) => e.currentTarget.style.color = accentColor} onMouseLeave={(e) => e.currentTarget.style.color = textColor}>{footerEmail}</a></p>
                                <p>Telefon: <a href={`tel:${footerPhone.replace(/\s/g, '')}`} className="transition-colors" style={{ color: textColor }} onMouseEnter={(e) => e.currentTarget.style.color = accentColor} onMouseLeave={(e) => e.currentTarget.style.color = textColor}>{footerPhone}</a></p>
                            </div>
                        </div>

                        <div className="flex flex-col md:items-end gap-8 w-full md:w-auto">
                            <div className="flex items-center gap-6">
                                {linkedin && <a href={linkedin} className="transition-colors p-3 rounded-full" style={{ color: textColor, backgroundColor: `${textColor}08` }} onMouseEnter={(e) => { e.currentTarget.style.color = accentColor; e.currentTarget.style.backgroundColor = `${textColor}15`; }} onMouseLeave={(e) => { e.currentTarget.style.color = textColor; e.currentTarget.style.backgroundColor = `${textColor}08`; }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                                </a>}
                            </div>

                            <div className="text-left md:text-right w-full">
                                <div className="flex gap-4 text-xs mb-4 justify-start md:justify-end uppercase tracking-wider" style={{ color: `${textColor}70` }}>
                                    <a href="#" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = textColor} onMouseLeave={(e) => e.currentTarget.style.color = `${textColor}70`}>Datenschutz</a>
                                    <span>|</span>
                                    <a href="#" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = textColor} onMouseLeave={(e) => e.currentTarget.style.color = `${textColor}70`}>AGB</a>
                                    <span>|</span>
                                    <a href="#" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = textColor} onMouseLeave={(e) => e.currentTarget.style.color = `${textColor}70`}>Impressum</a>
                                </div>
                                <p className="text-xs" style={{ color: `${textColor}50` }}>© {new Date().getFullYear()} {footerCompany}. Alle Rechte vorbehalten.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </footer>
        </div>
    );
})
export default Home