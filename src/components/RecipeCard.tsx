import React from 'react';
import { Clock, Users, Heart, ChefHat } from 'lucide-react';
import { Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onViewDetails: (recipe: Recipe) => void;
  onToggleFavorite: (recipe: Recipe) => void;
  isFavorite: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onViewDetails,
  onToggleFavorite,
  isFavorite
}) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400';
  };

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group">
      <div className="relative overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={handleImageError}
        />
        <div className="absolute top-4 right-4">
          <button
            onClick={() => onToggleFavorite(recipe)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
              isFavorite
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        {recipe.healthScore && recipe.healthScore > 70 && (
          <div className="absolute top-4 left-4">
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Healthy
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {recipe.title}
        </h3>
        
        {recipe.summary && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {stripHtml(recipe.summary)}
          </p>
        )}

        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          {recipe.readyInMinutes && (
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.readyInMinutes} min</span>
            </div>
          )}
          
          {recipe.servings && (
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{recipe.servings} servings</span>
            </div>
          )}
          
          {recipe.aggregateLikes && (
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{recipe.aggregateLikes} likes</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.vegetarian && (
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              Vegetarian
            </span>
          )}
          {recipe.vegan && (
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              Vegan
            </span>
          )}
          {recipe.glutenFree && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              Gluten-Free
            </span>
          )}
        </div>

        <button
          onClick={() => onViewDetails(recipe)}
          className="w-full px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium flex items-center justify-center space-x-2"
        >
          <ChefHat className="w-4 h-4" />
          <span>View Recipe</span>
        </button>
      </div>
    </div>
  );
};