<script lang="ts">
  export let show = false;
  import { blur } from 'svelte/transition';
  import esportsData, { RequestUnit } from '$lib/store/esportsDataSlice';
  import { getContext, onDestroy } from 'svelte';
  import Fa from 'svelte-fa/src/fa.svelte';
  const { getStripe } = getContext('stripe');
  const stripe = getStripe();
  import { faArrowRight, faCartShopping, faRefresh } from '@fortawesome/free-solid-svg-icons';
  import CtaButton from './CTAButton.svelte';
  import { goto } from '$app/navigation';

  const createCheckoutSession = async () => {
    const plans = esportsData.getAllPrices($esportsData).map((price) => price?.id);
    if (plans.length) {
      const res = await fetch('/stripe/checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceIds: plans,
        }),
      });
      const { sessionId } = await res.json();
      stripe.redirectToCheckout({
        sessionId,
      });
    } else {
      goto('/esports/pricing');
    }
  };
  const unsubscribe = esportsData.subscribe((carts) => {});
  onDestroy(unsubscribe);
  let subscribeCurrent = false;
</script>

{#if show}
  <div
    class="absolute right-0 w-full origin-top-right divide-y divide-gray-300 overflow-visible rounded-md border-b-8 border-purple-800 bg-gray-50 p-2 px-8 text-zinc-900 antialiased shadow-lg shadow-zinc-900 ring-1 ring-black ring-opacity-5 focus:outline-none group-hover:visible lg:w-[25rem]"
    aria-labelledby="account menu"
    in:blur={{ duration: 300, delay: 100, amount: 20 }}
    out:blur={{ duration: 500, delay: 200, amount: 60 }}
  >
    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
    <ul
      class="text-normal -mx-3 h-60 content-center divide-y divide-gray-300 overflow-y-auto py-2 font-sans font-normal normal-case scrollbar"
    >
      {#each esportsData.getAllPrices($esportsData) as price}
        <li class="grid grid-cols-5 items-center py-2">
          <div class="col-span-3 h-full w-full text-left ">
            {price?.nickname}
          </div>
          <div class="flex-inline col-span-2 h-full w-full self-center text-3xl">
            <sup class="text-normal -mr-2 inline text-sm">&euro;</sup>
            <div class="inline">{price?.unit_amount ?? 0 / 100}</div>
          </div>
        </li>
      {/each}
    </ul>
    <div class="grid grid-cols-4 place-items-center justify-start gap-x-6 py-2 text-center">
      <button
        type="button"
        class={`group col-span-2 w-full rounded-lg shadow-md ${
          $esportsData.requestUnit === RequestUnit.pro ? 'bg-gray-900' : 'bg-white'
        }
        border-white/30 p-2 text-zinc-200  dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500`}
        on:click|stopPropagation={() => {
          esportsData.update((currentCart) => ({
            ...currentCart,
            requestUnit: RequestUnit.pro,
          }));
        }}
      >
        <div class="relative flex place-items-center justify-center text-center font-semibold">
          <div class="inline space-x-3">
            <!-- <Fa class="inline-block" icon={faPlus} size="sm" /> -->
            <!-- <Fa class="inline-block" icon={faCloud} size="sm" /> -->
            <div class="inline-block">
              {RequestUnit.pro}
              <div class="inline-block text-xs">requests/hr</div>
            </div>
          </div>
        </div>
      </button>
      <button
        type="button"
        class={`group col-span-2 w-full rounded-lg shadow-md ${
          $esportsData.requestUnit === RequestUnit.max ? 'bg-gray-900' : 'bg-white'
        }
        border-white/30 p-2 text-zinc-200  dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500`}
        on:click|stopPropagation={() => {
          esportsData.update((currentCart) => ({
            ...currentCart,
            requestUnit: RequestUnit.max,
          }));
        }}
      >
        <div class="relative flex place-items-center justify-center text-center font-semibold">
          <div class="inline space-x-3">
            <!-- <Fa class="inline-block" icon={faPlus} size="sm" /> -->
            <!-- <Fa class="inline-block" icon={faCloud} size="sm" /> -->
            <div class="inline-block">
              {RequestUnit.max}
              <div class="inline-block text-xs">requests/hr</div>
            </div>
          </div>
        </div>
      </button>
    </div>

    <div class="grid grid-cols-4 place-items-center justify-start pt-2 text-center">
      <button
        type="button"
        class={`group m-4 col-span-2 w-full rounded-lg shadow-md bg-gray-900
        border-white/30 p-2 text-zinc-200  dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500`}
        on:click|stopPropagation={createCheckoutSession}
        on:click|stopPropagation={() => (subscribeCurrent = true)}
        class:animate-jello-horizontal={subscribeCurrent}
      >
        <div class="relative flex place-items-center justify-center text-center font-medium">
          <div class="inline space-x-3">
            <!-- <Fa class="inline-block" icon={faPlus} size="sm" /> -->
            <Fa class="inline-block" icon={faCartShopping} size="sm" />
            <div class="inline-block">Subscribe</div>
            <Fa class="inline-block" icon={faArrowRight} size="sm" />
          </div>
        </div>
      </button>
      <div class="col-span-2 inline-block content-end text-3xl font-normal tracking-tight ">
        <sup class="-mr-1 text-base">&euro</sup>
        <div class="inline text-3xl tracking-tight">
          {(esportsData.getTotalPrice($esportsData) ?? 0) / 100 ?? 'Coming Soon'}
        </div>
        <div class="-ml-2 inline text-sm font-normal lowercase">
          /{$esportsData.billingInterval}
          <div class="has-tooltip inline-block">
            <span
              class="tooltip absolute -mt-12 inline rounded bg-gray-800 p-2 text-center normal-case text-zinc-300 shadow-lg"
              >Switch Billing Period</span
            >
            <sub
              on:click|stopPropagation={() => {
                esportsData.update((currentCart) => ({
                  ...currentCart,
                  billingInterval: currentCart.billingInterval === 'month' ? 'year' : 'month',
                }));
              }}><Fa class="inline px-2" size="2xl" icon={faRefresh} /></sub
            >
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
