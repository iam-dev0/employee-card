import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://me.onra.ch' // Replace with your actual domain
    
    // Static routes
    const staticRoutes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/editor`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ]
    
    // You can add dynamic card routes here if you have a list of card IDs
    // const cardRoutes = cardIds.map((id) => ({
    //     url: `${baseUrl}/card/${id}`,
    //     lastModified: new Date(),
    //     changeFrequency: 'weekly',
    //     priority: 0.7,
    // }))
    
    return [
        ...staticRoutes,
        // ...cardRoutes,
    ]
}