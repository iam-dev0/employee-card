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
export async function GET(request, { params }) {
    try {
        const { searchParams } = new URL(request.url);
        const id = params.id; // Get ID from URL path
        
        if (!id) {
            return new Response('Missing id parameter', { status: 400 });
        }

        // Try to get card data from query params first (to avoid redundant API calls)
        let cardData;
        const cardDataParam = searchParams.get('data');
        
        if (cardDataParam) {
            try {
                cardData = JSON.parse(decodeURIComponent(cardDataParam));
            } catch (e) {
                // If parsing fails, fall back to API call
                cardData = await getCardData(id);
            }
        } else {
            cardData = await getCardData(id);
        }
        
        if (!cardData) {
            return new Response('Card not found', { status: 404 });
        }
        const fullName = `${cardData.firstname || cardData.firstName || ''} ${cardData.name || cardData.lastName || ''}`.trim();
        const role = cardData.role || '';
        const company = cardData.companyName || '';
        const email = cardData.email || '';
        const phone = cardData.phone || '';

        // Extract LinkedIn username from URL
        const getLinkedInHandle = (linkedinUrl) => {
            if (!linkedinUrl) return null;
            const match = linkedinUrl.match(/linkedin\.com\/in\/([^\/\?]+)/);
            return match ? `@${match[1]}` : null;
        };

        const linkedinHandle = getLinkedInHandle(cardData.linkedin);

        return new ImageResponse(
            (<div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    background: '#455fac',
                    padding: '60px',
                    fontFamily: 'system-ui',
                }}
            >
                {/* Main Content Container */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                    }}
                >
                    {/* Top Section: Icon + Company Name */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '48px',
                        }}
                    >
                        {/* Icon/Avatar Circle */}
                        <div
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '20px',
                                fontSize: '36px',
                                fontWeight: 'bold',
                                color: '#455fac',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            }}
                        >
                            {fullName.charAt(0) || 'C'}
                        </div>

                        {/* Company Name */}
                        <div
                            style={{
                                fontSize: '32px',
                                fontWeight: '600',
                                color: '#ffffff',
                                letterSpacing: '-0.5px',
                            }}
                        >
                            {company || 'Company Name'}
                        </div>
                    </div>

                    {/* Divider Line */}
                    <div
                        style={{
                            width: '100%',
                            height: '2px',
                            background: 'rgba(255, 255, 255, 0.2)',
                            marginBottom: '40px',
                        }}
                    />

                    {/* Employee Details Section */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px',
                        }}
                    >
                        {/* Name */}
                        <div
                            style={{
                                fontSize: '52px',
                                fontWeight: 'bold',
                                color: '#ffffff',
                                lineHeight: '1.1',
                                letterSpacing: '-1.5px',
                            }}
                        >
                            {fullName || 'Employee Name'}
                        </div>

                        {/* Role */}
                        {role && (
                            <div
                                style={{
                                    fontSize: '28px',
                                    color: '#b8c5ff',
                                    fontWeight: '500',
                                }}
                            >
                                {role}
                            </div>
                        )}

                        {/* Contact Information Grid */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                                marginTop: '12px',
                            }}
                        >
                            {email && (
                                <div
                                    style={{
                                        fontSize: '22px',
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <span style={{ marginRight: '12px', opacity: 0.7 }}>📧</span>
                                    {email}
                                </div>
                            )}

                            {phone && (
                                <div
                                    style={{
                                        fontSize: '22px',
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <span style={{ marginRight: '12px', opacity: 0.7 }}>📱</span>
                                    {phone}
                                </div>
                            )}

                            {linkedinHandle && (
                                <div
                                    style={{
                                        fontSize: '22px',
                                        color: '#b8c5ff',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <span style={{ marginRight: '12px', opacity: 0.7 }}>💼</span>
                                    {linkedinHandle}
                                </div>
                            )}

                            {cardData.website && (
                                <div
                                    style={{
                                        fontSize: '22px',
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <span style={{ marginRight: '12px', opacity: 0.7 }}>🌐</span>
                                    {cardData.website.replace(/^https?:\/\//, '')}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (error) {
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