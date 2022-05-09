<script context="module" lang="ts">
	export type LinkButtonProps = {
		altStyle?: boolean;
		label: string;
		url: string;
		disabled?: boolean;
	};
</script>

<script lang="ts">
	import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	export let props: LinkButtonProps;
</script>

<a
	class={`inline-block items-center justify-center rounded-2xl border-2 -z-1
    border-white/20 bg-white/5 bg-opacity-5 p-2 text-2xl lg:text-5xl font-sans text-zinc-300
    font-light hover:shadow-2xl
	disabled:opacity-50 disabled:shadow-none disabled:bg-gray-800
      hover:text-white focus:ring-4 focus:ring-blue-300
     dark:focus:ring-blue-800 after:hover:shadow-2xl
	`}
	href={props.url}
	disabled={props.disabled}
>
	<div
		class="text-basic after:hover:-shadow-pop-br inline-block align-middle font-sans font-thin transition duration-200 ease-in-out"
	>
		<div
			class="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-200 after:transition-transform after:duration-200 after:ease-in-out group-hover:after:origin-bottom-left group-hover:after:scale-x-100"
		>
			{props.label}
		</div>
		<span
			aria-hidden="true"
			class="tranzinc-x-0 group-hover:tranzinc-x-1 inline-block align-middle transition-transform duration-200 ease-in-out"
			><Fa icon={faArrowRight} class="pl-2" />
		</span>
	</div>
</a>
