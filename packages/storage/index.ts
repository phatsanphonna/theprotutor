import { del, put } from "@vercel/blob";

export const uploadFile = async (name: string, file: File) => {
  return await put(`${name}.pdf`, file, { access: 'public' });
}

export const deleteFile = async (location: string) => {
  return await del(location);
}