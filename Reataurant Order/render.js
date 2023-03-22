
import menuArray from "/data.js"

export const get = (id) => document.querySelector(id)

export const renderMenu = () =>{
    menuArray.forEach((item) => {
        const { name, ingredients, id, price, emoji } = item
        get(".menu").innerHTML += `
        <div class="item flex" id="${id}">
        <div class="flex">
        <h1 class="emoji">${emoji}</h1>
        <div class="text flex">
        <h3 class="item-name">${name}</h3>
        <p class="description">${ingredients.toString().replace(/,/g, ', ')}</p>
        <p class="item-price">$${price}</p>  
        </div>
        </div>
        <h1 class="add-btn flex"  data-add-button="${id}">+</h1>
        </div>
        `
    })
}

export const renderCheckout = (item) => {
    const {name, id, price} = item
    get('.checkout').classList.remove('hidden')
    get('.checkout-items').innerHTML +=`
    <div class="checkout-item flex" data-checkout-id="${id}">
    <div class="flex">
    <h3 class="item-name">${name}</h3>
    <button class="remove" data-remove-button="${id}">remove</button>
    </div>
    <p class="item-price">$${price}</p>
    </div>
    `
}

const totalPrice = get('.total-price .item-price')
export const renderTotalPrice = (itemPrice) => {
    const currentTotalPrice = parseFloat(totalPrice.dataset.totalPrice)
    const newTotalPrice = currentTotalPrice + itemPrice
    totalPrice.dataset.totalPrice = newTotalPrice
    totalPrice.textContent = `$${newTotalPrice}`
}