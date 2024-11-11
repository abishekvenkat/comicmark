<script lang="ts">
  import { bookmarks } from './store';
  import { format } from 'date-fns';
  
  let searchTerm = '';
  let selectedtag = '';
  let alltags: string[] = [];

  $: {
    alltags = Array.from(
      new Set($bookmarks.flatMap(b => b.tags))
    ).sort();
  }

  $: filteredBookmarks = $bookmarks.filter(bookmark => {
    const matchesSearch = bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bookmark.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchestag = !selectedtag || bookmark.tags.includes(selectedtag);
    return matchesSearch && matchestag;
  });

  function copyToClipboard(url: string) {
    navigator.clipboard.writeText(url);
  }

  function deleteBookmark(id: string) {
    bookmarks.remove(id);
  }
</script>

<div class="filters comic-panel">
  <input
    type="text"
    bind:value={searchTerm}
    placeholder="Search bookmarks..."
    class="search-input"
  />
  
  <select bind:value={selectedtag} class="tag-select">
    <option value="">All tags</option>
    {#each alltags as tag}
      <option value={tag}>{tag}</option>
    {/each}
  </select>
</div>

<div class="bookmarks">
  {#each filteredBookmarks as bookmark}
    <div class="bookmark comic-panel">
      <div class="bookmark-header">
        <h3>{bookmark.title}</h3>
        <div class="actions">
          <label class="read-toggle">
            <input
              type="checkbox"
              checked={bookmark.isRead}
              on:change={() => bookmarks.toggleRead(bookmark.id)}
            />
            <span class="checkmark"></span>
            Read
          </label>
          <button
            class="pow-button small"
            on:click={() => copyToClipboard(bookmark.url)}
          >
            Copy! BAM!
          </button>
          <button
            class="pow-button small"
            on:click={() => deleteBookmark(bookmark.id)}
          >
            Poof!
          </button>
        </div>
      </div>

      <a href={bookmark.url} target="_blank" rel="noopener noreferrer" class="url-link">
        {bookmark.url}
      </a>

      <div class="tags">
        {#each bookmark.tags as tag}
          <span class="tag">{tag}</span>
        {/each}
      </div>

      {#if bookmark.deadline}
        <div class="deadline">
          <span class="deadline-burst">
            Deadline: {format(new Date(bookmark.deadline), 'MMM dd, yyyy')}
          </span>
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .filters {
    margin-bottom: 2rem;
    display: flex;
    gap: 1rem;
  }

  .search-input, .tag-select {
    padding: 0.8rem;
    border: 2px solid var(--border-color);
    background: #fff;
    color: var(--text-color);
    font-family: inherit;
  }

  .search-input {
    flex: 1;
  }

  .bookmark {
    margin-bottom: 1.5rem;
    transition: transform 0.3s ease;
  }

  .bookmark:hover {
    transform: rotate(1deg) translateY(-3px);
  }

  .bookmark-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    border-bottom: 2px solid var(--border-color);
    padding-bottom: 1rem;
  }

  .bookmark h3 {
    margin: 0;
    color: var(--text-color);
    font-size: 1.8rem;
    text-shadow: 2px 2px 0 #fff;
  }

  .actions {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .pow-button.small {
    padding: 0.4rem 0.8rem;
    font-size: 1rem;
  }

  .tags {
    margin-top: 1rem;
  }

  .deadline {
    margin-top: 1rem;
  }

  .deadline-burst {
    background: #fff;
    color: var(--text-color);
    padding: 0.5rem 1rem;
    border: 2px solid var(--border-color);
    display: inline-block;
    transform: rotate(-1deg);
    box-shadow: 3px 3px 0 var(--border-color);
  }

  .url-link {
    color: var(--text-color);
    text-decoration: none;
    display: inline-block;
    padding: 0.5rem 1rem;
    background: #fff;
    border: 1px solid var(--border-color);
    box-shadow: 2px 2px 0 var(--border-color);
    transition: all 0.2s ease;
  }

  .url-link:hover {
    transform: translateY(-2px);
    box-shadow: 4px 4px 0 var(--border-color);
  }

  .read-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    color: var(--text-color);
  }

  .read-toggle input {
    display: none;
  }

  .checkmark {
    width: 20px;
    height: 20px;
    border: 2px solid var(--border-color);
    display: inline-block;
    position: relative;
    background: #fff;
    transition: all 0.2s ease;
  }

  .read-toggle input:checked + .checkmark::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--text-color);
    font-weight: bold;
  }
</style>