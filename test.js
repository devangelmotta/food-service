const user = {
    id: '1',
    name: 'Nombre del UsuarioA',
    preferences: [
      { type: 'cuisine', value: 'Comida China' },
      { type: 'ingrediente', value: 'arroz' },
      { type: 'ingrediente', value: 'pescado' },
    ],
  };
  
  const restaurants = [
    {
      id: '1001',
      name: 'Restaurante A',
      location: 'Ciudad XYZ',
      cuisineType: 'Comida Americana',
    },
    
    {
      id: '1002',
      name: 'Restaurante Chino',
      location: 'Ciudad XYZ',
      cuisineType: 'Comida China',
    },
    {
      id: '1003',
      name: 'Restaurante Colombiano',
      location: 'Ciudad XYZ',
      cuisineType: 'Comida China',
    },
    {
      id: '1004',
      name: 'El Resplandor',
      location: 'Ciudad XYZ',
      cuisineType: 'Comida Italiana',
    },
  ];
  
  const foods = [
    {
      id: '1',
      name: 'Hamburguesa',
      description: 'Deliciosa hamburguesa con queso',
      price: 10,
      restaurantId: '1001',
      ingredients: ['Carne de res', 'Pan', 'Queso', 'Lechuga', 'Tomate'],
    },
    {
      id: '2',
      name: 'Pasta',
      description: 'Deliciosa pasta italiana con salsa',
      price: 12,
      restaurantId: '1002',
      ingredients: ['Carne de res', 'Pan', 'Queso', 'Lechuga', 'Tomate'],
    },
    {
      id: '3',
      name: 'Arroz Chino',
      description: 'Delicioso arroz chino con vegetales',
      price: 8,
      restaurantId: '1003',
      ingredients: ['Carne de res', 'arroz', 'pescado', 'Lechuga', 'Tomate'],
    },
    {
      id: '4',
      name: 'Bandeja paisa',
      description: 'Plato tradicional colombiano con carne y frijoles',
      price: 15,
      restaurantId: '1004',
      ingredients: ['Carne de res', 'arroz', 'Lechuga', 'Tomate'],
    },
  ];
  

// 1. Separar la lógica de obtención de preferencias del usuario en una función aparte

function getUserPreferences(preferences) {
    const preferencesMap = new Map();
    for (const preference of preferences) {
      const { type, value } = preference;
      if (!preferencesMap.has(type)) {
        preferencesMap.set(type, new Set());
      }
      const preferenceSet = preferencesMap.get(type);
      preferenceSet.add(value);
    }
    return preferencesMap;
  }
  
  // 2. Crear un mapa de ingredientes por comida para una búsqueda más eficiente
  
  function createFoodIngredientsMap(foods) {
    const foodIngredientsMap = new Map();
    for (const food of foods) {
      const { id, ingredients } = food;
      foodIngredientsMap.set(id, new Set(ingredients));
    }
    return foodIngredientsMap;
  }
  
  // 3. Calcular la similitud entre las preferencias y un restaurante
  
  function calculateRestaurantSimilarity(preferences, restaurant, preferencesMap, foodIngredientsMap) {
    let similarity = 0;
  
    const cuisinePreferences = preferencesMap.get('cuisine');
    if (cuisinePreferences && cuisinePreferences.has(restaurant.cuisineType)) {
      similarity += 1;
    }
  
    const restaurantFoods = foods.filter(food => food.restaurantId === restaurant.id);
    const ingredientPreferences = preferencesMap.get('ingrediente');
    if (ingredientPreferences) {
      for (const preference of ingredientPreferences) {
        for (const food of restaurantFoods) {
          const ingredients = foodIngredientsMap.get(food.id);
          if (ingredients && ingredients.has(preference)) {
            similarity += 1;
            break;
          }
        }
      }
    }
  
    return similarity;
  }
  
  // 4. Calcular la similitud entre las preferencias y una comida
  
  function calculateFoodSimilarity(preferences, food, preferencesMap, foodIngredientsMap) {
    let similarity = 0;
  
    const ingredientPreferences = preferencesMap.get('ingrediente');
    if (ingredientPreferences) {
      const foodIngredients = foodIngredientsMap.get(food.id);
      if (foodIngredients) {
        for (const preference of ingredientPreferences) {
          if (foodIngredients.has(preference)) {
            similarity += 1;
          }
        }
      }
    }
  
    return similarity;
  }
  
  // Obtener las preferencias del usuario
  const userPreferences = getUserPreferences(user.preferences);
  
  // Crear un mapa de ingredientes por comida para una búsqueda más eficiente
  const foodIngredientsMap = createFoodIngredientsMap(foods);
  
  // Calcular la similitud para cada restaurante y crear una lista de objetos { restaurant, similarity }
  const recommendedRestaurants = restaurants.map(restaurant => ({
    restaurant,
    similarity: calculateRestaurantSimilarity(user.preferences, restaurant, userPreferences, foodIngredientsMap),
  }));
  
  // Calcular la similitud para cada comida y crear una lista de objetos { food, similarity }
  const recommendedFoods = foods.map(food => ({
    food,
    similarity: calculateFoodSimilarity(user.preferences, food, userPreferences, foodIngredientsMap),
  }));
  
  // Ordenar la lista de restaurantes por similitud de mayor a menor
  recommendedRestaurants.sort((a, b) => b.similarity - a.similarity);
  
  // Ordenar la lista de comidas por similitud de mayor a menor
  recommendedFoods.sort((a, b) => b.similarity - a.similarity);
  
  // Obtener solo la lista de restaurantes ordenados con la propiedad "similarity"
  const recommendedRestaurantsList = recommendedRestaurants.map(item => ({
    ...item.restaurant,
    similarity: item.similarity,
  }));
  
  // Obtener solo la lista de comidas ordenadas con la propiedad "similarity"
  const recommendedFoodList = recommendedFoods.map(item => ({
    ...item.food,
    similarity: item.similarity,
  }));
  
  console.log({ recommendedRestaurantsList, recommendedFoodList });
  