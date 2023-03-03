import { cubicInOut } from "svelte/easing"

//js transitions arent as effiecent as css ones however certain effects cant be done in css like typewriter effect


export default function fade(node, { delay = 0, duration = 400, easing = cubicInOut }) {
    const originalOpacity = +getComputedStyle(node).opacity
    return {
        delay, 
        duration, 
        easing, 
        tick: (t) => {
            node.style.opacity = t * originalOpacity; 
        }
    }
}