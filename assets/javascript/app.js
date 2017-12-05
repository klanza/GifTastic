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

let createQueryURL = function(game) {
    return "http://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=iXJhjmLnX9twkBa8Z8kjyyHWBBEimFE4&limit=10"
}

$(".game-topic").on("click", function(){

    var game = $(this).attr("data-title")

    var queryURL = createQueryURL(game)

    console.log(game)
    console.log(queryURL)
    $.ajax({
        url:queryURL,
        method: "GET"
    }).done(function(result){
        console.log(result)
    })
})

$("#submit-button").on("click", function(){
    event.preventDefault()
    addTopicButton()
    renderTopicButton()
    createQueryURL()
})



renderTopicButton();