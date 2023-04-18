//https://www.thecolorapi.com/docs#schemes
const get = id => document.querySelector(id)
const getAll = id => document.querySelectorAll(id)
const colorScheme = get('#color-schemes')
const ctaBtn = get('#cta-btn')
const baseURL =  'https://www.thecolorapi.com/'
let endpointURL = `scheme?hex=F55A5A&mode=${colorScheme.value}&count=5`


setColorScheme()

ctaBtn.addEventListener('click', (e) => {
    e.preventDefault()
    endpointURL = `scheme?hex=F55A5A&mode=${colorScheme.value}&count=5`
    setColorScheme()
})

async function setColorScheme(){
    try {
        const res = await fetch(baseURL + endpointURL)
        const data = await res.json()
        const colors = data.colors
        const hexValues = []
        colors.forEach(color => {
            hexValues.push(color.hex.value)
        })

        const colorsEL = getAll('.color')
        const colorsHexEl = getAll('.color-hex')
        for (let i = 0; i < colorsEL.length; i++) {
            const colorEl = colorsEL[i]
            const hex = hexValues[i]
            colorEl.style.backgroundColor = hex
            const colorHexEl = colorsHexEl[i]
            colorHexEl.textContent = hex
        }
    }
    catch(err){
        console.error(err)
    }
}