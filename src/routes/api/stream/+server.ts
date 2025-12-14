import { withAuth } from '$lib/server/api';

export async function GET(event) {
	const queries = event.url.searchParams.get('urn');
	const auth = await withAuth(event);
	const upstream = await event.fetch(queries!, {
		headers: {
			Authorization: `OAuth ${auth.Authorization.replace('Bearer ', '')}`,
			Accept: 'application/json; charset=utf-8'
		}
	});

	if (!upstream.ok) return new Response('Stream error', { status: 500 });

	return new Response(upstream.body, {
		headers: {
			'Content-Type': upstream.headers.get('Content-Type') || 'audio/mpeg',
			'Transfer-Encoding': 'chunked'
		}
	});
}

// https://api.soundcloud.com/tracks/soundcloud:tracks:845862868/stream
