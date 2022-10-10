document.addEventListener('DOMContentLoaded', ()=>{
    let drinksList = document.getElementById("drinks list");
    let submitBtn = document.getElementById("submit");
    let search = document.getElementById('search');
    let btns = Array.from(document.getElementsByClassName('btn'));
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
                else json.drinks.map(pullRecipe);
                searchForm.reset();
            })
        }
    })

    // should add this to css instead
    console.log(btns)
    // const backgroundColor = target.style.backgroundColor
    const setColorCyan = e=>(e.target.style.backgroundColor = 'cyan');
    const setColorRed = e=>(e.target.style.backgroundColor = 'red');
    const setColorDefault = e => (e.target.style.backgroundColor = '');

    btns[0].addEventListener('mouseover', setColorCyan)
    btns[0].addEventListener('mouseout', setColorDefault)
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
        <img src='${recipe.strDrinkThumb}'/> <input type='button' class='btn remove' value='Remove'/> 
        <ol> <li>${recipe.strCategory}</li> <li>${recipe.strAlcoholic}</li> <li>${recipe.strGlass}</li> </ol> <ul> </ul> <p>${recipe.strInstructions}</p>`;
        section.id = `${recipe.idDrink}`;
        section.className = 'search section';
        for(let i=1;i<15;i++){
            if(recipe[`strIngredient${i}`] !==null){
                let ingred = document.createElement('li');
                let amt = recipe[`strMeasure${i}`]!==null?recipe[`strMeasure${i}`]:'';  
                ingred.textContent = `${amt} ${recipe[`strIngredient${i}`]}`;
                let ingredList = section.querySelector('ul');
                ingredList.append(ingred);
            }
        }
        let removeBtn = section.querySelector('.remove');
        removeBtn.addEventListener('click',deleteParent);
        removeBtn.addEventListener('mouseover',setColorRed);
        removeBtn.addEventListener('mouseout',setColorDefault);
        console.log(recipe.strDrink);
        drinksList.append(section)
    }
    const deleteParent = (e) => e.target.parentNode.remove();
    
    
    // find a better way to do this
    // function multiEventListener(element, events,cb){
    //     events.forEach(event => element.addEventListener(event, cb))
    // }
    
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

