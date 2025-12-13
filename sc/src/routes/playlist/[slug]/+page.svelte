<script lang="ts">
	import Player from '../../../components/player/Player.svelte';
	import VirtualList from '../../../components/virtual-list/VirtualList.svelte';
	import type { PageProps } from './$types';
	import TrackListItem from './TrackListItem.svelte';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Playlist - {data.user.username}</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="bg-surface-color flex flex-col h-full">
	<div class="mx-2 relative h-full">
		<VirtualList
			items={data.playlist.tracks}
			totalCount={data.playlist.track_count ?? 0}
			itemHeight={72}
			ItemComponent={TrackListItem}
		/>
	</div>
</div>
