$(document).ready(init);

function init() {
    $(document).on('click', '#regiButton', check);
    $('#Fname').mouseenter(function () {
        $('#res').text("Please insert only letters");
    }).mouseleave(function () {
        $('#res').text("");
    });
    $('#Lname').mouseenter(function () {
        $('#res').text("Please insert only letters");
    }).mouseleave(function () {
        $('#res').text("");
    });
    $('#email').mouseenter(function () {
        $('#res').text("Please insert your e-mail addres");
    }).mouseleave(function () {
        $('#res').text("");
    });
    $('#username').mouseenter(function () {
        $('#res').text("Please insert only numbers or letters");
    }).mouseleave(function () {
        $('#res').text("");
    });
    $('#password').mouseenter(function () {
        $('#res').text("Please insert at least 7 characters ,must appear at least 1 (number) and 1 Special character");
    }).mouseleave(function () {
        $('#res').text("");
    });
}

function check() {                    //בדיקת שם פרטי שכולל רק אותיות
    for (var i = 0; i < $('#Fname').val().length ; i++) {
        if (!($('#Fname').val()[i] >= 'a' && $('#Fname').val()[i] <= 'z' || $('#Fname').val()[i] >= 'A' && $('#Fname').val()[i] <= 'Z')) {
            alert("You must insert name just with valid letters");
            $('#Fname').focus();
            break;
        }
    }
              //בדיקת שם משפחה שכולל רק אותיות
    for (var i = 0; i < $('#Lname').val().length; i++) {
        if (!($('#Lname').val()[i] >= 'a' && $('#Lname').val()[i] <= 'z' || $('#Lname').val()[i] >= 'A' && $('#Lname').val()[i] <= 'Z')) {
            alert("You must insert name just with valid letters");
            $('#Lname').focus();
            break;
        }
    }
    ////בדיקה האם כתובת המייל חוקית 
    var count_stru = 0;
    if ($('#email').val()[0] >= 'a' && $('#email').val()[0] <= 'z' || $('#email').val()[0] >= 'A' && $('#email').val()[0] <= 'Z') {
        for (var i = 1; i < $('#email').val().length; i++) {
            if ($('#email').val()[i] == '@') {
                count_stru++;
            }
            else if (!($('#email').val()[i] >= 'a' && $('#email').val()[i] <= 'z' || $('#email').val()[i] >= 'A' && $('#email').val()[i] <= 'Z' || $('#email').val()[i] == '.' ||
                $('#email').val()[i] >= '0' && $('#email').val()[i] <= '9')) {
                alert("You must insert a vaild email charecter");
                $('#email').focus();
                break;
            }
        }
        if (count_stru == 1) {
            for (var i = 0; i < $('#email').val().length; i++) {
                if ($('#email').val()[i] == '@') {
                    if ($('#email').val()[i + 1] == '.' || $('#email').val()[i - 1] == '.') {
                        alert("You cant write dot after or before @ ");
                        $('#email').focus();
                        break;
                    }
                }
            }
        }
        else {
            alert("You have more than 1 @");
            $('#email').focus();
        }
    }
    else {
        alert('You cant enter digit in the first place');
        $('#email').focus();
    }

    for (var i = 0; i < $('#username').val().length; i++) {
        if ($('#username').val()[i] >= 'a' && $('#username').val()[i] <= 'z' || $('#username').val()[i] >= 'A' && $('#username').val()[i] <= 'Z' || $('#username').val()[i] >= 0 && $('#username').val()[i] <= 9) {
        }
        else {
            alert('user error');
            $('#username').focus();
            break;
        }
    }

    var count_speacial = 0;
    var count_numbers = 0;
    var count_letters = 0;
    var str = "~`!#$%^&*+=-[]';,/{}|\":<>?";
    if ($('#password').val().length >= 7) {
        debugger;
        for (var i = 0; i < $('#password').val().length; i++) {
            if ($('#password').val()[i] >= 'A' && $('#password').val()[i] <= 'Z' || $('#password').val()[i] >= 'a' && $('#password').val()[i] <= 'z') {
                count_letters = 1;
            }
            else if ($('#password').val()[i] >= '0' && $('#password').val()[i] <= '9') {
                count_numbers = 1;
            }
            else if (str.indexOf($('#password').val()[i]) != -1) {
                count_speacial = 1;
            }
        }
        if (count_numbers && count_speacial && count_letters) {
            if ($('#password').val().indexOf($('#password2').val() != -1) && $('#password').val().length == $('#password2').val().length) {
                $('#myInside').load('../MainPage/thanks.html');
            }
            else {
                alert("Worng Confirm password try again");
                $('#password2').focus();
            }
        }
        else {
            alert("Worng password try again");
            $('#password').focus();
        }
    }
    else {
        alert("Password is to short try again");
        $('#password').focus();
    }
}