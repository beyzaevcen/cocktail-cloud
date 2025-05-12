<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isRolling = ref(false);
const diceValue = ref(1);

const navigateToCocktails = () => {
  router.push({ name: 'Search' });
};

// Function to roll the dice and get a random cocktail
const getRandomCocktail = async () => {
  // Start dice animation
  isRolling.value = true;
  
  // Simulate dice rolling with changing values
  const rollDuration = 2000; // 2 seconds of animation
  const startTime = Date.now();
  
  const rollInterval = setInterval(() => {
    // Generate random dice value between 1-6
    diceValue.value = Math.floor(Math.random() * 6) + 1;
    
    // Check if animation should end
    if (Date.now() - startTime > rollDuration) {
      clearInterval(rollInterval);
      fetchRandomCocktail();
    }
  }, 100);
};

const fetchRandomCocktail = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const data = await response.json();
    
    if (data.drinks && data.drinks.length > 0) {
      const cocktailId = data.drinks[0].idDrink;
      
      router.push({ 
        name: 'CocktailDetail', 
        params: { id: cocktailId } 
      });
    } else {
      console.error('No cocktail returned from API');
      isRolling.value = false;
    }
  } catch (err) {
    console.error('Error fetching random cocktail:', err);
    isRolling.value = false;
  }
};
</script>

<template>
  <div class="bg-back h-screen w-full flex items-center overflow-hidden justify-center">
    <div class="flex flex-row w-full">
      <div class="w-1/2">
        <img
          src="/assets/a.jpg"
          alt="Cocktail image"
          class="w-full h-full object-cover rounded-lg"
        />
      </div>
      
      <div class="w-1/2 p-10 flex flex-col justify-center  ">
        <h1 class="text-4xl font-bold mb-4 text-title">Welcome to Cocktail Cloud</h1>
        <p class="text-lg text-title mb-6 max-w-md">
          Discover the most delicious cocktail recipes and learn about unique flavor combinations. Are you ready to embark on a new journey in the world of cocktails?
        </p>
        <button
          @click="navigateToCocktails"
          class="bg-blue text-title py-2 px-6 rounded-lg hover:bg-custom-orange w-40 transition-colors duration-300"
        >
          Explore
        </button>
        
        <h2 class="text-4xl font-bold mt-12 mb-4 text-title">Random Cocktail</h2>
        <p class="text-lg text-title mb-6 max-w-md">
          Choose your cocktail recipe for today.
        </p>
        
        <div class="flex items-center">
          <button
            @click="getRandomCocktail"
            :disabled="isRolling"
            class="bg-blue text-title py-2 px-6 rounded-lg hover:bg-custom-orange w-40 transition-colors duration-300 flex justify-center items-center"
          >
            <span v-if="!isRolling">Roll Dice</span>
            <span v-else>Rolling...</span>
          </button>
          
          <!-- Dice animation -->
          <div 
            v-if="isRolling" 
            class="ml-6 w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center animate-bounce"
          >
            <!-- Display different dice faces based on diceValue -->
            <div v-if="diceValue === 1" class="dice-face dice-1"></div>
            <div v-if="diceValue === 2" class="dice-face dice-2"></div>
            <div v-if="diceValue === 3" class="dice-face dice-3"></div>
            <div v-if="diceValue === 4" class="dice-face dice-4"></div>
            <div v-if="diceValue === 5" class="dice-face dice-5"></div>
            <div v-if="diceValue === 6" class="dice-face dice-6"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100%;
}

/* Dice Animation */
@keyframes bounce {
  0%, 100% {
    transform: translateY(-5%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.animate-bounce {
  animation: bounce 0.5s infinite;
}

/* Dice faces */
.dice-face {
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 4px;
  position: relative;
}

.dice-face::before,
.dice-face::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: black;
  border-radius: 50%;
}

/* Dice face 1 */
.dice-1::before {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Dice face 2 */
.dice-2::before {
  top: 25%;
  left: 25%;
}
.dice-2::after {
  bottom: 25%;
  right: 25%;
}

/* Dice face 3 */
.dice-3::before {
  top: 25%;
  left: 25%;
}
.dice-3::after {
  bottom: 25%;
  right: 25%;
}
.dice-3 {
  position: relative;
}
.dice-3::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: black;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Dice face 4 */
.dice-4::before,
.dice-4::after {
  content: '';
  position: absolute;
}
.dice-4::before {
  top: 25%;
  left: 25%;
  box-shadow: calc(100% - 16px) 0 0 0 black;
}
.dice-4::after {
  bottom: 25%;
  left: 25%;
  box-shadow: calc(100% - 16px) 0 0 0 black;
}

/* Dice face 5 */
.dice-5::before,
.dice-5::after {
  content: '';
  position: absolute;
}
.dice-5::before {
  top: 25%;
  left: 25%;
  box-shadow: calc(100% - 16px) 0 0 0 black;
}
.dice-5::after {
  bottom: 25%;
  left: 25%;
  box-shadow: calc(100% - 16px) 0 0 0 black, 
              calc(50% - 4px) calc(-50% + 4px) 0 0 black;
}

/* Dice face 6 */
.dice-6::before,
.dice-6::after {
  content: '';
  position: absolute;
}
.dice-6::before {
  top: 25%;
  left: 25%;
  box-shadow: 0 calc(50% - 4px) 0 0 black, 
              calc(100% - 16px) 0 0 0 black,
              calc(100% - 16px) calc(50% - 4px) 0 0 black;
}
.dice-6::after {
  bottom: 25%;
  left: 25%;
  box-shadow: 0 calc(-50% + 4px) 0 0 black, 
              calc(100% - 16px) 0 0 0 black,
              calc(100% - 16px) calc(-50% + 4px) 0 0 black;
}
</style>