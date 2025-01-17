'use client';

import React, { useState, useEffect } from 'react';

export interface TextOverlay {
  id: string;
  text: string;
  timestamp: number;
  duration: number;
}

interface TextEditorProps {
  overlay: TextOverlay;
  onUpdate: (updated: TextOverlay) => void;
  onDelete: (id: string) => void;
}

export const TextEditor: React.FC<TextEditorProps> = ({
  overlay,
  onUpdate,
  onDelete,
}) => {
  const [text, setText] = useState(overlay.text);
  const [timestamp, setTimestamp] = useState(overlay.timestamp);
  const [duration, setDuration] = useState(overlay.duration);

  useEffect(() => {
    setText(overlay.text);
    setTimestamp(overlay.timestamp);
    setDuration(overlay.duration);
  }, [overlay]);

  const handleUpdate = () => {
    onUpdate({
      ...overlay,
      text,
      timestamp,
      duration,
    });
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Caption Text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleUpdate}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Start Time (seconds)
            </label>
            <input
              type="number"
              value={timestamp}
              onChange={(e) => setTimestamp(Number(e.target.value))}
              onBlur={handleUpdate}
              step="0.1"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {formatTime(timestamp)}
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Duration (seconds)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              onBlur={handleUpdate}
              step="0.1"
              min="0.1"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => onDelete(overlay.id)}
            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium text-sm transition-colors"
          >
            Delete Caption
          </button>
        </div>
      </div>
    </div>
  );
};
