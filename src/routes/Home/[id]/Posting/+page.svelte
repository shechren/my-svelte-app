<script>
  import '$resources/app.css'
  import { page } from '$app/stores'

  let title;
  let desc;
  let id;

  const handler = async () => {
    id = $page.params.id
    const response = await fetch(`/Home/${id}/Posting/`, {
      method: "POST", 
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify({title, desc, id})
    })
  }
    
</script>
<div class="posting">
  <div id="title" class="relative mt-2 rounded-md">
    <input type="text" bind:value={title} name="postingTitle" id="postingTitle" placeholder="제목" class="input-box" />
  </div>
  <div id="desc" class="relative mt-2 rounded-md">
    <textarea bind:value={desc} style="resize: none;" name="postingDesc" id="postingDesc" cols="20" rows="15" placeholder="내용"class="input-box" />
  </div>
  <div class="submit">
    <button on:click={handler} class="bg-indigo-500 text-white font-bold py-2 px-4 rounded">
      저장
    </button>
  </div>
</div>
<style>
  .posting {
    padding: 20px;
    display: flex;
    flex-direction: column;
    width: 500px;
  }
  .input-box {
    width: 100%;
  }

  #title, #desc {
    margin-top: 15px;
  }

  .submit {
    margin-top: 5px;
    align-self: end;
  }
</style>