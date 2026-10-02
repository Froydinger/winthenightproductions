import { connectLambda, getStore } from '@netlify/blobs';
import type { HandlerEvent } from '@netlify/functions';

export async function readStoredPublicSettings(event: HandlerEvent, makeStore = () => getStore('wtn-admin')) {
  // The legacy event has a platform-supplied Blobs field absent from old Handler types.
  connectLambda({ headers: event.headers, blobs: (event as typeof event & { blobs: string }).blobs });
  const store = makeStore();
  try {
    return { stored: await store.get('site-settings', { type: 'json', consistency: 'strong' }), consistency: 'strong' as const };
  } catch (error) {
    // connectLambda in this installed SDK does not supply an uncached endpoint.
    // Only this known capability error permits the documented <=60-second edge read.
    if (!(error instanceof Error) || error.name !== 'BlobsConsistencyError') throw error;
    return { stored: await store.get('site-settings', { type: 'json' }), consistency: 'eventual' as const };
  }
}
