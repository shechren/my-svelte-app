<script>
	import Router from 'svelte-spa-router'
	import Header from './components/header/Header.svelte'
	import Home from './routes/Home.svelte'

</script>
<Header />
<Router routes={
	{
		'/': Home,
	}
}/>
<style>
	
</style>