<script lang="ts">
  import { bookmarks } from './store';
  import type { Bookmark } from './types';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let url = '';
  let title = '';
  let gangs = '';
  let deadline = '';

  function handleSubmit() {
    const newBookmark: Bookmark = {
      id: crypto.randomUUID(),
      url,
      title,
      gangs: gangs.split(',').map(g => g.trim()).filter(g => g),
      isRead: false,
      deadline: deadline || undefined,
      createdAt: new Date().toISOString()
    };

    bookmarks.add(newBookmark);
    dispatch('close');
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <h3>ADD NEW BOOKMARK! BANG!</h3>
  
  <div class="form-group">
    <input
      type="url"
      bind:value={url}
      placeholder="Enter URL"
      required
    />
  </div>

  <div class="form-group">
    <input
      type="text"
      bind:value={title}
      placeholder="Enter Title"
      required
    />
  </div>

  <div class="form-group">
    <input
      type="text"
      bind:value={gangs}
      placeholder="Enter Gangs (comma-separated)"
    />
  </div>

  <div class="form-group">
    <input
      type="date"
      bind:value={deadline}
      placeholder="Deadline (optional)"
    />
  </div>

  <div class="buttons">
    <button type="submit" class="pow-button">
      BOOM! ADD BOOKMARK!
    </button>
    <button type="button" class="pow-button" on:click={() => dispatch('close')}>
      CANCEL! WHOOSH!
    </button>
  </div>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  h3 {
    margin: 0;
    color: var(--text-color);
    text-align: center;
    font-size: 1.8rem;
    text-shadow: 2px 2px 0 #fff;
  }

  .form-group {
    margin-bottom: 0.5rem;
  }

  /* New styles for wider input fields */
  input[type="url"],
  input[type="text"],
  input[type="date"] {
    width: 100%; /* Make the input fields take full width */
    max-width: 400px; /* Set a maximum width */
    padding: 0.5rem; /* Add some padding for better appearance */
    box-sizing: border-box; /* Ensure padding is included in width */
  }

  .buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
  }
</style>