//_____________STATIC VARIABLES_____________

//Array of example topics to be generated on page load
let topics = ["Dota 2", "Pokemon", "Mario", "Gears of War", "The Last of Us", "Sonic", "Metroid", "Counter-Strike", "Halo",
    "Dark Souls", "Bloodborne", "The Legend of Zelda", "Doom", "Portal", "Half-Life", "Tetris", "Final Fantasy",
    "Grand Theft Auto", "Street Fighter", "Megaman", "Metal Gear Solid", "Castlevania", "Warcraft", "Bioshock"]

//_____________FUNCTIONS_____________

// Function to create buttons from the topic
let createTopicButton = function (game) {
    // Create button
    let btn = $("<button>")
        // Add class to button
        .addClass("game-topic m-1 btn-primary")
        // Add data-title attribute
        .attr("data-title", game)
        // Create text inside the HTML element
        .text(game)
    // Return button to insert into DOM
    return btn
}

//Function that creates buttons for array of topics, and appends them to the appropriate area on page
let renderTopicButton = function () {
    topics.forEach((value) => {
        $("#topic-buttons").append(createTopicButton(value))
    });
}

//Function to create a new topic button that can be clicked to generate images
let addTopicButton = function () {
    let newTopic = $("#topic-input").val().trim()
    topics.push(newTopic)
    $("#topic-buttons").empty()
    $("#topic-input").val("")
}

//Function to create URL for AJAX call
//WHY?: Do I need to pass game and numberResults as arguments? I have to do the same thing when in on-click (line 44)
let createQueryURL = function (game, numberResults) {
    return "http://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=iXJhjmLnX9twkBa8Z8kjyyHWBBEimFE4&limit=" + numberResults
}

//Function to generate image with necessary properties
//Very long function, potentially break down to smaller parts
let createImg = function (result) {
    let imgDiv = $("<div>")
    imgDiv.attr("id", result.id)
    $("#gif-holder").append(imgDiv)
    let stillImgURL = result.images.fixed_height_still.url
    let animatedImgURL = result.images.fixed_height.url
    let image = $("<img>").attr("src", stillImgURL)
    image.attr("data-still", stillImgURL)
    image.attr("data-animate", animatedImgURL)
    image.attr("data-state", "still")
    image.addClass("gif my-2 img-fluid")
    $("#"+result.id).append(image)
    $("#"+result.id).append("<br>")
    $("#"+result.id).append("Rating: " + result.rating)
}

$("#topic-buttons").on("click", ".game-topic", function () {
    //Empty container of prior images
    $("#gif-holder").empty()
    //Gets title of button clicked
    let game = $(this).attr("data-title")
    //Gets selected option to return number of results
    let numberResults = $("#result-number").val()
    //Sets variable for URL, runs function to generate URL
    let queryURL = createQueryURL(game, numberResults)
    //AJAX Call for JSON with giphy information
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (result) {
        //I want to rewrite this better, still unsure how
        (result.data).forEach(function (result, i) {
            createImg(result, i)
        });
        // Alternative method
        // (result.data).forEach(createImg)
    })
})

$("#gif-display").on("click", ".gif", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

//Works when button is clicked, not when enter is pressed
//Unsure how to correct without causing page to refresh
$("#submit-button").on("click", function () {
    //Prevent enter from submitting form and refresh page
    event.preventDefault()
    //Run functions to add buttons with appropriate IDs and classes, rewrites whole array (for practice)
    addTopicButton()
    renderTopicButton()
    createQueryURL()
})


renderTopicButton();