import createClient from 'openapi-fetch';
import type { Paths } from '../../types/api-types';
import { ENV } from '../../env';
import { redirect, type RequestEvent, type ServerLoadEvent } from '@sveltejs/kit';

export const API = createClient<Paths>({ baseUrl: 'https://api.soundcloud.com/' });

export async function withAuth(event: ServerLoadEvent | RequestEvent) {
	const cookies = event.cookies;

	let access = cookies.get('access_token');
	const refresh = cookies.get('refresh_token');

	// если нет access_token — обновляем
	if (!access) {
		if (!refresh) throw new Error('Unauthorized');

		const tokens = await refreshToken(refresh, event);
		access = tokens.access_token;
	}

	// возвращаем headers, чтобы ты мог положить их в любой вызов API
	return {
		Authorization: `Bearer ${access}`
	};
}

async function refreshToken(refresh_token: string, event: ServerLoadEvent | RequestEvent) {
	const params = new URLSearchParams();

	params.append('grant_type', 'refresh_token');
	params.append('client_id', ENV.VITE_APP_SOUNDCLOUD_CLIENT_ID);
	params.append('client_secret', ENV.VITE_APP_SOUNDCLOUD_CLIENT_SECRET);
	params.append('refresh_token', refresh_token);

	const res = await event.fetch('https://secure.soundcloud.com/oauth/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: params.toString()
	});

	const body = await res.json();
	console.log(body.token_type);
	if (body.token_type !== 'Bearer') {
		throw redirect(302, '/api/auth/soundcloud');
	}

	event.cookies.set('access_token', body.access_token, {
		expires: new Date(Date.now() + body.expires_in * 1000 - 5 * 60000),
		path: '/'
	});

	event.cookies.set('refresh_token', body.refresh_token, {
		expires: new Date(Date.now() + 7 * 86400000),
		path: '/'
	});

	return body;
}
