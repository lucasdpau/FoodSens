import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new Calendar(calendarEl, {
    plugins: [ dayGridPlugin, interactionPlugin ],

    dateClick: function(info) {
      var modalBackground = document.getElementById("calendarModal");
      var modalContent = document.getElementById("calendarModalContent");
      modalBackground.style.display ="block";
      modalContent.innerHTML = "You clicked on the date of " + info.dateStr;
    }
  });

  calendar.render();
});


window.onclick = function(event) {
  if (event.target == document.getElementById("calendarModal")) {
    document.getElementById("calendarModal").style.display = "none";
  }
}