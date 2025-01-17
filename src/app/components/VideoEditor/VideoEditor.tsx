'use client';

import React, { useRef, useState, useEffect } from 'react';
import { TextOverlay } from '../TextOverlay/TextEditor';
import Transcription from '../Transcription/Transcription';

const VideoEditor = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [overlays, setOverlays] = useState<TextOverlay[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedVideo(url);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  useEffect(() => {
    return () => {
      if (selectedVideo) {
        URL.revokeObjectURL(selectedVideo);
      }
    };
  }, [selectedVideo]);

  const handleOverlayUpdate = (updatedOverlays: TextOverlay[]) => {
    setOverlays(updatedOverlays);
  };

  const getCurrentOverlays = () => {
    return overlays.filter(
      (overlay) =>
        currentTime >= overlay.timestamp &&
        currentTime <= overlay.timestamp + overlay.duration
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video Preview Section */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Video Preview
              </h2>
              {!selectedVideo ? (
                <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                    <span className="text-gray-500 dark:text-gray-400">
                      Click to upload a video
                    </span>
                  </label>
                </div>
              ) : (
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    src={selectedVideo}
                    className="w-full h-full"
                    controls
                    onTimeUpdate={handleTimeUpdate}
                  />
                  {/* Overlay Container */}
                  <div className="absolute inset-0 pointer-events-none">
                    {getCurrentOverlays().map((overlay) => (
                      <div
                        key={overlay.id}
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded"
                      >
                        {overlay.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Video Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Current Time: {currentTime.toFixed(2)}s
              </h3>
              {/* Add additional video controls here if needed */}
            </div>
          </div>

          {/* Transcription Section */}
          <div>
            <Transcription
              videoTime={currentTime}
              onOverlayUpdate={handleOverlayUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoEditor;
