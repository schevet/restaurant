

    $("#add-btn").on("click", function(event) {
      event.preventDefault();
      const makeRes = {
        name: $("#name").val().trim(),
        phone: $("#phone").val().trim(),
        email: $("#email").val().trim(),
        uniqueID: $("#uniqueID").val().trim()
      };

      $.get("/api/reservations/", function(data) {
        console.log(data);
        if (data.length < 5) {
          $.post("/api/reservations", makeRes)
          // .then(function({})
        }else { 
          $.post("/api/waitList", makeRes)
          // .then(function{})
        }
      });
      
      $.post("/api/reservations", makeRes)
        .then(function(data) {
          console.log("add.html", data);
          alert("Adding character...");
        });
    });