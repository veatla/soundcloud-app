<script lang="ts">
	import Play from '@lucide/svelte/icons/play';
	import Pause from '@lucide/svelte/icons/pause';
	import Heart from '@lucide/svelte/icons/heart';
	import VolumeX from '@lucide/svelte/icons/volume-x';
	import Volume2 from '@lucide/svelte/icons/volume-2';
	import Rewind from '@lucide/svelte/icons/rewind';
	import { playerStore } from '../../store/player';
	import type { FormEventHandler } from 'svelte/elements';

	let audio: HTMLAudioElement;
	let isPlaying = false;
	let muted = false;
	let liked = false;

	let progress = 0;
	let current = 0;
	let duration = 0;

	function togglePlay() {
		if (!audio) return;
		isPlaying ? audio.pause() : audio.play();
		isPlaying = !isPlaying;
	}

	function toggleMute() {
		muted = !muted;
		audio.muted = muted;
	}

	function toggleLike() {
		liked = !liked;
	}

	function rewind() {
		if (!audio) return;
		audio.currentTime = Math.max(0, audio.currentTime - 5);
	}

	function onLoaded() {
		duration = audio.duration || 0;
	}

	function onTimeUpdate() {
		if (!audio.duration) return;
		duration = audio.duration || 0;
		current = audio.currentTime;
		progress = audio.currentTime / audio.duration;
	}

	const seek: FormEventHandler<HTMLInputElement> = (e) => {
		const val = Number(e.currentTarget.value);
		if (!audio.duration) return;
		audio.currentTime = audio.duration * val;
		progress = val;
	};

	const fmt = (t: number) => {
		if (!t) return '0:00';
		const m = Math.floor(t / 60);
		const s = Math.floor(t % 60)
			.toString()
			.padStart(2, '0');
		return `${m}:${s}`;
	};

	const src = $playerStore.playing_url ? '/api/stream?urn=' + $playerStore.playing_url : undefined;
</script>

<audio
	bind:this={audio}
	{src}
	on:loadedmetadata={onLoaded}
	on:timeupdate={onTimeUpdate}
	on:ended={() => (isPlaying = false)}
></audio>

<div class="flex items-center gap-4 bg-neutral-900 text-white p-4 rounded-xl w-full max-w-xl">
	<button class="p-2 rounded-lg hover:bg-neutral-800" on:click={rewind}>
		<Rewind class="w-6 h-6" />
	</button>

	<button
		class="p-3 rounded-full bg-neutral-100 text-black hover:bg-neutral-200"
		on:click={togglePlay}
	>
		{#if isPlaying}
			<Pause class="w-6 h-6" />
		{:else}
			<Play class="w-6 h-6" />
		{/if}
	</button>

	<button class="p-2 rounded-lg hover:bg-neutral-800" on:click={toggleLike}>
		<Heart class="w-6 h-6 {liked ? 'fill-red-500 text-red-500' : ''}" />
	</button>

	<div class="flex flex-col flex-1">
		<input
			type="range"
			min="0"
			max="1"
			step="0.001"
			value={progress}
			on:input={seek}
			class="w-full accent-green-500"
		/>

		<div class="text-xs mt-1 flex justify-between text-neutral-400">
			<span>{fmt(current)}</span>
			<span>{fmt(duration)}</span>
		</div>
	</div>

	<button class="p-2 rounded-lg hover:bg-neutral-800" on:click={toggleMute}>
		{#if muted}
			<VolumeX class="w-6 h-6" />
		{:else}
			<Volume2 class="w-6 h-6" />
		{/if}
	</button>
</div>
