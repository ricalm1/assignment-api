const foodBtn = document.getElementById("food-btn");
const foodGrid = document.getElementById("food-grid");
const foodMode = document.getElementById("food-mode");

const drinkBtn = document.getElementById("drink-btn");
const drinkGrid = document.getElementById("drink-grid");
const drinkMode = document.getElementById("drink-mode");

function createCard(title, imageUrl, ingredientsList) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${imageUrl}" alt="${title}">
    <h2>${title}</h2>
    <ul>${ingredientsList}</ul>
  `;
  return card;
}

function getMealIngredients(meal) {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal["strIngredient" + i];
      const measure = meal["strMeasure" + i];
      if (ingredient && ingredient.trim() !== "") {
        ingredientsList += `<li>${measure || ""} ${ingredient}</li>`;
      }
    }
    return ingredientsList;
  }
  
  function getRandomFood() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then(response => response.json())
      .then(data => {
        const meal = data.meals[0];
        const ingredients = getMealIngredients(meal);
        const card = createCard(meal.strMeal, meal.strMealThumb, ingredients);
        foodGrid.appendChild(card);
      });
  }
  
  function loadFoods() {
    foodGrid.innerHTML = "";
    const count = Number(foodMode.value);
    for (let i = 0; i < count; i++) {
      getRandomFood();
    }
  }
  
  foodBtn.addEventListener("click", loadFoods);

  function getDrinkIngredients(drink) {
    let ingredientsList = "";
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink["strIngredient" + i];
      const measure = drink["strMeasure" + i];
      if (ingredient && ingredient.trim() !== "") {
        ingredientsList += `<li>${measure || ""} ${ingredient}</li>`;
      }
    }
    return ingredientsList;
  }
  
  function getRandomDrink() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then(response => response.json())
      .then(data => {
        const drink = data.drinks[0];
        const ingredients = getDrinkIngredients(drink);
        const card = createCard(drink.strDrink, drink.strDrinkThumb, ingredients);
        drinkGrid.appendChild(card);
      });
  }
  
  function loadDrinks() {
    drinkGrid.innerHTML = "";
    const count = Number(drinkMode.value);
    for (let i = 0; i < count; i++) {
      getRandomDrink();
    }
  }
  
  drinkBtn.addEventListener("click", loadDrinks);

  function getRandomIngredients() {
    const useFoodIngredients = Math.random() < 0.5;
    
    if (useFoodIngredients) {
      return fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(data => {
          const meal = data.meals[0];
          return getMealIngredients(meal);
        });
    } else {
      return fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(data => {
          const drink = data.drinks[0];
          return getDrinkIngredients(drink);
        });
    }
  }
   /* To make everything a little fuckywucky*/
  function getRandomFood() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then(response => response.json())
      .then(data => {
        const meal = data.meals[0];
        return getRandomIngredients().then(ingredients => {
          const card = createCard(meal.strMeal, meal.strMealThumb, ingredients);
          foodGrid.appendChild(card);
        });
      });
  }
  
  function getRandomDrink() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then(response => response.json())
      .then(data => {
        const drink = data.drinks[0];
        return getRandomIngredients().then(ingredients => {
          const card = createCard(drink.strDrink, drink.strDrinkThumb, ingredients);
          drinkGrid.appendChild(card);
        });
      });
  }


  window.addEventListener("DOMContentLoaded", () => {
    getRandomFood();
    getRandomDrink();
  });

const popout = document.getElementById("popoutPanel");
const img = document.getElementById("cornerImage");
const audio = document.getElementById("voiceAudio");

img.addEventListener("click", () => {
  const isOpen = img.classList.toggle("open");
  popout.classList.toggle("open");

  if (isOpen) {
    audio.currentTime = 0;
    audio.play();
  } else {
    audio.pause();
    audio.currentTime = 0;
  }
});