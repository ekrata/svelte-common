<script lang="ts">
	// import EkrataLogo from '$lib/icons/ekrata-logo.svg?component';
	import Logo from '$lib/icons/logo.png';
	import Button from '$lib/components/nav/Button.svelte';
	import { writable } from 'svelte/store';
	import Modal, { bind } from 'svelte-simple-modal';
	const modal = writable(null);
	const showLoginModal = () => modal.set(bind(LoginModal, { message: "It's a modal!" }));
	let showMobileMenu: boolean;
	const handleMenuClick = () => {
		showMobileMenu = !showMobileMenu;
	};
	const handleMenuClickOut = () => {
		if (showMobileMenu) {
			showMobileMenu = !showMobileMenu;
		}
	};
</script>

<!-- <div class="header-bg md:h-24" /> -->
<!-- <div class="bg" />
<div class="bg bg2" />
<div class="bg bg3" /> -->
<div
	class={'flex sticky text-xl top-0 py-3 z-50 mb-20 bg-gray-900 backdrop-blur-lg  align-middle justify-between blur-[0.1px] tracking-widest shadow-2xl border-b border-gray-900/75 '}
>
	<nav
		id="nav-scroll"
		class={`container  px-5 flex mx-auto place-items-center items-center justify-between  subpixel-antialiased`}
	>
		<div class="flex h-auto w-auto flex-row gap-3 subpixel-antialiased">
			<img
				src={Logo}
				alt="logo"
				width={45}
				style={`image-rendering: pixelated; image-rendering: -moz-crisp-edges;         /* Firefox */
          image-rendering:   -o-crisp-edges;         /* Opera */
          image-rendering: -webkit-optimize-contrast;/* Webkit (non-standard naming) */
          image-rendering: crisp-edges;
          -ms-interpolation-mode: nearest-neighbor`}
			/>
			<a
				on:click={handleMenuClickOut}
				href="/"
				class="relative flex basis-1/2 place-self-center pr-4 pl-5 align-bottom font-sans font-medium tracking-widest no-underline after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-200 after:transition-transform after:duration-200 after:ease-in-out hover:no-underline hover:after:origin-bottom-left hover:after:scale-x-100 dark:text-white md:p-0 lg:text-lg"
			>
				<div class="font-sans font-bold text-zinc-200 lg:text-2xl ">ekrata</div>
			</a>
		</div>
		{#key showMobileMenu}
			<div
				class={`${
					showMobileMenu ? 'animate-jello-horizontal' : 'flex animate-jello-horizontal'
				} place-self-center font-thin lg:order-2 lg:hidden `}
			>
				<button
					on:click={handleMenuClick}
					data-collapse-toggle="mobile-menu-4"
					type="button"
					class={`inline-flex
				items-center
				rounded-lg
				p-2
				
				text-sm
				text-gray-500
				dark:text-gray-400
				dark:hover:bg-gray-700
				dark:focus:ring-gray-600
				lg:hidden`}
					aria-controls="mobile-menu-4"
					aria-expanded="true"
				>
					<span class="sr-only">Open main menu</span>
					<svg
						class="h-6 w-6"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
							clip-rule="evenodd"
						/></svg
					>
				</button>
			</div>
		{/key}
		<div
			id="mobile-menu-4"
			on:click={handleMenuClickOut}
			class={`${
				showMobileMenu ? `absolute bg-gray-800/100 top-14 left-0 shadow-md` : 'hidden'
			} w-full items-end place-items-center text-center justify-between font-sans lg:order-1 lg:flex lg:w-auto`}
		>
			<ul
				class="align-center flex flex-row gap-y-2 items-center capitalize text-zinc-200 no-underline lg:mt-0 lg:flex-row lg:space-x-8 lg:text-base"
			>
				<slot name="menuItems">
					<li class="group px-4">
						<a href="/esports/pricing" class="animate-underline-2" aria-current="page">pricing</a>
					</li>
					<li>
						<a href="/esports/docs" class="animate-underline-2" aria-current="page">docs</a>
					</li>
					<li>
						<a href="blog.ekrata.com" class="animate-underline-2" aria-current="page">blog</a>
					</li>
					<li>
						<a href="/contact" class="animate-underline-2" aria-current="page"> contact </a>
					</li>
				</slot>
				<slot name="auth">
					<li>
						<Modal>
							<Button hollow>
								<div slot="text" class="py-0 uppercase text-inherit text-zinc-200">Log in</div>
							</Button>
						</Modal>
					</li>
					<li>
						<a href="/signup">
							<Button toggle>
								<div slot="text" class="py-0 uppercase text-inherit text-zinc-200">
									Get free esports data
								</div>
							</Button>
						</a>
					</li>
				</slot>
				<!-- <li>
          <div
            class="group relative block space-x-1 rounded py-2 pr-4 pl-3 text-center text-inherit no-underline  dark:text-white md:p-0"
            on:click={setAccountToggle}
            on:mouseenter={setAccountToggle}
            on:mouseleave={setAccountToggle}
          >
            <Fa class="inline-block self-center align-top" icon={faChevronDown} size="md" />
            Account
            <AccountDropdown show={accountToggle} />
          </div>
        </li> -->
				<li>
					<slot name="rhs" />
				</li>
			</ul>
		</div>
	</nav>
</div>

<style>
	.header-bg {
		width: 100%;
		position: absolute;
		background: linear-gradient(231deg, #a05d00, #850842, #8708ad);
		background-size: 800% 800%;

		-webkit-animation: AnimationName 47s ease infinite;
		-moz-animation: AnimationName 47s ease infinite;
		-o-animation: AnimationName 47s ease infinite;
		animation: AnimationName 20s ease infinite;
	}

	@-webkit-keyframes AnimationName {
		0% {
			background-position: 0% 30%;
		}
		50% {
			background-position: 100% 71%;
		}
		100% {
			background-position: 0% 30%;
		}
	}
	@-moz-keyframes AnimationName {
		0% {
			background-position: 0% 30%;
		}
		50% {
			background-position: 100% 71%;
		}
		100% {
			background-position: 0% 30%;
		}
	}
	@-o-keyframes AnimationName {
		0% {
			background-position: 0% 30%;
		}
		50% {
			background-position: 100% 71%;
		}
		100% {
			background-position: 0% 30%;
		}
	}
	@keyframes AnimationName {
		0% {
			background-position: 0% 30%;
		}
		50% {
			background-position: 100% 71%;
		}
		100% {
			background-position: 0% 30%;
		}
	}

	/* .container::before {
		content: '';
		width: 100%;
		height: 32.6vw;
		position: absolute;
		background: url('https://raw.githubusercontent.com/Yousuke777/bg/main/sample-bg-02.png')
			repeat-x;
		background-size: 50%;
		animation: scroll-anim 10s linear infinite;
	}

	.container::after {
		content: '';
		width: 100%;
		height: 32.6vw;
		position: absolute;
		background: url('https://raw.githubusercontent.com/Yousuke777/bg/main/sample-bg-01.png')
			repeat-x;
		background-size: 50%;
		animation: scroll-anim 5s linear infinite;
	} */

	@keyframes scroll-anim {
		100% {
			background-position: -100% 0;
		}
	}

	/* @keyframes slide {
		0% {
			transform: translateX(-25%);
		}
		100% {
			transform: translateX(25%);
		}
	}

	.bg {
		animation: slide 5s ease-in-out infinite alternate;
		background-image: linear-gradient(-2.5deg, rgb(95, 8, 65) 55%, hsl(257, 75%, 19%) 30%);
		bottom: 0;
		left: -75%;
		opacity: 0.5;
		position: fixed;
		right: -75%;
		top: 0;
		z-index: -1;
	}

	.bg2 {
		animation-direction: alternate-reverse;
		animation-duration: 6s;
	}

	.bg3 {
		animation-duration: 7s;
	}

	.content {
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 0.25em;
		box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.25);
		box-sizing: border-box;
		left: 75%;
		padding: 10vmin;
		position: fixed;
		text-align: center;
		top: 50%;
		transform: translate(-50%, -50%);
	} */
</style>
