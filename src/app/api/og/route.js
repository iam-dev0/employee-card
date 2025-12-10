// app/api/og/route.ts
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        
        const name = searchParams.get('name') || 'Team Member';
        const role = searchParams.get('role') || 'Professional';
        const company = searchParams.get('company') || '';
        const template = searchParams.get('template') || 'glass';
        
        // Template-specific styling
        const templates = {
            glass: {
                bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                textColor: '#ffffff',
                accentColor: '#f0f0f0',
            },
            calvino: {
                bg: '#FF6B35',
                textColor: '#ffffff',
                accentColor: '#FFD166',
            },
            freelancer: {
                bg: '#2E8B57',
                textColor: '#ffffff',
                accentColor: '#90EE90',
            },
        };
        
        const style = templates[template] || templates.glass;
        
        return new ImageResponse(
            (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                        background: style.bg,
                        padding: '60px',
                        fontFamily: 'Arial, sans-serif',
                    }}
                >
                    <div style={{ 
                        fontSize: 72, 
                        fontWeight: 'bold', 
                        marginBottom: 30, 
                        color: style.textColor,
                        textAlign: 'center'
                    }}>
                        {name}
                    </div>
                    
                    <div style={{ 
                        fontSize: 42, 
                        marginBottom: 15, 
                        color: style.textColor,
                        opacity: 0.9
                    }}>
                        {role}
                    </div>
                    
                    {company && (
                        <div style={{ 
                            fontSize: 32, 
                            color: style.accentColor,
                            marginBottom: 40
                        }}>
                            {company}
                        </div>
                    )}
                    
                    <div style={{ 
                        fontSize: 28, 
                        color: style.textColor, 
                        opacity: 0.8,
                        position: 'absolute',
                        bottom: 60
                    }}>
                        Digital Business Card
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (error) {
        console.error('Error generating OG image:', error);
        return new Response('Failed to generate image', { status: 500 });
    }
}