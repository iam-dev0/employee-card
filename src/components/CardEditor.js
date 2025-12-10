'use client';

import { useState, forwardRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import ProfileCard3 from './templates/ProfileCard3';
import ProfileCard7 from './templates/ProfileCard7';
import ProfileCard8 from './templates/ProfileCard8';

const TEMPLATES = [
    { id: 'glass', name: 'Glassmorphism', component: ProfileCard3 },
    { id: 'calvino', name: 'Calvino Bold', component: ProfileCard7 },
    { id: 'freelancer', name: 'Freelancer Split', component: ProfileCard8 },
];

const CardEditor = forwardRef((_, ref) => {
    const searchParams = useSearchParams();
    const initialTemplate = searchParams.get('template') || 'original';
    const [selectedTemplateId, setSelectedTemplateId] = useState(initialTemplate);
    const [templateData, setTemplateData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchTemplates = async () => {
        try {
            const response = await fetch('https://me.onra.ch/api/website-business-public/employee/digitalBusinessCard/68757392fb1a16b8eb2a4ba9');
            const data = await response.json();
            setTemplateData(data);
        } catch (error) {
            console.error("Failed to fetch template data", error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchTemplates();
    }, []);
    useEffect(() => {
        const templateParam = searchParams.get('template');
        if (templateParam && TEMPLATES.some(t => t.id === templateParam)) {
            setSelectedTemplateId(templateParam);
        }
    }, [searchParams]);
    const [cardData, setCardData] = useState({
        firstName: 'Kevin',
        lastName: 'Johnson',
        role: 'Marketing Manager',
        companyName: 'Cool Co.',
        companyLogo: '',
        imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        slogan: '',
        description: 'Hi, I am Kevin, working as marketing manager at Cool Co.',
        phone: '+1 234 567 890',
        email: 'kevin@coolco.com',
        linkedin: 'https://linkedin.com',
        website: 'https://coolco.com',
        customFields: [],
        qrCodeLink: ''
    });
    const SelectedTemplate = TEMPLATES.find(t => t.id === selectedTemplateId)?.component || EmployeeCard;

    return (
        <div className="flex h-full w-full overflow-hidden relative flex-col">
            <div className="h-full flex flex-1 overflow-hidden relative">
                {/* Right Panel - Full Screen Preview */}
                <div className="flex-1 h-full bg-background relative overflow-y-auto custom-scrollbar transition-all duration-300">
                    {/* Download Button */}
                    <div className="h-full" ref={ref}>
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full min-h-[60vh]">
                                <div className="flex flex-col items-center gap-4">
                                    <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                            </div>
                        ) : (
                            <SelectedTemplate data={templateData} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default CardEditor;
