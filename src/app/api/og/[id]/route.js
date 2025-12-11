import { ImageResponse } from 'next/og';
export const runtime = 'edge';

async function getCardData(id) {
    try {
        const response = await fetch(
            `https://me.onra.ch/api/website-business-public/employee/digitalBusinessCard/${id}`,
            { cache: 'force-cache' }
        );

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching card data:', error);
        return null;
    }
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id') || "";

        if (!id) {
            return new Response('Missing id parameter', { status: 400 });
        }

        const cardData = await getCardData(id);

        if (!cardData) {
            return new ImageResponse(
                (
                    <div
                        style={{
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#455fac',
                            color: 'white',
                            fontSize: '48px',
                            fontFamily: 'system-ui',
                        }}
                    >
                        Digital Business Card
                    </div>
                ),
                { width: 1200, height: 630 }
            );
        }

        const fullName = `${cardData.firstname || cardData.firstName || ''} ${cardData.name || cardData.lastName || ''}`.trim();
        const role = cardData.role || '';
        const company = cardData.companyName || 'onra GmbH';
        const email = cardData.email || '';
        const phone = cardData.phone || '';
        const address = cardData.address || '';
        const logo = await fetch(new URL("../../../../assets/app-icon.png", import.meta.url)).then((res) => res.arrayBuffer())
        const emailIcon = await fetch(new URL("../../../../assets/app-icon.png", import.meta.url)).then((res) => res.arrayBuffer())
        const phoneIcon = await fetch(new URL("../../../../assets/app-icon.png", import.meta.url)).then((res) => res.arrayBuffer())
        const linkedinIcon = await fetch(new URL("../../../../assets/app-icon.png", import.meta.url)).then((res) => res.arrayBuffer())
        // Extract LinkedIn username from URL
        const getLinkedInHandle = (linkedinUrl) => {
            if (!linkedinUrl) return null;
            const match = linkedinUrl.match(/linkedin\.com\/in\/([^\/\?]+)/);
            return match ? `@${match[1]}` : null;
        };

        const linkedinHandle = getLinkedInHandle(cardData.linkedin);

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        fontFamily: 'system-ui',
                    }}
                >
                    {/* Left Column - Light Background */}
                    <div
                        style={{
                            width: '45%',
                            background: '#455fac',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '60px 40px',
                        }}
                    >
                        {/* Logo Icon */}
                        <div
                            style={{
                                width: '180px',
                                height: '180px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '10px',
                                border: '8px solid #455fac',
                                fontSize: '72px',
                                fontWeight: 'bold',
                                color: '#455fac',
                            }}
                        >
                            <img src={logo} alt="Logo" style={{ width: '100%', height: '100%' }} />
                        </div>

                        {/* Company Name */}
                        <div
                            style={{
                                fontSize: '42px',
                                fontWeight: 'bold',
                                color: '#ffffff',
                                textAlign: 'center',
                                marginBottom: '16px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                            }}
                        >
                            {company || 'YOUR COMPANY'}
                        </div>

                        {/* Tagline */}
                        <div
                            style={{
                                fontSize: '24px',
                                color: '#455fac',
                                textAlign: 'center',
                                fontWeight: '500',
                            }}
                        >
                            {cardData.tagline || 'YOUR TAGLINE'}
                        </div>
                    </div>

                    {/* Right Column - Blue Background */}
                    <div
                        style={{
                            width: '55%',
                            background: '#455fac',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: '60px 50px',
                        }}
                    >
                        {/* Name */}
                        <div
                            style={{
                                fontSize: '56px',
                                fontWeight: 'bold',
                                color: '#ffffff',
                                lineHeight: '1.1',
                                marginBottom: '16px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                            }}
                        >
                            {fullName || 'YOUR NAME'}
                        </div>

                        {/* Role */}
                        <div
                            style={{
                                fontSize: '28px',
                                color: '#d0e0ff',
                                marginBottom: '48px',
                                fontWeight: '400',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                            }}
                        >
                            {role || 'MANAGING DIRECTOR'}
                        </div>

                        {/* Contact Information */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                            }}
                        >
                            {/* Address */}
                            {address && (
                                <div
                                    style={{
                                        fontSize: '22px',
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <span style={{ marginRight: '16px', fontSize: '28px' }}>📍</span>
                                    <span style={{ lineHeight: '1.4' }}>{address}</span>
                                </div>
                            )}

                            {/* Email */}
                            {email && (
                                <div
                                    style={{
                                        fontSize: '22px',
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <span style={{ marginRight: '16px', fontSize: '28px', borderRadius: '50%', backgroundColor: '#ffffffff', padding: '10px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#455fac" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg></span>
                                    {email}
                                </div>
                            )}

                            {/* Phone */}
                            {phone && (
                                <div
                                    style={{
                                        fontSize: '22px',
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <span style={{ marginRight: '16px', fontSize: '28px', borderRadius: '50%', backgroundColor: '#ffffffff', padding: '10px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#455fac" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone-icon lucide-phone"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" /></svg></span>
                                    {phone}
                                </div>
                            )}

                            {/* LinkedIn */}
                            {linkedinHandle && (
                                <div
                                    style={{
                                        fontSize: '22px',
                                        color: '#d0e0ff',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <span style={{ marginRight: '16px', fontSize: '28px', borderRadius: '50%', backgroundColor: '#ffffffff', padding: '10px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#455fac" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin-icon lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg></span>
                                    {linkedinHandle}
                                </div>
                            )}

                            {/* Website */}
                            {cardData.website && (
                                <div
                                    style={{
                                        fontSize: '22px',
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <span style={{ marginRight: '16px', fontSize: '28px' }}>🌐</span>
                                    {cardData.website.replace(/^https?:\/\//, '')}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (error) {
        console.error('Error generating image:', error);
        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#455fac',
                        color: 'white',
                        fontSize: '48px',
                        fontFamily: 'system-ui',
                    }}
                >
                    Digital Business Card
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    }
}