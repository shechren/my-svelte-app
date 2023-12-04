<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores'
  
  let data = [];

  const formatDateTime= (datetime) => {
    const dateObject = new Date(datetime)
    const year = dateObject.getFullYear()
    const month = String(dateObject.getMonth() + 1).padStart(2, '0')
    const day = String(dateObject.getDate()).padStart(2, '0')
    const hours = String(dateObject.getHours()).padStart(2, '0')
    const minutes = String(dateObject.getMinutes()).padStart(2, '0')
    const seconds = String(dateObject.getSeconds()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  onMount(async () => {
      const user_id = $page.params.id;
      const response = await fetch(`/Home/${user_id}/music`, {
        method: 'GET'
      });
      data = await response.json();
    });
</script>
{#if data.length > 0}
  {#each data as { id, category, user_email, title, datetime, description }}
  <div class="table">
    <div class="header">
      <div class="header1">
      <div class="title">{title}</div>
      <div class="category">{category}</div>
    </div>
    <div class="header2">
      <div class="username">작성자: {user_email}</div>
      <div class="datetime">{formatDateTime(datetime)}</div>
    </div>
    </div>
    <div class="description">{description}</div>
  </div>
  {/each}
{:else}
  <p>데이터가 없습니다.</p>
{/if}
<style>
  .table {
    border: 1px solid #333;
    border-radius: 8px;
    margin: 10px;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    width: 100%;
    background-color: #444;
    color: #ddd;
  }

  .header {
    display: flex;
    justify-content: space-between;
    background-color: #555;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  .header1 {
    display: flex;
    align-items: center;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
  }

  .category {
    color: #aaa;
  }

  .header2 {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .username {
    color: #ccc;
    margin-bottom: 5px;
  }

  .datetime {
    color: #999;
  }

  .description {
    color: #ccc;
  }
</style>