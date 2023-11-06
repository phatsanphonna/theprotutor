import { ByteArkV2UrlSigner } from 'byteark-sdk';
import {
  BYTEARK_KEY_ID,
  BYTEARK_KEY_SECRET,
} from "$env/static/private";

const signer = new ByteArkV2UrlSigner({
  access_id: BYTEARK_KEY_ID,
  access_secret: BYTEARK_KEY_SECRET,
});

export const signURL = (url: string) => {
  const signedUrl = signer.sign(
    url,
  );

  return signedUrl;
};