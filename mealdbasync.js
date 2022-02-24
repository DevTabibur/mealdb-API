// @ts-nocheck
const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // clear the search-field data
    searchField.value = '';

    // error handle for if search-field is empty string
    if(searchText == ''){
        alert('Please search with a food name')
    }
    else{
        // load data
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.meals))
    }
    
};

const displaySearchResult = meals =>{
    const searchResult = document.getElementById('search-result');

    // remove previous data two ways example
    // searchResult.innerHTML = '';
    searchResult.textContent = '';

    // error handle when no meals are available to show
    // console.log(meals.length)
    if (meals.length == 0){
        // show no result found
    }

    // loop through for every single meal
    meals.forEach (meal => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadMealDetails(${meal.idMeal})" class="card">
           <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
           <div class="card-body">
             <h5 class="card-title">${meal.strMeal}</h5>
             <p class="card-text">${meal.strInstructions.slice(0, 120)}</p>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
};

// click on img & it'll show the meal details
const loadMealDetails = async mealId =>{
    const url = `
    https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}
    `;

    // normal solution
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayMealDetail(data.meals[0]))

    // we can use API instead of fetch, here another solution is
    // for this async must be written before mealId param
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetail(data.meals[0])

};

// display  meal details function
const displayMealDetail = meal => {
    // console.log(meal)
    const mealDetails = document.getElementById('meal-details');
    // removing previous meal details content
    mealDetails.textContent = '';

    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
       <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
       <div class="card-body">
           <h5 class="card-title">${meal.strMeal}</h5>
           <p class="card-text">${meal.strInstructions}</p>
           <a href="${meal.strYoutube}" class="btn btn-primary">See The Recipe</a>
        </div>
    `;
    mealDetails.appendChild(div);
}