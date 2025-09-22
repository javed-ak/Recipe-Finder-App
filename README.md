# 🍳 Recipe Finder App

A modern, responsive recipe discovery application built with React, TypeScript, and Tailwind CSS. Find recipes by ingredients or dish names, explore detailed cooking instructions, and save your favorites for later.

![Recipe Finder App](https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## ✨ Features

### 🔍 Smart Search
- Search by ingredients (e.g., "tomatoes, basil, mozzarella")
- Search by dish names (e.g., "spaghetti carbonara", "chicken tikka masala")
- Real-time search with loading states

### 🎯 Advanced Filtering
- **Dietary Preferences**: Vegetarian, Vegan, Keto, Paleo
- **Food Restrictions**: Gluten-free, Dairy-free, Nut-free, Soy-free
- **Meal Types**: Main course, Appetizer, Dessert, Breakfast, Lunch, Dinner
- **Cooking Time**: Filter by maximum preparation time
- **Servings**: Filter by number of servings

### 📱 Beautiful UI/UX
- Responsive design that works on all devices
- Modern card-based layout with hover animations
- Smooth transitions and micro-interactions
- Clean typography with proper visual hierarchy
- Loading skeletons for better perceived performance

### ❤️ Favorites System
- Save recipes to favorites with one click
- Persistent storage using localStorage
- Dedicated favorites view
- Heart icon animations

### 📖 Detailed Recipe View
- Full ingredient lists with measurements
- Step-by-step cooking instructions
- Nutritional information
- Cooking time and serving information
- Dietary tags (vegetarian, vegan, gluten-free, etc.)
- Link to original recipe source

### 🎨 Design Highlights
- Warm color palette with orange accents
- Glassmorphism effects and subtle shadows
- 8px spacing system for consistent alignment
- Mobile-first responsive design
- Accessibility-focused interface

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/javed-ak/Recipe-Finder-App.git
   cd Recipe-Finder-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up API key** (Optional but recommended)
   - Get a free API key from [Spoonacular](https://spoonacular.com/food-api)
   - Open `src/services/recipeService.ts`
   - Replace `'YOUR_API_KEY_HERE'` with your actual API key:
   ```typescript
   const SPOONACULAR_API_KEY = 'your-actual-api-key-here';
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Start exploring recipes!

## 🔧 Configuration

### API Setup

The app uses the Spoonacular API for recipe data. While it includes mock data for demonstration, you'll get the best experience with a real API key.

**Free Tier Includes:**
- 150 requests per day
- Recipe search and details
- Nutritional information
- Ingredient analysis

**To get your API key:**
1. Visit [Spoonacular Food API](https://spoonacular.com/food-api)
2. Sign up for a free account
3. Navigate to your dashboard
4. Copy your API key
5. Update the `SPOONACULAR_API_KEY` in `src/services/recipeService.ts`

### Environment Variables (Optional)

For production deployments, you can use environment variables:

1. Create a `.env` file in the root directory:
   ```env
   VITE_SPOONACULAR_API_KEY=your-api-key-here
   ```

2. Update the service to use the environment variable:
   ```typescript
   const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY || 'YOUR_API_KEY_HERE';
   ```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── SearchBar.tsx   # Search input component
│   ├── FilterBar.tsx   # Recipe filters
│   ├── RecipeCard.tsx  # Individual recipe card
│   ├── RecipeGrid.tsx  # Recipe cards container
│   ├── RecipeModal.tsx # Detailed recipe view
│   └── EmptyState.tsx  # Empty state messages
├── hooks/              # Custom React hooks
│   ├── useRecipes.ts   # Recipe search logic
│   └── useFavorites.ts # Favorites management
├── services/           # API services
│   └── recipeService.ts # Spoonacular API integration
├── types/              # TypeScript type definitions
│   └── recipe.ts       # Recipe-related types
├── utils/              # Utility functions
│   └── localStorage.ts # Local storage helpers
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🛠️ Built With

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **Lucide React** - Beautiful icons
- **Spoonacular API** - Recipe data source

## 📱 Usage Examples

### Basic Search
```
Search: "pasta"
Results: Various pasta recipes with images and details
```

### Ingredient-Based Search
```
Search: "chicken, rice, vegetables"
Results: Recipes that can be made with those ingredients
```

### Filtered Search
```
Search: "dessert"
Filters: Vegetarian + Gluten-free + Under 30 minutes
Results: Quick vegetarian gluten-free desserts
```

## 🎯 Features in Detail

### Search Functionality
- **Flexible Input**: Accepts both ingredient lists and dish names
- **Auto-suggestions**: Smart search that understands cooking terminology
- **Real-time Results**: Instant feedback as you type
- **Error Handling**: Graceful fallbacks when API is unavailable

### Recipe Cards
- **Rich Information**: Image, title, cooking time, servings, likes
- **Quick Actions**: Favorite toggle, view details
- **Dietary Indicators**: Visual tags for dietary restrictions
- **Hover Effects**: Smooth animations on interaction

### Detailed View
- **Complete Information**: Full ingredients list, step-by-step instructions
- **Nutritional Data**: Calories, macronutrients, health score
- **Source Links**: Direct links to original recipes
- **Responsive Layout**: Optimized for mobile and desktop

### Favorites System
- **One-Click Save**: Easy favorite toggling
- **Persistent Storage**: Favorites saved between sessions
- **Quick Access**: Dedicated favorites view
- **Visual Feedback**: Heart animations and counters

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard if using API keys

### Deploy to Vercel
1. Connect your repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables in Vercel dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Spoonacular API](https://spoonacular.com/food-api) for providing comprehensive recipe data
- [Pexels](https://pexels.com) for beautiful food photography
- [Lucide](https://lucide.dev) for clean, consistent icons
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page for existing solutions
2. Create a new issue with detailed information
3. Include error messages, browser information, and steps to reproduce

---

**Happy Cooking! 👨‍🍳👩‍🍳**

*Made with ❤️ and lots of ☕*