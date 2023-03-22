const get = (id) => document.getElementById(id)
const button = get('button')
const input = get('input')
const length = get('length')
const volume = get('volume')
const mass = get('mass')

button.addEventListener('click', () => {
    const value = parseInt(input.value)
    if(value){
        const result = calculate(value)
        for (const prop in result) {
            result[prop] = result[prop].toFixed(2)
        }
        setTimeout(()=>{
            length.innerHTML = `${value} meters = ${result.feet} feet 
                                <span class='hidden'>|</span> 
                                <div class="convert-line">${value} feet = ${result.meters} meters</div>`

            volume.innerHTML = `${value} liters = ${result.gallons} gallons 
                                <span class='hidden'>|</span> 
                                <div class="convert-line">${value} gallons = ${result.liters} liters</div>`

            mass.innerHTML = `${value} kilos = ${result.pounds} pounds 
                                <span class='hidden'>|</span> 
                                <div class="convert-line">${value} pounds = ${result.kilos} kilos</div>`
        }
        ,200)
    }
})

const calculate = (unit) => {
    const meters = unit / 3.28084 
    const feet = unit * 3.28084 
    const liters = unit / 3.785
    const gallons = unit * 3.785
    const kilos = unit * 2.2
    const pounds = unit / 2.2
    return { meters, feet, liters, gallons, kilos, pounds}
} 

input.addEventListener('keydown', (e) => {
    if (!(e.key >= '0' && e.key <= '9') && e.key !== 'Backspace') {
      e.preventDefault()
    }
})

