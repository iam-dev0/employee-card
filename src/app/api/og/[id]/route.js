import { ImageResponse } from 'next/og';
export const runtime = 'edge';

async function getCardData(id) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_COMPANY_API_URL}/employee/digitalBusinessCard/${id}`,
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
                            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
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
                        flexDirection: 'column',
                        justifyContent: 'center',
                        // alignItems: 'center',
                        fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif',
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    }}
                >
                    {/* Left Section - Name & Role */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: '20px 50px',
                             borderBottom: '1px solid #334155',
                        }}
                    >
                        <div
                            style={{
                                fontSize: '18px',
                                color: '#64748b',
                                fontWeight: '600',
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                marginBottom: '20px',
                            }}
                        >
                            {company}
                        </div>

                        <div
                            style={{
                                fontSize: '64px',
                                fontWeight: '700',
                                color: '#ffffff',
                                lineHeight: '1',
                                marginBottom: '24px',
                                letterSpacing: '-1px',
                                width: '100%',
                            }}
                        >
                            {fullName}
                        </div>

                        <div
                            style={{
                                fontSize: '24px',
                                color: '#94a3b8',
                                fontWeight: '400',
                                letterSpacing: '0.5px',
                            }}
                        >
                            {role}
                        </div>
                    </div>
                    {/* Right Section - Contact Info */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: '60px 50px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '24px',
                            }}
                        >
                            {address && (
                                <div
                                    style={{
                                        fontSize: '24px',
                                        color: '#e2e8f0',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '16px',
                                    }}
                                >
                                    <span style={{ fontSize: '24px', minWidth: '24px' }}>📍</span>
                                    <span style={{ lineHeight: '1.4' }}>{address}</span>
                                </div>
                            )}

                            {email && (
                                <div
                                    style={{
                                        fontSize: '28px',
                                        color: '#e2e8f0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                    }}
                                >
                                    <span style={{ fontSize: '24px' }}>✉️</span>
                                    {email}
                                </div>
                            )}

                            {phone && (
                                <div
                                    style={{
                                        fontSize: '28px',
                                        color: '#e2e8f0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                    }}
                                >
                                    <span style={{ fontSize: '24px' }}>📞</span>
                                    {phone}
                                </div>
                            )}

                            {linkedinHandle && (
                                <div
                                    style={{
                                        fontSize: '28px',
                                        color: '#e2e8f0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                    }}
                                >
                                    <span style={{ fontSize: '24px' }}>🔗</span>
                                    {linkedinHandle}
                                </div>
                            )}

                            {cardData.website && (
                                <div
                                    style={{
                                        fontSize: '28px',
                                        color: '#e2e8f0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                    }}
                                >
                                    <span style={{ fontSize: '24px' }}>🌐</span>
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
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
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