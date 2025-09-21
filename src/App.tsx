import { useState } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar';
import { RecipeGrid } from './components/RecipeGrid';
import { RecipeModal } from './components/RecipeModal';
import { EmptyState } from './components/EmptyState';
import { useRecipes } from './hooks/useRecipes';
import { useFavorites } from './hooks/useFavorites';
import { Recipe, SearchFilters } from './types/recipe';

function App() {
  const [currentView, setCurrentView] = useState<'search' | 'favorites'>('search');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [hasSearched, setHasSearched] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');

  const { recipes, loading, error, searchRecipes, clearRecipes } = useRecipes();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const handleSearch = async (query: string) => {
    setHasSearched(true);
    setCurrentQuery(query);
    await searchRecipes(query, filters);
  };

  const handleClearSearch = () => {
    clearRecipes();
    setHasSearched(false);
    setCurrentQuery('');
  };

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    if (hasSearched && currentQuery) {
      searchRecipes(currentQuery, newFilters);
    }
  };

  const displayRecipes = currentView === 'search' ? recipes : favorites;

  const showEmptyState = () => {
    if (currentView === 'favorites') {
      return favorites.length === 0;
    }
    if (currentView === 'search') {
      if (!hasSearched) return true;
      if (hasSearched && recipes.length === 0 && !loading) return true;
    }
    return false;
  };

  const getEmptyStateType = () => {
    if (currentView === 'favorites') return 'favorites';
    if (!hasSearched) return 'search';
    return 'no-results';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        favoritesCount={favorites.length}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'search' && (
          <>
            <div className="mb-8">
              <SearchBar
                onSearch={handleSearch}
                onClear={handleClearSearch}
                loading={loading}
              />
            </div>

            <FilterBar
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          </>
        )}

        {currentView === 'favorites' && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Favorite Recipes</h2>
            <p className="text-gray-600">
              {favorites.length === 0 
                ? "You haven't saved any recipes yet."
                : `${favorites.length} recipe${favorites.length === 1 ? '' : 's'} saved for later.`
              }
            </p>
          </div>
        )}

        {error && (
          <div className="mb-8 p-4 bg-red-100 border border-red-300 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {showEmptyState() ? (
          <EmptyState type={getEmptyStateType()} />
        ) : (
          <RecipeGrid
            recipes={displayRecipes}
            onViewDetails={setSelectedRecipe}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            loading={loading}
          />
        )}

        {selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite(selectedRecipe.id)}
          />
        )}
      </main>

      {/* API Key Notice */}
      
    </div>
  );
}

export default App;