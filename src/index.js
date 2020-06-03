import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

document.addEventListener('DOMContentLoaded', function() {

  var modalBackground = document.getElementById("calendarModal");

  var modalContent = document.getElementById("calendarModalContent");

  var calendarEl = document.getElementById('calendar');

  var calendar = new Calendar(calendarEl, {
    plugins: [ dayGridPlugin, interactionPlugin ],

    dateClick: function(info) {
    // info is a dateClickInfo object. if we click a calendar day we get a modal popup
      modalBackground.style.display ="block";
      modalContent.innerHTML = "You clicked on the date of " + info.dateStr;
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