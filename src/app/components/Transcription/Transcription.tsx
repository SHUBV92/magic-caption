'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TranscriptionProps {
  videoTime: number;
  transcriptions?: Array<{
    text: string;
    startTime: number;
    endTime: number;
  }>;
  onGenerateTranscription: (start: number, end: number) => void;
}

const Transcription: React.FC<TranscriptionProps> = ({
  videoTime,
  transcriptions = [],
  onGenerateTranscription,
}) => {
  const [startTime, setStartTime] = useState<number | null>(null);

  const handleStartCapture = () => {
    setStartTime(videoTime);
  };

  const handleEndCapture = () => {
    if (startTime !== null) {
      onGenerateTranscription(startTime, videoTime);
      setStartTime(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          onClick={handleStartCapture}
          disabled={startTime !== null}
          variant={startTime === null ? "default" : "secondary"}
        >
          Set Start Time
        </Button>
        <Button
          onClick={handleEndCapture}
          disabled={startTime === null}
          variant="default"
        >
          Set End Time
        </Button>
        {startTime !== null && (
          <span className="text-sm text-gray-500">
            Recording from: {startTime.toFixed(2)}s
          </span>
        )}
      </div>

      <div className="space-y-2">
        {transcriptions && transcriptions.length > 0 ? (
          transcriptions.map((trans, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-start gap-4">
                <p className="text-sm text-gray-900 dark:text-gray-100">{trans.text}</p>
                <span className="text-xs text-gray-500">
                  {trans.startTime.toFixed(2)}s - {trans.endTime.toFixed(2)}s
                </span>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            No transcriptions yet. Select a video segment to transcribe.
          </div>
        )}
      </div>
    </div>
  );
};

export default Transcription;