import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const videoFile = formData.get('video') as File;
    const startTime = parseFloat(formData.get('start_time') as string);
    const endTime = parseFloat(formData.get('end_time') as string);

    if (!videoFile) {
      return NextResponse.json(
        { error: 'No video file provided' },
        { status: 400 }
      );
    }

    // Convert video file to audio buffer for the specified time range
    // This is a placeholder - you'll need to implement the actual video-to-audio conversion
    // using a library like ffmpeg
    const audioBuffer = await extractAudioSegment(videoFile, startTime, endTime);

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
  videoFile: File,
  startTime: number,
  endTime: number
): Promise<File> {
  // This is a placeholder function
  // You'll need to implement the actual video-to-audio conversion here
  // using a library like ffmpeg-wasm or by sending the video to a server
  // that has ffmpeg installed
  
  // For now, we'll just return the video file as is
  // In a real implementation, you would:
  // 1. Convert the video to audio
  // 2. Extract the segment between startTime and endTime
  // 3. Return the audio segment as a File object
  return videoFile;
}
