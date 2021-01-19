'use strict'

let url = "http://13.125.227.52:85/random";
fetch(url)
    .then((response)=>response.json())
    .then((data) => console.log(data));
