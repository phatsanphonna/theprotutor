import { BYTEARK_ACCESS_TOKEN } from '$env/static/private'
import type { BytearkGetVideosResponse } from './interface';

export const getVideos = async () => {
  const response = await fetch('https://stream.byteark.com/v1/videos', {
    headers: {
      Authorization: `Bearer ${BYTEARK_ACCESS_TOKEN}`
    }
  });

  const result = await response.json() as BytearkGetVideosResponse;

  return result;
}

export const getBytearkVideoUrl = (videoId: string) => {
  return `https://stream.byteark.com/phatsanphon/projects/theprotutor-iqlmr7/videos/${videoId}/information`;
}