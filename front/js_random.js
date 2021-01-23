'use strict'

const recomMenu = document.querySelector("#item");
const foodImage = document.querySelector(".foodImage>img");
const stars = document.querySelector(".rating");

// api fetching
let url = "http://13.125.227.52:85/random";
let foodDB = fetch(url)
    .then((response) => {
        let a = response.json()
        return a
    })
    .then(json => {
        recomMenu.innerHTML = json.name;
        foodImage.src = `${json.img}`;
    });

function AddString(str, count) {
    let added = '';
    for (let i = 0; i < count; i++) {
        added += str;
    }
    return added;
}

// 평점 매기기

let filledStar = "<span>★</span>";
let unfilledStar = "<span>☆</span>";

function Rate() {
    let distanceStars = 90;
    let clicked = false;

    stars.addEventListener('mousemove', function (event) {
        // 마우스의 x좌표 받음
        let x = event.clientX;
        // 좌측 viewport 끝에서부터 div.rating 사이의 거리
        let distanceBody = stars
            .getBoundingClientRect()
            .x;
        for (let i = 0; i < 5; i++) {
            //클릭이 안되었다면 div.rating의 width를 5등분하고 그 위치에 따라 별의 개수를 수정한다.
            if (!clicked) {
                if (x > (distanceBody + distanceStars * i) && x <= (distanceBody + distanceStars * (i + 1))) 
                    stars.innerHTML = AddString(filledStar, i + 1) + AddString(unfilledStar, 4 - i);
                }
            }
    });

    stars.addEventListener('click', function (event) {
        let x = event.clientX;
        let distanceBody = stars
            .getBoundingClientRect()
            .x;
        //클릭했을 때 별의 개수를 고정한다.
        console.log('clicked');

        if (!clicked) {
            clicked = true;
            for (let i = 0; i < 5; i++) {
                if (x > (distanceBody + distanceStars * i) && x <= (distanceBody + distanceStars * (i + 1))) 
                    stars.innerHTML = AddString(filledStar, i + 1) + AddString(unfilledStar, 4 - i);
                }
            } else 
            clicked = false;
        }
    );

    stars.addEventListener('mouseleave', function () {
        //클릭되지 않고 마우스가 div.rating 밖으로 이동했을 때 모든 별을 초기화한다.
        if (!clicked) 
            stars.innerHTML = AddString(unfilledStar, 5);
        }
    )
}

Rate();