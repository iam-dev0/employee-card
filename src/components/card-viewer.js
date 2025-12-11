'use client';

import { useRef } from 'react';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';
import ProfileCard3 from './templates/profile-card1';
import ProfileCard7 from './templates/profile-card2';
import ProfileCard8 from './templates/profile-card3';

const TEMPLATES = [
    { id: 'glass', name: 'Glassmorphism', component: ProfileCard3 },
    { id: 'calvino', name: 'Calvino Bold', component: ProfileCard7 },
    { id: 'freelancer', name: 'Freelancer Split', component: ProfileCard8 },
];

const CardViewer = ({ data, template = 'glass', cardId }) => {
    const SelectedTemplate = TEMPLATES.find(t => t.id === template)?.component || ProfileCard3;
    const cardRef = useRef(null);
   const downloadPDF = () => {
        const element = cardRef.current;
        if (element) return;
        
        // setIsGenerating(true);
        html2canvas(element, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: null,
            scrollX: 0,
            scrollY: 0,
            width: element.scrollWidth,
            height: element.scrollHeight,
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight,
            x: 0,
            y: 0,
            removeContainer: true
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png', 0.98);
            
            // Get canvas dimensions
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const aspectRatio = canvasWidth / canvasHeight;
            
            // Create PDF with proper orientation
            const isLandscape = aspectRatio > 1;
            const pdf = new jsPDF(isLandscape ? 'l' : 'p', 'mm', 'a4');
            
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            // Calculate dimensions to fit the image properly while maintaining aspect ratio
            let imgWidth, imgHeight;
            
            if (aspectRatio > (pdfWidth / pdfHeight)) {
                // Image is wider than PDF aspect ratio
                imgWidth = pdfWidth;
                imgHeight = pdfWidth / aspectRatio;
            } else {
                // Image is taller than PDF aspect ratio
                imgHeight = pdfHeight;
                imgWidth = pdfHeight * aspectRatio;
            }
            
            // Center the image on the page
            const xOffset = (pdfWidth - imgWidth) / 2;
            const yOffset = (pdfHeight - imgHeight) / 2;
            
            pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
            pdf.save(`${data?.firstName || 'Card'} ${data?.lastName || new Date().toISOString().split('T')[0]} Card.pdf`);
            // setIsGenerating(false);
        }).catch(error => {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
            // setIsGenerating(false);
        });
    };
    const shareWebsite = () => {
        const shareData = {
            title: document.title,
            text: 'Check out this awesome website!',
            url: window.location.href
        };

        if (navigator.share) {
            navigator.share(shareData)
                .then(() => console.log('Successfully shared'))
                .catch((error) => console.error('Error sharing', error));
        } else {
            fallbackShare();
        }
    }

    const fallbackShare = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('Link copied to clipboard! You can now share it.');
            });
        } else {
            alert('Sharing not supported on this browser. Please copy the URL manually.');
        }
    }
    return (
            <div className="w-full h-full">
                <SelectedTemplate data={data} shareWebsite={shareWebsite} ref={cardRef} downloadPDF={downloadPDF} />
            </div>
    );
};

CardViewer.displayName = 'CardViewer';

export default CardViewer;