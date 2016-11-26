
function createCard(cardData) {
  const urlText = cardData.url;
  const categoriesText = cardData.categories;
  const titleText = cardData.title;
  const notesText = cardData.notes;

  let html = `<article class="card">
    <h1> CARD~~~ </h1>
    <p> URL: ${urlText} </p>
    <p> Categories: ${categoriesText} </p>
    <p> Title: ${titleText} <p>
    <p> Notes: ${notesText} </p>
    <p> Likes and Ratings~~~~ </p>
    <p> Comments~~~~ </p>
    </article>`
    return html;
}
//-----------------------------------------------
function renderCards(cards) {
  // cards.forEach(card => {
    $("#card-wall").prepend(createCard(cards))
  // });
};
//-----------------------------------------------

function loadCards() {
  $.ajax({
    url:"/cards",
    method: "GET",
    success: function(response){
      console.log(response);
    }
  })
};
//-----------------------------------------------

$(document).ready(function() {
  $("#add-url-btn").click(function(event) {
    $("#url-input").focus();
    $("#popup").slideToggle();
  })
/* When you click submit, this will send the data to the server */
  $("#add-url-form").on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      url:"/api/users/cards",
      method:"POST",
      data: {
        url: $("#url-input").val(),
        categories: $("#categories-input").val(),
        title: $("#title-input").val(),
        notes: $("#notes-input").val()
      }
    })
    .done(function(response) {
      renderCards(response);
      $('textarea').val("");
    });
   })

   $("#registration-form").on('submit', function(event) {
     event.preventDefault();
     $.ajax({
       url:"/api/users/registration",
       method:"POST",
       data: {
         firstName: $("#first-name").val(),
         lastName: $("#last-name").val(),
         email: $("#email-registration").val(),
         password: $("#password-registration").val()
       }
     })
     .done(function(response) {
       $('#registration-form').val("");
     });
    })

}); //THIS IS WHERE FUNCTION READY ENDS....
/* - - - - - - - - - - - - - - - - - - - - - - -*/
