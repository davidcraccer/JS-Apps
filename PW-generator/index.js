const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"]
const get = (id)=> document.querySelector(id)
const passwords = document.querySelectorAll('.password')

//eventlistner
document.querySelector('.generate-pw').addEventListener('click', generate)



passwords.forEach(pw =>{
  pw.addEventListener('click', ()=> copy(pw))
})


get('.pw-length').addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault()
    get('.generate-pw').click()
  }
})

//functions
function generate(){
  const pwLength = get('input').value
  console.log(pwLength)
  passwords.forEach(pw=>{
    pw.textContent = ''
    for (let i = 0; i < pwLength; i++){
      pw.textContent += characters[Math.floor(Math.random()*characters.length)]
    }
  })
}

function copy(pw){
  const text = pw.textContent
  const textarea = document.createElement("textarea")
  textarea.value = text
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand("copy")
  document.body.removeChild(textarea)
}


