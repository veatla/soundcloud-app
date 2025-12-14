<script lang="ts">
	import { writable } from 'svelte/store';
	import './list-items.css';
	import '../../routes/layout.css';
	import { onMount } from 'svelte';
	import type { UserResponse } from '../../types/api';

	export let items: any[] = [];
	export let totalCount: number;
	export let itemHeight: number = 72;
	export let ItemComponent: any;

	let limit = writable(10);
	let visibleOffset = writable(0);
	// let container: HTMLDivElement;

	function updateLimit() {
		limit.set(Math.round(window.innerHeight / itemHeight) + 6);
	}

	function handleScroll(e: Event) {
		const y = (e.target as HTMLDivElement).scrollTop;
		visibleOffset.set(Math.max(Math.round(y / itemHeight) - 2, 0));
	}
	onMount(() => {
		updateLimit();
		window.addEventListener('resize', updateLimit);
		// container.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('resize', updateLimit);
			// container.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<!--  -->

<div
	class="overlay-scroll scrollable bg-surface-color flex flex-col h-full"
	on:scroll|passive={handleScroll}
>
	<div
		class="mx-2 relative overflow-y-visible block shrink-0"
		style="min-height: {totalCount * itemHeight}px"
	>
		{#each items.slice($visibleOffset, $visibleOffset + $limit) as item, i (item.urn ?? i)}
			<svelte:component this={ItemComponent} {...item} index={i + $visibleOffset} />
		{/each}
	</div>
</div>

<style>
</style>
