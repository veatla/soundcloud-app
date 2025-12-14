import { browser } from '$app/environment';
import { writable } from 'svelte/store';

interface PlayerStore {
	playing_url?: string;
	current_timestamp: number;
	duration: number;
	isPlaying: boolean;
}

export const playerStore = writable<PlayerStore>({
	duration: 0,
	current_timestamp: 0,
	isPlaying: false
});

if (browser) {
	const str = localStorage.getItem('app');
	if (str) {
		const parsed = JSON.parse(str);

		playerStore.set({
			playing_url: parsed?.playing_url,
			current_timestamp: parsed?.timestamp ?? 0,
			isPlaying: false,
			duration: parsed?.duration ?? 0
		});
	}
}
