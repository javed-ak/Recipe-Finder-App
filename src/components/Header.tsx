import React from 'react';
import { ChefHat, Heart } from 'lucide-react';

interface HeaderProps {
  currentView: 'search' | 'favorites';
  onViewChange: (view: 'search' | 'favorites') => void;
  favoritesCount: number;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, favoritesCount }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <ChefHat className="w-8 h-8 text-orange-500" />
            <h1 className="text-2xl font-bold text-gray-900">RecipeFinder</h1>
          </div>
          
          <nav className="flex space-x-1">
            <button
              onClick={() => onViewChange('search')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'search'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Search
            </button>
            <button
              onClick={() => onViewChange('favorites')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                currentView === 'favorites'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Favorites</span>
              {favoritesCount > 0 && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  currentView === 'favorites' ? 'bg-white text-orange-500' : 'bg-orange-500 text-white'
                }`}>
                  {favoritesCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};