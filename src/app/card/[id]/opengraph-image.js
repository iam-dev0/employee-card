import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Digital Business Card';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

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

export default async function Image({ params }) {
    const { id } = await params;
    const template = 'glass'; // Default template
    
    const cardData = await getCardData(id);
    
    if (!cardData) {
        // Return a default image if no card data
        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)',
                        color: 'white',
                        fontSize: '48px',
                        fontFamily: 'Inter, sans-serif',
                    }}
                >
                    Digital Business Card
                </div>
            ),
            { ...size }
        );
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

    // Template design
    const design = {
        background: 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)',
        accent: '#A3B5A5',
        textColor: '#ffffff',
        cardBg: 'rgba(255, 255, 255, 0.1)',
        secondaryText: '#cccccc'
    };

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: design.background,
                    padding: '40px',
                    fontFamily: 'system-ui',
                }}
            >
                {/* Main Card Container */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        maxWidth: '1000px',
                        background: design.cardBg,
                        borderRadius: '24px',
                        padding: '60px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        textAlign: 'center',
                    }}
                >
                    {/* Name */}
                    <div
                        style={{
                            fontSize: '64px',
                            fontWeight: 'bold',
                            color: design.textColor,
                            lineHeight: '1.1',
                            marginBottom: '16px',
                            textTransform: 'uppercase',
                            letterSpacing: '-2px',
                        }}
                    >
                        {fullName || 'Digital Business Card'}
                    </div>
                    
                    {/* Role */}
                    {role && (
                        <div
                            style={{
                                fontSize: '28px',
                                color: design.accent,
                                marginBottom: '12px',
                                fontWeight: '500',
                            }}
                        >
                            {role}
                        </div>
                    )}
                    
                    {/* Company */}
                    {company && (
                        <div
                            style={{
                                fontSize: '24px',
                                color: design.secondaryText,
                                marginBottom: '40px',
                            }}
                        >
                            {company}
                        </div>
                    )}

                    {/* Contact Information */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '16px',
                        }}
                    >
                        {email && (
                            <div
                                style={{
                                    fontSize: '20px',
                                    color: design.textColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                }}
                            >
                                <div
                                    style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: design.accent,
                                    }}
                                />
                                {email}
                            </div>
                        )}

                        {phone && (
                            <div
                                style={{
                                    fontSize: '20px',
                                    color: design.textColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                }}
                            >
                                <div
                                    style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: design.accent,
                                    }}
                                />
                                {phone}
                            </div>
                        )}

                        {linkedinHandle && (
                            <div
                                style={{
                                    fontSize: '20px',
                                    color: design.accent,
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                }}
                            >
                                <div
                                    style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: design.accent,
                                    }}
                                />
                                LinkedIn: {linkedinHandle}
                            </div>
                        )}

                        {cardData.website && (
                            <div
                                style={{
                                    fontSize: '20px',
                                    color: design.textColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                }}
                            >
                                <div
                                    style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: design.accent,
                                    }}
                                />
                                {cardData.website.replace(/^https?:\/\//, '')}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        ),
        { ...size }
    );
}