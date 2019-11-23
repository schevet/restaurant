

    $("#add-btn").on("click", function(event) {
      event.preventDefault();
      console.log($("#name").val())
      var makeRes = {
        name: $("#name").val().trim(),
        phone: $("#phone").val().trim(),
        email: $("#email").val().trim(),
        uniqueID: $("#id").val().trim()
      };


      $.post("/api/reservations", makeRes)
        .then(function(data) {
          console.log("reserve.html", data);
        });
    });


