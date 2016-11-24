function renderCard() {
  // cards.forEach(function(card)
  $("#card-wall").prepend(createCard())
}

function createCard() {
  const urlText = $('#url-input').val();
  const categoriesText = $('#categories-input').val();
  const titleText = $('#title-input').val();
  const notesText = $('#notes-input').val();

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

$(() => {
  $.ajax({method: "GET", url: "/api/users"}).done((users) => {
    for (user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
  $("#add-url-btn").click(function(event) {
    $("#url-input").focus();
    $("#popup").slideToggle();
  })

/* When you click submit, this will send the data to the server */
  $("#add-url-form").on('submit', function(event) {
    event.preventDefault();
    renderCard();

  // const urlText = $('#url-input').val();
// console.log(urlText);
    // $.ajax({
    //   url:,
    //   success: function(text) {
    //
    //   }
    // })
  })
});
