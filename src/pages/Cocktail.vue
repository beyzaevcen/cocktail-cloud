<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const showDetails = (cocktail) => {
  router.push({ 
    name: 'CocktailDetail', 
    params: { id: cocktail.idDrink },
    state: { cocktailData: cocktail }
  });
};

const allCocktails = ref([]);
const loading = ref(true);
const error = ref(null);
const letters = ['p', 's', 'c']; 

const fetchAllCocktails = async () => {
  loading.value = true;
  error.value = null;
  const results = [];
  
  try {
    for (const letter of letters) {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
      const data = await response.json();
      
      if (data.drinks && data.drinks.length > 0) {
        const cocktailsForLetter = data.drinks.slice(0, 2);
        results.push(...cocktailsForLetter);
      }
    }
    
    allCocktails.value = results;
  } catch (err) {
    error.value = "An error occurred while loading cocktail data.";
    console.error("API error:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchAllCocktails();
});



const getIngredients = (cocktail) => {
  const ingredients = [];
  
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measure = cocktail[`strMeasure${i}`];
    
    if (ingredient) {
      ingredients.push({
        name: ingredient,
        measure: measure || ''
      });
    }
  }
  
  return ingredients;
};

const groupedCocktails = () => {
  const grouped = {};
  
  for (const letter of letters) {
    const cocktailsWithLetter = allCocktails.value.filter(cocktail => 
      cocktail.strDrink.toLowerCase().startsWith(letter)
    ).slice(0, 2); 
    
    if (cocktailsWithLetter.length > 0) {
      grouped[letter] = cocktailsWithLetter;
    }
  }
  
  return grouped;
};
</script>

<template>
  <div class="cocktails-container bg-back min-h-screen py-10 px-4">
    <h1 class="text-3xl font-bold text-center mb-8 text-title">Cocktail Cloud</h1>
    
    <div v-if="loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
    </div>
    
    <div v-else-if="error" class="text-center text-red-500 py-10">
      {{ error }}
    </div>
    
    <div v-else-if="allCocktails.length === 0" class="text-center py-10">
      <p class="text-lg text-gray-600">No cocktails found.</p>
    </div>
    
    <div v-else>
      <!-- All cocktail cards at the top in a 3x2 grid -->
      <div class="mb-16">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="cocktail in allCocktails.slice(0, 6)" 
            :key="cocktail.idDrink"
            class="cocktail-card bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-102 flex flex-row border border-gray-200"
            style="box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);"
          >
            <div class="w-1/3">
              <img 
                :src="cocktail.strDrinkThumb" 
                :alt="cocktail.strDrink"
                class="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            
            <!-- Cocktail info (right side) -->
            <div class="w-2/3 p-4">
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-lg font-bold text-title truncate">{{ cocktail.strDrink }}</h3>
                <span 
                  class="px-2 py-1 text-xs rounded-full"
                  :class="cocktail.strAlcoholic === 'Alcoholic' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'"
                >
                  {{ cocktail.strAlcoholic }}
                </span>
              </div>
              
              <div class="text-sm text-gray-600 mb-2">{{ cocktail.strCategory }}</div>
              
              <!-- Instructions (shortened) -->
              <p class="text-sm text-gray-600 mb-3 line-clamp-2">
                {{ cocktail.strInstructions }}
              </p>
              
              <!-- Detail button -->
              <button 
                @click="showDetails(cocktail)"
                class="w-full py-2 bg-blue text-title rounded-md hover:bg-custom-orange transition-colors duration-300 transform hover:scale-105 shadow-md"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  </div>
</template>

<style scoped>
/* Line clamping for text */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animations */
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

/* Custom hover scale */
.hover\:scale-102:hover {
  transform: scale(1.02);
}
</style>