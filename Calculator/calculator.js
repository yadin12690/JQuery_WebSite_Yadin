
$(document).ready(init);

function init()
{

}

function numInput(num) {
    if (num == 'AC') {
        document.getElementById('display').value = "";
    }
    else if (num == 'CE') {
        document.getElementById('display').value = document.getElementById('display').value.substring(0, document.getElementById('display').value.length - 1);
    }
    else {
        document.getElementById('display').value += num;
    }
}

function calculate() {
    document.getElementById('display').value = eval(document.getElementById('display').value);
}

function switchcalc()
{
    $("#myInside").load("../Calculator/Sctcalc.html");
}