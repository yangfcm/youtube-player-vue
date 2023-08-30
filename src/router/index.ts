import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ChannelVideos from '@/pages/ChannelVideos.vue'
import ChannelPlayLists from '@/pages/ChannelPlayLists.vue'
import NotFound from '@/pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/subscription',
      name: 'subscription',
      component: () => import('../pages/SubscriptionPage.vue'),
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: () => import('../pages/PlayListPage.vue'),
    },
    {
      path: '/video/:id',
      name: 'video',
      component: () => import('../pages/VideoPage.vue'),
    },
    {
      path: '/playlist/:id',
      name: 'playlist-videos',
      component: () => import('../pages/PlayListVideos.vue'),
    },
    {
      path: '/search/:keyword',
      name: 'search-result',
      component: () => import('../pages/SearchResultsPage.vue'),
    },
    {
      path: '/channel/:id',
      name: 'channel',
      component: () => import('../pages/ChannelPage.vue'),
      children: [
        {
          path: '',
          name: 'channel-index',
          redirect: (to) => ({
            path: `/channel/${to.params.id}/videos`,
          }),
        },
        {
          path: 'videos',
          name: 'channel-videos',
          component: ChannelVideos,
        },
        {
          path: 'playlists',
          name: 'channel-playlists',
          component: ChannelPlayLists,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound,
    },
  ],
})

export default router
