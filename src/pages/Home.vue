<script setup>
import { useRouter } from 'vue-router';

// Use the router
const router = useRouter();

// Function to navigate to cocktail page
const navigateToCocktails = () => {
  router.push({ name: 'Search' }); // Assuming 'cocktails' is the route name for your cocktail page
};
</script>

<template>
  <div class="bg-back h-screen w-full flex items-center overflow-hidden">
    <div class="flex flex-row w-full">
      <div class="w-1/2">
        <img
  src="/assets/cocktail.webp"
  alt="Description"
  class="w-full h-full object-cover rounded-lg"
/>
      </div>
          
      <div class="w-1/2 p-10 flex flex-col justify-center">
        <h1 class="text-4xl font-bold mb-4 text-title">Welcome to Cocktail Cloud</h1>
        <p class="text-lg text-title mb-6">
          Discover the most delicious cocktail recipes and learn about unique flavor combinations. Are you ready to embark on a new journey in the world of cocktails ?
        </p>
        <button 
          @click="navigateToCocktails" 
          class="bg-blue text-title py-2 px-6 rounded-lg hover:bg-custom-orange w-40 transition-colors duration-300"
        >
          Explore
        </button>
      </div>
    </div>
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100%;
}
</style>