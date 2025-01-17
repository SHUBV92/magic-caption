import React from 'react';
import VideoUpload from '../components/VideoUpload/VideoUpload';
import Navigation from '../components/Navigation/Navigation';

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Upload Your Video
        </h1>
        <div className="max-w-3xl mx-auto">
          <VideoUpload />
        </div>
      </main>
    </div>
  );
}
