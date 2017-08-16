var str = "";
var allWords = new Array('GAL', 'TAL', 'YADIN', 'MOSHE', 'NITAY', 'YAKIR', 'MEIR', 'SHAY', 'MEITAL', 'HEN', 'IZHAR', 'NIR', 'OFFIR', 'AYOUB', 'KARAM');
var words = new Array();
var timerId;
function storageWords() {
    for (var i = 0; i < 5; i++) {
        words[i] = allWords[Math.floor(Math.random() * allWords.length)];
        for (var j = 0; j < i; j++) {
            while (words[i].localeCompare(words[j]) == 0) {
                words[i] = allWords[Math.floor(Math.random() * allWords.length)];
                j = 0;
            }
        }
    }
    $('#mySpan').text(words).text(); //fill the basket with words from the array (words)
}
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    timerId = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        counTimer = timer;
        if (timer-- == 0) {
            alert("Game Over");
            newGame();
        }
    }, 1000);
}
function newGame() {
    $("#myInside").load("../Game/game.html");
    clearInterval(timerId);
}
function createTable(number, timeNum) {
    for (var i = 0; i < number; i++) {
        $('#myTable tbody').append('<tr></tr>');
        for (var j = 0; j < number; j++) {
            var id = i + '_' + j;
            var line = '<td id="' + id + '"></td>';
            $('#myTable tr:last').append(line);
        }
    }
    storageWords();
    fillTable();
    fillRandom();
    jQuery(function ($) {
        oneMinute = timeNum * 1;
        display = $('#time');
        startTimer(oneMinute, display);
    });
}
function fillWord(word) {
    var tableWidth = $("#myTable tr").length;
    var i = Math.floor(Math.random() * tableWidth);
    var j = Math.floor(Math.random() * tableWidth);
    // check left to right placement
    if (j + word.length <= tableWidth) {
        //check if placement is possible
        for (var k = 0; k < word.length; k++) {
            var newJ = j + k;
            var index = "#" + i + "_" + newJ;
            var cell = $(index);
            if (cell.is(':empty')) {
                continue;
            }
            else {
                if (cell.html() !== word[k])//=== check value and also type(if they are the same)
                {
                    return false;
                }
            }
        }
        //placement the word
        for (var k = 0; k < word.length; k++) {
            var newJ = j + k;
            var index = i + "_" + newJ;
            var cell = $('#' + index);
            cell.html(word[k]);
        }
        return true;
        //check up to down placement
        if (i + word.length <= tableWidth) {
            //check if placement is possible
            for (var k = 0; k < word.length; k++) {
                var newI = i + k;
                var index = newI + "_" + j;
                var cell = $('#' + index);
                if (cell.is(':empty')) {
                    continue;
                }
                else {
                    if (cell.html() !== word[k])//=== check value and also type(if they are the same)
                    {
                        return false;
                    }
                }
            }
            //placement the  word
            for (var k = 0; k < word.length; k++) {
                var newI = i + k;
                var index = newI + "_" + j;
                var cell = $('#' + index);
                cell.html(word[k]);
            }
            return true;
        }
        return false;
    }
}
function emptyTable() {
    var tds = $('td');
    for (var i = 0; i < tds.length; i++) {
        tds[i].innerHTML = "";
    }
}
function fillTable() {
    for (var i = 0; i < words.length; i++) {
        var failure = 0;
        var word = words[i];
        while (!fillWord(word)) {
            failure++;
            if (failure == 10) {
                emptyTable();
                i = -1;
                break;
            }
        }
    }
    return true;
}
function fillRandom() {
    //Change the color of cell that click
    $('td').click(function () {
        $(this).css('backgroundColor', '#e8f609');
    });

    //Change back the cell to white on double click
    $('td').dblclick(function () {
        $(this).css('backgroundColor', '#CD5C5C');
        var temp_str = str.substring(0, str.length - 3);
        str = temp_str;
    });

    var fillempty = $('td:empty');
    for (var i = 0; i < fillempty.length; i++) {
        fillempty[i].innerHTML = (String.fromCharCode(Math.floor(Math.random() * 26) + 65));
    }
}
function init(letter) {
    str += letter;
    for (var i = 0; i < words.length; i++) {
        if (words[i].localeCompare(str) == 0)//if we get here, that means the player find a word           
        {
            $("td").each(function () {
                var $Cell = $(this);
                $Cell.css("background-color", "#CD5C5C");
            });

            $("<label></label>").css({ "font-size": "50px", "color": "white", "position": "center", "bottom": "200px", "center": "5px", "text-shadow": "2px 2px #000000" }).text("Nice!").appendTo("#lvl").animate({ opacity: 0, zoom: 1.1 }, 2000);

            //this block:remove word that found from "Names-Array"
            var temp = $('#mySpan').text(words).text();
            var temp_arr = temp.split(',');
            temp_arr[i] = "";
            $('#mySpan').text(temp_arr);
            //
            temp = words[i];
            words[i] = words[words.length - 1];
            words[words.length - 1] = temp;
            words.pop();
            str = "";
        }
        else if (str.length == 8)//the player dosent find word
        {
            str = "";
            $("td").each(function () {
                var $Cell = $(this);
                $Cell.css("background-color", "#CD5C5C");
            });
            break;
        }
    }
    if (!words.length)//the player find all the words
    {
        alert("Nice Round You're done this level in : " + (oneMinute - counTimer) + " Seconds");
        newGame();
    }
}
$("#myTable").on("click", "td", function () {
    init($(this).text());
});
