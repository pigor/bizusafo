var ready;
ready = function() {
  $("span.positive-votes a").on("click", { signal: '+' }, ratingStory);
  $("span.negative-votes a").on("click", { signal: '-' }, ratingStory);
};

$(document).ready(ready);
$(document).on('page:load', ready);

function ratingStory(e){

  e.preventDefault();
  var _this = this;
  var linkText = $(_this).text();
  var count = parseInt($(_this).attr('data-count'));
  var signal = e.data.signal;

  $.ajax({
    url: $(_this).attr('href'),
    type: 'put',
    dataType: 'json',
    beforeSend: function(){

      count = count + 1;

      $(_this).text(signal + count);

      $(_this).attr('data-count', count);

    },
    error: function(){

      $(_this).text(linkText);

      $(_this).attr('data-count', --count);

    },
    success: function(res){
      var ratingHandlers = $(_this).closest(".story-ratings").children(".ratings-count");

      $.each(ratingHandlers, function( index, handler ) {
        
        var text = $(handler).text();

        $(handler).text(text);
      
      });
    }
  });


}