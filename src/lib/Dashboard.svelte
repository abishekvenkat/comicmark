<script lang="ts">
  import { bookmarks } from './store';
  import type { Dashboard } from './types';
  import { differenceInDays } from 'date-fns';

  $: dashboard = calculateDashboard($bookmarks);

  function calculateDashboard($bookmarks): Dashboard {
    const tags = new Set($bookmarks.flatMap(b => b.tags));
    const upcomingLinks = $bookmarks.filter(b => {
      if (!b.deadline) return false;
      const daysUntilDeadline = differenceInDays(
        new Date(b.deadline),
        new Date()
      );
      return (daysUntilDeadline <= 7 && daysUntilDeadline >= 0) && !b.isRead;
    }).length;

    return {
      totalLinks: $bookmarks.length,
      totaltags: tags.size,
      upcomingLinks
    };
  }
</script>

<div class="comic-panel dashboard">
  <div class="title-burst">
    <h2>DASHHHHBOARD!</h2>
  </div>
  <div class="stats">
    <div class="stat">
      <div class="stat-burst">
        <span class="number">{dashboard.totalLinks}</span>
        <span class="label">Total Links!</span>
      </div>
    </div>
    <div class="stat">
      <div class="stat-burst">
        <span class="number">{dashboard.totaltags}</span>
        <span class="label">Total tags!</span>
      </div>
    </div>
    <div class="stat">
      <div class="stat-burst">
        <span class="number">{dashboard.upcomingLinks}</span>
        <span class="label">Due Soon!</span>
      </div>
    </div>
  </div>
</div>

<style>
  .dashboard {
    margin-bottom: 2rem;
    background: linear-gradient(135deg, var(--panel-color) 0%, #fff 100%);
  }

  .title-burst {
    position: relative;
    background: #fff;
    padding: 1rem 2rem;
    margin: -2rem auto 2rem;
    width: fit-content;
    transform: rotate(-2deg);
    border: 2px solid var(--border-color);
    box-shadow: 4px 4px 0 var(--border-color);
  }

  .title-burst::before,
  .title-burst::after {
    content: '';
    position: absolute;
    background: #fff;
    border: 2px solid var(--border-color);
  }

  .title-burst::before {
    width: 20px;
    height: 20px;
    transform: rotate(45deg);
    top: -10px;
    left: 20px;
  }

  .title-burst::after {
    width: 15px;
    height: 15px;
    transform: rotate(45deg);
    bottom: -7px;
    right: 30px;
  }

  h2 {
    margin: 0;
    color: var(--text-color);
    text-align: center;
    font-size: 2.5rem;
    text-shadow: 2px 2px 0 #fff;
  }

  .stats {
    display: flex;
    justify-content: space-around;
    margin-top: 2rem;
    gap: 1rem;
  }

  .stat {
    flex: 1;
    text-align: center;
  }

  .stat-burst {
    background: #fff;
    padding: 1.5rem;
    border: 2px solid var(--border-color);
    box-shadow: 5px 5px 0 var(--border-color);
    transform: rotate(-2deg);
    transition: all 0.3s ease;
  }

  .stat-burst:hover {
    transform: rotate(2deg) translateY(-5px);
    box-shadow: 8px 8px 0 var(--border-color);
  }

  .number {
    font-size: 3rem;
    font-weight: bold;
    display: block;
    color: var(--text-color);
    text-shadow: 2px 2px 0 #fff;
  }

  .label {
    font-size: 1.2rem;
    color: var(--text-color);
    display: block;
    margin-top: 0.5rem;
    text-transform: uppercase;
  }
</style>