import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

document.addEventListener('DOMContentLoaded', function() {

  var modalBackground = document.getElementById("calendarModal");

  var modalText = document.getElementById("calendarModalText");
  var modalNewEntry = document.getElementById("modalNewEntry");
  var modalNewFood = document.getElementById("modalNewFood");

  var calendarEl = document.getElementById('calendar');

  var calendar = new Calendar(calendarEl, {
    plugins: [ dayGridPlugin, interactionPlugin ],

    dateClick: function(info) {
    // info is a dateClickInfo object. if we click a calendar day we get a modal popup
      modalBackground.style.display ="block";
      modalText.innerHTML = "You clicked on the date of " + info.dateStr;
      console.log("current date:" + info.date + " " + info.date.getFullYear() + " " + info.date.getMonth() + " " + info.date.getDate());
    }
  });

  calendar.render();
});


window.onclick = function(event) {
  if (event.target == document.getElementById("calendarModal")) {
    document.getElementById("calendarModal").style.display = "none";
  }
}