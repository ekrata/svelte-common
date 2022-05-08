<script lang="ts">
  import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa/src/fa.svelte';
  import { blur } from 'svelte/transition';
  let show = true;
</script>

{#if show}
  <div
    class="animate-bounce hover:cursor-pointer"
    out:blur={{ duration: 250, amount: 200 }}
    on:click={() => (show = false)}
  >
    <div class="rounded-2xl bg-gradient-to-r from-red-400/100 to-violet-500/100 ">
      <div alt="jump to marker" class="border-white/20 p-3 text-3xl shadow-2xl">
        <Fa primaryColor="white" primaryOpacity={10} icon={faArrowDown} />
      </div>
    </div>
  </div>
{/if}
