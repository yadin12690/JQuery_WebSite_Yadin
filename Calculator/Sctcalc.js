$(document).ready(function()
{});
displ = new Array();


//when we press any key 
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


//when we click '=' we get here to calc
function calculate()
{
        displ = document.getElementById('display').value.split('^');
        countHez = displ.length - 1;
        if (countHez)
        {
            max = 0;
            max2 = 0;
            while (countHez)
            {
                max = Math.max(displ[0].lastIndexOf('+'), displ[0].lastIndexOf('-'));
                max2 = Math.max(displ[0].lastIndexOf('*'), displ[0].lastIndexOf('/'));
                max3 = Math.max(displ[0].lastIndexOf('('), displ[0].lastIndexOf('-'));
                if (max > max2 && max > max3)
                {
                }
                else if (max2 > max && max2 > max3)
                {
                    max = max2;
                }
                else
                {
                    max = max3;
                }
                var faction = displ[0].substring(max + 1, displ[0].length);
                var temparray = new Array;
                temparray = displ[1];
                var laction = "";
                for (var i = 0 ; i < temparray.length ; i++)
                {
                    if (temparray[i] != '-' && temparray[i] != '+' && temparray[i] != '*' && temparray[i] != '/' && temparray[i] != ')')
                    {
                        laction += temparray[i];
                    }
                    else
                    {
                        break;
                    }
                }
                var torep = faction + '^' + laction;
                lastres = Math.pow(faction, laction);
                yadin = document.getElementById('display').value.replace(torep, lastres);
                document.getElementById('display').value = yadin;
                countHez--;
                displ = yadin;
                displ = yadin.split('^');
            }
        }
        displ = document.getElementById('display').value.split('√');
        countHez = displ.length - 1;
        if (countHez)
        {
            while (countHez)
            {
                var temparray = new Array;
                temparray = displ[1];
                var laction = "";
                for (var i = 0; i < temparray.length ; i++)
                {
                    if (temparray[i] != '-' && temparray[i] != '+' && temparray[i] != '*' && temparray[i] != '/' && temparray[i] != ')')
                    {
                        laction += temparray[i];
                    }
                    else
                    {
                        break;
                    }
                }
                if (laction[0] == '(')
                {
                    var tal = laction.substring(1, laction.length);
                    var p = Math.sqrt(tal);
                    yadin = document.getElementById('display').value.replace('√' + laction + ')', p);
                }
                else
                {
                    var p = Math.sqrt(laction);
                    yadin = document.getElementById('display').value.replace('√' + laction, p);
                }
                document.getElementById('display').value = yadin;
                countHez--;
                displ = yadin;
                displ = yadin.split('√');
            }
            document.getElementById('display').value = eval(yadin);
        }
    document.getElementById('display').value = eval(document.getElementById('display').value);
}

//switch to simple calculator
function switchcalc2() {
    $("#myInside").load("../Calculator/calculator.html");
}