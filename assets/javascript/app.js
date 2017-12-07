let topics = ["Dota 2", "Pokemon", "Mario", "Gears of War", "The Last of Us", "Sonic", "Metroid", "Counter-Strike", "Halo",
              "Dark Souls", "Bloodborne", "The Legend of Zelda", "Doom", "Portal", "Half-Life", "Tetris", "Final Fantasy", 
              "Grand Theft Auto", "Street Fighter", "Megaman", "Metal Gear Solid", "Castlevania", "Warcraft", "Bioshock"]

let createTopicButton = function(game){
    // Create button
    let btn = $("<button>")
        // Add class to button
        .addClass("game-topic m-1")
        // Add data-title attribute
        .attr("data-title", game)
        // Create text inside the HTML element
        .text(game)
    // Return button to insert into DOM
    return btn

}

let renderTopicButton = function() {
    topics.forEach((value) => {
        $("#topic-buttons").append(createTopicButton(value))
    });
}

let addTopicButton = function() {
    let newTopic = $("#topic-input").val().trim()
    topics.push(newTopic)
    $("#topic-buttons").empty()
    $("#topic-input").val("")
}

//Function to create URL for AJAX call
//WHY?: Do I need to pass game and numberResults as arguments? I have to do the same thing when in on-click (line 44)
let createQueryURL = function(game, numberResults) {
    return "http://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=iXJhjmLnX9twkBa8Z8kjyyHWBBEimFE4&limit=" + numberResults
}

//STILL IMAGE
//


//Function to generate image with necessary properties
let createImg = function(){
    let image = ("<img>").attr("src", stillImgURL)
    let stillImgURL = result.data[0].images.fixed_height_still.url
    let animatedImgURL = result.data[0].images.fixed_height_still.url
    // $("#gif-holder").append(stillImgURL)

}

$("#topic-buttons").on("click", ".game-topic", function(){
    //Gets title of button clicked
    let game = $(this).attr("data-title")
    //Gets selected option to return number of results
    let numberResults = $("#result-number").val()
    //Sets variable for URL, runs function to generate URL
    let queryURL = createQueryURL(game, numberResults)

    
    console.log(numberResults)
    console.log(queryURL)

    //AJAX Call for JSON with giphy information
    $.ajax({
        url:queryURL,
        method: "GET"
    }).done(function(result){
        (result.data).forEach(function(result) {
            console.log("hi")
        });
                })
})


//Works when button is clicked, not when enter is pressed
//Unsure how to correct
$("#submit-button").on("click", function(){
    event.preventDefault()
    addTopicButton()
    renderTopicButton()
    createQueryURL()
})



renderTopicButton();