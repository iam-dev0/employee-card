'use client';
import CardEditor from "@/components/CardEditor";
import Link from "next/link";
import { useRef, useState, Suspense } from 'react';
import { Button } from "@/components/ui/button";

export default function EditorPage() {
    const cardRef = useRef(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const downloadPDF = () => {
        const element = cardRef.current;
        if (!element) return;
        setIsGenerating(true);
        html2canvas(element, {
            scale: 3,
            useCORS: true,
            scrollX: 0,
            scrollY: -window.scrollY,
            windowWidth: document.body.scrollWidth,
            windowHeight: document.body.scrollHeight,
            backgroundColor: '#000000', // Ensure black background
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgProps = pdf.getImageProperties(imgData);
            let imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
            if (imgHeight > pdfHeight) {
                imgHeight = pdfHeight;
            }
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
            pdf.save(`${cardData.firstName} ${cardData.lastName} Card.pdf`);
            setIsGenerating(false);
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
        <div className="h-full bg-background font-sans flex flex-col">
            {/* Header */}
            {/* <header className="border-b border-zinc-200 bg-background h-16 flex items-center justify-between px-6 shrink-0">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <Button size={"sm"} variant={"ghost"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600 dark:text-zinc-400">
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </Button>
                    </Link>
                    <span className="font-semibold text-zinc-900 dark:text-white">Editor</span>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        onClick={shareWebsite}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                            <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                        </svg>
                    </Button>
                    <Button
                        onClick={downloadPDF}
                        disabled={isGenerating}
                    >
                        {isGenerating ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating...
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" x2="12" y1="15" y2="3" />
                                </svg>
                                Download PDF
                            </>
                        )}
                    </Button>
                </div>
            </header> */}

            <main className="flex-1 h-full overflow-hidden">
                <Suspense fallback={<div className="flex items-center justify-center h-full">Loading editor...</div>}>
                    <CardEditor ref={cardRef} />
                </Suspense>
            </main>
        </div>
    );
}