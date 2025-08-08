import React, { useEffect } from 'react';
import VisionChatBot from '@/components/VisionChatBot';

const VisionAI: React.FC = () => {
  useEffect(() => {
    document.title = 'AI-Powered Retinal Image Analysis | Reti-Doc';
    const description = 'Analyze retinal images with AI for educational insights on CNV, DME, Drusen, and normal retina.';

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 sm:px-6 lg:px-8 pt-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            AI-Powered Retinal Image Analysis
          </h1>
          <p className="mt-2 text-muted-foreground">
            Upload or capture retinal images to get AI-assisted, educational insights.
          </p>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 py-6">
        <section className="max-w-6xl mx-auto">
          <VisionChatBot isFullPage className="w-full" />
          <p className="mt-4 text-xs text-muted-foreground">
            For educational purposes only — not intended for medical diagnosis.
          </p>
        </section>
      </main>
    </div>
  );
};

export default VisionAI;
