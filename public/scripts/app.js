
// function createCard(cards) {
//   const urlText = $('#url-input').val();
//   const categoriesText = $('#categories-input').val();
//   const titleText = $('#title-input').val();
//   const notesText = $('#notes-input').val();
//
//   let html = `<article class="card">
//     <h1> CARD~~~ </h1>
//     <p> URL: ${urlText} </p>
//     <p> Categories: ${categoriesText} </p>
//     <p> Title: ${titleText} <p>
//     <p> Notes: ${notesText} </p>
//     <p> Likes and Ratings~~~~ </p>
//     <p> Comments~~~~ </p>
//     </article>`
//     return html;
// }

// function renderCards(cards) {
//   cards.forEach((card => {
//     $("#card-wall").prepend(createCard())
//   });
// };

$(() => {
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
        categories: $('#categories-input').val()
      }
    })
    .done(function(response) {
      $(".result").append(JSON.stringify(response));
      // $('textarea').val("");
      // loadCards();
    });
   })
 })
// ---------------------------------------------------
function loadCards() {
  $.ajax({
    url:"/cards",
    method: "GET",
    success: function(response){
      console.log(response);
    }
  })
};
  // event.preventDefault();
  // $.ajax({ //this will send a post request to the server
  //   url: '/tweets/',
  //   method: 'POST',
  //   data: $("#data").serialize(),
  //   success: function(text) {
  //     loadTweets();
  //     $('#data').val("");
  //     $(".counter").text("10");
  //   }








  // const urlText = $('#url-input').val();
// console.log(urlText);
    // $.ajax({
    //   url:,
    //   success: function(text) {
    //
    //   }
    // })
