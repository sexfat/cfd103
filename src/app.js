import $ from 'jquery';
import { gsap } from 'gsap';

console.log('app1');

const x = (x , y) => x * y + 'NT$';
document.getElementById('app').innerHTML =  x(900 , 800);
// jq
$('body').css('background-color' , 'green');

// gsap
gsap.to('.box' , {x: 200 , y : 300});


