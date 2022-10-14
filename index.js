document.addEventListener('DOMContentLoaded', ()=>{
    let drinksList = document.getElementById("drinks list");
    let submitBtn = document.getElementById("submit");
    let darkBtn = document.getElementById('dark');

    let searchForm = document.getElementById('search form');
   

    function searchFetch(e){
        e.preventDefault();
        let searchValue = e.target.search.value;
        if(searchValue !== ''){
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`)
            .then(resp=>resp.json())
            .then(json => {
                if(json.drinks===null){
                    alert("Whoops, no results! Try another search.")
                }
                else drinksList.innerHTML = '';
                json.drinks.map(pullRecipe);
                searchForm.reset();
            })
            .catch(error => alert(`Whoops, something went wrong: ${error}`))
        }
    
    };

    // should add this to css instead
    
    // const backgroundColor = target.style.backgroundColor
    const setColorCyan = e=>(e.target.style.backgroundColor = 'cyan');
    const setColorRed = e=>(e.target.style.backgroundColor = 'red');
    const setColorDefault = e => (e.target.style.backgroundColor = '');

    submitBtn.addEventListener('mouseover', setColorCyan)
    submitBtn.addEventListener('mouseout', setColorDefault)
    // document.getElementsByClassName('btn').addEventListener('mouseover', e=>{
    // })

    // function searchForDrinks()
    
    function pullRecipe(recipe){
        // initialize elements
        let section = document.createElement('section');
        let h2 = document.createElement('h2');
        let img = document.createElement('img');
        let inputRemove = document.createElement('input');
        let ol = document.createElement('ol');
        let liCategory = document.createElement('li');
        let liAlcohol = document.createElement('li');
        let liContainer = document.createElement('li');
        let ul = document.createElement('ul');
        let p = document.createElement('p');
        // set content
        h2.textContent = recipe.strDrink;
        img.src = recipe.strDrinkThumb;
        img.className = 'drinkImg';
        inputRemove.type = `button`;
        inputRemove.className = `btn remove`;
        inputRemove.value = `remove`;
        liCategory.textContent = `Category: ${recipe.strCategory}`;
        liAlcohol.textContent = `Alcohol: ${recipe.strAlcoholic}`;
        liContainer.textContent = `Container: ${recipe.strGlass}`;
        p.textContent = recipe.strInstructions;
        ol.append(liCategory,liAlcohol,liContainer);
        section.append(h2,img,inputRemove,ol,ul,p);

        // section.innerHTML = `<h2> ${recipe.strDrink} </h2> 
        // <img src='${recipe.strDrinkThumb}'/> <input type='button' class='btn remove' value='Remove'/> 
        // <ol> <li>${recipe.strCategory}</li> <li>${recipe.strAlcoholic}</li> <li>${recipe.strGlass}</li> </ol> <ul> </ul> <p>${recipe.strInstructions}</p>`;
        
        section.id = `${recipe.idDrink}`;
        section.className = 'search section';
        for(let i=1;i<15;i++){
            if(recipe[`strIngredient${i}`] !==null){
                let ingred = document.createElement('li');
                let amt = recipe[`strMeasure${i}`] !== null 
                ? recipe[`strMeasure${i}`] : '';  
                ingred.textContent = `${amt} ${recipe[`strIngredient${i}`]}`;
                let ingredList = section.querySelector('ul');
                ingredList.append(ingred);
            };
        };
        let removeBtn = section.querySelector('.remove');
        removeBtn.addEventListener('click',deleteParent);
        removeBtn.addEventListener('mouseover',setColorRed);
        removeBtn.addEventListener('mouseout',setColorDefault);
        console.log(recipe.strDrink);
        drinksList.append(section);
    }

    // function addDeleteBtnEvents(){
    // }

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

    function toggleDarkMode(){
        document.body.classList.toggle('darkmode')
    };

    searchForm.addEventListener('submit', searchFetch);
    darkBtn.addEventListener('click',toggleDarkMode);


    console.log("the dom is now loaded")
})

