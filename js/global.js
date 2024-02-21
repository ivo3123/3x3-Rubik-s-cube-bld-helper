var white = "#FFFFFF";
var red = "#FF0000";
var orange = "#FFA500";
var yellow = "#FFFF00";
var blue = "#00ffff";
var green = "#00FF00";

function incrementString(str) {
    const letter = str.charAt(0);
    const number = parseInt(str.slice(1));

    return String.fromCharCode(letter.charCodeAt(0) + 1) + number;
}
