import { Recipe, SearchFilters } from '../types/recipe';

const SPOONACULAR_API_KEY = "5ab16aa5e0d64d6e91d4523e9ff304cb"; // Replace with your actual Spoonacular API key
const BASE_URL = 'https://api.spoonacular.com/recipes';

// For demo purposes, we'll use mock data if no API key is provided
const MOCK_RECIPES: Recipe[] = [
  {
    id: 1,
    title: 'Spaghetti Carbonara',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
    readyInMinutes: 20,
    servings: 4,
    aggregateLikes: 156,
    healthScore: 45,
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    extendedIngredients: [
      {
        id: 11420420,
        aisle: 'Pasta and Rice',
        image: 'spaghetti.jpg',
        consistency: 'solid',
        name: 'spaghetti',
        nameClean: 'spaghetti',
        original: '400g spaghetti',
        originalName: 'spaghetti',
        amount: 400,
        unit: 'g',
        meta: [],
        measures: { us: { amount: 14.1, unitShort: 'oz', unitLong: 'ounces' }, metric: { amount: 400, unitShort: 'g', unitLong: 'grams' } }
      }
    ],
    analyzedInstructions: [
      {
        name: '',
        steps: [
          { number: 1, step: 'Bring a large pot of salted water to a boil.', ingredients: [], equipment: [] },
          { number: 2, step: 'Cook spaghetti according to package instructions until al dente.', ingredients: [], equipment: [] },
          { number: 3, step: 'In a large bowl, whisk together eggs and grated Parmesan cheese.', ingredients: [], equipment: [] }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Vegetarian Buddha Bowl',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'A nutritious and colorful bowl packed with fresh vegetables, quinoa, and tahini dressing.',
    readyInMinutes: 35,
    servings: 2,
    aggregateLikes: 89,
    healthScore: 85,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    extendedIngredients: [],
    analyzedInstructions: []
  },
  {
    id: 3,
    title: 'Chicken Tikka Masala',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Creamy and flavorful Indian curry with tender chicken in a rich tomato-based sauce.',
    readyInMinutes: 45,
    servings: 6,
    aggregateLikes: 234,
    healthScore: 60,
    vegetarian: false,
    vegan: false,
    glutenFree: true,
    extendedIngredients: [],
    analyzedInstructions: []
  },
  {
    id: 4,
    title: 'Avocado Toast',
    image: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Simple and healthy breakfast with mashed avocado on toasted bread, topped with seeds.',
    readyInMinutes: 10,
    servings: 2,
    aggregateLikes: 67,
    healthScore: 75,
    vegetarian: true,
    vegan: true,
    glutenFree: false,
    extendedIngredients: [],
    analyzedInstructions: []
  }
];

class RecipeService {
  private apiKey: string;

  constructor() {
    this.apiKey = SPOONACULAR_API_KEY;
  }

  async searchRecipes(query: string, filters: SearchFilters = {}, number: number = 12): Promise<Recipe[]> {
    // For demo purposes, return mock data if no API key
    if (!this.apiKey || this.apiKey === 'YOUR_API_KEY') {
      return this.getMockSearchResults(query, filters);
    }

    try {
      const params = new URLSearchParams({
        apiKey: this.apiKey,
        query,
        number: number.toString(),
        addRecipeInformation: 'true',
        fillIngredients: 'true',
        ...this.buildFilterParams(filters)
      });

      const response = await fetch(`${BASE_URL}/complexSearch?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error searching recipes:', error);
      return this.getMockSearchResults(query, filters);
    }
  }

  async getRecipeDetails(id: number): Promise<Recipe | null> {
    // For demo purposes, return mock data if no API key
    if (!this.apiKey || this.apiKey === 'YOUR_API_KEY') {
      return MOCK_RECIPES.find(recipe => recipe.id === id) || null;
    }

    try {
      const response = await fetch(`${BASE_URL}/${id}/information?apiKey=${this.apiKey}&includeNutrition=true`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipe details');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      return MOCK_RECIPES.find(recipe => recipe.id === id) || null;
    }
  }

  async searchByIngredients(ingredients: string[], number: number = 12): Promise<Recipe[]> {
    // For demo purposes, return mock data if no API key
    if (!this.apiKey || this.apiKey === 'YOUR_API_KEY') {
      return MOCK_RECIPES.slice(0, number);
    }

    try {
      const params = new URLSearchParams({
        apiKey: this.apiKey,
        ingredients: ingredients.join(','),
        number: number.toString(),
        ranking: '1',
        ignorePantry: 'true'
      });

      const response = await fetch(`${BASE_URL}/findByIngredients?${params}`);
      if (!response.ok) {
        throw new Error('Failed to search by ingredients');
      }

      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error('Error searching by ingredients:', error);
      return MOCK_RECIPES.slice(0, number);
    }
  }

  private buildFilterParams(filters: SearchFilters): Record<string, string> {
    const params: Record<string, string> = {};

    if (filters.diet) params.diet = filters.diet;
    if (filters.intolerances) params.intolerances = filters.intolerances;
    if (filters.type) params.type = filters.type;
    if (filters.cuisine) params.cuisine = filters.cuisine;
    if (filters.maxReadyTime) params.maxReadyTime = filters.maxReadyTime.toString();
    if (filters.minServings) params.minServings = filters.minServings.toString();
    if (filters.maxServings) params.maxServings = filters.maxServings.toString();

    return params;
  }

  private getMockSearchResults(query: string, filters: SearchFilters): Recipe[] {
    let results = [...MOCK_RECIPES];

    // Apply filters
    if (filters.diet === 'vegetarian') {
      results = results.filter(recipe => recipe.vegetarian);
    }
    if (filters.diet === 'vegan') {
      results = results.filter(recipe => recipe.vegan);
    }
    if (filters.intolerances === 'gluten') {
      results = results.filter(recipe => recipe.glutenFree);
    }

    // Simple search simulation
    if (query) {
      results = results.filter(recipe => 
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.summary?.toLowerCase().includes(query.toLowerCase())
      );
    }

    return results;
  }
}

export const recipeService = new RecipeService();