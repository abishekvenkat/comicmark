import { writable } from 'svelte/store';
import type { Bookmark } from './types';

function createBookmarkStore() {
  const { subscribe, set, update } = writable<Bookmark[]>([]);

  const loadFromStorage = () => {
    const stored = localStorage.getItem('comicmark-bookmarks');
    if (stored) {
      set(JSON.parse(stored));
    }
  };

  const saveToStorage = (bookmarks: Bookmark[]) => {
    localStorage.setItem('comicmark-bookmarks', JSON.stringify(bookmarks));
  };

  return {
    subscribe,
    add: (bookmark: Bookmark) => update(bookmarks => {
      const newBookmarks = [...bookmarks, bookmark];
      saveToStorage(newBookmarks);
      return newBookmarks;
    }),
    remove: (id: string) => update(bookmarks => {
      const newBookmarks = bookmarks.filter(b => b.id !== id);
      saveToStorage(newBookmarks);
      return newBookmarks;
    }),
    toggleRead: (id: string) => update(bookmarks => {
      const newBookmarks = bookmarks.map(b => 
        b.id === id ? { ...b, isRead: !b.isRead } : b
      );
      saveToStorage(newBookmarks);
      return newBookmarks;
    }),
    loadFromStorage,
    exportData: () => {
      const stored = localStorage.getItem('comicmark-bookmarks');
      return stored || '[]';
    },
    importData: (data: string) => {
      try {
        const bookmarks = JSON.parse(data);
        set(bookmarks);
        saveToStorage(bookmarks);
        return true;
      } catch {
        return false;
      }
    }
  };
}

export const bookmarks = createBookmarkStore();