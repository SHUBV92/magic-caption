import React from 'react';
import VideoEditor from '../components/VideoEditor/VideoEditor';
import Navigation from '../components/Navigation/Navigation';

export default function EditorPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Video Editor
        </h1>
        <VideoEditor />
      </main>
    </div>
  );
}
