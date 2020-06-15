const baseURL = "https://api.edamam.com/search";
const app_id = "dfeb4296";
const app_key = "9614ff8a4ae7a4683f6363aa49e74856";
let url;
// https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free"

//give input elements names to then use input later on
const ingredientNumber = document.querySelector('#ingredient-number');
const diet = document.querySelector('#diet-type');
const health = document.querySelector('#health-type');
const submit = document.querySelector('#submit');
const keyword = document.querySelector('#keyword');
const searchForm = document.querySelector('form');
const section = document.querySelector('section');


searchForm.addEventListener('submit', fetchResults); 

function fetchResults(e){
        e.preventDefault();
//starting to build the URL

 //NEED TO MAKE THIS INPUT RATHER THAN Variable data
        url = `${baseURL}?q=${keyword.value}&app_id=${app_id}&app_key=${app_key}`;
        console.log(url);


//adding ingr input value to the fetch url
        if (ingredientNumber.value !== "default"){
                url += "&ingr=" + ingredientNumber.value;
                console.log(url);
        }
//adding diet input value to fetch url
        if (diet.value !== "default"){
                url += "&diet=" + diet.value;
                console.log(url);
        }
//adding health input value to fetch url
        if (health.value !== "default"){
                url += "&health=" + health.value;
                console.log(url);
        }
        console.log(url);
        fetch(url)
                .then(function(result){
                return result.json();
        })      .then(function(json){
                displayResults(json);
        })
} //end of fetchResults()

function displayResults(json){
        let recipes = json.hits;
        console.log(recipes);

        // while (section.firstChild){
        //         section.removeChild(section.firstChild); //clears previous search results
        // }

        if(recipes.length === 0){
                console.log("No Results")//need to show this one PAGE!!
        } else {
                for(let i = 0; i < recipes.length; i++){
                        let article = document.createElement('article');
                        let heading = document.createElement('h2');
                        let link = document.createElement('a');
                        let img = document.createElement('img');
                        let para = document.createElement('p');
                        let clearfix = document.createElement('div'); 
                        
                        let current = recipes[i];
                        console.log("Current:", current);

                        link.href = current.recipe.url;
                        link.textContent = current.recipe.label;
                        console.log(link.textContent);
                        console.log(link.href);
                        para.textContent = 'Calories: ';

                        let span = document.createElement('span');
                        span.textContent += current.recipe.calories; 
                        para.appendChild(span);
                        
                        img.src = current.recipe.image;
                        console.log(img.src);

                        clearfix.setAttribute('class', 'clearfix'); //clearfix clears child elements

                        article.appendChild(heading);  //adds all elements to the page
                        heading.appendChild(link);
                        article.appendChild(img);
                        article.appendChild(para);
                        article.appendChild(clearfix);
                        section.appendChild(article);

                } //end of for loop running through results
        }
}