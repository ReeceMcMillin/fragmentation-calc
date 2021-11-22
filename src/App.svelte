<script>
	import Packet from "./Packet.svelte";
	import Network from "./Network.svelte";

	export let packet;
	export let network;
</script>

<main>
	<div class="container">
		<h1>Packet Fragmentation Calculator</h1>
		<Packet bind:packet />

		<div class="btn-group" role="group">
			<button
				class="btn btn-outline-primary"
				on:click={() => {
					network.push(packet);
					network.fragment(packet);
				}}>Fragment</button
			>

			<button
				class="btn btn-outline-danger"
				type="reset"
				on:click={() => {
					network.reset();
				}}>Reset</button
			>
		</div>

		<Network bind:network />
	</div>
</main>
<footer class="footer navbar-default" role="contentinfo">
	<div class="text-center p-4">
		Created for y'all by
		<a class="text-reset fw-bold" href="https://github.com/ReeceMcMillin">Reece McMillin</a>
	  </div>
</footer>

<style>
	h1 {
		padding-top: 2em;
		padding-bottom: 2em;
	}

	footer {
		width: 100%;
		height: 10vh;
		padding: 0;
		margin: 0;
		padding-top: 10px;
		text-align: center;   
	}

	.btn-group {
		margin: 2em auto;
	}

	main {
		display: flexbox;
		text-align: center;
		justify-content: center;
		margin: 0;
		padding-bottom: 0px;
		min-height: 91vh;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
