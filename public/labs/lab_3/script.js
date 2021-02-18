/* Put your javascript in here */

const imageArray = [
    'images/onigiri_1.png',
    'images/onigiri_2.png',
    'images/onigiri_3.png',
    'images/onigiri_4.png',
    'images/roll_1.png',
    'images/roll_2.png',
    'images/roll_3.png',
]

array1.forEach((element) => {
    console.log(element);

let width = 130; // image width
let count = 3; // visible images count

let list = carousel.querySelector('ul');
let listElems = carousel.querySelectorAll('li');

let position = 0;

carousel.querySelector('.prev').onclick = function() {
    position += width * count;
    position = Math.min(position, 0)
    list.style.marginLeft = position + 'px';
};

carousel.querySelector('.next').onclick = function() {
    position -= width * count;
    position = Math.max(position, -width * (listElems.length - count));
    list.style.marginLeft = position + 'px';
    };        
