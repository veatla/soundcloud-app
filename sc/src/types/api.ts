// import { cookies } from "next/headers";
// import { ENV } from "../env";
// import { getCookie, setCookie } from "../utils/cookie";
import type { components } from './api-types';

export type OAuthTokenResponse = components['schemas']['OAuthToken'];
export type TrackMetadataRequestResponse = components['schemas']['TrackMetadataRequest'];
export type CreateUpdatePlaylistRequestResponse =
	components['schemas']['CreateUpdatePlaylistRequest'];
export type CreateUpdatePlaylistFormRequestResponse =
	components['schemas']['CreateUpdatePlaylistFormRequest'];
export type TrackDataRequestResponse = components['schemas']['TrackDataRequest'];
export type FoundResponse = components['schemas']['Found'];
export type ErrorResponse = components['schemas']['Error'];
export type TooManyRequestsResponse = components['schemas']['TooManyRequests'];
export type UserResponse = components['schemas']['User'];
export type MeResponse = components['schemas']['Me'];
export type UsersResponse = components['schemas']['Users'];
export type TrackResponse = components['schemas']['Track'];
export type TracksResponse = components['schemas']['Tracks'];
export type TracksListResponse = components['schemas']['TracksList'];
export type PlaylistResponse = components['schemas']['Playlist'];
export type PlaylistsResponse = components['schemas']['Playlists'];
export type PlaylistsArrayResponse = components['schemas']['PlaylistsArray'];
export type ActivitiesResponse = components['schemas']['Activities'];
export type WebProfilesResponse = components['schemas']['WebProfiles'];
export type CommentResponse = components['schemas']['Comment'];
export type CommentsResponse = components['schemas']['Comments'];
export type StreamResponse = components['schemas']['Streams'];

export interface ObtainTokenResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
}
// export const API = createClient<Paths>({ baseUrl: 'https://api.soundcloud.com/' });

// API.use({
//   async onRequest({ request }) {
//     const cookie = await cookies();
//     if (!cookie.get("access_token")) {
//       const refresh_token = cookie.get("refresh_token");
//       if (!refresh_token) throw new Error("Unauthorized!");
//       await refreshToken(refresh_token.value);
//     }

//     request.headers.set("Authorization", `Bearer ${cookie.get("access_token")!.value}`);
//     return request;
//   },
// });

// const refreshToken = async function refreshToken(refresh_token: string) {
//   const cookie = await cookies();
//   const params = new URLSearchParams();

//   params.append("grant_type", "refresh_token");
//   params.append("client_id", ENV.VITE_APP_SOUNDCLOUD_CLIENT_ID);
//   params.append("client_secret", ENV.VITE_APP_SOUNDCLOUD_CLIENT_SECRET);
//   params.append("refresh_token", refresh_token);

//   const result = await fetch("https://secure.soundcloud.com/oauth/token", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: params.toString(),
//   });
//   const body: ObtainTokenResponse = await result.json();

//   if (body.token_type !== "Bearer") {
//     throw new Error("Expected Bearer token from Soundcloud but got " + body.token_type);
//   }
//   cookie.set("access_token", body.access_token, {
//     // current time + expire time(it's an 1 hour) - 5 min.
//     expires: new Date(new Date().getTime() + body.expires_in * 1000 - 5 * 60000),
//     path: "/",
//   });
//   cookie.set("refresh_token", body.refresh_token, {
//     expires: new Date(new Date().setDate(new Date().getDate() + 7)),
//     path: "/",
//   });
//   return body;
// };
