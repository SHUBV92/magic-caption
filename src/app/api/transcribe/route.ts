import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { videoUrl } = await request.json();

    if (!videoUrl) {
      return NextResponse.json(
        { error: 'No video URL provided' },
        { status: 400 }
      );
    }

    // Convert video file to audio buffer 
    // This is a placeholder - you'll need to implement the actual video-to-audio conversion
    // using a library like ffmpeg
    const audioBuffer = await extractAudioSegment(videoUrl);

    const transcription = await openai.audio.transcriptions.create({
      file: audioBuffer,
      model: "whisper-1",
      language: "en",
    });

    return NextResponse.json({ text: transcription.text });
  } catch (error) {
    console.error('Error in transcribe route:', error);
    return NextResponse.json(
      { error: 'Failed to process transcription' },
      { status: 500 }
    );
  }
}

async function extractAudioSegment(
  videoUrl: string
): Promise<File> {
  // This is a placeholder function
  // You'll need to implement the actual video-to-audio conversion here
  // using a library like ffmpeg-wasm or by sending the video to a server
  // that has ffmpeg installed
  
  // For now, we'll just return the video file as is
  // In a real implementation, you would:
  // 1. Convert the video to audio
  // 2. Return the audio as a File object
  // Note: This function should be modified to handle videoUrl instead of videoFile
  return new File([], 'audio.mp3', { type: 'audio/mp3' });
}
