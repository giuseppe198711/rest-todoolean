$(document).ready (function() {

// read

  $.ajax(
    {
      "url": "http://157.230.17.132:3018/todos",
      "method": "GET",
      "succes": function(data) {
        render(data);

      },

      "error": function () {
        alert("errore");
      }
    }
  );

});

function render(data) {
  var source = $("#elm-template").html();
  var template = Handlebars.compile(source);

  var context = {
    "data": data
  }



  var html = template(context);

  $("#list").append(html);



}
