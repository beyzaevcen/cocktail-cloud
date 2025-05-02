import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import router from './router'

// Tarayıcı geri/ileri düğmelerini dinle
if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    // Mevcut yolu al
    const currentPath = window.location.pathname;
    
    // Vue Router'ı zorla güncelle
    router.replace(currentPath);
    
    // Alternatif olarak:
    // router.push({ path: currentPath, force: true });
  });
}

createApp(App)
  .use(router)
  .mount('#app')