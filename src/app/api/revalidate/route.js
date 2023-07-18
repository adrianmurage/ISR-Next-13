import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { createHmac } from 'crypto';

export async function POST(request) {
  const rawBody = await request.text();

  if (!rawBody) {
    return NextResponse.json(
      { error: 'Bad request (no body)' },
      { status: 400 }
    );
  }
  const jsonBody = JSON.parse(rawBody);

  //compute our signature from the raw body
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  const signature = request.headers.get('x-hub-signature-256') ?? '';
  const computedSignature =
    'sha256=' + createHmac('sha256', secret).update(rawBody).digest('hex');

  if (computedSignature != signature) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  console.log(
    'event',
    request.headers.get('x-github-event') ?? 'no-event',
    'action',
    jsonBody.action,
    'issue',
    jsonBody.issue?.title,
    jsonBody.issue?.number
  );

  try {
    console.log('[Next.js] Revalidating /onDemand');
    revalidatePath('/onDemand');
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 });
  }
}
