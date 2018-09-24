// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


(function() {
  'use strict';

  var app = {
    visibleCards: {},
    reminders: [],
    cardTemplate: document.querySelector('.cardTemplate'),
    container: document.querySelector('.main'),
    addDialog: document.querySelector('.dialog-container'),
    daysOfWeek: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
    // fechaEntrega:  document.querySelector('.dialog-container')

  };  
  

  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/

  document.getElementById('butRefresh').addEventListener('click', function() {
    // Refresh all of the forecasts
    app.updateReminders();
  });

  document.getElementById('butAdd').addEventListener('click', function() {
    // Open/show the add new city dialog
    app.toggleAddDialog(true);
  });

  let reminderNameInput = document.getElementById('reminderNameInput')

  document.getElementById('butAddCity').addEventListener('click', function() {
    // Add the newly selected city

    let title = reminderNameInput.value;

    // TODO init the app.reminders array here - DONE
    if (!app.reminders) {
      app.reminders = [];
    }

    // TODO push the selected city to the array and save here - DONE
    let data = {title, date: new Date()}
    app.reminders.push(data);
    app.saveReminders();
    app.toggleAddDialog(false);
    app.updateCard(data);

    reminderNameInput.value = '';
  });

  document.getElementById('butAddCancel').addEventListener('click', function() {
    // Close the add new city dialog
    app.toggleAddDialog(false);
  });


  /*****************************************************************************
   *
   * Methods to update/refresh the UI
   *
   ****************************************************************************/

  // Toggles the visibility of the add new city dialog.
  app.toggleAddDialog = function(visible) {
    if (visible) {
      app.addDialog.classList.add('dialog-container--visible');
    } else {
      app.addDialog.classList.remove('dialog-container--visible');
    }
  };

  app.updateCard = function(data) {
    console.log(data);
    const card = app.cardTemplate.cloneNode(true);
    card.classList.remove('cardTemplate');
    card.querySelector('.title').textContent = data.title;
    card.querySelector('.date').textContent = (new Date(data.date))
      .toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    card.querySelector('.delete-card').addEventListener('click', function() {
      card.parentNode.removeChild(card);
      app.reminders = app.reminders.filter(function (reminder) {return reminder.title != data.title});
      app.saveReminders()
    })
    card.removeAttribute('hidden');
    app.container.appendChild(card);
    app.visibleCards[data.key] = card;
  };

  // Iterate all of the cards and attempt to get the latest forecast data
  app.updateReminders = function() {
    app.reminders.forEach(function(reminder) {app.updateCard(reminder)});
  };

  // Save list of cities to localStorage.
  app.saveReminders = function() {
    var reminders = JSON.stringify(app.reminders);
    localStorage.reminders = reminders;
  };

  /************************************************************************
   *
   * Code required to start the app
   *
   * NOTE: To simplify this codelab, we've used localStorage.
   *   localStorage is a synchronous API and has serious performance
   *   implications. It should not be used in production applications!
   *   Instead, check out IDB (https://www.npmjs.com/package/idb) or
   *   SimpleDB (https://gist.github.com/inexorabletash/c8069c042b734519680c)
   ************************************************************************/

  try {
    app.reminders = JSON.parse(localStorage.reminders) || [];
  } catch {
    app.reminders = [];
  }
  app.updateReminders();


  // TODO add service worker code here - DONE
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
})();
