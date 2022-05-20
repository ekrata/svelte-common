<script lang="ts">
	import '../app.css';
	// import { locale, loadTranslations } from '$lib/translations/translations';
	import { blur } from 'svelte/transition';
	import HeaderBar from '$lib/components/nav/HeaderBar.svelte';
	export let url = '';
	// export const load = async ({ url}) => ({ props: { url } });

	// export const load = async ({ url, params }) => {
	// 	const { pathname } = url;

	// 	const defaultLocale = 'en'; // get from cookie, user session, ...

	// 	const initLocale = locale.get() || defaultLocale; // set default if no locale already set

	// 	await loadTranslations(initLocale, pathname); // keep this just before the `return`

	// 	return {props{ url, params }};
	// };
</script>

<slot name="header" />
<div class="overflow-x-hidden font-sans">
	<div class="container mx-auto max-w-6xl px-5">
		{#key url}
			<div
				in:blur={{ duration: 500, delay: 400, amount: 100 }}
				out:blur={{ duration: 500, amount: 100 }}
			>
				<slot />
			</div>
		{/key}
	</div>
</div>
<slot name="footer" />
