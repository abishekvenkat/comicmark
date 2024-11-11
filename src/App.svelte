<script lang="ts">
  import { onMount } from 'svelte';
  import { bookmarks } from './lib/store';
  import Dashboard from './lib/Dashboard.svelte';
  import BookmarkForm from './lib/BookmarkForm.svelte';
  import BookmarkList from './lib/BookmarkList.svelte';
  import ImportExport from './lib/ImportExport.svelte';
  import Header from './lib/Header.svelte';

  let showAddBookmark = false;

  onMount(() => {
    bookmarks.loadFromStorage();
  });
</script>

<Header bind:showAddBookmark />

<main class="container">
  <Dashboard />
  <BookmarkList />
</main>

{#if showAddBookmark}
  <div class="modal-backdrop" on:click={() => showAddBookmark = false}>
    <div class="modal" on:click|stopPropagation>
      <BookmarkForm on:close={() => showAddBookmark = false} />
    </div>
  </div>
{/if}

<style>
  main {
    padding-top: 1rem;
  }
</style>