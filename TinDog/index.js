import { Dog } from "./Dog.js"
import { dogs } from './data.js'

const renderDogsContainer = document.querySelector('#render-dogs')
const likeBtn = document.querySelector('.like-btn')
const dislikeBtn = document.querySelector('.dislike-btn')

let currentDog

renderNewDog()
likeBtn.addEventListener('click', () => {
    console.log(currentDog)
        currentDog.like()
        currentDog.swipe()
        document.querySelector('.dog').innerHTML += `
        <img class="badge" src="/images/badge-like.png" alt="Liked">`
        setTimeout(() => renderNewDog(), 500)
})

dislikeBtn.addEventListener('click', () => {
    console.log(currentDog)
        currentDog.swipe()
        document.querySelector('.dog').innerHTML += `
        <img class="badge" src="/images/badge-nope.png" alt="Disliked">`
        setTimeout(() => renderNewDog(), 500)
})

function renderNewDog(){
    const dog = dogs.find(dog => !dog.hasBeenSwiped)
    if (!dog) return;
    dog.hasBeenSwiped = true
    currentDog = new Dog(dog)
    renderDogsContainer.innerHTML = currentDog.renderDog()
}


