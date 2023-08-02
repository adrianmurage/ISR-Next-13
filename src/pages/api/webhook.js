import { createHmac } from 'crypto';

export default async function handleWebhook(req, res) {
  //verify the webhook signature request against the
  // unmodified, unparsed body

  const body = await getRawBody(req);
  if (!body) {
    res.status(400).send('Bad request (no body)');
    return;
  }

  const jsonBody = JSON.parse(body);

  //compute our signature from the raw body
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  const signature = req.headers['x-hub-signature-256'];
  const computedSignature =
    'sha256=' + createHmac('sha256', secret).update(body).digest('hex');

  if (computedSignature != signature) {
    return res.status(403).send('Forbidden');
  }

  console.log(
    'event',
    req.headers['x-github-event'],
    'action',
    jsonBody.action,
    'issue',
    jsonBody.issue?.title,
    jsonBody.issue?.number
  );
  try {
    console.log('[Next.js] Revalidating /onDemand');
    await res.revalidate('/onDemand');
    return res.json({ revalidated: true });
    // return res.status(200).send('Success!');
  } catch (error) {
    console.log({ error });
    return res.status(500).send('Error revalidating');
  }
}

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let bodyChunks = [];
    req.on('data', (chunk) => bodyChunks.push(chunk));
    req.on('end', () => {
      const rawBody = Buffer.concat(bodyChunks).toString('utf8');
      resolve(rawBody);
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
