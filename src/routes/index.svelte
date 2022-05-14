<script lang="ts">
	import '../lib/app.css';
	import HeaderBar from '$lib/components/nav/HeaderBar.svelte';
	import BlurAuto from '$lib/layouts/BlurAuto.svelte';
	import Footer from '$lib/components/nav/Footer.svelte';
</script>

<BlurAuto>
	<div slot="header">
		<HeaderBar />
	</div>
	<div>content</div>
</BlurAuto>
<Footer />
