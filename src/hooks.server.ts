import { redirect } from '@sveltejs/kit';
import { type Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { sequence } from '@sveltejs/kit/hooks';
import { API, withAuth } from '$lib/server/api';
import type { UserResponse } from './types/api';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});

const public_paths = ['/api/auth', '/api/oauth'];

function isPathAllowed(path: string) {
	if (path === '/') return false;
	return public_paths.some((allowedPath) => path.startsWith(allowedPath));
}

const handleAuth: Handle = async ({ event, resolve }) => {
	const refresh = event.cookies.get('refresh_token');
	if (!refresh) throw redirect(302, '/api/auth/soundcloud');
	const url = new URL(event.request.url);
	const allowedPath = isPathAllowed(url.pathname);

	if (!allowedPath) {
		console.log('called', url.pathname);
		const header = await withAuth(event);
		const data = await API.GET('/me', { headers: header });
		const user: UserResponse | undefined = data.data;
		if (user) event.locals.user = user;
		else throw redirect(302, '/api/auth/soundcloud');
	}

	const response = await resolve(event);
	return response;
};
export const handle: Handle = sequence(handleAuth, handleParaglide);
