import React, { useState, useCallback } from 'react';
import { Upload, X, Download } from 'lucide-react';
import { FileDropzone } from './components/FileDropzone';
import { Footer } from './components/Footer';
import { removeMetadata } from './utils/metadata';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [cleanFile, setCleanFile] = useState<Blob | null>(null);

  const handleDrop = useCallback((files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setCleanFile(null);
    }
  }, []);

  const handleProcess = async () => {
    if (!file) return;
    
    setProcessing(true);
    try {
      const cleanedFile = await removeMetadata(file);
      setCleanFile(cleanedFile);
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!cleanFile) return;
    
    const url = URL.createObjectURL(cleanFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clean_${file?.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setFile(null);
    setCleanFile(null);
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <h1 className="text-3xl font-bold mb-2 text-center">Anonymize your photos and videos</h1>
        <p className="text-zinc-400 text-center mb-12">Remove metadata from your files</p>
        
        {!file ? (
          <FileDropzone onDrop={handleDrop} />
        ) : (
          <div className="space-y-6">
            <div className="bg-zinc-900 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="truncate flex-1">
                  <p className="text-sm text-zinc-400">Selected file:</p>
                  <p className="text-lg truncate">{file.name}</p>
                </div>
                <button
                  onClick={handleClear}
                  className="ml-4 p-2 text-zinc-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {!cleanFile && (
              <button
                onClick={handleProcess}
                disabled={processing}
                className="w-full bg-white text-black py-3 px-6 rounded-lg font-medium hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {processing ? (
                  'Processing...'
                ) : (
                  <>
                    <Upload size={20} /> Remove Metadata
                  </>
                )}
              </button>
            )}

            {cleanFile && (
              <button
                onClick={handleDownload}
                className="w-full bg-white text-black py-3 px-6 rounded-lg font-medium hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
              >
                <Download size={20} /> Download Clean File
              </button>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;