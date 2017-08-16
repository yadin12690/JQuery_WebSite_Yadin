$(document).ready(init);

function init() {
    $(document).on('click', '#myBTN', check);
    $(document).on('click', '#myBTN2', check2);
    $(document).on('click', '#myBTN3', check3);
}


function check()
{
    $("#myInside").load("../Form/Form.html");
}

function check2() {
    $("#myInside").load("../Calculator/calculator.html");
}

function check3() {
    $("#myInside").load("../Game/game.html");
}