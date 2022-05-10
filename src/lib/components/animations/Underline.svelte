<script>
	import { spring } from 'svelte/motion';
	let endValue = spring(1, {
		stiffness: 0.1,
		damping: 0.1
	});
	let startValue = spring(100, {
		stiffness: 0.1,
		damping: 0.1
	});

	let size = spring(10);
</script>

<div
	class={`relative block self-center pr-4 pl-3 text-center text-inherit no-underline after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-${startValue} after:bg-gray-200 after:transition-transform after:duration-[500ms] after:ease-[cubic-bezier(0.8,0.10,0.8,0.1)] hover:no-underline hover:after:origin-bottom-left hover:scale-x-${endValue} dark:text-white md:p-0`}
>
	<slot />
</div>
