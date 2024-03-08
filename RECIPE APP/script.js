
const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');

const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseButton = document.querySelector('.recipe-close-btn');

//calling this function to get the recipes 
const fetchrecipe = async (query) => {
   recipeContainer.innerHTML = "<h2>fetching recipe ...</h2>";

   const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
   const response =  await data.json();
   
   recipeContainer.innerHTML = "";
   response.meals.forEach(meal => {
       const recipeDiv = document.createElement('div');
       recipeDiv.classList.add('recipe');

       //UI pr show krn eke liye yhee  krenge apna html fix 
       recipeDiv.innerHTML = `  
       <img src = "${meal.strMealThumb}">
       <h3>${meal.strMeal}</h3>
       <p><span>${meal.strArea}</span>Dish</p>
       <p>${meal.strCategory}</p>
       `
       
       
       
       //ab hum ek button bnayege jo hume recipes pr le jaaye 
       const button = document.createElement('button');
       button.textContent = "view recipe";
       recipeDiv.appendChild(button);
       
       //adding eventlistener to recipe button
       //jaise hi mein view button pr click krunga jo mene crate kiya hai  toh mujhe ab meri recipes dekhi hai uske liye ek  function call krdiya recipepopup
       button.addEventListener('click',  ()=> {
           openRecipePopup(meal);
       });



       //mealthumb image access krne liye hai 
       recipeContainer.appendChild(recipeDiv);
       
   });
}

//function to fetch ingridents and measurements 
const fetchIngreDients = (meal) => {
     
   let ingridentsList = "";
   for(let i = 1 ; i <=20 ; i++){
       const ingrident = meal[`strIngredient${i}`];
       
       if(ingrident){
           const measure = meal[`strMeasure${i}`];
           ingridentsList += `<li>${measure} ${ingrident}</li>`

       }
       else {
           //agr ingridint nhi mila toh break krdo 
           //return hojaoo
           break;
       }
       
   }

   return ingridentsList;


}


const openRecipePopup = (meal) => {
   recipeDetailsContent.innerHTML = `
   <h2 class="recipeName">${meal.strMeal}</h2>
   <h3>Ingrediants</h3>
   <ul class="ingridientsList">${fetchIngreDients(meal)}</ul>
   
   <div class="RecipeInstructions">
       <h3>Instructions:</h3>
       <p>${meal.strInstructions}</p>
   </div>

   `
   

   
   //parent element ki display block hojaegi which is here parents detail whenever i click here
   recipeDetailsContent.parentElement.style.display = "block";

     
}

//jab bhi mein search btn pe click kru khuchb call hojaye 
searchBtn.addEventListener('click' , (e) => {
     e.preventDefault(); //yeh aapko aapka page reload hone se bchayega  / yeh automatically refresh nhi hoga
     const searchInput = searchBox.value.trim();
     fetchrecipe(searchInput);
});

//to close the instruction  button 
//think it 
recipeCloseButton.addEventListener('click' , (e) => {
      recipeDetailsContent.parentElement.style.display = "none";
});

