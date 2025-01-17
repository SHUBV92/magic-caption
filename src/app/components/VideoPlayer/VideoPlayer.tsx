import React from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
    url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
    return (
        <div className='flex justify-center items-center'>
            <div className='relative w-screen h-screen overflow-hidden'>
                <div className='absolute top-0 left-0 w-full h-full'>
                    <video className='w-full h-full object-cover' autoPlay loop muted>
                        <source src='/1118495_4k_Telecommunications_3840x2160.mp4' type='video/mp4' />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div className='relative z-10 flex justify-center items-center w-[25%] h-[25%]'>
                    <ReactPlayer
                        url={url}
                        playing={true}
                        controls={true}
                        width='100%'
                        height='100%'
                        onReady={() => console.log('Video is ready')}
                        onStart={() => console.log('Video started')}
                        onPlay={() => console.log('Video is playing')}
                        onPause={() => console.log('Video is paused')}
                        onEnded={() => console.log('Video ended')}
                        onError={(e) => console.log('Video error:', e)}
                    />
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
