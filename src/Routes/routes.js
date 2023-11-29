import Posting from '../components/Posting/Posting.svelte'
import HomePage from './HomePage.svelte'
import Cards from '../components/Body/Cards.svelte'

export const routes = {
  '/': HomePage,
  '/posting': Posting,
  '/category/:*': Cards,
}