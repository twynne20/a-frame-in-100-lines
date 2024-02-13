import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Story time!',
    },
    {
      action: 'link',
      label: 'Link to Google',
      target: 'https://www.google.com',
    },
    {
      label: 'Redirect to pictures',
      action: 'post_redirect',
    },
  ],
  image: {
    src: `https://a-frame-in-100-lines-six-theta.vercel.app/park-3.png`,
    // src: `${NEXT_PUBLIC_URL}/park-3.png`,
    aspectRatio: '1:1',
  },
  input: {
    text: 'Tell me a boat story',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'tyson.xyz',
  description: 'LFG',
  openGraph: {
    title: 'tyson.xyz',
    description: 'LFG',
    images: [`https://a-frame-in-100-lines-six-theta.vercel.app/park-3.png`],
    // images: [`${NEXT_PUBLIC_URL}/park-3.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>tyson</h1>

    </>
  );
}
