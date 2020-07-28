// GLOBAL VARIABLES
var translatesArray = {};
var addToDefaultFontSize = 0; //0,2 or 4px


$(document).ready(function () {
    new WOW().init();
});

// FONT SIZE
$('.font-size-setter .button').click(function () {
    addToDefaultFontSize = addToDefaultFontSize == 4 ? 0 : addToDefaultFontSize + 2;
    $("html").css('font-size', (14 + addToDefaultFontSize) + 'px');
    $(this).find('img').attr('src', '../global/img/font-size-' + addToDefaultFontSize + '.png')

    if ($('.nice-scroll').length)
        $(".nice-scroll").getNiceScroll().resize();
});


// ADD &NBSP
function addNbsp(text) {
    myArray = ["a", "A", "i", "I", "o", "O", "u", "U", "w", "W", "z", "Z", "e", "E", "m.", "aż", "Aż", "bo", "Bo", "by", "By", "iż", "Iż", "ni", "Ni", "że", "Że", "do", "Do", "ku", "Ku", "na", "Na", "od", "Od", "po", "Po", "we", "We", "za", "Za", "ze", "Ze", "hę", "Hę", "no", "No", "ot", "Ot", "aa", "Aa", "aj", "Aj", "am", "Am", "au", "Au", "ba", "Ba", "ee", "Ee", "eh", "Eh", "ej", "Ej", "fe", "Fe", "fi", "Fi", "fi", "Fi", "fu", "Fu", "ha", "Ha", "he", "He", "ho", "Ho", "ii", "Ii", "oj", "Oj", "oo", "Oo", "ot", "Ot", "oż", "Oż", "pa", "Pa", "uf", "Uf", "uu", "Uu", "co", "Co", "ki", "Ki", "se", "Se", "ja", "Ja", "ty", "Ty", "ci", "Ci", "on", "On", "mu", "Mu", "go", "Go", "oń", "Oń", "ją", "Ją", "my", "My", "wy", "Wy", "im", "Im", "je", "Je", "ma", "Ma", "mą", "Mą", "me", "Me", "ów", "Ów", "ta", "Ta", "tę", "Tę", "tą", "Tą", "to", "To", "te", "Te", "tu", "Tu", "al", "Al", "ar", "Ar", "as", "Aa", "at", "At", "bi", "Bi", "er", "Er", "es", "Es", "ew", "Ew", "ez", "Ez", "go", "Go", "id", "Id", "ił", "Ił", "iw", "Iw", "li", "Li", "ok", "Ok", "om", "Om", "op", "Op", "or", "Or", "os", "Os", "oś", "Oś", "oz", "Oz", "ód", "Ód", "ós", "Ós", "su", "Su", "ud", "Ud", "ul", "Ul", "ut", "Ut", "je", "Je", "ma", "Ma", "są", "Są", "lub", "Lub", "ale", "Ale", "czy", "Czy", "nad", "Nad", "pod", "Pod", "bez", "Bez", "nie", "Nie", "tak", "Tak", "albo", "Albo", "więc", "Więc", "lecz", "Lecz", "przez", "Przez", "niech", "Niech", "tylko", "Tylko"];

    if (text !== undefined) {
        for (var i = 0, total = myArray.length; i < total; i++) {
            var myArrayItem = (myArray[i]);
            text = text.replace(new RegExp(' ' + myArrayItem + ' ', 'g'), ' ' + myArrayItem + '&nbsp;');
        }
    }

    return text;
}

// TRANSLATE
var currentLanguage = "pl";
translate();

$(".languages div").on("click", function () {
    $(".languages div").removeClass("selected");
    $(this).addClass("selected");

    currentLanguage = $(this).attr("data-lang");
    translate();
});

function translate() {

    if (currentLanguage === "pl") {
        translatesArray = pl;
    } else if (currentLanguage === "en") {
        translatesArray = en;
    } else if (currentLanguage === "de") {
        translatesArray = de;
    }

    $('*[data-translate]').each(function () {
        var attrValue = $(this).attr('data-translate');
        $("*[data-translate='" + attrValue + "']").html(addNbsp(translatesArray[attrValue]));
    });
}

// REDIRECT TO OTHER PAGE
var currentPage = "start-page";
$("*[data-goto]").on("click", function () {
    var destinationPage = $(this).attr("data-goto");
    goto(destinationPage);
});

function goto(destinationPage) {
    $("#" + currentPage).animate({opacity: 0}, 500);
    $("#" + destinationPage).animate({opacity: 1}, 500);

    $("#" + currentPage).css("z-index", 0);
    $("#" + destinationPage).css("z-index", 10);

    currentPage = destinationPage;
}

// NICE SCROLL
if ($('.nice-scroll').length) {
    initNiceScroll();
}

function initNiceScroll() {
    $(".nice-scroll").niceScroll({
        cursorcolor: "#dad1b9", // change cursor color in hex
        cursorwidth: "15px", // cursor width in pixel (you can also write "5px")
        cursorborder: "0px solid transparent", // css definition for cursor border
        cursorborderradius: "0px", // border radius in pixel for cursor
        cursordragontouch: true,
        emulatetouch: true, // enable cursor-drag scrolling like touch devices in desktop computer
        hwacceleration: true, // use hardware accelerated scroll when supported
        autohidemode: false, // how hide the scrollbar works, possible values: 
        background: "",
        railpadding: {top: 0, right: 15, left: 0, bottom: 0},
    });
}

// ENCYCLOPEDIA
if ($('body#encyclopedia').length) {
    loadDefinitions();
}

function loadDefinitions() {
    var html = "";
    $.each(translatesArray, function (key, value) {
        if (key.indexOf("_name") >= 0) {
            var keyArray = key.split("_");
            var defIndex = keyArray[0];
            html += "<div class='definition' data-index='" + defIndex + "'><div class='definition-block'>" + value + "</div></div>";
        }
    });
    $("#encyclopedia #list-page .list").html(html);
}

$(document).on("click", "#encyclopedia #list-page .list .definition", function () {
    $(this).addClass("selected");
    var defIndex = $(this).attr("data-index");
    loadDefinition(defIndex);
    goto("definition-page");

    setTimeout(function () {
        $("#encyclopedia #list-page .list .definition").removeClass("selected");
    }, 700);
});

function loadDefinition(defIndex) {
    $("#encyclopedia #definition-page h1").html(translatesArray[defIndex + "_name"]);
    $("#encyclopedia #definition-page .text").html(addNbsp(translatesArray[defIndex + "_desc"]));

    console.log(translatesArray[defIndex + "_img"]);

    if (translatesArray[defIndex + "_img"] != "") {
        $("#encyclopedia #definition-page .image img").attr("src", translatesArray[defIndex + "_img"]);
        $("#encyclopedia #definition-page .left-side").removeClass("center");
        $("#encyclopedia #definition-page .right-side").show();

    } else {
        $("#encyclopedia #definition-page .left-side").addClass("center");
        $("#encyclopedia #definition-page .right-side").hide();
    }

    $("#encyclopedia #definition-page .nice-scroll").getNiceScroll().resize();
    $("#encyclopedia #definition-page .nice-scroll").scrollTop(0);
}