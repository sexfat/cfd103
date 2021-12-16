import $ from 'jquery' ;

console.log('webpack start');

const x = (x , y) => x * y;
document.getElementById('app').innerHTML =  x(200 , 800);

$('body').css('background-color' , '#f20');

