<script>
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { fade } from "svelte/transition";
	import './styles.css';

	export let data
</script>

<div class="app">
	<Header />
	{#key data.pathname}
	<main
				in:fade={{ duration: 200, delay: 200 }}
				out:fade={{ duration: 200 }}
	>
		<slot />
	</main>
		{/key}

	<Footer />
</div>

<style lang="scss">
	.app {
		max-width: 76rem;
		width: 100%;
	}
</style>
