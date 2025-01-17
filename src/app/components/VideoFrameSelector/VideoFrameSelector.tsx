import React, { useRef, useState, useEffect } from 'react';

const VideoFrameSelector = () => {
    const [videoFile, setVideoFile] = useState<string | null>(null);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [snapshot, setSnapshot] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // handle video uplaod
    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setVideoFile(URL.createObjectURL(file));
            setSnapshot(null); // clear previous snapshot
        }
    };

    // update the duration once the video metadata is loaded
    const handleLoadedMetadata = () => {
        setDuration(videoRef.current?.duration || 0);
    };

    const handleSliderChange = (e: { target: { value: string } }) => {
        const time = parseFloat(e.target.value);
        setCurrentTime(time);
        if (videoRef.current) {
            videoRef.current.currentTime = time;
        }
    };

    const captureSnapshot = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        // Set canvas dimensions to match video dimensions
        if (canvas && video) {
            canvas.width = video.videoWidth || 0;
            canvas.height = video.videoHeight || 0;
        }

        // Draw the current frame on the canvas
        if (video) {
            if (canvas && canvas.width && canvas.height) {
                ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
            }
        }

        // Get the image data URL
        const image = canvas.toDataURL('image/png');
        setSnapshot(image);
    };

    return (
        <div>
            <h1>Video Frame Selector</h1>

            {/* Video Player */}

            <input type='file' accept='video/*' onChange={handleVideoUpload} />

            {videoFile && (
                <div>
                    {/* Video Player */}
                    <video
                        ref={videoRef}
                        src={videoFile}
                        controls
                        onLoadedMetadata={handleLoadedMetadata}
                        style={{ width: '100%', maxWidth: '600px', marginTop: '10px' }}
                    />

                    {/* Frame Selector Slider */}
                    <div style={{ margin: '20px 0' }}>
                        <input
                            type='range'
                            min='0'
                            max={duration}
                            step='0.1'
                            value={currentTime}
                            onChange={handleSliderChange}
                            style={{ width: '100%' }}
                        />
                        <p>
                            Current Time: {currentTime.toFixed(1)}s / {duration.toFixed(1)}s
                        </p>
                    </div>

                    {/* Capture Snapshot */}
                    <button onClick={captureSnapshot}>Capture Snapshot</button>

                    {/* Snapshot Display */}
                    {snapshot && (
                        <div>
                            <h2>Snapshot</h2>
                            <img
                                src={snapshot}
                                alt='Video Frame Snapshot'
                                style={{ width: '100%', maxWidth: '600px' }}
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Hidden Canvas for Snapshot */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default VideoFrameSelector;
