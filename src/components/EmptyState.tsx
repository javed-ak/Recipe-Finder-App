import React from 'react';
import { Search, Heart, ChefHat } from 'lucide-react';

interface EmptyStateProps {
  type: 'search' | 'favorites' | 'no-results';
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type }) => {
  const config = {
    search: {
      icon: Search,
      title: 'Find Your Perfect Recipe',
      description: 'Search for recipes by ingredients, dish names, or dietary preferences. Try searching for "pasta", "chicken", or "vegan dessert".',
      suggestions: [
        'Search by ingredients: "tomatoes, basil, mozzarella"',
        'Try popular dishes: "spaghetti carbonara", "chicken tikka masala"',
        'Use dietary filters to find recipes that match your preferences'
      ]
    },
    favorites: {
      icon: Heart,
      title: 'No Favorites Yet',
      description: 'Start exploring recipes and save your favorites for easy access later.',
      suggestions: [
        'Browse recipes and click the heart icon to save favorites',
        'Your saved recipes will appear here',
        'Access your favorites anytime, even offline'
      ]
    },
    'no-results': {
      icon: ChefHat,
      title: 'No Recipes Found',
      description: 'Try adjusting your search terms or filters to find more recipes.',
      suggestions: [
        'Check your spelling and try different keywords',
        'Remove some filters to broaden your search',
        'Try searching for individual ingredients instead of dish names'
      ]
    }
  };

  const { icon: Icon, title, description, suggestions } = config[type];

  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
          <Icon className="w-8 h-8 text-orange-500" />
        </div>
        
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 mb-8 leading-relaxed">{description}</p>
        
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-center space-x-3 text-left">
              <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
              <span className="text-sm text-gray-700">{suggestion}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};