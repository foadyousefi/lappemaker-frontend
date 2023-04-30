<script>
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { fly } from "svelte/transition";
	import { cubicIn, cubicOut } from 'svelte/easing'
	import Loader from '$lib/components/Loader.svelte';
	import { beforeNavigate, afterNavigate } from '$app/navigation'

	import './styles.css';

	const duration = 300;
	const delay = 400;
	const x = 100;
	export let data
	let isLoading = false

	beforeNavigate(() => isLoading = true)
	afterNavigate(() => isLoading = false)
</script>

<div class="app">
	<Header />
	{#if isLoading}
		<Loader />
	{/if}
	{#key data.pathname}
	<main
				in:fly={{ easing: cubicOut, duration, delay, x }}
				out:fly={{ easing: cubicIn, duration, x: -x }}
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
