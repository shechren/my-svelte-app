<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let data = [];

  onMount(async () => {
    const user_id = $page.params.id;
    const response = await fetch(`/Home/${user_id}/Cards/`, {
      method: 'GET',
    });
    data = await response.json();
  });
</script>
{#if data.length > 0}
  {#each data as { id, category, user_email, dateTime, description }}
    <div class="header">
      <div class="title">{category}</div>
      <div class="username">{user_email}</div>
      <div class="category">{category}</div>
      <div class="datetime">{dateTime}</div>
    </div>
    <div class="description">{description}</div>
  {/each}
{:else}
  <p>데이터가 없습니다.</p>
{/if}