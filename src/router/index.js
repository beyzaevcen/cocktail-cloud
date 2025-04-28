import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/Home.vue';  // Burada HomePage.vue'yi kendi sayfa bileşeninize göre değiştirebilirsiniz.
import SearchPage from '@/pages/Cocktail.vue';  // Arama sayfası bileşeni

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchPage
  }
];

const router = createRouter({
  history: createWebHistory("http://localhost:5173/"),
  routes
});

export default router;
