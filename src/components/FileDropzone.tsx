import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface FileDropzoneProps {
  onDrop: (files: File[]) => void;
}

export function FileDropzone({ onDrop }: FileDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-white bg-zinc-900' : 'border-zinc-700 hover:border-white'}`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto mb-4" size={32} />
      <p className="text-lg mb-2">Drop your file here, or click to select</p>
      <p className="text-sm text-zinc-400">Supports images and videos</p>
    </div>
  );
}