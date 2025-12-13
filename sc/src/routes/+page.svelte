<script lang="ts">
	import VirtualList from '../components/virtual-list/VirtualList.svelte';
	import type { PageProps } from './$types';
	import PlaylistItem from './playlist/PlaylistItem.svelte';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Playlist - {data.user.username}</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="h-full flex">
	<div class="bg-surface-color scrollable flex flex-col h-full">
		<div class="mx-2 relative h-full">
			<VirtualList
				items={data.playlist}
				totalCount={data.playlist.length}
				itemHeight={72}
				ItemComponent={PlaylistItem}
			/>
		</div>
	</div>
</div>
