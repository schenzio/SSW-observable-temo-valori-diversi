import { ajax } from "rxjs/ajax";
import { Observable, interval } from "rxjs";

const apiKey = "999a027be4934cc7461206032df1ba2d";
const URL =
  "https://api.openweathermap.org/data/2.5/weather?APPID=" +
  apiKey +
  "&units=metric&q=";
var city = "Pisa";
const tick = interval(1000);
var t1 = 0;
//Costruisco l'observable
const temp = new Observable(subscriber =>
  tick.subscribe({
    next(n) {
      fetch(URL + city)
        .then(response => response.json())
        .then(data => {
          var t = data.main.temp;
          if (t != t1) {
            subscriber.next(data.main.temp);
            t1 = t;
          }
        });
    }
  })
);

temp.subscribe({
  next(x) {
    document.getElementById("output").innerHTML += x + "<br>";
  }
});
