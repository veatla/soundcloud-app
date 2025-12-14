import { ENV } from '../../../../env';
function base64url(buf: ArrayBuffer) {
	return Buffer.from(buf)
		.toString('base64')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=/g, '');
}

export async function GET() {
	const verifier = base64url(crypto.getRandomValues(new Uint8Array(32)).buffer);
	const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
	const challenge = base64url(hash);
	const headers = new Headers();
	const state = crypto.randomUUID();
	headers.append(
		'Set-Cookie',
		`pkce_code_verifier=${verifier}; HttpOnly; Path=/; Secure; SameSite=Lax`
	);
	headers.append('Set-Cookie', `pkce_state=${state}; HttpOnly; Path=/; Secure; SameSite=Lax`);

	const url = new URL('https://secure.soundcloud.com/authorize');
	url.searchParams.set('client_id', ENV.VITE_APP_SOUNDCLOUD_CLIENT_ID!);
	url.searchParams.set('redirect_uri', ENV.VITE_APP_SOUNDCLOUD_REDIRECT_URL!);
	url.searchParams.set('response_type', 'code');
	url.searchParams.set('state', state);
	url.searchParams.set('code_challenge', challenge);
	url.searchParams.set('code_challenge_method', 'S256');
	// const rse = Response.redirect(url.toString());
	headers.append('Location', url.toString());
	return new Response(null, {
		status: 302,
		headers: headers
	});
}
