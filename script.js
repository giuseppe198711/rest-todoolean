$(document).ready (function() {

// ready

  $.ajax(
    {
      "url": "http://157.230.17.132:3018/todos",
      "method": "GET",
      "succes": function(data){
        console.log(data);

      },

      "error": function () {
        alert("errore");
      }
    }
  );

});

function render() {
  var source = $("#elm-template").html();
  var template = Handlebars.compile(source);



  var html = template(data);

  $("#list").append(html);



}
