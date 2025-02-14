import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';
  let text: string | undefined = '';

  const body: FrameRequest = await req.json();
  // Uses getFrameMessage from onchainkit to validate and interpret the request 
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (isValid) {
    // Pull the user's wallet address from the message 
    accountAddress = message.interactor.verified_accounts[0];
  }

  if (message?.input) {
    text = message.input;
  }

  if (message?.button === 3) {
    return NextResponse.redirect(
      'https://www.google.com/search?q=cute+dog+pictures&tbm=isch&source=lnms',
      { status: 302 },
    );
  }
  // Sends a Next Response containing a new frame, which is then displayed to the user 
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `Story: ${text} 🌲`,
        },
      ],
      image: {
        src: `https://a-frame-in-100-lines-six-theta.vercel.app/park-2.png`,
        // src: `${NEXT_PUBLIC_URL}/park-2.png`,
      },
      postUrl: `https://a-frame-in-100-lines-six-theta.vercel.app/api/frame`,
      // postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
