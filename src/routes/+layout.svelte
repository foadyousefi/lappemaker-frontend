<script>
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import './styles.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<Footer />
</div>

<style lang="scss">
	.app {
		max-width: 76rem;
		width: 100%;
	}
</style>
