<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/logo.svg';
	import HeaderCart from "./HeaderCart.svelte";
</script>

<header>
	<div class="header-logo">
		<a href="/">
			<img src={logo} alt="Home" />
		</a>
	</div>

	<nav>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
				<a href="/sverdle">Sverdle</a>
			</li>
		</ul>
	</nav>

	<HeaderCart />

</header>

<style lang="scss">
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-block: 2rem;

		.header-logo {
			a {
				display: flex;
			}
		}

		nav ul {
			display: flex;
			list-style: none;
			margin: 0;
			padding: 0;

			li {
				margin: 0 1rem;

				a {
					color: #000;
					text-decoration: none;

					&:hover {
						text-decoration: underline;
					}
				}
			}
		}
	}
</style>
