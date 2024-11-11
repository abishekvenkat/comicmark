<script lang="ts">
  import { bookmarks } from './store';

  function exportBookmarks() {
    const data = bookmarks.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'comicmark-bookmarks.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function handleImport(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const success = bookmarks.importData(content);
      if (!success) {
        alert('Invalid bookmark file!');
      }
    };
    reader.readAsText(file);
  }
</script>

<div class="import-export">
  <button class="pow-button" on:click={exportBookmarks}>
    Export! WHAM!
  </button>
  
  <label class="pow-button">
    Import! ZING!
    <input
      type="file"
      accept=".json"
      on:change={handleImport}
      style="display: none"
    />
  </label>
</div>

<style>
  .import-export {
    display: flex;
    gap: 1rem;
  }
</style>