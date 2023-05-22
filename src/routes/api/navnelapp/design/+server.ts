import { fail } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { post } from '$lib/api';

export const POST: RequestHandler = (async ({ request, url }) => {
  try {
    const fileName = crypto.randomUUID()
    const data = await request.json()

    const image = data.design
    const imageRes = await post('lappemaker/image', {
      image,
      name: fileName,
    });
    const createImage = await imageRes.json();
    console.log('Order created', createImage)

    return new Response(String(JSON.stringify({path: createImage.path, url: createImage.url})))
  } catch (err) {
    throw fail(500, { err: err })
  }
});