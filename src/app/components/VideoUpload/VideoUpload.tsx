'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Transcription from '../Transcription/Transcription';

interface VideoFile extends File {
  preview?: string;
}

const VideoUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [videoFile, setVideoFile] = useState<VideoFile | null>(null);
  const [uploading, setUploading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [transcriptions, setTranscriptions] = useState<Array<{ text: string, startTime: number, endTime: number }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    if (files?.[0]) {
      const file = files[0];
      if (file.type.startsWith('video/')) {
        const videoUrl = URL.createObjectURL(file);
        setVideoFile({ ...file, preview: videoUrl });
      } else {
        alert('Please upload a video file');
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const generateTranscription = async (start: number, end: number) => {
    try {
      const formData = new FormData();
      if (!videoFile) return;
      
      formData.append('video', videoFile);
      formData.append('start_time', start.toString());
      formData.append('end_time', end.toString());

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Transcription failed');

      const data = await response.json();
      setTranscriptions(prev => [...prev, {
        text: data.text,
        startTime: start,
        endTime: end
      }]);
    } catch (error) {
      console.error('Error generating transcription:', error);
    }
  };

  const handleUpload = async () => {
    if (!videoFile) return;

    setUploading(true);
    try {
      // Here you would typically upload to your backend
      // For now, we'll simulate an upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // After successful upload, redirect to editor
      router.push('/editor');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeVideo = () => {
    if (videoFile?.preview) {
      URL.revokeObjectURL(videoFile.preview);
    }
    setVideoFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      {!videoFile ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-12 transition-all
            ${dragActive 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="video/*"
            onChange={handleChange}
          />
          
          <div className="text-center">
            <div className="mb-4">
              <svg
                className={`mx-auto h-12 w-12 transition-colors ${
                  dragActive ? 'text-blue-500' : 'text-gray-400'
                }`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                />
              </svg>
            </div>
            <div className="text-lg">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
              >
                <span>Upload a video</span>
              </label>
              <p className="text-gray-500 dark:text-gray-400">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              MP4, WebM, or Ogg up to 2GB
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            {videoFile && (
              <div className="mt-8 w-full max-w-4xl mx-auto">
                <Tabs defaultValue="preview" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="transcription">Transcription</TabsTrigger>
                  </TabsList>
                  <TabsContent value="preview" className="mt-4">
                    <video
                      ref={videoRef}
                      src={videoFile.preview}
                      controls
                      className="w-full rounded-lg"
                      onTimeUpdate={handleTimeUpdate}
                    />
                  </TabsContent>
                  <TabsContent value="transcription" className="mt-4">
                    <div className="space-y-4">
                      <Transcription 
                        videoTime={currentTime}
                        transcriptions={transcriptions}
                        onGenerateTranscription={generateTranscription}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {videoFile.name}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
              </span>
            </div>
            <button
              onClick={removeVideo}
              className="text-sm text-red-600 hover:text-red-500 transition-colors"
            >
              Remove
            </button>
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all
              ${uploading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {uploading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Uploading...</span>
              </div>
            ) : (
              'Upload Video'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
