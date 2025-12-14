<script lang="ts">
	import Player from '../components/player/Player.svelte';
	import './layout.css';

	let { children } = $props();
</script>

<div id="root">
	<div class="h-full flex">
		{@render children()}
		<div class="w-full">
			<Player />
		</div>
	</div>
</div>
