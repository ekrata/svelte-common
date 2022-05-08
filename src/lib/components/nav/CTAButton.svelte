<script context="module" lang="ts">
</script>

<script lang="ts">
	import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import type { LinkButtonProps } from './LinkButton.svelte';
	export let props: LinkButtonProps;
</script>

<a
	class={`group relative items-center justify-center  overflow-hidden rounded-2xl shadow-2xl
    			bg-gradient-to-r from-rose-700/75 via-fuchsia-600/75 to-indigo-700/75
				  p-4 px-4 py-2.5 text-xl sm:px-8 sm:text-5xl
    font-thin text-zinc-200 backdrop-blur-3xl  ${props.altStyle && '-backdrop-hue-rotate-60'}
	disabled:opacity-50 disabled:shadow-none disabled:bg-gray-800 transition ease-in-out duration-1000
      hover:text-white  hover:no-underline focus:ring-4 focus:ring-blue-300
    group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800 after:hover:shadow-2xl
	`}
	href={props.url}
	disabled={props.disabled}
>
	<div
		class="after:hover:-shadow-pop-br group flex flex-row content-center items-center p-4 align-middle font-mono text-3xl font-thin transition duration-200 ease-in-out sm:text-4xl"
	>
		<div class="basis-7/8">
			<div
				class="relative font-sans font-normal after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-200 after:transition-transform after:duration-500 after:ease-in-out group-hover:after:origin-bottom-left group-hover:after:scale-x-100"
			>
				{props.label}
			</div>
		</div>
		<div
			aria-hidden="true"
			class="basis-1/8 tranzinc-x-1/2 group-hover:tranzinc-x-3/4 place-items-center text-5xl transition-transform duration-500 ease-in-out"
		>
			<Fa icon={faArrowRight} />
		</div>
	</div>
</a>
