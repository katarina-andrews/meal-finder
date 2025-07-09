const state = {
  currentPage: 1,
  currentIngredient: "",
  currentName: "",
  isRateLimit: false,
};

// const mealsPerPage = 3;


const recipeContainer = document.getElementById("recipe-container");
const randomBtn = document.getElementById("random-btn");
const nameSearchBtn = document.getElementById("search-name");
const ingredientSearchBtn = document.getElementById("ingredient-search-btn");

async function fetchRandom() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
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

async function fetchIngredient(ingredient) {
  state.currentIngredient = ingredient;
  state.isRateLimit = true;

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    if (!response.ok) {
      throw new Error("Network error. Status: ", response.status);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("ERROR fetching by ingredient: ", error.message);
  } finally {
    console.log("Finished fetching by ingredient");
  }
}

async function fetchName(name) {
  state.currentName = name;
  state.isRateLimit = true;

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
    if (!response.ok) {
      throw new Error("Network error. Status: ", response.status);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("ERROR fetching by name: ", error.message);
  } finally {
    console.log("Finished fetching by name");
  }
}

function renderMealDetails(mealData) {
  recipeContainer.innerHTML = "";

  mealData.forEach((meals) => {
    const mealElm = document.createElement("div");
    mealElm.className = "text-center p-3";

    const nameElm = document.createElement("h1");
    nameElm.innerHTML = meals.strMeal;
    nameElm.className = "text-2xl font-bold pt-2";

    const categoryElm = document.createElement("p");
    categoryElm.innerHTML = `<strong>Category:</strong> ${meals.strCategory}`;

    const areaElm = document.createElement("p");
    areaElm.innerHTML = `<strong>Origin:</strong> ${meals.strArea}`;

    //change this so each sentence is a li to make it easier to read
    const instructionsTitle = document.createElement("h2");
    instructionsTitle.innerHTML = `<strong>Instructions</strong>`;
    instructionsTitle.className = "text-lg";
    const instructionsListElm = document.createElement("ul");
    const instructions = meals.strInstructions.split(/(?<=\.)\s+/); //each sentence after the period is a new line

    for (let i = 0; i < instructions.length; i++) {
      const list = document.createElement("li");
      list.innerHTML = instructions[i];
      instructionsListElm.appendChild(list);
    }

    const imgElm = document.createElement("img");
    imgElm.src = meals.strMealThumb;
    imgElm.alt = meals.strMeal;
    imgElm.className = "p-2 mx-auto";
    // max-width-[300px]

    const tagsElm = document.createElement("p");
    tagsElm.innerHTML = meals.strTags
      ? `<strong>Tags:</strong> ${meals.strTags.replace(/,/g, ", ")}` //adds space after each comma
      : "";

    const videoLinkElm = document.createElement("a");
    videoLinkElm.href = meals.strYoutube;
    videoLinkElm.innerHTML = "Recipe Video";
    videoLinkElm.target = "_blank";
    videoLinkElm.className =
      "p-1 text-white bg-amber-500 hover:cursor-pointer hover:bg-amber-400 font-bold text-lg";

    //ingredients and measurements both have 20 total and every recipe has a different amount
    const ingredientListELm = document.createElement("h2");
    ingredientListELm.innerHTML = `<strong>Ingredients</strong>`;
    ingredientListELm.className = "text-xl";
    const ingredientAndMeasureListElm = document.createElement("ul");
    for (let i = 1; i <= 20; i++) {
      const ingredient = meals[`strIngredient${i}`];
      const measure = meals[`strMeasure${i}`];

      if (ingredient) {
        const list = document.createElement("li");
        list.innerHTML = `${ingredient} - <i>${measure}</i>`;
        ingredientAndMeasureListElm.appendChild(list);
      }
    }
    ingredientAndMeasureListElm.className = "list-disc list-inside";

    mealElm.appendChild(nameElm);
    mealElm.appendChild(imgElm);
    mealElm.appendChild(ingredientListELm);
    mealElm.appendChild(ingredientAndMeasureListElm);
    mealElm.appendChild(instructionsTitle);
    mealElm.appendChild(instructionsListElm);
    mealElm.appendChild(categoryElm);
    mealElm.appendChild(areaElm);
    mealElm.appendChild(tagsElm);
    mealElm.appendChild(videoLinkElm);

    recipeContainer.appendChild(mealElm);
  });
}

// function handleIngredientSearch(event) {
//   event.preventDefault();
//   recipeContainer.innerHTML = "";
//   const ingredient = event.target["search-ingredient"].value;

//   if (!ingredient) {
//      recipeContainer.innerHTML = "Please enter a valid ingredient."
//      return;
//   }




// }



// function handleNameSearch(event) {
//    event.preventDefault();
//   recipeContainer.innerHTML = "";
//   const name = event.target["search-name"].value;

//   if (!name) {
//      recipeContainer.innerHTML = "Please enter a valid name."
//      return;
//   }



// }



//  function renderPagination() {
// // const paginationContainer = document.getElementById("pagination-section")
// //  paginationContainer.innerHTML = "";
// //   const prevBtn = document.getElementById("previous");
// //   const nextBtn = document.getElementById("next");

// //   prevBtn.disabled = ;
// //   nextBtn.disabled = ;

// //   prevBtn.onclick = async () => { 
// //     if (state.isRateLimit) {
// //       alert("Rate limit exceeded. Please wait.");
// //       return;
// //     }



// //   }

// //   nextBtn.onclick = async () => {
// //     if (state.isRateLimit) {
// //       alert("Rate limit exceeded. Please wait.");
// //       return;
// //     }



// //   }


// //   const pageCountElem = document.createElement("p");
// //   pageCountElem.innerHTML = `Page ${state.currentPage} of ${}`;
// //   pageCountElem.className = "text-center font-bold text-amber-500";
// //   paginationContainer.appendChild(pageCountElem);
// }



randomBtn.addEventListener("click", async () => {
  const data = await fetchRandom();
  renderMealDetails(data.meals);
});

// nameSearchBtn.addEventListener("click", )
// ingredientSearchBtn.addEventListener("click", )