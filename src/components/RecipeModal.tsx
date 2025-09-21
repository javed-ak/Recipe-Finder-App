import React, { useState, useEffect } from 'react';
import { X, Clock, Users, Heart, ExternalLink, ChefHat } from 'lucide-react';
import { Recipe } from '../types/recipe';
import { recipeService } from '../services/recipeService';

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
  onToggleFavorite: (recipe: Recipe) => void;
  isFavorite: boolean;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  onClose,
  onToggleFavorite,
  isFavorite
}) => {
  const [detailedRecipe, setDetailedRecipe] = useState<Recipe>(recipe);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const details = await recipeService.getRecipeDetails(recipe.id);
        if (details) {
          setDetailedRecipe(details);
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [recipe.id]);

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <ChefHat className="w-6 h-6 text-orange-500" />
            <span>Recipe Details</span>
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleFavorite(detailedRecipe)}
              className={`p-2 rounded-full transition-all duration-200 ${
                isFavorite
                  ? 'bg-red-500 text-white'
                  : 'text-gray-400 hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-64 bg-gray-300 rounded-xl"></div>
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        ) : (
          <div className="p-6">
            {/* Recipe Image and Basic Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <img
                  src={detailedRecipe.image}
                  alt={detailedRecipe.title}
                  className="w-full h-64 lg:h-80 object-cover rounded-xl"
                  onError={handleImageError}
                />
              </div>
              
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {detailedRecipe.title}
                </h1>
                
                {detailedRecipe.summary && (
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {stripHtml(detailedRecipe.summary)}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {detailedRecipe.readyInMinutes && (
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-orange-500" />
                      <span className="text-gray-700">{detailedRecipe.readyInMinutes} minutes</span>
                    </div>
                  )}
                  
                  {detailedRecipe.servings && (
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-orange-500" />
                      <span className="text-gray-700">{detailedRecipe.servings} servings</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {detailedRecipe.vegetarian && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Vegetarian
                    </span>
                  )}
                  {detailedRecipe.vegan && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Vegan
                    </span>
                  )}
                  {detailedRecipe.glutenFree && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      Gluten-Free
                    </span>
                  )}
                  {detailedRecipe.dairyFree && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      Dairy-Free
                    </span>
                  )}
                  {detailedRecipe.veryHealthy && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Very Healthy
                    </span>
                  )}
                </div>

                {detailedRecipe.sourceUrl && (
                  <a
                    href={detailedRecipe.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Original Recipe</span>
                  </a>
                )}
              </div>
            </div>

            {/* Ingredients */}
            {detailedRecipe.extendedIngredients && detailedRecipe.extendedIngredients.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ingredients</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {detailedRecipe.extendedIngredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-800">{ingredient.original}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instructions */}
            {detailedRecipe.analyzedInstructions && detailedRecipe.analyzedInstructions.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Instructions</h2>
                {detailedRecipe.analyzedInstructions.map((instruction, instructionIndex) => (
                  <div key={instructionIndex}>
                    {instruction.name && (
                      <h3 className="text-lg font-medium text-gray-800 mb-3">{instruction.name}</h3>
                    )}
                    <div className="space-y-4">
                      {instruction.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex space-x-4">
                          <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                            {step.number}
                          </span>
                          <div className="flex-1">
                            <p className="text-gray-800 leading-relaxed">{step.step}</p>
                            {step.length && (
                              <p className="text-sm text-gray-500 mt-1">
                                Time: {step.length.number} {step.length.unit}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Instructions fallback */}
            {detailedRecipe.instructions && (!detailedRecipe.analyzedInstructions || detailedRecipe.analyzedInstructions.length === 0) && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Instructions</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {stripHtml(detailedRecipe.instructions)}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};