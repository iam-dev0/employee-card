// app/card/[id]/page.js
import { Suspense } from 'react';
import CardViewer from '@/components//card-viewer';
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
    const resolvedSearchParams = await searchParams; // Fix: await searchParams
    const template = resolvedSearchParams?.template || 'glass';
    
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
    
    // Create OG image URL
    const imageUrl = new URL(`https://employee-card-os32.vercel.app/api/og/${id}`);
    // Optionally pass card data to avoid redundant API call
    // imageUrl.searchParams.set('data', encodeURIComponent(JSON.stringify(cardData)));
    
    // Function to strip HTML tags and get plain text
    const stripHtml = (html) => {
        if (!html) return '';
        return html
            .replace(/<[^>]*>/g, '') // Remove HTML tags
            .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
            .replace(/&amp;/g, '&') // Replace &amp; with &
            .replace(/&lt;/g, '<') // Replace &lt; with <
            .replace(/&gt;/g, '>') // Replace &gt; with >
            .replace(/&quot;/g, '"') // Replace &quot; with "
            .replace(/&#39;/g, "'") // Replace &#39; with '
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .trim(); // Remove leading/trailing whitespace
    };
    
    const plainTextAbout = stripHtml(about);
    // Create page title
    let title = fullName || 'Digital Business Card';
    if (role) title += ` - ${role}`;
    if (company) title += ` at ${company}`;
    title += ' | Digital Business Card';
    
    // Create description
    let description = plainTextAbout || '';
    if (!description && fullName) {
        description = `Connect with ${fullName}${role ? `, ${role}` : ''}${company ? ` at ${company}` : ''}. View contact information, professional details, and connect instantly through this digital business card.`;
    }

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
        description: company, // Limit to 160 chars for SEO
        keywords: keywords.join(', '),
        authors: [{ name: fullName }],
        creator: fullName,
        publisher: company || 'Digital Business Card',
        
        // Open Graph metadata for social sharing
        openGraph: {
            title,
            description: description.substring(0, 150),
            type: 'profile',
            url: `https://employee-card-os32.vercel.app/card/${id}/?template=${template}`,
            images: [{
                url: imageUrl.toString(),
                width: 1200,
                height: 630,
                alt: `${fullName}'s Digital Business Card`,
            }],
            siteName: 'Digital Business Cards',
            locale: 'en_US',
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
            creator: cardData.twitter 
                ? `@${cardData.twitter.replace('@', '').split('/').pop()}`
                : fullName,
            images: [imageUrl.toJSON()],
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
            canonical:imageUrl,
        },
    };
}

export default async function CardPage({ params, searchParams }) {
    const { id } = await params;
    const resolvedSearchParams = await searchParams;
    const template = resolvedSearchParams?.template || 'glass';
    const cardData = await getCardData(id);
    
    if (!cardData) {
        console.log('No card data found, calling notFound()');
        notFound();
    }
const stripHtml = (html) => {
        if (!html) return '';
        return html
            .replace(/<[^>]*>/g, '') // Remove HTML tags
            .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
            .replace(/&amp;/g, '&') // Replace &amp; with &
            .replace(/&lt;/g, '<') // Replace &lt; with <
            .replace(/&gt;/g, '>') // Replace &gt; with >
            .replace(/&quot;/g, '"') // Replace &quot; with "
            .replace(/&#39;/g, "'") // Replace &#39; with '
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .trim(); // Remove leading/trailing whitespace
    };
    
    const plainTextAbout = stripHtml(cardData?.aboutEN || cardData?.aboutDE || '');
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
        "image": new URL(`https://employee-card-os32.vercel.app/api/og/${id}`),
        "description": plainTextAbout
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