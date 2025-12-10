import { redirect } from 'next/navigation';

export default function CardRedirect({ searchParams }) {
    const template = searchParams?.template || 'glass';
    let cardId = '68757392fb1a16b8eb2a4ba9'; // default card ID
    
    // Handle the encoded URL format: template=glass%2F68757392fb1a16b8eb2a4ba9
    if (template && template.includes('%2F')) {
        const decoded = decodeURIComponent(template);
        const [actualTemplate, actualCardId] = decoded.split('/');
        if (actualCardId) {
            redirect(`/card/${actualCardId}?template=${actualTemplate}`);
        }
    }
    
    // Handle normal query params
    if (searchParams?.cardId) {
        cardId = searchParams.cardId;
    }
    
    // Redirect to the proper dynamic route
    redirect(`/card/${cardId}?template=${template}`);
}