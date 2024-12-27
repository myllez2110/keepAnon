import React from 'react';
import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="absolute bottom-0 w-full py-6 px-4 border-t border-zinc-900">
      <div className="container mx-auto flex items-center justify-between text-sm text-zinc-500">
        <p>© {new Date().getFullYear()} Anonymizer</p>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-white transition-colors"
        >
          <Github size={16} />
          <span>Source</span>
        </a>
      </div>
    </footer>
  );
}