'use client';

import { useState, forwardRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import ProfileCard3 from './templates/ProfileCard3';
import ProfileCard7 from './templates/ProfileCard7';
import ProfileCard8 from './templates/ProfileCard8';
import { Button } from './ui/button';

const TEMPLATES = [
    { id: 'glass', name: 'Glassmorphism', component: ProfileCard3 },
    { id: 'calvino', name: 'Calvino Bold', component: ProfileCard7 },
    { id: 'freelancer', name: 'Freelancer Split', component: ProfileCard8 },
];

const CardViewer = forwardRef(({ data, template = 'glass', cardId }, ref) => {
    const SelectedTemplate = TEMPLATES.find(t => t.id === template)?.component || ProfileCard3;

    return (
            <div className="w-full h-full" ref={ref}>
                <SelectedTemplate data={data} />
            </div>
    );
});

CardViewer.displayName = 'CardViewer';

export default CardViewer;