import { Suspense } from 'react';
import CardViewer from '@/components/CardViewer';
import { notFound } from 'next/navigation';

// Fetch data server-side
async function getCardData(id) {
    try {
        console.log('Fetching card data for ID:', id);
        const response = await fetch(
            `https://me.onra.ch/api/website-business-public/employee/digitalBusinessCard/${id}`,
            {
                // Enable ISR (Incremental Static Regeneration) for better performance
                next: { revalidate: 3600 } // Revalidate every hour
            }
        );
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            console.error('Failed to fetch card data:', response.statusText);
            return null;
        }
        
        const data = await response.json();
        console.log('Card data fetched successfully:', !!data);
        return data;
    } catch (error) {
        console.error('Error fetching card data:', error);
        return null;
    }
}

// Generate metadata for SEO
export async function generateMetadata({ params, searchParams }) {
    const { id } = await params;
    const template = (await searchParams)?.template || 'glass';
    
    const cardData = await getCardData(id);
    
    if (!cardData) {
        return {
            title: 'Card Not Found',
            description: 'The requested business card could not be found.',
        };
    }

    const fullName = `${cardData.firstname || cardData.firstName || ''} ${cardData.name || cardData.lastName || ''}`.trim();
    const role = cardData.role || '';
    const company = cardData.companyName || '';
    
    const title = fullName 
        ? `${fullName}${role ? ` - ${role}` : ''}${company ? ` at ${company}` : ''} | Digital Business Card`
        : 'Digital Business Card';
        
    const description = cardData.aboutEN || cardData.aboutDE || 
        `Connect with ${fullName}${role ? `, ${role}` : ''}${company ? ` at ${company}` : ''}. View contact information, professional details, and connect instantly through this digital business card.`;

    // Create structured data for rich snippets
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": fullName,
        "jobTitle": role,
        "worksFor": {
            "@type": "Organization",
            "name": company
        },
        "email": cardData.email,
        "telephone": cardData.phone,
        "url": cardData.website,
        "sameAs": [
            cardData.linkedin,
            cardData.website
        ].filter(Boolean),
        "image": cardData.image || cardData.imageUrl
    };

    return {
        title,
        description,
        keywords: [
            fullName,
            role,
            company,
            'business card',
            'digital card',
            'contact information',
            'professional profile',
            'networking'
        ].filter(Boolean).join(', '),
        authors: [{ name: fullName }],
        creator: fullName,
        publisher: company || 'Digital Business Card',
        
        // Open Graph metadata for social sharing
        openGraph: {
            title,
            description,
            type: 'profile',
            images: cardData.image || cardData.imageUrl ? [
                {
                    url: cardData.image || cardData.imageUrl,
                    width: 800,
                    height: 600,
                    alt: `${fullName} - Professional Photo`,
                }
            ] : [],
            siteName: 'Digital Business Cards',
        },
        
        // Twitter Card metadata
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: cardData.image || cardData.imageUrl ? [cardData.image || cardData.imageUrl] : [],
            creator: cardData.linkedin ? `@${cardData.linkedin.split('/').pop()}` : undefined,
        },
        
        // Additional metadata
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        
        // Structured data
        other: {
            'application/ld+json': JSON.stringify(structuredData),
        },
    };
}

export default async function CardPage({ params, searchParams }) {
    const { id } = await params;
    const template = (await searchParams)?.template || 'glass';
    const cardData = await getCardData(id);
    
    if (!cardData) {
        console.log('No card data found, calling notFound()');
        notFound();
    }

    return (
        <main className="min-h-screen">
            <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                    <div className="flex flex-col items-center gap-4">
                        <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                </div>
            }>
                <CardViewer data={cardData} template={template} cardId={id} />
            </Suspense>
        </main>
    );
}

// Configure page to be dynamic
export const dynamic = 'force-dynamic';