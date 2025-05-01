<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const searchQuery = ref('');
const searchResults = ref([]);
const loading = ref(false);
const error = ref(null);
const hasSearched = ref(false);

const searchCocktails = async () => {
  if (!searchQuery.value.trim()) {
    error.value = "Please enter a cocktail or ingredient name";
    return;
  }
  
  loading.value = true;
  error.value = null;
  hasSearched.value = true;
  
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchQuery.value)}`);
    const data = await response.json();
    
    if (data.drinks && data.drinks.length > 0) {
      searchResults.value = data.drinks;
    } else {
      searchResults.value = [];
      error.value = "No cocktails found matching your search";
    }
  } catch (err) {
    error.value = "An error occurred while searching";
    console.error("API error:", err);
  } finally {
    loading.value = false;
  }
};

const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    searchCocktails();
  }
};

const viewCocktailDetails = (cocktail) => {
  router.push({ 
    name: 'CocktailDetail', 
    params: { id: cocktail.idDrink },
    state: { cocktailData: cocktail }
  });
};

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
  
  return ingredients.slice(0, 3);
};

const getIngredientImage = (ingredientName) => {
  if (!ingredientName) return null;
  return `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(ingredientName)}-Small.png`;
};

const goToHome = () => {
  router.push({ name: 'Home' });
};

</script>

<template>
  <div class="app-container">
    <div class="app-content">
      <div class="search-page bg-back min-h-screen py-10 px-4">
        <div class="container mx-auto">
          <h1 class="text-4xl font-bold text-center text-title mb-2">Cocktail Search</h1>
          <p class="text-center text-gray-600 mb-10">Search for your favorite drinks or ingredients</p>
          
          <div class="search-container max-w-3xl mx-auto mb-12">
            <div class="flex shadow-lg rounded-lg overflow-hidden bg-white">
              <input
                v-model="searchQuery"
                @keydown="handleKeyDown"
                type="text"
                placeholder="Enter a cocktail name... (e.g. Margarita, Mojito)"
                class="flex-grow p-5 text-lg focus:outline-none"
              />
              <button
                @click="searchCocktails"
                :disabled="loading"
                class="bg-blue hover:bg-custom-orange text-white px-8 py-5 transition-colors duration-300 flex items-center justify-center"
              >
                <span v-if="loading" class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
                <span>Search</span>
              </button>
            </div>
          </div>
          
          <div class="flex justify-center mb-8">
            <button 
              @click="goToHome"
              class="text-center flex items-center text-title hover:text-custom-orange transition-colors"
            >
              <span class="mr-2">←</span> Back to Home
            </button>
          </div>
          
          <div v-if="loading" class="flex justify-center py-16">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
          
          <div v-else-if="error && hasSearched" class="text-center py-12">
            <div class="max-w-md mx-auto p-6 bg-red-50 rounded-lg border border-red-100">
              <p class="text-red-600">{{ error }}</p>
              <p class="mt-2 text-gray-600">Try different keywords or more general terms.</p>
            </div>
          </div>
          
          <div v-else-if="hasSearched && searchResults.length === 0 && !error" class="text-center py-12">
            <div class="max-w-md mx-auto p-6 bg-gray-50 rounded-lg border border-gray-100">
              <p class="text-gray-700">No cocktails found matching your search criteria.</p>
              <p class="mt-2 text-gray-600">Try different keywords or more general terms.</p>
            </div>
          </div>
          
          <div v-else-if="searchResults.length > 0" class="search-results">
            <h2 class="text-2xl font-bold text-title mb-6">Search Results</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                v-for="cocktail in searchResults" 
                :key="cocktail.idDrink"
                class="cocktail-card bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                @click="viewCocktailDetails(cocktail)"
              >
                <div class="cocktail-image-container relative h-48 overflow-hidden">
                  <img 
                    :src="cocktail.strDrinkThumb" 
                    :alt="cocktail.strDrink"
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <p class="text-white font-bold">{{ cocktail.strDrink }}</p>
                    <p class="text-gray-300 text-sm">{{ cocktail.strCategory }}</p>
                  </div>
                </div>
                
                <div class="p-4">
                  <div class="flex justify-between items-center mb-3">
                    <span 
                      class="px-2 py-1 text-xs rounded-full"
                      :class="cocktail.strAlcoholic === 'Alcoholic' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'"
                    >
                      {{ cocktail.strAlcoholic }}
                    </span>
                    <span class="text-sm text-gray-500">{{ cocktail.strGlass }}</span>
                  </div>
                  
                  <div class="ingredients-preview">
                    <p class="text-sm font-medium text-title mb-2">Main Ingredients:</p>
                    <div class="flex flex-wrap">
                      <div 
                        v-for="(ingredient, index) in getIngredients(cocktail)" 
                        :key="index"
                        class="ingredient-tag mr-2 mb-2 px-2 py-1 bg-gray-100 rounded-md text-xs flex items-center"
                      >
                        <img 
                          v-if="getIngredientImage(ingredient.name)" 
                          :src="getIngredientImage(ingredient.name)" 
                          :alt="ingredient.name"
                          class="w-4 h-4 mr-1"
                        />
                        <span>{{ ingredient.name }}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    class="w-full mt-4 py-2 bg-blue text-white rounded-md hover:bg-custom-orange transition-colors duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.cocktail-card:hover .cocktail-image-container img {
  transform: scale(1.05);
  transition: transform 0.5s ease;
}

.cocktail-image-container img {
  transition: transform 0.3s ease;
}

.from-black {
  background-image: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0));
}

@media (max-width: 640px) {
  .search-container .flex {
    flex-direction: column;
  }
  
  .search-container button {
    width: 100%;
  }
}

.cocktail-image-container {
  display: block;
  vertical-align: middle;
  line-height: 0;
}

.cocktail-card {
  display: flex;
  flex-direction: column;
}
</style>