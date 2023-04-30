import path from 'path'
import fs from 'fs/promises'
import { fail } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = (async ({ request, url }) => {
  try {
    const fileName = `${crypto.randomUUID()}.png`
    const data = await request.json()
    const filePath = path.join(
      process.cwd(),
      "static",
      "designs",
      fileName
    );
    const matches = data.design.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches.length !== 3) {
      throw fail(500, { err: 'invalid data uri' })
    }
    await fs.writeFile(filePath, matches[2], 'base64')

    return new Response(String(JSON.stringify({path: filePath, url: `designs/${fileName}`})))
  } catch (err) {
    throw fail(500, { err: err })
  }
});