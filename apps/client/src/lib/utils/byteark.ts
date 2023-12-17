import type { Video } from '$lib/types';

export const getVideoByKey = async (key: string) => {
  const response = await fetch(`https://stream.byteark.com/api/v1/videos/${key}`, {
    headers: {
      Authorization: `Bearer ${process.env.BYTEARK_ACCESS_TOKEN}`
    }
  });
  const result = await response.json() as Video;
  return result;
}