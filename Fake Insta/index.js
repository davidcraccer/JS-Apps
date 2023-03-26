import posts from './data.js'

const body = document.getElementById('hero')

posts.forEach(post => {
    body.innerHTML += `
    <section class="post">
    <div class="profile flex">
        <img src=${post.avatar} alt="pfp" class="pfp">
        <div>
            <p class="name">${post.name}</p>
            <p class="location">${post.location}</p>
        </div>
    </div>
    <img class="post-img" src=${post.post} alt="pfp">
    <div class="footer-post">
        <div>
            <img class="heart" src="/images/icon-heart.png" alt="" data-id="${post.id}">
            <img src="/images/icon-comment.png" alt="">
            <img src="/images/icon-dm.png" alt="">
        </div>
        <p class="likes" data-id="${post.id}">${post.likes.toLocaleString()} likes</p>
        <p class='caption'><span class="username">${post.username}</span>${post.comment}</p>
    </div>
</section>
    `
    //grab all hearts -> for each heart > take id of the heart > grab the likes-p with the same id of heart
    //grab the value of likes > if heart isnt filled then fill and increment + else viceversa
    const hearts = document.querySelectorAll('.heart')
    hearts.forEach(heart => {
        heart.addEventListener('click', ()=>{
            const postId = heart.dataset.id
            const likes = document.querySelector(`.likes[data-id="${postId}"]`)
            let likesCount = parseFloat(likes.textContent.replace(/,/g, ''))
            if (heart.src.includes('/images/icon-heart.png')) {
                heart.src = '/images/heart.png'
                likesCount++
                likes.textContent = `${likesCount.toLocaleString()} likes`
              } else {
                heart.src = '/images/icon-heart.png'
                likesCount--
                likes.textContent = `${likesCount.toLocaleString()} likes`
              }
        })
    })
})

