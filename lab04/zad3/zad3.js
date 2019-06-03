/* jshint strict: global, esversion: 6, devel: true */
'use strict';

let Template = function (body) {
  this.body = body;
  this.podstaw = function (data) {
    return body.replace(/\{([a-zA-Z0-9]+)\}/g, (match, p1) => {
      if (data.hasOwnProperty(p1)) {
        return data[p1];
      }
      else {
        return match;
      }
    });
  };
};

let szablon =
  '<table border="{border}">' +
  '  <tr><td>{first}</td><td>{last}</td></tr>' +
  '</table>';

let dane = {
  first: "Jan",
  last: "Kowalski",
  pesel: "97042176329"
};

let myTemplate = new Template(szablon);

console.log(myTemplate.podstaw(dane));