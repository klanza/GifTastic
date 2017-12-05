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


$("#submit-button").on("click", function(){
    event.preventDefault();
    let newTopic = $("#topic-input").val().trim()
    topics.push(newTopic)
    $("#topic-buttons").empty()
    $("#topic-input").val("")
    renderTopicButton()
})


renderTopicButton();