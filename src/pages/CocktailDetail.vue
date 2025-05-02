<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const cocktail = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchCocktailDetails = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${props.id}`);
    const data = await response.json();
    
    if (data.drinks && data.drinks.length > 0) {
      cocktail.value = data.drinks[0];
    } else {
      error.value = "No cocktail found.";
    }
  } catch (err) {
    error.value = "Something wrong";
    console.error("API hatası:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCocktailDetails();
});

const goBack = () => {
  if (route.query.from) {
    router.push({ name: route.query.from });
  } else {
    router.go(-1);
  }
};

const getIngredients = () => {
  if (!cocktail.value) return [];
  
  const ingredients = [];
  
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail.value[`strIngredient${i}`];
    const measure = cocktail.value[`strMeasure${i}`];
    
    if (ingredient) {
      ingredients.push({
        name: ingredient,
        measure: measure || ''
      });
    }
  }
  
  return ingredients;
};
</script>

<template>
  <div class="app-container">
    <div class="app-content overflow-y-auto">
      <div class="cocktail-detail bg-back py-10 px-4">
        <button 
          @click="goBack"
          class="mb-6 px-4 py-2 flex items-center text-title bg-blue hover:bg-custom-orange transition-colors rounded-md shadow-md"
        >
          <span class="mr-2">←</span> Back to cocktail cloud
        </button>
        
        <div v-if="loading" class="flex justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
        
        <div v-else-if="error" class="text-center text-red-500 py-10">
          {{ error }}
        </div>
        
        <div v-else-if="!cocktail" class="text-center py-10">
          <p class="text-lg text-gray-600">Kokteyl bilgileri bulunamadı.</p>
        </div>
        
        <div v-else class="cocktail-card max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-xl border border-gray-200">
          <div class="md:flex flex-col md:flex-row">
            <div class="md:w-1/2">
              <img 
              :src="cocktail.strDrinkThumb" 
              :alt="cocktail.strDrink"
              class="w-full h-full object-cover block"
              style="display: block; 
              vertical-align: middle; 
              margin: 0;"
              />
            </div>
            
            <div class="md:w-1/2 p-6">
              <div class="flex justify-between items-start mb-4">
                <h1 class="text-2xl font-bold text-title">{{ cocktail.strDrink }}</h1>
                <span 
                  class="px-3 py-1 text-sm rounded-full"
                  :class="cocktail.strAlcoholic === 'Alcoholic' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'"
                >
                  {{ cocktail.strAlcoholic }}
                </span>
              </div>
              
              <div class="mb-6">
                <p class="text-gray-600">{{ cocktail.strCategory }}</p>
                <p class="text-gray-600">{{ cocktail.strGlass }}</p>
              </div>
              
              <div class="mb-6">
                <h2 class="text-xl font-semibold text-title mb-2">Ingredients</h2>
                <ul class="list-disc pl-5">
                  <li v-for="(ingredient, index) in getIngredients()" :key="index" class="mb-1">
                    <span class="font-medium">{{ ingredient.name }}</span>
                    <span v-if="ingredient.measure"> - {{ ingredient.measure }}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h2 class="text-xl font-semibold text-title mb-2">How can you prepare</h2>
                <p class="text-gray-700">{{ cocktail.strInstructions }}</p>
              </div>
            </div>
          </div>
      
        </div>
        
        <div class="h-20"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scroll ve container ayarları */
.app-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.app-content {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; 
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.cocktail-card {
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .md\:flex-row {
    flex-direction: column;
  }
  
  .md\:w-1\/2 {
    width: 100%;
  }
}
</style>