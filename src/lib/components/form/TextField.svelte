<script lang="ts">
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faLockOpen, faLock } from '@fortawesome/free-solid-svg-icons';
	export let label = '';
	export let field: string | null = null;
	export let error: string | null = null;
	export let placeholder: string | null = null;
	export let type: 'email' | 'text' | 'password' | 'number' = 'text';
	export let showPassword = false;

	let ref: HTMLInputElement;

	onMount(() => {
		if (ref) {
			ref.type = type;
		}
	});
</script>

<div class="">
	<div class="flex place-items-center justify-between">
		<label
			for="field"
			class={`text-base block font-medium ${
				!error ? 'text-zinc-200 dark:text-blue-300' : ' text-red-700 dark:text-red-500'
			}`}>{label}</label
		>
		{#if type === 'password'}
			{#if !showPassword}
				<div on:click={() => (showPassword = true)} class="align-center">
					<Fa icon={faLock} />
				</div>
			{:else}
				<div on:click={() => (showPassword = false)} class="align-center">
					<Fa icon={faLockOpen} />
				</div>
			{/if}
		{/if}
	</div>
	<div class="relative">
		<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
			<slot name="icon" />
		</div>
		{#if type === 'password'}
			{#if !showPassword}
				<input
					type="password"
					id="field"
					class={`block w-full rounded-lg border-2 p-2.5 pl-10${
						!error
							? ' border-blue-500  bg-blue-100  text-zinc-800 placeholder-blue-500 focus:border-blue-400 focus:ring-blue-400 dark:border-blue-400'
							: ' border-red-500 bg-red-100 text-red-700 placeholder-red-700 focus:border-red-400 focus:ring-red-400 dark:border-red-400 dark:bg-red-100'
					}`}
					{placeholder}
					bind:value={field}
				/>
			{:else}
				<input
					type="text"
					id="field"
					class={`block w-full rounded-lg border-2 p-2.5 pl-10${
						!error
							? ' border-blue-500  bg-blue-100  text-zinc-800 placeholder-blue-500 focus:border-blue-400 focus:ring-blue-400 dark:border-blue-400'
							: ' border-red-500 bg-red-100 text-red-700 placeholder-red-700 focus:border-red-400 focus:ring-red-400 dark:border-red-400 dark:bg-red-100'
					}`}
					{placeholder}
					bind:value={field}
				/>
			{/if}
		{:else}
			<input
				bind:this={ref}
				id="field"
				class={`block w-full rounded-lg border-2  p-1 pl-10${
					!error
						? ' border-blue-500  bg-blue-100  text-zinc-800 placeholder-blue-500 focus:border-blue-400 focus:ring-blue-400 dark:border-blue-400'
						: ' border-red-500 bg-red-100 text-red-700 placeholder-red-700 focus:border-red-400 focus:ring-red-400 dark:border-red-400 dark:bg-red-100'
				}`}
				{placeholder}
				bind:value={field}
			/>
		{/if}
		<p class="mt-2 text-sm text-red-600 dark:text-red-500">
			{error}
		</p>
	</div>
</div>
