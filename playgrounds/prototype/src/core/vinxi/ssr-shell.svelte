<script module>
  import type { Component, Snippet, SvelteComponent } from "svelte";

  interface Asset {
    tag: string;
    attrs: Record<string, string>;
  }

  export interface AppProps {
    assets?: Asset[];
    child?: Component;
    clientScript?: string;
  }
</script>

<script lang="ts">
  let { child, assets = [], clientScript }: AppProps = $props();

  const Child = $derived(child);
</script>

<svelte:head>
  {#each assets as asset}
    <svelte:element this={asset.tag} {...asset.attrs} />
  {/each}
  {#if clientScript}
    <script type="module" src={clientScript} defer></script>
  {/if}
</svelte:head>

{#if Child}
  <Child />
{/if}
