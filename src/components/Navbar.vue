<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToSearch = () => {
  router.push('/search');
};
</script>

<template>
  <nav class="sticky top-0 z-50 flex justify-between items-center p-4 bg-custom-orange text-white shadow-lg">
    <div class="text-4xl font-bold text-custom-light-orange font-custom">
      COCKTAIL
    </div>
    <div class="bg-custom-light-orange text-black rounded-xl p-3 mr-4">
      <button @click="goToSearch" class="font-sans text-sm">
        Search Cocktail Recipe
      </button>
    </div>
  </nav>
</template>
