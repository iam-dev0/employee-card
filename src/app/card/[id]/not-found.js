import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#1c1c1c] flex items-center justify-center px-6">
            <div className="text-center space-y-6 max-w-md">
                <div className="space-y-3">
                    <h1 className="text-6xl font-bold text-white">404</h1>
                    <h2 className="text-2xl font-semibold text-white">Card Not Found</h2>
                    <p className="text-gray-400">
                        The digital business card you're looking for doesn't exist or may have been removed.
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild variant="default">
                        <Link href="/">
                            Go Home
                        </Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/editor">
                            Create Card
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}