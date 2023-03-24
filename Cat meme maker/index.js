import { catsData } from '/data.js'

const get = (id)=> document.querySelector(id)
const emotionRadios = get('#emotion-radios')
const getImageBtn = get('#get-image-btn')
const gifsOnlyOption = get('#gifs-only-option')
const memeModalInner = get('#meme-modal-inner')
const memeModal = get('#meme-modal')
const memeModalCloseBtn = get('#meme-modal-close-btn')


emotionRadios.addEventListener('change', highlightCheckedOption)
memeModalCloseBtn.addEventListener('click', closeModal)
getImageBtn.addEventListener('click', renderCat)


function highlightCheckedOption(e){
    document.getElementsByClassName('radio').forEach(radio => {
        radio.classList.remove('highlight')
    })
    get(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
    memeModal.style.display = 'none'
}

function renderCat(){
    const catObject = getSingleCatObject()
    setTimeout(()=>{

        memeModalInner.innerHTML =  `
        <img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >
        `
        memeModal.style.display = 'flex'
    }, 400)
}

function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    if(catsArray.length === 1){
        return catsArray[0]
    }
    else{
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}

function getMatchingCatsArray(){     
    if(get('input[type="radio"]:checked')){
        const selectedEmotion = get('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter(function(cat){
            
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingCatsArray 
    }  
}

function getEmotionsArray(cats){
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        emotionRadios.innerHTML += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
}

renderEmotionsRadios(catsData)




