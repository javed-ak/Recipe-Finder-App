import { Recipe } from '../types/recipe';

const FAVORITES_KEY = 'recipe-finder-favorites';

export const favoritesStorage = {
  getFavorites(): Recipe[] {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  },

  addToFavorites(recipe: Recipe): void {
    try {
      const favorites = this.getFavorites();
      const exists = favorites.some(fav => fav.id === recipe.id);
      
      if (!exists) {
        favorites.push(recipe);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  },

  removeFromFavorites(recipeId: number): void {
    try {
      const favorites = this.getFavorites();
      const filtered = favorites.filter(fav => fav.id !== recipeId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  },

  isFavorite(recipeId: number): boolean {
    try {
      const favorites = this.getFavorites();
      return favorites.some(fav => fav.id === recipeId);
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  }
};