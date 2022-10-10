document.addEventListener('DOMContentLoaded', ()=>{
    let drinksList = document.getElementById("drinks list")
    let submitBtn = document.getElementById("submit")
    let search = document.getElementById('search')
    submitBtn.addEventListener('click', e=>{
        e.preventDefault();
        console.log(e);
        console.log(search.value)
        if(search.value !== ''){
            clearList()
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search.value}`)
            .then(resp=>resp.json())
            .then(json => {
                for(let i=0; i<json.drinks.length;i++){
                    // console.log(json.drinks[i].strDrink)
                    pullRecipe(json.drinks[i])
                }                
            })
        }
    })

    function clearList(){
        while(drinksList.firstChild){
            drinksList.removeChild(drinksList.firstChild)
        }
    }
    function pullRecipe(recipe){
        let section = document.createElement('section');
        // let header = document.createElement('h2');

        section.innerHTML = `<h2> ${recipe.strDrink} </h2>
        <img src='${recipe.strDrinkThumb}'/> <ul> <li>${recipe.strCategory}</li> <li>${recipe.strAlcoholic}</li> <li>${recipe.strGlass}</li> </ul> <ol> </ol> <p>${recipe.strInstructions}</p>`
        
        
        console.log(section.h2)
        // let img = document.createElement('img');
        // let ul = document.createElement('ul');

        console.log(recipe.strDrink)
        // header.textContent = `${recipe.strDrink}`
        // section.appendChild(header);
        
        drinksList.appendChild(section)
    }

    console.log("the dom is now loaded")
})

