import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import router from './router'

// Sadece tarayıcı ortamında çalışmasını sağla
if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    // Mevcut URL yolunu al
    const currentPath = window.location.pathname;
    
    // Router'ı güncelle, ama klonlanamayan nesneler olmadan
    // Basit bir string yolu kullan
    router.replace(currentPath).catch(err => {
      console.error('Routing hatası:', err);
      // Gerekirse sayfayı yenileyebilirsiniz
      // window.location.reload();
    });
  });
}

createApp(App)
  .use(router)
  .mount('#app')