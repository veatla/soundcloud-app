import { withAuth, API } from '$lib/server/api';
import type { PlaylistResponse } from '../../../types/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const playlist_urn = event.params.slug;

	const headers = await withAuth(event);
	const { data } = await API.GET('/playlists/{playlist_urn}', {
		headers: headers,
		params: { path: { playlist_urn } }
	});
	return { playlist: (data ?? []) as PlaylistResponse, user: event.locals.user };
};
