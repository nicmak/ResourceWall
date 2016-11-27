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
    <p> Likes
      <button id="like-card" type="like-value" value="like-value">LIKE</button>
    </p>
    <p> Ratings
      <div class="rating">
        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
      </div>
    </p>
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

  $("#like-card").on("like-value", function(event) {
    event.preventDefault();
    console.log("app.js was liked card")
    $.ajax({
      url:"api/users/cards",
      method:"POST"
    });
  });

  $("#login-form").on("submit", function(event) {
    console.log("event",event);
    let email = ($("#email-login").val());
    let password=($("#password-login").val());
    event.preventDefault();
    $.ajax({
      url:"api/users/lo",
      method:"POST",
      data: {
        email: email,
        password: password
      }
    })
    .done(function (response) {
      console.log("Congrarts you logged in")
    })

  })


/* When you click submit, this will send the data to the server */
  $("#add-url-form").on('submit', function(event) {
    event.preventDefault();
    console.log("Card post request successful")
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
      console.log("App.js", response);
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
       window.location.href="/user";

     });
    })

}); //THIS IS WHERE FUNCTION READY ENDS....
/* - - - - - - - - - - - - - - - - - - - - - - -*/
