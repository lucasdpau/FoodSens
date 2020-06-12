import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

var modalBackground = document.getElementById("calendarModal");
var modalText = document.getElementById("calendarModalText");
var modalNewEntry = document.getElementById("modalNewEntry");
var modalNewFood = document.getElementById("modalNewFood");

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new Calendar(calendarEl, {
    plugins: [ dayGridPlugin, interactionPlugin ],

    eventSources: [
      {
        url:'/getevents',
      },
      {
        url: 'getfoods',
        color: 'green'
      }
    ],

    eventClick: function(info) {
      console.log(info.event.title);
      console.log(info.view.title);
    },

    dateClick: function(info) {
    // info is a dateClickInfo object. if we click a calendar day we get a modal popup
      modalBackground.style.display ="block";
      modalText.innerHTML = "You clicked on the date of " + info.dateStr;
    // add the date of the calendar day you clicked into the link's query string
      modalNewEntry.setAttribute("href", "/new_entry?date=" + info.dateStr);
      modalNewFood.setAttribute("href", "/new_food?date=" + info.dateStr);
    }
  });

  calendar.render();
});


window.onclick = function(event) {
// if we click outside the modal window we get rid of it
  if (event.target == document.getElementById("calendarModal")) {
    document.getElementById("calendarModal").style.display = "none";
  }
}


modalNewEntry.addEventListener('click', function() {
  modalText.innerHTML = "<h4>peekaboo</h4>";
});

modalNewFood.addEventListener('click', function() {
  modalText.innerHTML = "<h4>peekafood</h4>";
});


const profileMenuToggle = document.getElementById("profile_menu");
const profileMenuDropdown = document.getElementById("profile_dropdown");
profileMenuToggle.addEventListener('click', function() {
  if (profileMenuDropdown.style.display == "none") {
    profileMenuDropdown.style.display = "block";
  } else {
    profileMenuDropdown.style.display = "none";
  }
});