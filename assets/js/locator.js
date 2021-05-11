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

    var apiUrl = "https://cors.bridged.cc/https://api.yelp.com/v3/businesses/search?categories=bars&location=" + zipCode
        // yelp api requires api key set in authorization header - pulled from their documentation
    fetch(apiUrl, {
        headers: {Authorization: 'Bearer Z_e0tdqqjSrNp735uOh5CD4zJ0yPoH5UCgiWqmdhRyhnLMwU--3eV6fZN2Yt-_Bu2ULxu9Qpd3FjcF0F7SvpMmZ1guG2_UIgtMLDFV4rfuNEdm6fILLg_--g8ruZYHYx'}
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayBars(data)
                console.log(data)
            })
        }
    })
}

function displayBars(data) {
    for (i = 0; i < data.businesses.length; i++) {
        createCard(data.businesses[i])
    }
}

function createCard(business) {
    streetAddress = business.location.address1
    cityStateZip = business.location.city + ", " + business.location.state + " " + business.location.zip_code
    card = $('<div></div>').addClass("column is-4").append(
        $('<div></div>').addClass("card").append(
            $('<div></div>').addClass("card-content").append(
                $('<div></div>').addClass("content").append(
                    $('<h3></h3>').text(business.name)
                ).append(
                    $('<p></p>').text(streetAddress)
                ).append(
                    $('<p></p>').text(cityStateZip)
                ).append(
                    $('<p></p>').text("Phone: " + business.phone)
                )
            )
        )
    )
    
    $('#card-container').append(card)
}