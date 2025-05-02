import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/Home.vue';  // Burada HomePage.vue'yi kendi sayfa bileşeninize göre değiştirebilirsiniz.
import SearchPage from '@/pages/Cocktail.vue';  // Arama sayfası bileşeni
import CocktailDetail from '@/pages/CocktailDetail.vue';
import SearchCocktail from '@/pages/SearchCocktail.vue';

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
  },
  {
    path: '/cocktail/:id',
    name: 'CocktailDetail',
    component:CocktailDetail,
    props: true,
    // Optional: meta verileri ekleyebilirsiniz
    meta: { title: 'Kokteyl Detayı' }
  },
  {
    path: '/SearchCocktail',
    name: 'SearchCocktail',
    component: SearchCocktail
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
