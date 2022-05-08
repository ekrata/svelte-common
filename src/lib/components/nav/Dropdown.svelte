<script lang="ts">
	export let show = false;
	import { blur } from 'svelte/transition';
</script>

{#if show}
	<div
		class="z-500 absolute right-0 w-56 origin-top-right divide-y divide-gray-100 overflow-visible rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none group-hover:visible"
		aria-labelledby="account menu"
		in:blur={{ duration: 300, delay: 100, amount: 20 }}
		out:blur={{ duration: 300, delay: 100, amount: 20 }}
	>
		<div class="py-1" role="none">
			<!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
			<a
				class="block px-4 py-2 text-sm text-gray-700"
				role="menuitem"
				tabindex="-1"
				id="menu-item-0">Edit</a
			>
			<a
				class="block px-4 py-2 text-sm text-gray-700"
				role="menuitem"
				tabindex="-1"
				id="menu-item-1">Duplicate</a
			>
		</div>
		<div class="py-1" role="none">
			<a
				class="block px-4 py-2 text-sm text-gray-700"
				role="menuitem"
				tabindex="-1"
				id="menu-item-2">Archive</a
			>
			<a
				class="block px-4 py-2 text-sm text-gray-700"
				role="menuitem"
				tabindex="-1"
				id="menu-item-3">Move</a
			>
		</div>
		<div class="py-1" role="none">
			<a
				class="block px-4 py-2 text-sm text-gray-700"
				role="menuitem"
				tabindex="-1"
				id="menu-item-4">Share</a
			>
			<a
				class="block px-4 py-2 text-sm text-gray-700"
				role="menuitem"
				tabindex="-1"
				id="menu-item-5">Add to favorites</a
			>
		</div>
		<div class="py-1" role="none">
			<a
				class="block px-4 py-2 text-sm text-gray-700"
				role="menuitem"
				tabindex="-1"
				id="menu-item-6">Delete</a
			>
		</div>
	</div>
{/if}
