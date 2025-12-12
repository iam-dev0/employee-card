
import { QRCodeSVG } from 'qrcode.react';
import { forwardRef, useState } from 'react';

const ProfileCard8 = forwardRef(({ data, shareWebsite, downloadPDF,loading }, ref) => {
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
        qrCodeLink = '',
        aboutDE = '',
        aboutEN = '',
        customFields = [],
        colors = {}
    } = data;

    // Extract colors with defaults matching the original design
    const {
        primaryColor = '#ffffff',
        secondaryColor = '#85c4ff',
        backgroundColor = '#455fac',
        accentColor = '#455fac',
        contrastColor = '#9EACEF',
        textColor = '#ffffff'
    } = colors;

    const qrLink = qrCodeLink || (typeof window !== 'undefined' ? window.location.href : '');

    return (
        <section ref={ref} className="min-h-screen flex items-center justify-center" style={{ backgroundColor, backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            <div className="overflow-y-auto bg-white w-full h-screen md:flex md:flex-row md:items-stretch transition-all duration-500 ease-out">
                {/* Header Image Section */}
                <div className="relative h-[340px] md:h-auto md:w-2/5 lg:w-5/12 group shrink-0">
                    {image ? (
                        <img src={image}
                            alt={`${firstName} ${lastName}`} className="w-full h-full object-cover object-top " />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-slate-600 font-medium">
                            No Image
                        </div>
                    )}

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent md:bg-gradient-to-r md:from-black/20 md:to-transparent"></div>

                    {/* Wave Divider (Mobile Only) */}
                    <div className="absolute bottom-[-25px] left-0 w-full z-10 md:hidden">
                        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="h-24 w-full" style={{ fill: backgroundColor }}>
                            <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"></path>
                        </svg>
                    </div>
                     <div className="absolute bottom-[-20px] left-0 w-full z-8 md:hidden">
                        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="h-24 w-full fill-white">
                            <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"></path>
                        </svg>
                    </div>

                    {/* Floating Logo (Responsive Position) */}
                    <div className="absolute right-8 -bottom-8 md:bottom-10 md:right-10 z-20 w-20 h-20 rounded-full border-[5px] border-white flex items-center justify-center shadow-lg" style={{ backgroundColor }}>
                        {companyLogo ? (
                            <img src={companyLogo} alt="Logo" className="w-12 h-12 object-contain" />
                        ) : (
                            <span className="text-white text-3xl font-serif italic font-bold tracking-tighter">A</span>
                        )}
                    </div>
                    
                </div>

                {/* Content Body */}
                <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative" style={{ backgroundColor }}>

                    {/* Profile Info */}
                    <div className="mb-8 lg:mb-12">
                        <div className="hidden md:flex items-center gap-3 mb-6">
                            <div className="w-3 h-3 rounded-full flex items-center justify-center" style={{ backgroundColor: `${textColor}30` }}>
                                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: textColor }}></div>
                            </div>
                            <span className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: `${textColor}cc` }}>Available for hire</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-3 leading-none" style={{ color: textColor }}>
                            {firstName} {lastName}
                        </h1>
                        <p className="font-medium text-lg md:text-xl lg:text-2xl mb-6 tracking-wide" style={{ color: `${textColor}ee` }}>{role}</p>
                        {(aboutDE || aboutEN) && (
                            <div className="mt-8 leading-relaxed text-base lg:text-lg max-w-lg xl:max-w-2xl" style={{ color: `${textColor}cc` }}>
                                <div
                                    className="leading-relaxed whitespace-pre-line break-words"
                                    style={{ color: `${textColor}cc` }}
                                    dangerouslySetInnerHTML={{ __html: aboutDE || aboutEN }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 mb-8 lg:mb-12">
                        {/* Desktop Primary Contact Button */}
                        {phone && (
                            <a href={`tel:${phone}`} className="group flex h-14 px-10 rounded-2xl backdrop-blur-sm items-center justify-center gap-3 transition-all" style={{ backgroundColor: `${textColor}08`, color: textColor }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${textColor}30`} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${textColor}08`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                <span className="font-semibold text-lg">Contact Me</span>
                            </a>
                        )}
 {email && (
                                <a href={`mailto:${email}`} className="group w-14 h-14 rounded-2xl backdrop-blur-sm flex items-center justify-center transition-all" style={{ backgroundColor: `${textColor}08`, color: textColor }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${textColor}30`} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${textColor}08`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                </a>
                            )}

                            {/* Download Icon Button */}
                            {downloadPDF && (
                                <button
                                    onClick={handleDownload}
                                    disabled={loading}
                                    title={loading ? 'Downloading...' : 'Download PDF'}
                                    className="relative group w-14 h-14 rounded-2xl backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{ backgroundColor: `${textColor}08`, color: textColor }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${textColor}30`}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${textColor}08`}
                                >
                                    {loading ? (
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                    ) : (
                                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-download-icon lucide-download"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg>
                                    )}
                                    {/* Tooltip */}
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-black/80 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                        {loading ? 'Downloading...' : 'Download PDF'}
                                    </div>
                                </button>
                            )}

                            {/* Share Icon Button */}
                            {shareWebsite && (
                                <button
                                    onClick={handleShare}
                                    disabled={isSharing}
                                    title={isSharing ? 'Sharing...' : 'Share'}
                                    className="relative group w-14 h-14 rounded-2xl backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{ backgroundColor: `${textColor}08`, color: textColor }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${textColor}30`}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${textColor}08`}
                                >
                                    {isSharing ? (
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                        </svg>
                                    )}
                                    {/* Tooltip */}
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-black/80 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                        {isSharing ? 'Sharing...' : 'Share'}
                                    </div>
                                </button>
                            )}
                    </div>

                    {/* Links / Contact Information */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 w-full max-w-4xl">
                        {/* LinkedIn Link */}
                        {linkedin && (
                            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-4 rounded-2xl backdrop-blur-sm transition-all duration-300" style={{ backgroundColor: `${textColor}08` }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${textColor}20`} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${textColor}08`}>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${textColor}30`, color: textColor }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6M2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg>
                                    </div>
                                    <div>
                                        <p className="text-base font-bold" style={{ color: textColor }}>LinkedIn</p>
                                        <p className="text-xs font-medium" style={{ color: `${textColor}b3` }}>Professional network</p>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-all duration-300" style={{ color: `${textColor}99` }}><path d="m9 18 6-6-6-6"></path></svg>
                            </a>
                        )}

                        {/* Email Link */}
                        {email && (
                            <a href={`mailto:${email}`} className="group flex items-center justify-between p-4 rounded-2xl backdrop-blur-sm transition-all duration-300" style={{ backgroundColor: `${textColor}08` }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${textColor}20`} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${textColor}08`}>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${textColor}30`, color: textColor }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-base font-bold" style={{ color: textColor }}>Email</p>
                                        <p className="text-xs font-medium truncate max-w-[200px]" style={{ color: `${textColor}b3` }}>{email}</p>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-all duration-300" style={{ color: `${textColor}99` }}><path d="m9 18 6-6-6-6"></path></svg>
                            </a>
                        )}

                      

                        {/* QR Code Section */}
                        {qrLink && (
                            <div className="col-span-1 lg:col-span-2 p-4 rounded-2xl backdrop-blur-sm" style={{ backgroundColor: `${textColor}08` }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-white rounded-xl p-2 flex items-center justify-center flex-shrink-0">
                                        <QRCodeSVG value={qrLink} size={40} fgColor={backgroundColor} bgColor="#ffffff" level="H" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: `${textColor}cc` }}>Save Contact</p>
                                        <p className="text-base font-bold" style={{ color: textColor }}>Scan QR Code</p>
                                        <p className="text-xs mt-1" style={{ color: `${textColor}b3` }}>Save my contact information directly to your phone</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
});

export default ProfileCard8;
