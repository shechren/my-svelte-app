<script>
  import Router from 'svelte-spa-router'
  import Header from './components/Header/Header.svelte'
  import {routes} from './Routes/routes'

</script>

<Header />
<Router routes ={routes} />
<style>

</style>
