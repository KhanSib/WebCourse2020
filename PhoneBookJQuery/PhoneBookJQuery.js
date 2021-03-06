$(document).ready(function () {
    var lastName = $("#last-name");
    var firstName = $("#first-name");
    var phoneNumber = $("#phone-number");
    var button = $("#add-button");
    var phoneBook = $("#phone-book-body");
    var errorMessage = $("#error-message");

    button.click(function () {
        var lastNameText = lastName.val();
        var firstNameText = firstName.val();
        var phoneNumberText = phoneNumber.val();
        var needReturn = false;
        var text = "Не введено: ";

        if (lastNameText === "") {
            text += "фамилия ";
            lastName.addClass("error-input");
            needReturn = true;
        }

        if (firstNameText === "") {
            text += "имя ";
            firstName.addClass("error-input");
            needReturn = true;
        }

        if (phoneNumberText === "") {
            text += "телефон";
            phoneNumber.addClass("error-input");
            needReturn = true;
        }

        if (needReturn) {
            errorMessage.text(text);
            return;
        }

        errorMessage.text("");
        lastName.removeClass("error-input");
        firstName.removeClass("error-input");
        phoneNumber.removeClass("error-input");

        function setViewMode(tableRow) {
            tableRow.html("<td class='number'></td><td class='last-name'></td><td class='first-name'></td>" +
                "<td class='phone-number'></td><td class='delete'>x</td>");

            tableRow.find(".number").text($("#phone-book-body").children().length + 1);
            tableRow.find(".last-name").text(lastNameText);
            tableRow.find(".first-name").text(firstNameText);
            tableRow.find(".phone-number").text(phoneNumberText);
            tableRow.find(".delete").click(function () {
                var confirm = $("<div id='dialog-confirm' title='Удалить данные?'><p><span class='ui-icon ui-icon-alert' style='float:left; margin:12px 12px 20px 0;'></span>Данные будут удалены безвозвратно. Вы уверены?</p></div>");
                confirm.appendTo(document.body).hide();

                $("#dialog-confirm").dialog({
                    resizable: false,
                    height: "auto",
                    width: 400,
                    modal: true,
                    buttons: {
                        "Да": function () {
                            tableRow.remove();
                            $("#phone-book-body tr").each(function (i) {
                                var number = i + 1;
                                $(this).find("td:first").text(number);
                            });
                            $(this).dialog("close");
                        },
                        "Нет": function () {
                            $(this).dialog("close");
                        }
                    }
                });

                $.remove("#dialog-confirm");
            });
        }

        var tableRow = $("<tr>");
        setViewMode(tableRow);

        phoneBook.append(tableRow);

        lastName.val("");
        firstName.val("");
        phoneNumber.val("");
    });
});
