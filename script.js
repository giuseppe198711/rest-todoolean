$(document).ready (function() {

// read
  // 1)chiamata ajax
  $.ajax(
    {
      // url di riferimento
      "url": "http://157.230.17.132:3018/todos",
      // metodo per prendere
      "method": "GET",
      // dati che mi vnegono restituiti dalla chiamata
      "success": function(data) {

       // funzione che chiamo quando ho i dati
        render(data);
      },
       //  quando mi da errore allora c'e un allert
      "error": function () {
        alert("errore");
      }
    }
  );

// delete
  // 3) applico un evento click su gli elementi con la classe delete che si trovano
  // all'interno dell'ul list. ho usato l on perche gli elementi delete non sono presenti
  // al caricamento della pagina
  $("#list").on("click", ".delete", function() {

   // vado a creare una variabile in cui salvo il li che dovro andare ad eliminare
    var elm = $(this).parent();
    // mi salvo l id dell'elemento da eliminare
    var id = elm.attr("id");

    $.ajax(
      {  //qui vado a fare la chiamata  ejax direttamente sull'id per eliminarlo
        "url": "http://157.230.17.132:3018/todos/"+id,
        "method": "DELETE",
        "success": function(data) {
          // se l elemento viene correttamente eliminato dal server allora lo elimino nel mio html
          elm.remove();
        },
         // nel caso cè un errore non viene eliminato ne nell html ne nel server
        "error": function () {
          alert("errore");
        }
      }
    );

  });


  // create

  $(".add-todo").click(function () {

    var val = $("#input-add-element").val();

    if(val != "") {

          $.ajax(
            {
              "url": "http://157.230.17.132:3018/todos",
              "method": "POST",
              "data": {
                "text": val
              },
              "success": function(data) {
                addElement(data);
              },

              "error": function () {
                alert("errore");
              }
            }
          );
    }
  });
});

// 2) funzione render data per definire il template e appenderlo
// nel html
function render(data) {
  // andiamo a prendere il nostro template dall html (#elm..)
  var source = $("#elm-template").html();
  var template = Handlebars.compile(source);

// andiamo a ciclare per tot volte le infomazioni che mi servono
 // in questo caso id e text
  for (var i = 0; i < data.length; i++) {
    var context = {
      "id" : data[i].id,
      "text" : data[i].text,
    }
 // sto sostituendo il placeholder le informazioni che mi
 // arrivano dall'api ossia id e text
    var html = template(context);
// poi appendiamo il tutto nella nostra lista
    $("#list").append(html);
  }
}

// con la funzione add element aggiungo un elemento alla volta
function addElement(data) {

  var source = $("#elm-template").html();
  var template = Handlebars.compile(source);

  var context = {
    "id" : data.id,
    "text" : data.text,
  }
  var html = template(context);

  $("#list").append(html);
}
