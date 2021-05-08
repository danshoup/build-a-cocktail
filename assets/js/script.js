// gets dropdown element
var spiritDropdown = $('#spirit-select');

// gets bulma grid container for cocktail list items
var cocktailList = $('#card-container');

// gets ingredient list ul container
var ingredientList = $('#ingList')

// gets modal element
var recipeModal = $('#recipeModal')

//runs on dropdown value change
spiritDropdown.on('change', function(event) {
    // gets spirit upon selection
    var spirit = spiritDropdown.val();

    // only runs if item selected
    if (spirit) {
        getCocktails(spirit);
    }
})

// fetches data from api based on selected spirit
function getCocktails(selectedSpirit) {

    //api call for searching by "ingredient" which only searches by liquor in basic version
    var apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + selectedSpirit;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    // returned JSON is object with only 1 key:value pair
                    // {drinks: [array-of-drinks]}
                    displayCocktails(data)
                })
            }
        })
}

function displayCocktails(cocktailsData) {
    // clears old text from ul container
    cocktailList.html("");
    // just gets array of drinks from JSON object
    drinksArray = cocktailsData.drinks
    // loops through array and displays all drinks
    for (i = 0; i < drinksArray.length; i++) {

        createCard(drinksArray[i]);
    }

    console.log($('.card'))
}

function createCard(drink) {
    //creates elements using bulma framework card classes
    //1. card container
    newCard = $('<div></div>').addClass("column is-3").append(
        // 2. card class div with drink id associated
        $('<div></div>').addClass("card").attr("id", drink.idDrink).append(
            //3. figure container for image
            $('<figure></figure>').addClass("image is-square").append(
                //4. adds drink image
                $('<img></img>').attr("src", drink.strDrinkThumb)
            )
        ).append(
            // 5. text content container
            $('<div></div>').addClass("card-content").append(
                // 6. content container
                $('<div></div>').addClass("content").append(
                    // 7. displays drink name
                    $('<h5></h5>').text(drink.strDrink)
                ).append(
                    // 8. adds button to display modal
                    $('<button></button>').addClass("button is-info is-light").text("Click For Recipe")
                )
            )
        )
    )
    
    // adds card to main part of page below dropdown
    cocktailList.append(newCard)    

}

// executes upon clicking a cocktail in the list
$('#card-container').on("click", "button", function(event) {

    // gets drink id from card around button
    drinkId = $(event.target).parents('.card').attr('id')

    // runs the recipe call from api search for cocktail name
    getRecipe(drinkId);

})

function getRecipe(drinkId) {

    var apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drinkId;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    // returned JSON is object with key "drinks" and value is an array with drink details, ingredients, and instructions (in multiple languages)
                    displayRecipe(data)
                })
            }
        })
}

function displayRecipe(data) {

    // clears ingredient list items
    ingredientList.html('')

    // pulls recipe details object from single object array, represented as a value of "drinks" key
    recipeDetails = data.drinks[0]

    //updates modal with cocktail name
    $('p.modal-card-title').text(recipeDetails.strDrink);
    
    for (i = 1; i < 15; i++) {
        // assigns key for ingredient number to string (i.e. strIngredient1 is the key for the value of "Lime")
        ingredientNum = "strIngredient" + i
        // runs loop if the ingredient at ingredientNum key doesn't return null
        if (recipeDetails[ingredientNum]) {
            // creates list item with indredient text and appends to ul container under cocktail name
            ingredientItem = $('<li></li>').text(recipeDetails[ingredientNum])
            ingredientList.append(ingredientItem)
        } else {
            // breaks out of loop upon first "null" ingredient
            break
        }
    }

    //displays recipe recipe instructions in p element below ingredient ul
    $('#instructions').text(recipeDetails.strInstructions)

    recipeModal.toggleClass("is-active");
}

recipeModal.on("click", "#close", function() {
    recipeModal.toggleClass("is-active")
})