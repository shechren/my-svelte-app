<script>
  import Fa from 'svelte-fa'
	import { faPen } from '@fortawesome/free-solid-svg-icons'
  import { push } from 'svelte-spa-router';
  import { categoryData } from '../store/categoryStore'
  

  function postingButton () {
    push('/posting');
  }

  function navToCategory(category) {
    $categoryData = category;
    push(`/category/${category}`);
  }

</script>
<div class="header">
  <div class="button-area">
    <div class="left">
      <button class="header-buttons" id="javascript-button" style="color:yellow" on:click={() => navToCategory('javascript')}>
        Javascript
      </button>
      <button outline secondary class="header-buttons" id="python-button" style="color:indigo" on:click={() => navToCategory('python')}>
        Python
      </button>
      <button outline secondary class="header-buttons" id="dart-button" stlye="color:blue" on:click={() => navToCategory('dart')}>
        Dart
      </button>
    </div>
    <div class="icon-area" on:keydown={postingButton} on:click={postingButton}>
      <Fa icon={faPen}/>
    </div>
  </div>
</div>
<style>
  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100px;
    background-color: #C5CAE9;
  }

  .button-area {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-left: 10px;
  }

  .icon-area {
    display: flex;
    align-items: center;
    margin-right: 50px;
    cursor: pointer;
  }

  .header-buttons {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
</style>