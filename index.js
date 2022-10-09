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
        }
    })
    
    function clearList(){
        while(drinksList.firstChild){
            drinksList.removeChild(drinksList.firstChild)
        }
    }
    // function addDefault(){
    //     let secDef = document.createElement('section');
    //     secDef.innerHTML = `<h2>Example Drink</h2>
    //     <img />
    //     <ul>
    //         <li>Category? </li>
    //         <li>Alcohol? </li>
    //         <li>Container? </li>
    //     </ul>
    //     <ol>
    //         <li>Ingredient 1 Measure</li>
    //         <li>Ingredient 2 Measure</li>
    //         <li>Ingredient 3 Measure</li>
    //     </ol>
    //     <p>
    //         Mixing Instructions
    //     </p>`
    //     drinksList.appendChild(secDef)
    // }
    console.log("the dom is now loaded")
})

