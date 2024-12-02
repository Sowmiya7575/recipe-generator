const SearchBox =document.querySelector('.SearchBox');
const searchBtn =document.querySelector('.searchBtn');
const recipeContainer =document.querySelector('.recipeContainer');
const recipeDetailsContent =document.querySelector('.recipeDetailsContent');
const recipeCloseBtn =document.querySelector('.recipeCloseBtn');

//Function to get recipes
const fetchRecipes=async(query)=>{
    recipeContainer.innerHTML="<h2>Fetching recipes...</h2>";
    const data =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const response= await  data.json();

    recipeContainer.innerHTML="";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span> ${meal.strArea}</span>  Dish</p>
             <p><span> ${meal.strcategory}</span>  Category </p>
        `
        const button = document.createElement('button');
        button.textContent="view recipe";
        recipeDiv.appendChild(button);

        // Adding addEventListener to recipe button
        button.addEventListener('click',()=>{
            openRecipePopup(meal);

        });


        recipeContainer.appendChild(recipeDiv);
    });
    //console.log(response.meals[0]);
}
const fetchIngredients=(meal)=>{
    let ingredientsList="";
    for (let i=1;i<20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure}${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}
const openRecipePopup = (meal)=>{
    recipeDetailsContent.innerHTML=`
      <h2 class ="recipeName">${ meal.strMeal}</h2>
      <h3>Ingredients:</h3>
      <ul class="IngredientList"> ${fetchIngredients(meal)}</ul>
      <div>
         <h3>Instructions:</h3>
         <p class = "recipeInstructions">${meal.strInstructions}</p>
     </div>

     `
    

    

    recipeDetailsContent.parentElement.style.display="block";

}


recipeCloseBtn .addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display="none";
});
searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput = SearchBox.value.trim();
    fetchRecipes(searchInput);
    //console.log("Button Clicked");
});
 