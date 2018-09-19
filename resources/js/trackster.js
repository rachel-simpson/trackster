var Trackster = {};

const apiKey = 'c61ccf53e1bb0342e061e8e611b24e94';

$(document).ready(function() {
  const $searchButton = $('#search-button');
  const $searchField = $('#search-field');
  $searchButton.click(function() {
    $('h1').addClass('h1Transform');
    Trackster.searchTracksByTitle($searchField.val());
  });
  $searchField.keypress(function (event) {
    if(event.which == 13) {
      $('h1').addClass('h1Transform');
      Trackster.searchTracksByTitle($searchField.val());
    }
    else {
      return;
    }
  })
});


/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {

  $('#results').empty();
  for (var i = 0; i < tracks.length; i++) {
    let mediumAlbumArt = tracks[i].image[1]["#text"];
    let listeners = numeral(tracks[i].listeners).format('0,0');
    let $track = $(
      '<div class="row track">' +
        '<div class="col-1 offset-1">' +
          '<a href="' + tracks[i].url + '" target="_blank">' +
          '<i class="far fa-play-circle fa-2x"></i>' +
          '</a>' +
          '</div>' +
        '<div class="col-4">' +
          '<span>' + tracks[i].name + '</span>' +
        '</div>' +
        '<div class="col-2">' +
          '<span>' + tracks[i].artist + '</span>' +
        '</div>' +
        '<div class="col-2">' +
          '<span><img src="' + mediumAlbumArt + '"></span>' +
        '</div>' +
        '<div class="col-2">' +
          '<span>' + listeners + '</span>' +
        '</div>' +
      '</div>'
    );
    $('#results').append($track);
  };
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  $.ajax({
    url: 'https://ws.audioscrobbler.com/2.0/?method=track.search&track=' + title + '&api_key=' + apiKey + '&format=json',
    success: function(response) {
      Trackster.renderTracks(response.results.trackmatches.track);
      $('h1').removeClass('h1Transform');
    }
  });
};
