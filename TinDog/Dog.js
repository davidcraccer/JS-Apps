export class Dog{
    constructor(data){
        Object.assign(this, data)
    }
    renderDog(){
        const { name, avatar, age, bio } = this
        return `
        <div class="dog">
            <img src=${avatar} alt="Picture">
            <div class="text">
                <p class="name">${name}, ${age}</p>
                <p class="bio">${bio}</p>
            </div>
        </div>
        `
    }
    like(){
        this.hasBeenLiked = true
    }
    swipe(){
        this.hasBeenSwiped = true
    }
}
