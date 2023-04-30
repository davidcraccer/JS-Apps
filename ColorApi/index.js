//https://www.thecolorapi.com/docs#schemes
const get = id => document.querySelector(id)
const getAll = id => document.querySelectorAll(id)
const colorScheme = get('#color-schemes')
const ctaBtn = get('#cta-btn')
const hexInput = get('#color-input')
const baseURL =  'https://www.thecolorapi.com/'
let endpointURL


render()
//UX: when click out of color input it renders
let isInputClicked = false
hexInput.addEventListener('click', () => {
  isInputClicked = true
})

document.addEventListener('click', (event) => {
  if (isInputClicked && !hexInput.contains(event.target)) {
    render()
    isInputClicked = false
  }
})

// btn 
ctaBtn.addEventListener('click', (e) => {
    e.preventDefault()
    render()
})

function render(){
    const hexValue = hexInput.value.replace('#', '')
    endpointURL = `scheme?hex=${hexValue}&mode=${colorScheme.value}&count=5`
    setColorScheme()
}

async function setColorScheme(){
    try {
        const res = await fetch(baseURL + endpointURL)
        const data = await res.json()
        get('.hero').innerHTML = ''
        for (let i = 0; i < 5; i++){
            const hex = data.colors[i].hex.value
            get('.hero').innerHTML += `
            <div class="color-container">
            <div class="color" style="background-color: ${hex}"></div>
            <p class="color-hex">${hex}</p>
            </div>
        `
        }
    }
    catch(err){
        console.error(err)
    }
}
