<script lang="ts">
	import { onMount } from 'svelte';
	import Image from '../../../components/image/Image.svelte';
	import type { UserResponse } from '../../../types/api';
	import { formatDateToRelative } from '../../../utils/date';
	import { playerStore } from '../../../store/player';

	export let index: number;
	let element: HTMLDivElement;
	export let title: string;
	export let label_name: string;
	export let stream_url: string;
	export let created_at: string | null;
	export let artwork_url: string | null;
	export let tracks: any[] | null;
	export let user: UserResponse | null;

	const thumbnail = artwork_url ?? tracks?.[0]?.artwork_url ?? user?.avatar_url ?? null;

	onMount(() => {
		const listener = () => {
			playerStore.update((prev) => ({ ...prev, playing_url: stream_url }));
		};
		element.addEventListener('click', listener);
		return () => {
			element.removeEventListener('click', listener);
		};
	});
</script>

<div class="chat-list-item" style="top: {index * 72}px" bind:this={element}>
	<div class="flex-1 h-5 mt-1 order-1 flex content-between items-center w-full leading-messages">
		{user?.username ?? label_name}
	</div>

	<div class="chat-title relative h-5 flex items-center content-between order-0 w-full">
		<div class="chat-list-title row-title">
			<span>{title}</span>
		</div>

		{#if created_at}
			<div class="chat-list-title chat-title-right flex items-center h-5 -mt-2">
				{formatDateToRelative(created_at)}
			</div>
		{/if}
	</div>

	<div class="flex rounded-full overflow-hidden w-13 h-13 min-h-13 start-2 absolute">
		<Image src={thumbnail} alt={thumbnail} />
		<!-- {#if thumbnail}
			<img
				src={thumbnail}
				alt={thumbnail}
				loading="lazy"
				width="52"
				height="52"
				class="w-13 h-13"
			/>
		{/if} -->
	</div>
</div>
