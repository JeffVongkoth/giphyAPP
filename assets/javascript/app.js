$(document).ready(function () {
    // create array with strings to become buttons
    var topics = ['r34', 'toyota supra', 'hoonigan', 'rx7', 'wrx', 'ferrari', 'lamborghini', 's2000', 'mitsubishi evo', 'subaru sti'];


    //display gif function 
    function showGif() {
$('#gifs').empty();
        //when this is clicked add the attribute
        var topic = $(this).attr("data-name");
        //api key

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dhP9Khaw2UwpuDdNrbtPoSFPlideR0x8&&limit=10";
// console.log(topic);
        //ajax call to get the data we need
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function (response) {
            var results = response.data;
            
            for (var i = 0; i < results.length; i++) {
            var gifDiv = $('<div class="gif">');
            var rating = results[i].rating;
            var x = $('<p>').text('Rating: ' + rating);
            var imgURL = results[i].images.fixed_height_still.url;
            var gifURL = results[i].images.fixed_height.url;
            var image = $('<img>').attr('src', imgURL);
            image.attr('data-state', 'still')
            image.attr('still', imgURL);
            image.attr('animate', gifURL)
            image.addClass('img');
            gifDiv.append(x);
            gifDiv.append(image);
            $("#gifs").append(gifDiv);
            console.log(gifURL, imgURL);
            
            }
    })  
    }
    function renderButtons() {

        $("#gifButtons").empty();
        for (var i = 0; i < topics.length; i++) {

            var a = $('<button type="button" class="btn btn-default btn-md">');
 
            a.addClass("gif-btn");
         
            a.attr("data-name", topics[i]);
           
            a.text(topics[i]);
          
            $("#gifButtons").append(a);

        
        }
    }

    $('#addSearch').click(function(event){
        event.preventDefault();
        var topic = $('#search-input').val().trim();
        topics.push(topic);
        renderButtons();
    })

        
    $(document.body).on("click", ".img", function() {
        $('body').css({'background-size': '100% 100%'});
        var state = $(this).attr("data-state");
        // console.log(state, gifURL, imgURL);
        if (state === "still") {
            var animateUrl = $(this).attr("animate");
            $(this).attr("src", animateUrl);
            $(this).attr("data-state", "animate");
          } else {
            var stillUrl = $(this).attr("still");
            $(this).attr('src', stillUrl);
            $(this).attr("data-state", "still");
          }
            
    });
    
    
    // console.log(results);
    renderButtons();
    $(document).on("click", ".gif-btn", showGif);
$('.gif-btn').click(function() {
    $('body').css({'background-size': '100% 100%'});
});
});





    //make an array with strings have those strings become buttons on the page.
    // when those buttons are clicked display STILL gifs with rating.
    //when those still gifs are clicked they start playing
    // when animated gifs are playing allow for gifs to be paused
    // when ANOTHER button is clicked clear the gif area and repopulate
    //make a search bar 
    // when you search for something add that button to the 
