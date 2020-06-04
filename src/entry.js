// sets the date in entry form to default to today
function format(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

// if the backend passes a default date from the query string, use it. else use todays date
var default_date = document.getElementById("default_date").innerHTML.trim();
if (default_date) {
  var dateString = default_date;
}

else {
  var today = new Date();
  var dateString = format(today);
}
document.getElementById("date").setAttribute("value", dateString);