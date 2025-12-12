import { QRCodeSVG } from 'qrcode.react';
import { forwardRef, useState } from 'react';

const ProfileCard7 = forwardRef(({ data, shareWebsite, downloadPDF, loading }, ref) => {
  const handleDownload = async () => {
      await downloadPDF();
  };

  const handleShare = async () => {
      await shareWebsite();
  };
  const {
    firstname: firstName = 'Kevin',
    name: lastName = 'Johnson',
    role = 'Marketing Manager',
    companyName = 'onra GmbH',
    companyLogo = "",
     image = '', // URL or path
    slogan = '',
    phone = '',
    email = '',
    linkedin = '',
    customFields = [],
    qrCodeLink = '',
    aboutDE = '',
    aboutEN = '',
    footerCompany = "onra GmbH",
    footerAddress = "Ägeristrasse 112, 6300 Zug",
    footerEmail = "info@onra.ch",
    footerPhone = "+41 796 36 65 93",
    colors = {}
  } = data;

  // Extract colors with defaults matching the original design
  const {
    primaryColor = '#ffffff',
    secondaryColor = '#85c4ff',
    backgroundColor = '#0f3227',
    accentColor = '#ff5722',
    contrastColor = '#9EACEF',
    textColor = '#ffffff'
  } = colors;

  const qrLink = qrCodeLink || (typeof window !== 'undefined' ? window.location.href : '');


  return (
    <div ref={ref} className="h-[100dvh] w-full flex flex-col relative font-sans overflow-hidden md:overflow-hidden overflow-y-auto" style={{ backgroundColor, color: textColor }}>
      {/* Background Grid Lines - Fixed to viewport */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="w-full h-full max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-3 border-x relative" style={{ borderColor: `${textColor}08` }}>
          {/* Vertical Lines */}
          <div className="border-r h-full hidden md:block" style={{ borderColor: `${textColor}08` }} />
          <div className="border-r h-full hidden md:block" style={{ borderColor: `${textColor}08` }} />

          {/* Horizontal Line separating Name */}
          <div className="absolute bottom-[15vw] md:bottom-[12vw] w-full border-t left-0 right-0 hidden md:block" style={{ borderColor: `${textColor}08` }} />
        </div>
      </div>
      <div className="flex justify-between w-full max-w-[1920px] mx-auto relative z-20 border-b" style={{ borderColor: `${textColor}08` }}>
        {/* Header Left: Logo/Name */}
        <div className="p-4 flex items-start md:gap-4 ">
          <div className="flex flex-col">
            {companyLogo ? (
              <div className="flex items-center gap-3">
                <img src={companyLogo} alt="Logo" className="h-8 w-auto object-contain" />
              </div>
            ) : (
              <>
                <span className="font-medium text-sm">{companyName}</span>
              </>
            )}
          </div>
          {/* Mobile Menu Icon (Visible only on mobile) */}
        </div>
        <div className="p-4 flex items-start justify-between md:justify-start md:gap-4 ">
          <div className="flex items-center gap-3">
            {/* Download Icon */}
            <button
              onClick={handleDownload}
              disabled={loading}
              className="relative group cursor-pointer w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: `${textColor}15`, color: textColor }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = accentColor}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${textColor}15`}
              title="Download PDF"
            >
              {loading ? (
                <div className="w-4 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-download-icon lucide-download"><path d="M12 15V3" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /></svg>

              )}
            </button>

            {/* Share Icon */}
            <button
              onClick={handleShare}
              className="relative group cursor-pointer w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
              style={{ backgroundColor: `${textColor}15`, color: textColor }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${textColor}30`}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${textColor}15`}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
            </button>
          </div>
          {/* Mobile Menu Icon (Visible only on mobile) */}
        </div>
      </div>
      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto relative z-10 flex flex-col md:h-full">

        {/* Top Section Wrapper */}
        <div className="flex-1 w-full flex flex-col md:grid md:grid-cols-3 relative">

          {/* Left Column: Circular Graphic + About Text (Desktop Only) */}
          <div className="relative hidden md:flex flex-col items-center justify-center h-full overflow-hidden p-12">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] opacity-[0.03] border border-white rounded-full flex items-center justify-center">
                <div className="w-[70%] h-[70%] border border-white rounded-full flex items-center justify-center">
                  <div className="w-[60%] h-[60%] border border-white rounded-full" />
                </div>
              </div>
            </div>

            {/* About Content - Desktop Left Side */}
            {aboutEN && (
              <div className="w-full max-w-sm relative z-10">
                <h3 className="uppercase tracking-widest text-xs font-semibold mb-6" style={{ color: `${textColor}60` }}>About</h3>
                <p className="text-lg leading-relaxed font-light text-left" style={{ color: `${textColor}cc` }}>
                  <div
                    className="[&_*]:!text-lg [&_*]:!font-light [&_*]:!leading-relaxed"
                    style={{ color: `${textColor}cc` }}
                    dangerouslySetInnerHTML={{ __html: aboutDE || aboutEN }}
                  />
                </p>
              </div>
            )}
          </div>

          {/* Center Column: Image - Order 1 on Mobile */}
          <div className="relative flex items-center justify-center py-8 md:py-0 order-1 md:order-none shrink-0">
            <div className="relative w-[280px] md:w-[340px] lg:w-[400px] aspect-[3/3] rounded-full overflow-hidden shadow-lg">
              {/* Image */}
              <div
                className="w-full h-full overflow-hidden bg-white/5 rounded-xl"
              >
                <img
                  src={image}
                  alt={`${firstName} ${lastName}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 inset-x-0 flex justify-center z-10">
                  <span className="flex items-center gap-2 font-medium text-[12px] tracking-widest uppercase border px-4 py-1.5 rounded-full backdrop-blur-sm" style={{ color: `${textColor}ee`, borderColor: `${textColor}30`, backgroundColor: `${backgroundColor}80` }}>
                    {/* {companyLogo ? (
                      <img src={companyLogo} alt="Logo" className="w-8 h-8 object-contain" />
                    ) : (
                      <span className="text-white text-3xl font-serif italic font-bold tracking-tighter">A</span>
                    )} */}
                    <span>{role}</span>
                  </span>
                </div>

              </div>
              {/* Floating Button: Get In Touch */}
              {/* <button
                className="absolute top-8 -right-18 sm:-right-18 md:-right-12  bg-[#ff5722] text-white pl-5 pr-6 py-3.5 rounded-xl shadow-lg flex items-center gap-3 z-30 group cursor-pointer border border-transparent hover:border-white/20" >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-corner-down-right-icon lucide-corner-down-right"><path d="m15 10 5 5-5 5" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>
                <span className="font-medium text-sm whitespace-nowrap">Get in Touch</span>
              </button> */}
            </div>
          </div>

          {/* Name Section for Mobile (Order 2) */}
          <div className="md:hidden order-2 w-full px-4 py-6 text-center">
            <h1 className="text-[15vw] leading-[0.9] font-display font-bold tracking-tighter" style={{ color: textColor }}>
              {firstName}<br />{lastName}
            </h1>
          </div>

          {/* Right Column: Info & Contact - Order 3 on Mobile */}
          <div className="flex flex-col justify-center items-center md:items-start md:pl-12 lg:pl-20 pb-12 md:pb-0 px-6 md:px-0 order-3 md:order-none gap-8 md:gap-12">



            {/* Mobile Description (Hidden on Desktop) */}
            {aboutEN && (
              <div className="w-full max-w-sm md:hidden">
                <h3 className="uppercase tracking-widest text-xs font-semibold mb-3 text-center" style={{ color: `${textColor}60` }}>About</h3>
                <p className="text-sm leading-relaxed text-center" style={{ color: `${textColor}b3` }}>
                  <div
                    className="text-base lg:text-[17px] leading-relaxed whitespace-pre-line break-words text-center lg:text-left"
                    style={{ color: `${textColor}b3` }}
                    dangerouslySetInnerHTML={{ __html: aboutDE || aboutEN }}
                  />
                </p>
              </div>
            )}
            {/* Contact Info */}
            <div className="flex flex-col gap-4 w-full max-w-sm">
              <h3 className="uppercase tracking-widest text-xs font-semibold mb-2 hidden md:block" style={{ color: `${textColor}60` }}>Contact</h3>

              {phone && (
                <div className="flex items-center gap-4 transition-colors cursor-pointer group" style={{ color: `${textColor}ee` }} onMouseEnter={(e) => e.currentTarget.style.color = accentColor} onMouseLeave={(e) => e.currentTarget.style.color = `${textColor}ee`}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: `${textColor}08` }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-phone-icon lucide-phone"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" /></svg>
                  </div>
                  <span className="text-sm md:text-base">{phone}</span>
                </div>
              )}

              {email && (
                <div className="flex items-center gap-4 transition-colors cursor-pointer group" style={{ color: `${textColor}ee` }} onMouseEnter={(e) => e.currentTarget.style.color = accentColor} onMouseLeave={(e) => e.currentTarget.style.color = `${textColor}ee`}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: `${textColor}08` }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className='w-4 h-4' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
                  </div>
                  <a href={`mailto:${email}`} className="text-sm md:text-base">{email}</a>
                </div>
              )}
              {linkedin && (
                <div className="flex items-center gap-4 transition-colors cursor-pointer group" style={{ color: `${textColor}ee` }} onMouseEnter={(e) => e.currentTarget.style.color = accentColor} onMouseLeave={(e) => e.currentTarget.style.color = `${textColor}ee`}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: `${textColor}08` }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-linkedin-icon lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                  </div>
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-sm md:text-base">linkedin</a>
                </div>
              )}
            </div>

            {/* Action Icons - In Contact Section */}


            {/* Company & QR */}


          </div>
        </div>

        {/* Bottom Section: Massive Name (Desktop Only) */}
        <div className="hidden md:block w-full relative z-20 pb-0 shrink-0">
          <h1
            className="text-[8vw] leading-[0.8] font-display font-bold tracking-tighter text-center select-none"
            style={{ marginBottom: "1.5vw", color: textColor }}
          >
            {firstName} {lastName}
          </h1>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 relative z-20 shrink-0" style={{ backgroundColor, color: textColor }}>
        <div className="mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className='flex gap-4'>
              {/* QR Code */}
              {qrLink && (
                <div className='flex gap-2'>
                  <div className="bg-white p-2 rounded-lg shrink-0">
                    <QRCodeSVG value={qrLink} size={80} />

                  </div>

                </div>

              )}
              <div className="gap-4 space-y-4">
                <div>
                  <p className="text-base font-bold mb-1 font-display tracking-wide" style={{ color: textColor }}>{footerCompany}</p>
                  <p className="text-sm" style={{ color: `${textColor}60` }}>{footerAddress}</p>
                </div>

                <div className="space-y-1 text-xs" style={{ color: `${textColor}60` }}>
                  <p>E-Mail: <a href={`mailto:${footerEmail}`} className="transition-colors" style={{ color: textColor }} onMouseEnter={(e) => e.currentTarget.style.color = accentColor} onMouseLeave={(e) => e.currentTarget.style.color = textColor}>{footerEmail}</a></p>
                  <p>Telefon: <a href={`tel:${footerPhone?.replace(/\s/g, '')}`} className="transition-colors" style={{ color: textColor }} onMouseEnter={(e) => e.currentTarget.style.color = accentColor} onMouseLeave={(e) => e.currentTarget.style.color = textColor}>{footerPhone}</a></p>
                </div>
              </div>
            </div>


            <div className="flex flex-col md:items-end gap-4 w-full md:w-auto">
              <div className="flex items-center gap-4">
                {linkedin && <a href={linkedin} className="transition-colors p-2 rounded-full" style={{ color: textColor, backgroundColor: `${textColor}08` }} onMouseEnter={(e) => { e.currentTarget.style.color = accentColor; e.currentTarget.style.backgroundColor = `${textColor}15`; }} onMouseLeave={(e) => { e.currentTarget.style.color = textColor; e.currentTarget.style.backgroundColor = `${textColor}08`; }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                </a>}
              </div>

              <div className="text-left md:text-right w-full">
                <div className="flex gap-3 text-xs mb-2 justify-start md:justify-end uppercase tracking-wider" style={{ color: `${textColor}60` }}>
                  <a href="#" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = textColor} onMouseLeave={(e) => e.currentTarget.style.color = `${textColor}60`}>Datenschutz</a>
                  <span>|</span>
                  <a href="#" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = textColor} onMouseLeave={(e) => e.currentTarget.style.color = `${textColor}60`}>AGB</a>
                  <span>|</span>
                  <a href="#" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = textColor} onMouseLeave={(e) => e.currentTarget.style.color = `${textColor}60`}>Impressum</a>
                </div>
                <p className="text-xs" style={{ color: `${textColor}60` }}>© {new Date().getFullYear()} {footerCompany}. Alle Rechte vorbehalten.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
});

ProfileCard7.displayName = 'ProfileCard7';

export default ProfileCard7;

