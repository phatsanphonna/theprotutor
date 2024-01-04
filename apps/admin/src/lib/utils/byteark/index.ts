import type { BytearkGetVideosResponse, Video } from './interface';

export const getVideos = async () => {
  const response = await fetch('https://stream.byteark.com/api/v1/videos?limit=200', {
    headers: {
      Authorization: `Bearer ${process.env.BYTEARK_ACCESS_TOKEN}`
    }
  });

  const result = await response.json() as BytearkGetVideosResponse;

  return result;
}

export const getBytearkVideoUrl = (videoId: string) => {
  return `https://stream.byteark.com/the-pro-tutor/projects/theprotutor-iqlmr7/videos/${videoId}/information`;
}

export const getVideoByKey = async (key: string) => {
  const response = await fetch(`https://stream.byteark.com/api/v1/videos/${key}`, {
    headers: {
      Authorization: `Bearer ${process.env.BYTEARK_ACCESS_TOKEN}`
    }
  });
  const result = await response.json() as Video;
  return result;
}