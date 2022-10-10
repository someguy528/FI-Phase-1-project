document.addEventListener('DOMContentLoaded', ()=>{
    let drinksList = document.getElementById("drinks list")
    let submitBtn = document.getElementById("submit")
    let search = document.getElementById('search')
    
    let searchForm = document.getElementById('search form');
    searchForm.addEventListener('submit',e=>{
        e.preventDefault();
        let searchValue = e.target.search.value;
        if(searchValue !== ''){
            clearList()
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`)
            .then(resp=>resp.json())
            .then(json => {
                if(json.drinks===null){
                    alert("Whoops, no results! Try another search.")
                }
                else json.drinks.forEach(pullRecipe);
                searchForm.reset();
            })
        }
    })
    
    // function deleteParent(e){
    //  e.target.parentNode.remove()}
    
    // submitBtn.addEventListener('click', e=>{
    //     e.preventDefault();
        // console.log(e);
        // console.log(search.value)
        // if(search.value !== ''){
        //     clearList()
        //     fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search.value}`)
        //     .then(resp=>resp.json())
        //     .then(json => {
        //         for(let i=0; i<json.drinks.length;i++){

                    // console.log(json.drinks[i].strDrink)

            //         pullRecipe(json.drinks[i])
            //     }
            // })
        // }
    // })
    // document.getElementsByClassName('btn').addEventListener('mouseover', e=>{
    // })

    // function searchForDrinks()

    function clearList(){
        while(drinksList.firstChild){
            drinksList.removeChild(drinksList.firstChild)
        }
    }
    function pullRecipe(recipe){
        let section = document.createElement('section');

        section.innerHTML = `<h2> ${recipe.strDrink} </h2>
        <img src='${recipe.strDrinkThumb}'/> <ol> <li>${recipe.strCategory}</li> <li>${recipe.strAlcoholic}</li> <li>${recipe.strGlass}</li> </ol> <ul> </ul> <p>${recipe.strInstructions}</p>`;
        section.setAttribute('id', `${recipe.idDrink}`);
        for(let i=1;i<15;i++){
            if(recipe[`strIngredient${i}`] !==null){
                let ingred = document.createElement('li');
                let amt = recipe[`strMeasure${i}`]!==null?recipe[`strMeasure${i}`]:'';  
                ingred.textContent = `${amt} ${recipe[`strIngredient${i}`]}`;
                let ingredList = section.querySelector('ul');
                ingredList.appendChild(ingred);
            }
        }
        console.log(recipe.strDrink)
        drinksList.appendChild(section)
    }

    // array of objects?
    // let drinksArray = [
    //     { name: 'Example Drink',
    //     category: 'Category?',
    //     alcohol: 'Alcohol?',
    //     container: 'Container?',
    //     ingredients: {
    //         ingredient1: 'Measure',
    //         ingredient2: 'Measure',
    //         ingredient3: 'Measure',
    //     },
    //     instructions: 'Mixing Instructions'

    //     }]

    // function createDrink

    console.log("the dom is now loaded")
})

