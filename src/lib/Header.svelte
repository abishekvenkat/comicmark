<script lang="ts">
  import ImportExport from './ImportExport.svelte';
  export let showAddBookmark: boolean;
</script>

<header class="header-bar">
  <div class="logo">
    <h1>COMICMARK!</h1>
    <p class="tagline">link manager, comic style</p>
  </div>

  <div class="actions">
    <ImportExport />
    <button class="pow-button add-button" on:click={() => showAddBookmark = true}>
      + NEW! ZAP!
    </button>
  </div>
</header>

<style>
  .logo h1 {
    margin: 0;
    font-size: 2.5rem;
    color: var(--text-color);
    text-shadow: 2px 2px 0 #fff;
    transform: rotate(-2deg);
  }

  .tagline {
    margin: 0;
    font-size: 1.0rem;
    color: var(--text-color);
    text-align: center;
    text-shadow: 1px 1px 0 #fff;
  }

  .actions {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .add-button {
    background: #fff;
    color: var(--text-color);
  }
</style>