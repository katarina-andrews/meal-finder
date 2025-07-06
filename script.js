const recipeContainer = document.getElementById("recipe-container");
const randomBtn = document.getElementById("random-btn");
// const recipeSearchBtn = document.getElementById("recipe-search-btn");

async function fetchRandom() {
  try {
    const response = await fetch("www.themealdb.com/api/json/v1/1/random.php");
    if (!response.ok) {
      throw new Error("Network error. Status: ", response.status);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("ERROR fetching random recipe: ", error.message);
  } finally {
    console.log("Finished fetching random recipe");
  }
}

function renderRandomRecipe(recipeData) {
  recipeContainer.innerHTML = "";

  recipeData.forEach((recipe) => {
    const recipeElm = document.createElement("div");
    recipeElm.className = "";

    const nameElm = document.createElement("h1");
    nameElm.innerHTML = recipe.strMeal;
    nameElm.className = "";

    const categoryElm = document.createElement("p");
    categoryElm.innerHTML = `Category: ${recipe.strCategory}`;
    categoryElm.className = "";

    const areaElm = document.createElement("p");
    areaElm.innerHTML = `Origin: ${recipe.strArea}`;
    areaElm.className = "";

    const instructionElm = document.createElement("p");
    instructionElm.innerHTML = `Instructions: ${recipe.strInstructions}`;
    instructionElm.className = "";

    const imgElm = document.createElement("img");
    imgElm.src = recipe.strMealThumb;
    imgElm.alt = recipe.strMeal;
    imgElm.className = "";

    const tagsElm = document.createElement("p");
    tagsElm.innerHTML = `Tags: ${recipe.strTags}`;
    tagsElm.className = "";

    const videoLinkElm = document.createElement("a");
    videoLinkElm.href = recipe.strYoutube;
    videoLinkElm.innerText = "Recipe Video";
    videoLinkElm.target = "_blank";
    videoLinkElm.className = "";

    // change these to for loops 1 - 20 for both 
    // const ingredientElm = document.createElement("p");
    // ingredientElm.innerHTML = recipe.strIngredient;
    // ingredientElm.className = "";

    // const measureElm = document.createElement("p");
    // measureElm.innerHTML = recipe.strMeasure;
    // measureElm.className = "";

    recipeElm.appendChild(nameElm);
    recipeElm.appendChild(imgElm);
    // recipeElm.appendChild(ingredientElm);
    // recipeElm.appendChild(measureElm);
    recipeElm.appendChild(instructionElm);
    recipeElm.appendChild(categoryElm);
    recipeElm.appendChild(areaElm);
    recipeElm.appendChild(tagsElm);
    recipeElm.appendChild(videoLinkElm);

    recipeContainer.appendChild(recipeElm);
  });
}

randomBtn.addEventListener("click", renderRandomRecipe);
