<script>
  import { onMount } from 'svelte';
  import { Card, CardHeader, CardTitle, CardBody } from 'sveltestrap';
  import { postingData } from '../store/postingStore'
  import { categoryData } from '../store/categoryStore'

  const fetchData = async () => {
    let url = 'http://localhost:3000/category/' + $categoryData
    
    try {
      const response = await fetch(url, {
        method: 'GET',
      })
      const data = await response.json();
      $postingData = data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  $: if ($categoryData) {
    fetchData();
  }
</script>
<div>
{#each $postingData as post}
<Card class="mb-3"key={post.id}>
  <CardHeader>
    <CardTitle style="font-size: 1.5rem">
      {post.title}
    </CardTitle>
  </CardHeader>
  <CardBody>
    {post.description}
  </CardBody>
</Card>
{/each}
</div>

<style>
  /* Your styles go here */
</style>