//import $ from 'jquery';
import { gsap } from 'gsap';
import './style.css'; // 引入css 
import Vue  from 'vue';


console.log('app1');

// const x = (x , y) => x * y + 'NT$';
// document.getElementById('app').innerHTML =  x(900 , 800);
// jq
$('body').css('background-color' , 'yellow');

// gsap
gsap.to('.box' , {x: 200 , y : 300 , rotation : 360 , repeat : -1 , yoyo: true});


var app = new Vue({
    el : '#app',
    data : {
       message : 'hi vue'
    }
})


