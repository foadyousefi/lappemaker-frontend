import { fail } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = (async ({ request }) => {
  try {
    const data = await request.json()

    return new Response(String(JSON.stringify({path: data.path, constant: 'constant'})))
  } catch (err) {
    throw fail(500, { err: err })
  }
});