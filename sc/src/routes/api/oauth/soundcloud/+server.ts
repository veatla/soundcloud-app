import { ENV } from '../../../../env';
import type { ObtainTokenResponse } from '../../../../types/api';

export async function GET({ url, cookies }) {
	const redirectUrl = new URL('/playlist', url);

	const challenge = cookies.get('pkce_code_verifier');
	// const state = cookies.get('pkce_state');

	if (!challenge) throw new Error('Please use same browser to finish authorization');

	const params = new URLSearchParams();
	params.append('grant_type', 'authorization_code');
	params.append('client_id', ENV.VITE_APP_SOUNDCLOUD_CLIENT_ID);
	params.append('client_secret', ENV.VITE_APP_SOUNDCLOUD_CLIENT_SECRET);
	params.append('redirect_uri', ENV.VITE_APP_SOUNDCLOUD_REDIRECT_URL);
	params.append('code_verifier', challenge);
	params.append('code', url.searchParams.get('code')!);

	const result = await fetch('https://secure.soundcloud.com/oauth/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: params.toString()
	});

	const body: ObtainTokenResponse = await result.json();

	if (body.token_type !== 'Bearer') {
		throw new Error('Expected Bearer token from Soundcloud but got ' + body.token_type);
	}

	const headers = new Headers();
	headers.append(
		'Set-Cookie',
		`access_token=${body.access_token}; HttpOnly; Path=/; Max-Age=${body.expires_in}`
	);
	headers.append(
		'Set-Cookie',
		`refresh_token=${body.refresh_token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}`
	);
	headers.append('Location', redirectUrl.toString());
	return new Response(null, {
		status: 302,
		headers: headers
	});
}
