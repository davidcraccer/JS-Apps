//https://www.thecolorapi.com/docs#schemes
const get = id => document.querySelector(id)
const getAll = id => document.querySelectorAll(id)
const colorScheme = get('#color-schemes')
const ctaBtn = get('#cta-btn')
const hexInput = get('#color-input')
const baseURL =  'https://www.thecolorapi.com/'
const hexBase = '2B283A'
let endpointURL


render()

hexInput.addEventListener('keyup', () => {
    render()
})

hexInput.addEventListener('input', e => {
    limitHexInput(e)
})

ctaBtn.addEventListener('click', (e) => {
    e.preventDefault()
    render()
})

function render(){
    const hexValue = hexInput.value.replace('#', '')
    endpointURL = `scheme?hex=${hexValue|| hexBase}&mode=${colorScheme.value}&count=5`
    setColorScheme()
}


function limitHexInput(e){
    const hexValue = e.target.value
    const cleanHex = hexValue.replace(/[^a-fA-F0-9]/g, '')
    const truncatedHex = cleanHex.slice(0, 6)
    
    const hashtagValue = truncatedHex ? `#${truncatedHex}` : ''
    e.target.value = hashtagValue
}



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
            //for ui 
            colorHexEl.style.display = 'block'
        }
    }
    catch(err){
        console.error(err)
    }
}

