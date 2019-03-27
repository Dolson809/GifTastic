$(function(){
    createButton(searchArray,'searchButton','#button-view')
})

var searchArray = ["dog","cat","snake","goldfish"];



function createButton(searchArray,classAdd,areaAdd){

    $(areaAdd).empty();

    for (var i=0;i<searchArray.length;i++) {

        var animal = $('<button>');

        animal.addClass(classAdd)

        animal.attr('data-type',searchArray[i]);

        animal.text(searchArray[i]);

        $(areaAdd).append(animal);
    }

};

$(document).on('click','.searchButton', function(){
    var type = $(this).data('type');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=13H4dwJmp8Vgi89MbWgeCYwoC4lMaMON&q=' + type+ '&limit=10&offset=0&rating=R&lang=en'
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response){
        for( var i =0;i<response.data.length;i++){
            var searchDiv = $('<div class="search-item">');
            var rating = response.data[i].rating;
            var p = $('<p>').text('Rating: ' +rating);
            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;

            var image = $('<img>');
            image.attr('src',still);
            image.attr('data-still',still);
            image.attr('data-animated',animated);
            image.attr('data-state','still');
            image.addClass('searchImage');
            searchDiv.append(p);
            searchDiv.append(image);
            $('#gif-appear').append(searchDiv);
            
            console.log(response)
        }
    })
})

$(document).on('click', '.searchImage', function(){
    var state = $(this).data('state')
    if (state == 'still'){
        $(this).attr('src',$(this).data('animated'));
        $(this).attr('data-state','animated');
    } else {
        $(this).attr('src',$(this).data('still'));
        $(this).attr('data-state','still');
    }
})

$('#addSearch').on('click',function(){
    var newSearch = $('input').eq(0).val();
    searchArray.push(newSearch);
    createButton(searchArray,'searchButton','#button-view');
    return false;
})












// seach bar to get data from api

// creat a way to add buttons 

// on click button preform api call and add, update giff

// creat a function to play and pause gif

// when page starts populate buttons

