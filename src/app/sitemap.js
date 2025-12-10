export default function sitemap() {
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
    const cardRoutes = [
        '68757392fb1a16b8eb2a4ba9',
        // Add more card IDs as needed
    ].map((id) => ({
        url: `${baseUrl}/card/${id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
    }))
    
    return [
        ...staticRoutes,
        ...cardRoutes,
    ]
}