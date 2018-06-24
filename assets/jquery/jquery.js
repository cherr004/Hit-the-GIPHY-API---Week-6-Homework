// Initial array of animals
var animals = ['Turtle', 'Dolphin', 'Shark', 'Lion', 'Zebra', 'Donkey', 'Camel'];

// ========================================================

function displayGif(){

//Creating variable to hold the data attribute for displayGIF 
    var gif = $(this).attr('data-name');

//Creating variable for the Giphy API URL
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

    // Pulling data from the Giphy API
     $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
         console.log(response);
        $("#animalsView").empty();
        for (var i = 0; i < response.data.length; i++){

            var rating = response.data[i].rating;
            var imageUrl = response.data[i].images.fixed_height.url;
             var imageStillUrl = response.data[i].images.fixed_height_still.url;

            var image = $("<img>");
            var ratingText = $("<p id='rating'>" + "Rating: " + rating + "</p>");

            
            image.attr('src', imageStillUrl);
            image.attr('alt', 'gif');
            image.attr('data-state', 'still');
            image.attr('data-still', imageStillUrl);
            image.attr('data-animate', imageUrl);


            $('#animalsView').prepend(image, ratingText);
            checkState ();
        }
     }); 
} 

function renderButtons(){ 

    $('#buttonsView').empty();

    for (var i = 0; i < animals.length; i++){
//created variable to hold the button creation function
        var newButton = $('<button class="btn btn-primary" style="margin-right: 1%;">')

// Added a class to the new div that we created above
        newButton.addClass('animal');

// Added a data-attribute
        newButton.attr('data-name', animals[i]);

// Adding the text for each animal to the actual button div
        newButton.text(animals[i]);

// Appending the button to the HTML
        $('#buttonsView').append(newButton);
    }
}

$('#addAnimal').on('click', function(){

    var animal = $('#animal-input').val().trim();

    animals.push(animal);
    
    renderButtons();

    return false;
})


$(document).on('click', '.animal', displayGif);

renderButtons();

function checkState(){
    $('img').on('click', function(){
  var state = $(this).attr('data-state'); 
  if (state == 'still'){
  $(this).attr('src', $(this).data('animate'));
  $(this).attr('data-state', 'animate');
  }else{
  $(this).attr('src', $(this).data('still'));
  $(this).attr('data-state', 'still');
}

    });
};