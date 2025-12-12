// app/card/[id]/page.js
import { Suspense } from 'react';
import CardViewer from '@/components//card-viewer';
import { notFound } from 'next/navigation';

// Fetch employee data
async function fetchEmployeeData(id) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_COMPANY_API_URL}/employee/digitalBusinessCard/${id}`,
        { next: { revalidate: 3600 } }
    );
    if (!response.ok) return null;
    return response.json();
}

// Fetch company data
async function fetchCompanyData(ownerId) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_COMPANY_API_URL}/companies/${ownerId}`,
        { next: { revalidate: 3600 } }
    );
    if (!response.ok) return null;
    return response.json();
}

// Fetch company settings
async function fetchCompanySettings(ownerId) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_COMPANY_API_URL}/companies/${ownerId}/company-settings/`,
        { next: { revalidate: 3600 } }
    );
    if (!response.ok) return null;
    return response.json();
}

// Fetch employee role/function
async function fetchEmployeeRole(organisationFunctionId) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_COMPANY_API_URL}/functions/digitalBusinessCard/${organisationFunctionId}`,
        { next: { revalidate: 3600 } }
    );
    if (!response.ok) return null;
    return response.json();
}

// Fetch all data and merge into single object
async function getCardData(id) {
    try {
        // Step 1: Fetch employee data
        const employeeData = await fetchEmployeeData(id);
        
        if (!employeeData) {
            console.error('Failed to fetch employee data');
            return null;
        }
        
        const { ownerId, organisationFunctionId } = employeeData;
        
        // Step 2: Fetch company data, company settings, and role in parallel
        const [companyData, companySettings, roleData] = await Promise.all([
            ownerId ? fetchCompanyData(ownerId) : null,
            ownerId ? fetchCompanySettings(ownerId) : null,
            organisationFunctionId ? fetchEmployeeRole(organisationFunctionId) : null
        ]);
        
        // Step 3: Determine role title based on language preference
        const mainLanguage = companyData?.mainLanguage || 'DE';
        let roleTitle = '';
        if (roleData) {
            roleTitle = roleData[`title${mainLanguage}`] || roleData.titleDE || roleData.titleEN || roleData.titleFR || roleData.titleIT || '';
        }
        
        // Step 4: Get company address
        const companyAddress = companyData?.address || companyData?.adresse || {};
        const formattedAddress = companyAddress.street 
            ? `${companyAddress.street} ${companyAddress.streetNumber || ''}, ${companyAddress.zip || ''} ${companyAddress.city || ''}`.trim()
            : '';
        
        // Step 5: Get company colors from settings
        const colors = companySettings?.colors || {};
        
        // Step 6: Get company weblinks
        const weblinks = companyData?.weblinks || {};
        const weblinkItems = weblinks.weblinksItems || [];
        const linkedinItem = weblinkItems.find(item => item.url?.includes('linkedin'));
        
        // Step 7: Merge all data into single object
        const mergedData = {
            // Employee data
            id: employeeData.id,
            firstname: employeeData.firstname,
            name: employeeData.name,
            image: employeeData.image,
            email: employeeData.email || companyData?.email,
            phone: employeeData.phone || companyData?.telefon,
            linkedin: employeeData.linkedin || linkedinItem?.url || '',
            visibility: employeeData.visibility,
            sloganDE: employeeData.sloganDE,
            sloganFR: employeeData.sloganFR,
            sloganIT: employeeData.sloganIT,
            sloganEN: employeeData.sloganEN,
            aboutDE: employeeData.aboutDE,
            aboutFR: employeeData.aboutFR,
            aboutIT: employeeData.aboutIT,
            aboutEN: employeeData.aboutEN,
            
            // Role
            role: roleTitle,
            
            // Company data
            companyName: companyData?.company || '',
            companyLogo: companyData?.image || '',
            website: weblinks.website || companyData?.website || '',
            bookingLink: weblinks.bookingLink || companyData?.bookingLink || '',
            vrTour: weblinks.vrTour || null,
            
            // Company address for footer
            footerCompany: companyData?.company || '',
            footerAddress: formattedAddress,
            footerEmail: companyData?.email || '',
            footerPhone: companyData?.telefon || '',
            
            // Company colors
            colors: {
                primaryColor: colors.primaryColor || '#ffffff',
                secondaryColor: colors.secondaryColor || '#85c4ff',
                backgroundColor: colors.backgroundColor || '#455fac',
                accentColor: colors.accentColor || '#5cffec',
                contrastColor: colors.contrastColor || '#9EACEFFF',
                textColor: colors.textColor || '#f5f5f5'
            },
            
            // Additional company info
            openingHours: companyData?.openingHours || null,
            mainLanguage: mainLanguage,
            
            // Raw data for reference if needed
            _raw: {
                employee: employeeData,
                company: companyData,
                settings: companySettings,
                role: roleData
            }
        };
        
        console.log('Merged card data created successfully');
        return mergedData;
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
    const imageUrl = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/og/${id}`);
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
        "image": new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/og/${id}`),
        "description": plainTextAbout
    };

    return (
        <main className="min-h-screen">
            {/* Add structured data script */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
{/*             
            <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                    <div className="flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                </div>
            }> */}
                <CardViewer data={cardData} template={template} cardId={id} />
            {/* </Suspense> */}
        </main>
    );
}



// Configure page to be dynamic
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour