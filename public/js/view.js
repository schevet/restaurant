


$("document").ready(function () {

    $.get("/api/reservations/", function (data) {
        let x = 1
        if (data) {
            if (data.length >= 1) {
                $("#tables").removeAttr("style")
                $("#noTables").attr("style", "display: none")
            }

            for (i = 0; i < data.length; i++) {
                const card = $("<div>")
                card.attr("class", "card")
                const cardBody = $("<div>")
                cardBody.attr("class", "card-body")
                const h2 = $("<h2>")

                if (i <= 4) {
                    h2.text("Table Number: " + (i + 1))
                } else {
                    h2.text("Place in line: " + (x))
                    x++
                }

                const name = $("<h3>")
                name.text("Name: " + data[i].name)
                const phone = $("<h3>")
                phone.text("Phone Number: " + data[i].phone)
                const email = $("<h3>")
                email.text("Email: " + data[i].email)
                const id = $("<h3>")
                id.text("ID: " + data[i].id)
                const hr = $("<hr>")

                h2.append(h2, hr, name, phone, email, id)
                cardBody.append(h2)
                card.append(cardBody)
                if (i <= 4) {
                    $("#currentTables").append(card)
                } else {
                    $("#waitingList").append(card)
                }
            }

        }
        if (4 <= data.length) {
            $("#waiting").removeAttr("style");
        }
    })

})