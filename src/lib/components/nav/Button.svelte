<script lang="ts">
	export let toggle = false;
	export let alternate = false;
	export let hollow = false;
	export let type: 'button' | 'reset' | 'submit' = 'button';
</script>

<div>
	<button
		{type}
		class={`group w-full rounded-lg shadow-md
        ${
					!hollow &&
					(toggle
						? `animate-jello-horizontal bg-gradient-to-r ${
								!alternate
									? `bg-gradient-to-r from-rose-700/100 via-fuchsia-600/100 to-indigo-700/100`
									: `bg-gradient-to-r from-green-700 via-blue-600 to-purple-700`
						  } `
						: 'bg-gradient-to-r from-rose-700/25 via-fuchsia-600/25 to-indigo-700/25')
				}
    border-white/30 py-1 px-3 text-zinc-200  dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500
    ${hollow && 'outline outline-fuchsia-700 outline-2 outline-offset-[-1px]'}`}
	>
		<div class="relative flex place-items-center justify-center text-center animate-underline-2">
			<div class="inline">
				<slot name="text" />
			</div>
		</div>
	</button>
</div>
