const recipeContainer = document.getElementById("recipe-container");
const randomBtn = document.getElementById("random-btn");

// implement the two search input. add async functions
// const recipeSearchBtn = document.getElementById("recipe-search-btn");

async function fetchRandom() {
  try {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
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

//need to add data.meals somewhere. probably in the event listener


function renderRandomMeal(mealData) {
  recipeContainer.innerHTML = "";

  //not working probably because of data.meals missing 
  mealData.forEach((meal) => {
    const mealElm = document.createElement("div");
    mealElm.className = "";

    const nameElm = document.createElement("h1");
    nameElm.innerHTML = meal.strMeal;
    nameElm.className = "text-2xl font-bold";

    const categoryElm = document.createElement("p");
    categoryElm.innerHTML = `Category: ${meal.strCategory}`;
    categoryElm.className = "";

    const areaElm = document.createElement("p");
    areaElm.innerHTML = `Origin: ${meal.strArea}`;
    areaElm.className = "";

    //change this so each sentence is a li to make it easier to read
    const instructionElm = document.createElement("p");
    instructionElm.innerHTML = `Instructions: ${meal.strInstructions}`;
    instructionElm.className = "";

    const imgElm = document.createElement("img");
    imgElm.src = meal.strMealThumb;
    imgElm.alt = meal.strMeal;
    imgElm.className = "";

    const tagsElm = document.createElement("p");
    tagsElm.innerHTML = `Tags: ${meal.strTags}`;
    tagsElm.className = "";

    const videoLinkElm = document.createElement("a");
    videoLinkElm.href = meal.strYoutube;
    videoLinkElm.innerHTML = "Recipe Video";
    videoLinkElm.target = "_blank";
    videoLinkElm.className = "";



    // // change these to for loops 1 - 20 for both 
    //  const ingrAndMeasListElm = document.createElement("ul");
    //  for (let i = 1; i <= 20; i++) {

    //  }
    // // ingredientElm.innerHTML = meal.strIngredient;
    // // ingrAndMeasListElm.className = "";

    // // const measureElm = document.createElement("p");
    // meal.strMeasure;
  

    mealElm.appendChild(nameElm);
    mealElm.appendChild(imgElm);
    // mealElm.appendChild(ingrAndMeasListElm);
    mealElm.appendChild(instructionElm);
    mealElm.appendChild(categoryElm);
    mealElm.appendChild(areaElm);
    mealElm.appendChild(tagsElm);
    mealElm.appendChild(videoLinkElm);

    recipeContainer.appendChild(mealElm);
  });
}

randomBtn.addEventListener("click", renderRandomMeal);


