import { useState, useEffect } from 'react';
import { Recipe } from '../types/recipe';
import { favoritesStorage } from '../utils/localStorage';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    setFavorites(favoritesStorage.getFavorites());
  }, []);

  const addToFavorites = (recipe: Recipe) => {
    favoritesStorage.addToFavorites(recipe);
    setFavorites(favoritesStorage.getFavorites());
  };

  const removeFromFavorites = (recipeId: number) => {
    favoritesStorage.removeFromFavorites(recipeId);
    setFavorites(favoritesStorage.getFavorites());
  };

  const isFavorite = (recipeId: number) => {
    return favorites.some(fav => fav.id === recipeId);
  };

  const toggleFavorite = (recipe: Recipe) => {
    if (isFavorite(recipe.id)) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite
  };
};