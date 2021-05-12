// gets zipcode input textbox
var zipInput = $('#zipInput');

//gets sumbit button
var submitBtn = $('#submitBtn');

// gets zip code input on button click and evalutes whether it it fits zip criteria then runs finder
submitBtn.on("click", function(event) {
    event.preventDefault();
    
    // gets text and trims white space
    zipCode = zipInput.val().trim();

    // checks to make sure it is a 5-digit integer
    // zip % 1 returns undefined if zip is not number and returns number greater than 0 if zip is decimal
    // checks if item is 5 characters in length
    if (zipCode % 1 == 0 && zipCode.length == 5) {
        getBars(zipCode)
    }
})

function getBars(zipCode) {

    // runs url through "cors bridge" to run necessary cors protocol
    var apiUrl = "https://cors.bridged.cc/https://api.yelp.com/v3/businesses/search?categories=bars&location=" + zipCode
    // yelp api requires api key set in authorization header - pulled from their documentation
    fetch(apiUrl, {
        headers: {Authorization: 'Bearer Z_e0tdqqjSrNp735uOh5CD4zJ0yPoH5UCgiWqmdhRyhnLMwU--3eV6fZN2Yt-_Bu2ULxu9Qpd3FjcF0F7SvpMmZ1guG2_UIgtMLDFV4rfuNEdm6fILLg_--g8ruZYHYx'}
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayBars(data)
            })
        }
    })
}

// clears previous data from card container and runs a card creator for each business from api
function displayBars(data) {
    $('#card-container').html("")
    for (i = 0; i < data.businesses.length; i++) {
        createCard(data.businesses[i])
    }
}

// creates card for each business pulled from data array
function createCard(business) {
    //street address
    streetAddress = business.location.address1
    // city, state, and zip code
    cityStateZip = business.location.city + ", " + business.location.state + " " + business.location.zip_code
    // 1. outer div for bulma grid
    card = $('<div></div>').addClass("column is-4").append(
        // 2. inner div for card borders
        $('<div></div>').addClass("card").append(
            // 3. inner-inner div for card content
            $('<div></div>').addClass("card-content").append(
                // 4. div for text content
                $('<div></div>').addClass("content").append(
                    // 5. business name header
                    $('<h3></h3>').text(business.name)
                ).append(
                    // 6. address
                    $('<p></p>').text(streetAddress)
                ).append(
                    // 7. city, state, and zipe code
                    $('<p></p>').text(cityStateZip)
                ).append(
                    // 8. phone number
                    $('<p></p>').text("Phone: " + business.phone)
                )
            )
        )
    )
    
    //adds the card to the container
    $('#card-container').append(card)
}