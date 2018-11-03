// ==UserScript==
// @name         upwork
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Mukhin V.A.
// @match        https://www.upwork.com/o/jobs/browse/?q=React*
// @grant        none
// ==/UserScript==

(function() {
    //1. Получить загголовок последниго поста
    //2. если в localStorage есть title сравнить его с полученным
    //       если они равны то перейти к 3
    //       если нет то у нас новое объявление включить звуковое оповещение к 4
    //     если нет то записать его в LocalStorage title
    //3. Через 5 сек. обновить страницу
    //4. вывести сообщение и ждать confirm получив ответ остановить звук
    'use strict';
    var newJob = false;
    var lastPostTitle = document.querySelector('h4.job-title.m-xs-bottom').textContent.trim();
    var lsTitle = localStorage.getItem('title');
    var mySound = new Audio('https://notificationsounds.com/soundfiles/a86c450b76fb8c371afead6410d55534/file-sounds-1108-slow-spring-board.mp3');
    var myButton = document.createElement("a");
    var buttonPanel = document.querySelectorAll('div.navbar-cta')[1];

    myButton.classList.add("btn", "btn-primary");
    myButton.innerText = 'Resume';
    buttonPanel.appendChild(myButton);

    var repeatPlay = function() {
      this.play();
    }
    mySound.addEventListener('ended', repeatPlay);
    myButton.addEventListener('click', () => {
        mySound.removeEventListener('ended', repeatPlay);
        localStorage.removeItem('title');
    });

    if(lsTitle) {

      if(lsTitle === lastPostTitle) {
        setTimeout(() => location.reload(), 15000);
      } else {
        mySound.play();

      }
    } else {
      localStorage.setItem('title', lastPostTitle);
      location.reload();
    }
    // Your code here...
})();
