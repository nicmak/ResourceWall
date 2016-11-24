function renderResource () {
  $("#card-wall").preprend(createResource())
}
function createResource () {
let html=
`<article class="card">
<h1> Card </h1>
<p> URL:  ... </p>
<p> Categories: ... </p>
<p> Likes and Ratings </p>
<p>
</article>`
  return html
}

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
$("add-url-form").on('submit', function(event) {
  event.preventDefault();

  // $.ajax({
  //   url:,
  //   success: function(text) {
  //
  //   }
  // })
})




});
