import './style.scss';
import { gsap } from 'gsap';

gsap.fromTo('.wrapper' , {
   y: -100,
   opacity : 0 
}, {
    y: 100,
    opacity: 1
})

