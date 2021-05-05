// gets dropdown element
var spiritDropdown = $('#placeholder-for-spirit-dropdown');
// gets form surrounding dropdown element
var spiritForm = $('#placeholder-for-spirit-form-containing-dropdown')

spiritForm.on('submit', function(event) {
    event.preventDefault();

    // gets selected spirit upon submitting form
    var spirit = spiritDropdown.val();

    console.log("----------------")
    console.log(spirit.toUpperCase() + " DRINKS")
    console.log("----------------")

    

    // only runs if item selected
    if (spirit) {
        getCocktails(spirit);
    }
})

// fetches data from api based on selected spirit
function getCocktails(selectedSpirit) {
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
    // just gets array of drinks from JSON object
    drinksArray = cocktailsData.drinks
    // loops through array and displays all drinks
    for (i = 0; i < drinksArray.length; i++) {
        console.log(drinksArray[i].strDrink);
    }
}