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
  $("add-url-form").on('submit', function(event) {
    event.preventDefault();
    renderResource();
    // $.ajax({
    //   url:,
    //   success: function(text) {
    //
    //   }
    // })
  })


});

function renderResource() {
  // cards.forEach(function(card)
  $("#card-wall").preprend(createResource())
}

function createResource() {
  let html = `<article class="card">
    <h1> CARD~~~ </h1>
    <p> URL: ... </p>
    <p> Title: ... <p>
    <p> Categories... </p>
    <p> Likes and Ratings </p>
    </article>`
  return html;
}
