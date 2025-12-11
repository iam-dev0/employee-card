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
        const id = searchParams.get('id');
        const template = searchParams.get('template') || 'glass';
        
        if (!id) {
            return new Response('Card ID is required', { status: 400 });
        }

        const cardData = await getCardData(id);
        
        if (!cardData) {
            return new Response('Card not found', { status: 404 });
        }

        const fullName = `${cardData.firstname || cardData.firstName || ''} ${cardData.name || cardData.lastName || ''}`.trim();
        const role = cardData.role || '';
        const company = cardData.companyName || '';
        const email = cardData.email || '';
        const phone = cardData.phone || '';
        const imageUrl = false
        
        // Extract LinkedIn username from URL
        const getLinkedInHandle = (linkedinUrl) => {
            if (!linkedinUrl) return null;
            const match = linkedinUrl.match(/linkedin\.com\/in\/([^\/\?]+)/);
            return match ? `@${match[1]}` : null;
        };
        
        const linkedinHandle = getLinkedInHandle(cardData.linkedin);

        // Create different designs based on template
        const getTemplateDesign = () => {
            switch (template) {
                case 'glass':
                    return {
                        background: 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)',
                        accent: '#A3B5A5',
                        textColor: '#ffffff',
                        cardBg: 'rgba(255, 255, 255, 0.1)',
                        secondaryText: '#cccccc'
                    };
                case 'calvino':
                    return {
                        background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                        accent: '#ffffff',
                        textColor: '#ffffff',
                        cardBg: 'rgba(255, 255, 255, 0.15)',
                        secondaryText: '#f0f0f0'
                    };
                case 'freelancer':
                    return {
                        background: 'linear-gradient(135deg, #2c5f2d 0%, #97bc62 100%)',
                        accent: '#ffffff',
                        textColor: '#ffffff',
                        cardBg: 'rgba(255, 255, 255, 0.15)',
                        secondaryText: '#f0f0f0'
                    };
                default:
                    return {
                        background: 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)',
                        accent: '#A3B5A5',
                        textColor: '#ffffff',
                        cardBg: 'rgba(255, 255, 255, 0.1)',
                        secondaryText: '#cccccc'
                    };
            }
        };

        const design = getTemplateDesign();

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        background: design.background,
                        padding: '40px',
                        fontFamily: 'Inter, sans-serif',
                    }}
                >
                    {/* Main Card Container */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            background: design.cardBg,
                            borderRadius: '24px',
                            padding: '50px',
                            backdropFilter: 'blur(20px)',
                            border: `1px solid rgba(255, 255, 255, 0.2)`,
                            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
                        }}
                    >
                        {/* Left side - Text content */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                flex: 1,
                                paddingRight: '40px',
                            }}
                        >
                            {/* Top section - Name and role */}
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div
                                    style={{
                                        fontSize: '48px',
                                        fontWeight: 'bold',
                                        color: design.textColor,
                                        lineHeight: '1.1',
                                        marginBottom: '12px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '-1px',
                                    }}
                                >
                                    {fullName || 'Digital Business Card'}
                                </div>
                                
                                {role && (
                                    <div
                                        style={{
                                            fontSize: '24px',
                                            color: design.accent,
                                            marginBottom: '8px',
                                            fontWeight: '500',
                                        }}
                                    >
                                        {role}
                                    </div>
                                )}
                                
                                {company && (
                                    <div
                                        style={{
                                            fontSize: '20px',
                                            color: design.secondaryText,
                                            marginBottom: '30px',
                                        }}
                                    >
                                        {company}
                                    </div>
                                )}
                            </div>

                            {/* Contact Information Grid */}
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '16px',
                                }}
                            >
                                {email && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div
                                            style={{
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                background: design.accent,
                                            }}
                                        />
                                        <div
                                            style={{
                                                fontSize: '18px',
                                                color: design.textColor,
                                                fontWeight: '400',
                                            }}
                                        >
                                            {email}
                                        </div>
                                    </div>
                                )}

                                {phone && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div
                                            style={{
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                background: design.accent,
                                            }}
                                        />
                                        <div
                                            style={{
                                                fontSize: '18px',
                                                color: design.textColor,
                                                fontWeight: '400',
                                            }}
                                        >
                                            {phone}
                                        </div>
                                    </div>
                                )}

                                {linkedinHandle && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div
                                            style={{
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                background: design.accent,
                                            }}
                                        />
                                        <div
                                            style={{
                                                fontSize: '18px',
                                                color: design.accent,
                                                fontWeight: '500',
                                            }}
                                        >
                                            LinkedIn: {linkedinHandle}
                                        </div>
                                    </div>
                                )}

                                {cardData.website && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div
                                            style={{
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                background: design.accent,
                                            }}
                                        />
                                        <div
                                            style={{
                                                fontSize: '18px',
                                                color: design.textColor,
                                                fontWeight: '400',
                                            }}
                                        >
                                            {cardData.website.replace(/^https?:\/\//, '')}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Bottom badge */}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    marginTop: '20px',
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
                                <div
                                    style={{
                                        fontSize: '14px',
                                        color: design.secondaryText,
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        fontWeight: '500',
                                    }}
                                >
                                    Digital Business Card
                                </div>
                            </div>
                        </div>

                        {/* Right side - Profile image */}
                        {imageUrl && (
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '300px',
                                    height: '300px',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    border: `3px solid ${design.accent}`,
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                    flexShrink: 0,
                                }}
                            >
                                <img
                                    src={imageUrl}
                                    alt={fullName}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (error) {
        console.error('Error generating card image:', error);
        return new Response('Failed to generate image', { status: 500 });
    }
}