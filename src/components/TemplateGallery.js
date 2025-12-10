import Link from 'next/link';
import Image from 'next/image';

const templates = [
    {
        id: 'original',
        name: 'Original Dark',
        imageUrl: "https://images.unsplash.com/photo-1621624959365-071359461b94?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEJhY2twYWNrc3xlbnwwfHwwfHx8MA%3D%3D?w=500&q=80",

        description: 'A sleek, dark-themed employee card with gradient overlays and contact icons.',
        tags: ['Professional', 'Dark Mode', 'Corporate']
    },
    {
        id: 'glass',
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",

        name: 'Glassmorphism',
        description: 'Trendy frosted glass effect with colorful gradients and floating elements.',
        tags: ['Trendy', 'Modern', 'Colorful']
    },
    {
        id: 'calvino',
        name: 'Calvino Bold',
        imageUrl: "https://images.unsplash.com/photo-1617975316514-69cd7e16c2a4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8V2lyZWxlc3MlMjBDaGFyZ2luZyUyMFN0YW5kfGVufDB8fDB8fHww?w=500&q=80",
        description: 'Bold orange header with overlapping avatar and large typography.',
        tags: ['Bold', 'Header', 'Creative']
    },
    {
        id: 'freelancer',
        name: 'Freelancer Split',
        imageUrl: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&q=80",
        description: 'Modern split-screen design with a large image and green accents.',
        tags: ['Split', 'Freelancer', 'Modern']
    }
];
import * as React from "react";
import { cn } from "@/lib/utils";

const ProductCard = React.forwardRef(
    ({ className, imageUrl, title, category, href, onSave, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "group relative block overflow-hidden rounded-lg border bg-card text-card-foreground transition-all duration-300 ease-in-out hover:shadow-lg",
                    className
                )}
                {...props}
            >
                <a href={href} aria-label={title}>
                    {/* Image container with aspect ratio */}
                    <div className="aspect-square overflow-hidden">
                        <img
                            src={imageUrl}
                            alt={title}
                            className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                    </div>
                    {/* Card content */}
                    <div className="p-4">
                        <h3 className="font-semibold leading-tight truncate">{title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{category}</p>
                    </div>
                </a>
            </div>
        );
    }
);

const TemplateGallery = () => {
    return (
        <div className="w-full bg-background p-4 sm:p-6 md:p-8">
            <div className="mx-auto max-w-7xl">
                {/* Responsive grid layout */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {templates.map((template) => (
                        <Link href={`/editor?template=${template.id}`} key={template.id} className="group">
                            <ProductCard
                                key={template.id}
                                title={template.name}
                                category={template.description}
                                imageUrl={template.imageUrl}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TemplateGallery;
