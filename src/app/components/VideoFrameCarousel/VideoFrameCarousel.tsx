import React, { useEffect, useRef, useState } from 'react';

interface VideoFrameCarouselProps {
    videoUrl: string;
    onFrameSelect?: (time: number) => void;
    frameCount?: number;
}

const VideoFrameCarousel = ({ videoUrl, onFrameSelect, frameCount = 10 }: VideoFrameCarouselProps) => {
    const [frames, setFrames] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const extractFrames = async () => {
            if (!videoRef.current || !canvasRef.current) return;

            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            
            if (!context) return;

            // Wait for video metadata to load
            await new Promise((resolve) => {
                video.addEventListener('loadedmetadata', resolve);
                video.src = videoUrl;
            });

            const duration = video.duration;
            const interval = duration / frameCount;
            const framePromises: string[] = [];

            // Extract frames at regular intervals
            for (let i = 0; i < frameCount; i++) {
                const time = i * interval;
                const frame = await captureFrame(video, canvas, context, time);
                framePromises.push(frame);
            }

            setFrames(framePromises);
            setIsLoading(false);
        };

        extractFrames();
    }, [videoUrl, frameCount]);

    const captureFrame = async (
        video: HTMLVideoElement,
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
        time: number
    ): Promise<string> => {
        return new Promise((resolve) => {
            video.currentTime = time;
            video.addEventListener('seeked', () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/jpeg'));
            }, { once: true });
        });
    };

    return (
        <div className="w-full mt-6">
            {/* Hidden video and canvas elements for frame extraction */}
            <video ref={videoRef} className="hidden" />
            <canvas ref={canvasRef} className="hidden" />

            {isLoading ? (
                <div className="flex justify-center items-center h-24">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <div className="relative">
                    <div className="flex overflow-x-auto space-x-2 pb-4 
                        [&::-webkit-scrollbar]:h-2
                        [&::-webkit-scrollbar-track]:rounded-full
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-blue-600">
                        {frames.map((frame, index) => (
                            <div
                                key={index}
                                className="flex-none cursor-pointer transition-transform hover:scale-105"
                                onClick={() => onFrameSelect?.(index * (videoRef.current?.duration || 0) / frameCount)}
                            >
                                <div className="relative w-32 h-24 rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-600">
                                    <img
                                        src={frame}
                                        alt={`Frame ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs py-1 text-center">
                                        {Math.round(index * (videoRef.current?.duration || 0) / frameCount)}s
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoFrameCarousel; 