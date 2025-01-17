import React, { useRef, useEffect, useState } from 'react';
import { TextOverlay } from '../TextOverlayManager/TextOverlayManager';

interface VideoPreviewProps {
    videoUrl: string;
    textOverlays: TextOverlay[];
    onTimeUpdate?: (time: number) => void;
}

const VideoPreview = ({ videoUrl, textOverlays, onTimeUpdate }: VideoPreviewProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number>();
    const [videoAspectRatio, setVideoAspectRatio] = useState(16/9); // default aspect ratio

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        // Update aspect ratio when video metadata is loaded
        const handleLoadedMetadata = () => {
            setVideoAspectRatio(video.videoWidth / video.videoHeight);
        };
        video.addEventListener('loadedmetadata', handleLoadedMetadata);

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const updateCanvas = () => {
            // Get container dimensions
            const container = canvas.parentElement;
            if (!container) return;

            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;
            const containerAspectRatio = containerWidth / containerHeight;

            // Calculate dimensions to maintain aspect ratio
            let drawWidth = containerWidth;
            let drawHeight = containerHeight;

            if (videoAspectRatio > containerAspectRatio) {
                // Video is wider than container
                drawHeight = containerWidth / videoAspectRatio;
            } else {
                // Video is taller than container
                drawWidth = containerHeight * videoAspectRatio;
            }

            // Center the video
            const x = (containerWidth - drawWidth) / 2;
            const y = (containerHeight - drawHeight) / 2;

            // Update canvas size to match container
            canvas.width = containerWidth;
            canvas.height = containerHeight;

            // Clear canvas and draw video frame
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, containerWidth, containerHeight);
            ctx.drawImage(video, x, y, drawWidth, drawHeight);

            // Draw active text overlays
            textOverlays.forEach(overlay => {
                if (video.currentTime >= overlay.startTime && video.currentTime <= overlay.endTime) {
                    ctx.font = `${overlay.fontSize}px Arial`;
                    ctx.fillStyle = overlay.color;
                    ctx.textAlign = 'center';

                    // Calculate text position relative to video area
                    const textX = containerWidth / 2;
                    let textY;
                    switch (overlay.position) {
                        case 'top':
                            textY = y + overlay.fontSize + 10;
                            break;
                        case 'bottom':
                            textY = y + drawHeight - 10;
                            break;
                        default: // middle
                            textY = y + (drawHeight / 2);
                    }

                    ctx.fillText(overlay.text, textX, textY);
                }
            });

            animationFrameRef.current = requestAnimationFrame(updateCanvas);
        };

        updateCanvas();

        const handleTimeUpdate = () => {
            onTimeUpdate?.(video.currentTime);
        };

        video.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [textOverlays, onTimeUpdate, videoAspectRatio]);

    return (
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
            <video
                ref={videoRef}
                src={videoUrl}
                className="absolute inset-0 w-full h-full object-contain"
                controls
            />
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
            />
        </div>
    );
};

export default VideoPreview; 