import TemplateGallery from "@/components/template-gallery";

export default function Home() {
  return (
    <div className="h-full bg-background font-sans">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              M
            </div>
            <span className="font-bold text-xl text-zinc-900 dark:text-white tracking-tight">MeCard</span>
          </div>
          <nav>
            <a href="https://github.com" target="_blank" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 ">
        <TemplateGallery />
      </main>
    </div>
  );
}
