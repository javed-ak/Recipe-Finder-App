import { useState } from 'react';
import { Recipe, SearchFilters } from '../types/recipe';
import { recipeService } from '../services/recipeService';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchRecipes = async (query: string, filters: SearchFilters = {}) => {
    if (!query.trim()) {
      setRecipes([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await recipeService.searchRecipes(query, filters);
      setRecipes(results);
    } catch (err) {
      setError('Failed to search recipes. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchByIngredients = async (ingredients: string[]) => {
    if (ingredients.length === 0) {
      setRecipes([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await recipeService.searchByIngredients(ingredients);
      setRecipes(results);
    } catch (err) {
      setError('Failed to search recipes by ingredients. Please try again.');
      console.error('Search by ingredients error:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearRecipes = () => {
    setRecipes([]);
    setError(null);
  };

  return {
    recipes,
    loading,
    error,
    searchRecipes,
    searchByIngredients,
    clearRecipes
  };
};