function cariFilm() {
  $("#list-film").html("");

  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "d51b1a3",
      s: $("#input-film").val(),
    },

    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search;

        $.each(movies, function (i, data) {
          $("#list-film").append(
            `<div class="col-md-4">
            <div class="card mb-3">
            <img src=` +
              data.Poster +
              ` class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">` +
              data.Title +
              `</h5>
              <h6 class="card-subtitle mb-2 text-muted">` +
              data.Year +
              `</h6>
              <a href="#" class="card-link detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="` +
              data.imdbID +
              `">Detail</a>
            </div>
          </div>
          </div>
            `
          );
        });

        $("#input-film").val("");
      } else {
        $("#list-film").html(
          `
        <div class="col">    
            <h1 class="text-center"> ` +
            result.Error +
            `</h1>
        </div>
        `
        );
      }
    },
  });
}

$("#tombol-cari").on("click", function () {
  cariFilm();
});

$("#input-film").on("keyup", function (e) {
  if (e.which === 13) {
    cariFilm();
  }
});

$("#list-film").on("click", ".detail", function () {
  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "d51b1a3",
      i: $(this).data("id"),
    },

    success: function (movie) {
      if (movie.Response === "True") {
        $(".modal-body").html(
          `
        <div class="container-fluid">
        <div class="row">
          <div class="col-md-4">
            <img src="` +
            movie.Poster +
            `" class="img-fluid">
          </div>
          <div class="col-md-8">
            <ul class="list-group">
              <li class="list-group-item"><h3>` +
            movie.Title +
            `</h3>
              </li>
              <li class="list-group-item">Released : ` +
            movie.Released +
            `</li>
            <li class="list-group-item">Genre : ` +
            movie.Genre +
            `</li>
            <li class="list-group-item">Director : ` +
            movie.Director +
            `</li>
            <li class="list-group-item">Actors : ` +
            movie.Actors +
            `</li>
            <li class="list-group-item">Rate : ` +
            movie.imdbRating +
            `</li>
            <li class="list-group-item">Sinopsis : ` +
            movie.Plot +
            `</li>
            </ul>
          </div>
        </div>
        </div>
        `
        );
      }
    },
  });
});
