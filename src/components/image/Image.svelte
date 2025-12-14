<script lang="ts">
	export let src: string;
	export let alt: string;
	let loaded = false;
	let imgElement: HTMLImageElement;

	import { onMount } from 'svelte';
	import LoaderIcon from '@lucide/svelte/icons/loader';

	onMount(() => {
		if (imgElement.complete) {
			loaded = true;
		} else {
			imgElement.onload = () => {
				loaded = true;
			};
		}
	});
</script>

<div class="image-container w-13 h-13">
	{#if !loaded}
		<!-- Placeholder element (skeleton loader) -->
		<div class="placeholder">
			<LoaderIcon aria-label="Loading" class="animate-spin" />
		</div>
	{/if}
	<img bind:this={imgElement} {src} {alt} class:loaded class="w-13 h-13" loading="lazy" />
</div>

<style>
	.image-container {
		position: relative;
	}

	.placeholder {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #e0e0e0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0; /* Initially hidden */
		transition: opacity 0.5s ease-in-out; /* Smooth transition */
	}

	img.loaded {
		opacity: 1; /* Fade in when loaded */
	}

	:global(.animate-spin) {
		animation: spin 1s linear infinite;
	}
</style>
