import { sveltekit } from '@sveltejs/kit/vite'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
			$routes: '/src/routes',
      $components: '/src/routes/components',
      $assets: '/src/routes/assets',
			$resources: '/src/resources/css',
      $lib: '/src/routes/lib'
    },
  },
}

export default config