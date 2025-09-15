import React, { useState } from "react";
import Recipe from "./components/Recipe";
import "./App.css";

function App() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Search recipes
  const searchRecipes = async () => {
    if (!ingredient) {
      setError("⚠ Please enter an ingredient");
      setRecipes([]);
      setSelectedRecipe(null);
      return;
    }

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const data = await response.json();

      if (data.meals) {
        setRecipes(data.meals);
        setError("");
        setSelectedRecipe(null);
      } else {
        setRecipes([]);
        setError("❌ No recipes found. Try chicken, beef, egg...");
        setSelectedRecipe(null);
      }
    } catch (err) {
      setError("⚠ Something went wrong. Please try again.");
      setRecipes([]);
      setSelectedRecipe(null);
    }
  };

  // Show recipe details
  const fetchRecipeDetails = async (id) => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await res.json();
      setSelectedRecipe(data.meals[0]);
    } catch (err) {
      setError("⚠ Something went wrong while fetching recipe details.");
    }
  };

  return (
    <div className="app">
      {!selectedRecipe && (
        <div className="center-wrapper">
          <h1>🍲 Recipe Ideas</h1>
          <p>Find recipes by entering an ingredient (e.g. chicken, egg, potato)</p>

          <div className="search-bar">
            <input
              type="search"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              placeholder="🔍 Search ingredient..."
            />
            <button onClick={searchRecipes}>Search</button>
          </div>

          {error && <p className="error">{error}</p>}
        </div>
      )}

      {/* Recipe list */}
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div
            key={recipe.idMeal}
            onClick={() => fetchRecipeDetails(recipe.idMeal)}
          >
            <Recipe
              name={recipe.strMeal}
              image={recipe.strMealThumb}
              id={recipe.idMeal}
            />
          </div>
        ))}
      </div>

      {/* Selected recipe details popup */}
      {selectedRecipe && (
        <div className="details-wrapper">
          <div className="recipe-details">
            <h2>{selectedRecipe.strMeal}</h2>

            <img
              src={
                selectedRecipe.strMealThumb ||
                "https://via.placeholder.com/400x300?text=No+Image"
              }
              alt={selectedRecipe.strMeal}
            />

            <p><b>Category:</b> {selectedRecipe.strCategory}</p>
            <p><b>Area:</b> {selectedRecipe.strArea}</p>

            <div className="instructions">
              <h3>Instructions</h3>
              <p>{selectedRecipe.strInstructions}</p>
            </div>

            <button
              onClick={() => setSelectedRecipe(null)}
              className="back-btn"
            >
              ❌ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
