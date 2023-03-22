import menuArray from "/data.js"
import { renderCheckout, renderTotalPrice, get } from "./render.js"

//add

const handleAddClick = (itemId) => {
    const targetItemObj = menuArray.find(item => item.id === parseInt(itemId));
    renderCheckout(targetItemObj)
    renderTotalPrice(targetItemObj.price)
}
  
export const handleClickAdd = () => {
    document.querySelectorAll('.add-btn').forEach(btn => {
      btn.addEventListener('click', handleClick)
    })
}
  
export const handleClick = (e) => {
    if (e.target.dataset.addButton) {
      handleAddClick(e.target.dataset.addButton)
    }
}
  

//remove
export const handleClickRemove = () =>{
    const checkoutItems = get('.checkout-items')
    checkoutItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove')){
            const itemId = e.target.dataset.removeButton
            handleRemoveClick(itemId)
            if(checkoutItems.children.length === 0){
                get('.checkout').classList.add('hidden')
            }
        }
    })
    const handleRemoveClick =(itemId)=>{
        const targetItemObj = menuArray.find(item => {
            return item.id === parseInt(itemId)
        })
        renderTotalPrice(targetItemObj.price * -1)
        get(`[data-checkout-id="${targetItemObj.id}"]`).remove()
    }
}

//order
export const handleOrderBtn = () => {
    get('.order-btn').addEventListener('click', () =>{
        get('.payment').classList.remove('hidden')
    })
}

//pay
export const handlePayBtn = () => {
    get('.pay-btn').addEventListener('click', () =>{
        setTimeout(()=>{
            get('.payment').classList.add('hidden')
            get('.checkout').classList.add('hidden')
            get('.thanks').classList.remove('hidden')

            document.querySelectorAll('.add-btn').forEach(btn => {
                btn.removeEventListener('click', handleClick);
              })
        }, 500)
    })
}