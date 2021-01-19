'use strict'


const recomMenu = document.querySelector("#item");
const foodImage = document.querySelector(".foodImage>img");

let url = "http://13.125.227.52:85/random";
let foodDB = fetch(url)
                .then((response)=>{
                    let a=response.json()
                    return a})
                .then(json =>{
                    recomMenu.innerHTML = json.name;
                    // foodImage.style.backgroundImage = (`url(${json.img})`);
                    foodImage.src = `${json.img}`;
                });



    
console.log(foodDB);
// const item = 
// item.innerHTML = foodDB.