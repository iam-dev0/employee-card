// app/card/[id]/page.js
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
    const { id } = await params; // params is a promise
    const template = searchParams?.template || 'glass'; // searchParams is NOT a promise
    
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
    const about = cardData.aboutEN || cardData.aboutDE || '';
    
    // Create page title
    let title = fullName || 'Digital Business Card';
    if (role) title += ` - ${role}`;
    if (company) title += ` at ${company}`;
    title += ' | Digital Business Card';
    
    // Create description
    let description = about;
    if (!description && fullName) {
        description = `Connect with ${fullName}${role ? `, ${role}` : ''}${company ? ` at ${company}` : ''}. View contact information, professional details, and connect instantly through this digital business card.`;
    }
    
    // Get image URL
    const imageUrl = cardData.image || cardData.imageUrl || cardData.profileImage;
    const ogImageUrl = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80" || imageUrl 
        ? imageUrl
        : `https://employee-card-os32.vercel.app/api/og?name=${encodeURIComponent(fullName)}&role=${encodeURIComponent(role)}&company=${encodeURIComponent(company)}&template=${template}`;

    // Keywords for SEO
    const keywords = [
        fullName,
        role,
        company,
        'business card',
        'digital card',
        'contact information',
        'professional profile',
        'networking'
    ].filter(Boolean);

    return {
        title,
        description: description.substring(0, 160), // Limit to 160 chars for SEO
        keywords: keywords.join(', '),
        authors: [{ name: fullName }],
        creator: fullName,
        publisher: company || 'Digital Business Card',
        
        // Open Graph metadata for social sharing
        openGraph: {
            title,
            description: description.substring(0, 150),
            type: 'profile',
            url: `https://employee-card-os32.vercel.app/card/${id}?template=${template}`,
            siteName: 'Digital Business Cards',
            images: [{
                url: ogImageUrl,
                width: 1200,
                height: 630,
                alt: `${fullName} - ${role} at ${company}`,
            }],
            profile: {
                firstName: cardData.firstname || cardData.firstName,
                lastName: cardData.name || cardData.lastName,
                username: cardData.email?.split('@')[0],
            },
        },
        
        // Twitter Card metadata
        twitter: {
            card: 'summary_large_image',
            title,
            description: description.substring(0, 150),
            images: [ogImageUrl],
            creator: cardData.twitter 
                ? `@${cardData.twitter.replace('@', '').split('/').pop()}`
                : fullName,
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
        
        // Additional meta tags
        alternates: {
            canonical: `https://employee-card-os32.vercel.app/card/${id}`,
        },
    };
}

export default async function CardPage({ params, searchParams }) {
    const { id } = await params;
    const template = searchParams?.template || 'glass';
    const cardData = await getCardData(id);
    
    if (!cardData) {
        console.log('No card data found, calling notFound()');
        notFound();
    }

    // Prepare structured data for the page
    const fullName = `${cardData.firstname || cardData.firstName || ''} ${cardData.name || cardData.lastName || ''}`.trim();
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": fullName,
        "jobTitle": cardData.role || '',
        "worksFor": {
            "@type": "Organization",
            "name": cardData.companyName || ''
        },
        "email": cardData.email,
        "telephone": cardData.phone,
        "url": cardData.website,
        "sameAs": [
            cardData.linkedin,
            cardData.twitter,
            cardData.github,
            cardData.website
        ].filter(Boolean),
        "image": cardData.image || cardData.imageUrl,
        "description": cardData.aboutEN || cardData.aboutDE || ''
    };

    return (
        <main className="min-h-screen">
            {/* Add structured data script */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            
            <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                    <div className="flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        <p className="text-gray-600">Loading card...</p>
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
export const revalidate = 3600; // Revalidate every hour