<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToSearch = () => {
  router.push('/SearchCocktail');
};
</script>

<template>
  <nav class="sticky top-0 z-50 flex justify-between items-center p-4 bg-custom-orange text-white shadow-lg">
    <div class="text-4xl font-bold text-custom-light-orange font-custom">
      COCKTAIL⋆｡°·☁︎
    </div>
    
    <div class="rounded-xl p-3 mr-4">
      <button 
        @click="goToSearch" 
        class="font-sans text-custom-light-orange font-semibold relative group flex items-center"
      >
        <!-- Magnifying glass icon -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        
        <span class="group-hover:scale-105 transition-transform inline-block">
          Search Cocktail Recipe
        </span>
        <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-custom-light-orange group-hover:w-full transition-all duration-300"></span>
      </button>
    </div>
  </nav>
</template>

