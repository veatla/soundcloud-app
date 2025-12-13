import { withAuth, API } from '$lib/server/api';
import type { PlaylistsArrayResponse } from '../types/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const headers = await withAuth(event);
	const { data } = await API.GET('/me/playlists', {
		headers: headers
	});
	return { playlist: (data ?? []) as PlaylistsArrayResponse, user: event.locals.user };
};
