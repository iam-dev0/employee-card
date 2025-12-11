import Link from 'next/link';
import * as React from "react";
import { cn } from "@/lib/utils";

const templates = [
    {
        id: 'glass',
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
        name: 'Glassmorphism',
        description: 'Trendy frosted glass effect with colorful gradients and floating elements.',
        tags: ['Trendy', 'Modern', 'Colorful'],
        teamID: "68757392fb1a16b8eb2a4ba9"
    },
    {
        id: 'calvino',
        name: 'Calvino Bold',
        imageUrl: "https://images.unsplash.com/photo-1617975316514-69cd7e16c2a4?w=900&auto=format&fit=crop&q=60",
        description: 'Bold orange header with overlapping avatar and large typography.',
        teamID: "68757392fb1a16b8eb2a4ba9",
        tags: ['Bold', 'Header', 'Creative']
    },
    {
        id: 'freelancer',
        name: 'Freelancer Split',
        imageUrl: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&q=80",
        description: 'Modern split-screen design with a large image and green accents.',
        tags: ['Split', 'Freelancer', 'Modern'],
        teamID: "68757392fb1a16b8eb2a4ba9"
    }
];

const ProductCard = React.forwardRef(
    ({ className, imageUrl, title, category, href, ...props }, ref) => {
        return (
            <Link
                ref={ref}
                href={href}
                className={cn(
                    "group relative block overflow-hidden rounded-lg border bg-card text-card-foreground transition-all duration-300 ease-in-out hover:shadow-lg",
                    className
                )}
                {...props}
            >
                <div className="aspect-square overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                </div>
                <div className="p-4">
                    <h3 className="font-semibold leading-tight truncate">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{category}</p>
                </div>
            </Link>
        );
    }
);

ProductCard.displayName = 'ProductCard';

const TemplateGallery = () => {
    return (
        <div className="w-full bg-background p-4 sm:p-6 md:p-8">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {templates.map((template) => (
                        <ProductCard
                            key={template.id}
                            title={template.name}
                            category={template.description}
                            imageUrl={template.imageUrl}
                            href={`/card/${template.teamID}?template=${template.id}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TemplateGallery;
