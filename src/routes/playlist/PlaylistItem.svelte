<script lang="ts">
	import Image from '../../components/image/Image.svelte';
	import type { UserResponse } from '../../types/api';
	import { formatDateToRelative } from '../../utils/date';

	export let index: number;
	export let urn: string;
	export let title: string;
	export let label_name: string;
	export let created_at: string | null;
	export let user: UserResponse | null;
	export let artwork_url: string | null;
	export let tracks: any[] | null;

	const thumbnail = artwork_url ?? tracks?.[0]?.artwork_url ?? user?.avatar_url ?? null;
</script>

<a href={'/playlist/' + urn} class="chat-list-item" tabindex="0" style="top: {index * 72}px">
	<div class="flex-1 h-5 mt-1 order-1 flex content-between items-center w-full leading-messages">
		<div>{user?.first_name ?? label_name}</div>
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
		{#if thumbnail}
			<Image src={thumbnail} alt={thumbnail} />
		{/if}
	</div>
</a>
